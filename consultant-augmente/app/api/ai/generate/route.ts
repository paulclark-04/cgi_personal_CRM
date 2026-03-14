import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { dbContactToContact } from "@/lib/db-helpers";
import { mockIntelItems } from "@/lib/mock-data/intel-items";
import { mockGeneratedEngagements } from "@/lib/mock-data/generated-messages";
import { fetchCompanyNews } from "@/lib/news-fetcher";
import { SYSTEM_PROMPT } from "@/lib/ai-prompt";
import { RELATIONSHIP_LABELS } from "@/lib/constants";

export async function POST(request: NextRequest) {
  const { contactId } = await request.json();

  const dbContact = await prisma.contact.findUnique({
    where: { id: contactId },
  });
  if (!dbContact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  const contact = dbContactToContact(dbContact);

  // Try to fetch real news first, fall back to mock intel
  let intelItems = await fetchCompanyNews(contact.company, contactId, 5).catch(
    () => []
  );
  if (intelItems.length === 0) {
    intelItems = mockIntelItems.filter((i) => i.contactId === contactId);
  }

  // If no API key or no intel items, fall back to mock data
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || intelItems.length === 0) {
    const mock = mockGeneratedEngagements.find((e) => e.contactId === contactId);
    if (!mock) {
      return NextResponse.json(
        { error: "No data available for this contact" },
        { status: 404 }
      );
    }
    return NextResponse.json(mock);
  }

  // Build the user prompt with contact info and intel
  const intelText = intelItems
    .map(
      (item) =>
        `- [${item.type}] ${item.title} (${item.source}, ${item.date})\n  ${item.summary}\n  URL: ${item.url}`
    )
    .join("\n");

  const userPrompt = `Contact à recontacter :
- Prénom : ${contact.firstName}
- Nom : ${contact.lastName}
- Titre : ${contact.title}
- Entreprise : ${contact.company}
- Secteur : ${contact.sector}
- Type de relation : ${RELATIONSHIP_LABELS[contact.relationshipType]}
- Tags : ${contact.tags.join(", ")}
- Dernière interaction : ${contact.lastInteractionAt ?? "Jamais"}

Actualités récentes :
${intelText}

Génère les messages personnalisés et le plan d'action.`;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Consultant Augmenté",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b:free",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      }
    );

    if (!response.ok) {
      console.error("OpenRouter API error:", response.status, await response.text());
      const mock = mockGeneratedEngagements.find((e) => e.contactId === contactId);
      return NextResponse.json(mock ?? { error: "AI generation failed" });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error("No content in API response:", data);
      const mock = mockGeneratedEngagements.find((e) => e.contactId === contactId);
      return NextResponse.json(mock ?? { error: "Empty AI response" });
    }

    // Parse the JSON from the AI response
    // Strip markdown code fences if present
    const cleanContent = content
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const engagement = JSON.parse(cleanContent);

    // Add contactId to the response
    return NextResponse.json({ contactId, ...engagement });
  } catch (error) {
    console.error("AI generation error:", error);
    const mock = mockGeneratedEngagements.find((e) => e.contactId === contactId);
    return NextResponse.json(mock ?? { error: "AI generation failed" });
  }
}
