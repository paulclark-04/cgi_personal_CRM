import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { dbContactToContact } from "@/lib/db-helpers";
import { mockIntelItems } from "@/lib/mock-data/intel-items";
import { fetchCompanyNews } from "@/lib/news-fetcher";

export async function POST(request: NextRequest) {
  const { contactId } = await request.json();

  const dbContact = await prisma.contact.findUnique({
    where: { id: contactId },
  });
  if (!dbContact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  const contact = dbContactToContact(dbContact);

  try {
    // Fetch real news from Google News RSS
    const realItems = await fetchCompanyNews(contact.company, contactId, 5);

    if (realItems.length > 0) {
      return NextResponse.json(realItems);
    }

    // Fallback to mock data if no results
    const mockItems = mockIntelItems.filter((i) => i.contactId === contactId);
    return NextResponse.json(mockItems);
  } catch (error) {
    console.error("News fetch error:", error);
    // Fallback to mock data on error
    const mockItems = mockIntelItems.filter((i) => i.contactId === contactId);
    return NextResponse.json(mockItems);
  }
}
