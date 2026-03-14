import { NextRequest, NextResponse } from "next/server";
import { ENRICHMENT_SECTORS } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const { title, company } = (await request.json()) as {
      title?: string;
      company?: string;
    };

    if (!title || !company) {
      return NextResponse.json(
        { error: "Missing required fields: title and company" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key is not configured" },
        { status: 500 }
      );
    }

    const sectorsList = ENRICHMENT_SECTORS.join(", ");

    const systemPrompt = `Tu es un assistant spécialisé dans la classification professionnelle B2B.
On te donne le titre et l'entreprise d'un contact professionnel.
Tu dois:
1. Déterminer le secteur d'activité parmi cette liste EXACTE: ${sectorsList}
2. Générer 3 à 6 tags pertinents (en français) qui décrivent les domaines d'expertise, compétences clés ou thématiques associées au profil.

Réponds UNIQUEMENT en JSON valide, sans markdown, sans explication:
{"sector": "...", "tags": ["tag1", "tag2", ...]}`;

    const userPrompt = `Titre: ${title}\nEntreprise: ${company}`;

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
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.3,
          max_tokens: 300,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error("OpenRouter API error:", response.status, errorText);
      return NextResponse.json(
        { error: "AI enrichment request failed" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error("Empty AI response:", data);
      return NextResponse.json(
        { error: "Empty response from AI" },
        { status: 502 }
      );
    }

    // Parse JSON from the AI response (strip code fences if present)
    const cleanContent = content
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsed = JSON.parse(cleanContent) as {
      sector?: string;
      tags?: string[];
    };

    // Validate sector is in the allowed list, fallback to "Autre"
    const sectorList: readonly string[] = ENRICHMENT_SECTORS;
    const sector = sectorList.includes(parsed.sector ?? "")
      ? (parsed.sector as string)
      : "Autre";

    const tags = Array.isArray(parsed.tags)
      ? parsed.tags.filter((t): t is string => typeof t === "string").slice(0, 8)
      : [];

    return NextResponse.json({ sector, tags });
  } catch (error) {
    console.error("LinkedIn enrich error:", error);
    return NextResponse.json(
      { error: "Internal server error during enrichment" },
      { status: 500 }
    );
  }
}
