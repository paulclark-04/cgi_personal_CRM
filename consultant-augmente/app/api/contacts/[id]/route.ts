import { NextResponse } from "next/server";
import { mockContacts } from "@/lib/mock-data/contacts";
import { mockIntelItems } from "@/lib/mock-data/intel-items";
import { mockInteractions } from "@/lib/mock-data/interactions";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const contact = mockContacts.find((c) => c.id === id);

  if (!contact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  const intelItems = mockIntelItems.filter((i) => i.contactId === id);
  const interactions = mockInteractions.filter((i) => i.contactId === id);

  return NextResponse.json({ contact, intelItems, interactions });
}
