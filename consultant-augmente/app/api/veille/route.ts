import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { dbContactToContact } from "@/lib/db-helpers";
import { mockIntelItems } from "@/lib/mock-data/intel-items";
import { fetchMultipleCompaniesNews } from "@/lib/news-fetcher";

export async function GET(request: NextRequest) {
  const sector = request.nextUrl.searchParams.get("sector") || "Tous";

  const where = sector === "Tous" ? {} : { sector };

  const dbContacts = await prisma.contact.findMany({ where });
  const contacts = dbContacts.map(dbContactToContact);

  // Deduplicate companies to avoid fetching the same company twice
  const uniqueCompanies = new Map<string, { company: string; contactId: string }>();
  for (const contact of contacts) {
    if (!uniqueCompanies.has(contact.company)) {
      uniqueCompanies.set(contact.company, {
        company: contact.company,
        contactId: contact.id,
      });
    }
  }

  try {
    const realItems = await fetchMultipleCompaniesNews(
      Array.from(uniqueCompanies.values()),
      3
    );

    if (realItems.length > 0) {
      return NextResponse.json(realItems);
    }

    // Fallback to mock data
    const contactIds = new Set(contacts.map((c) => c.id));
    const mockItems = mockIntelItems.filter((item) => contactIds.has(item.contactId));
    return NextResponse.json(mockItems);
  } catch (error) {
    console.error("Veille fetch error:", error);
    const contactIds = new Set(contacts.map((c) => c.id));
    const mockItems = mockIntelItems.filter((item) => contactIds.has(item.contactId));
    return NextResponse.json(mockItems);
  }
}
