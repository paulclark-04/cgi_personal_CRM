import { NextRequest, NextResponse } from "next/server";
import { mockIntelItems } from "@/lib/mock-data/intel-items";

export async function POST(request: NextRequest) {
  const { contactId } = await request.json();

  // Simulate network latency
  await new Promise((r) => setTimeout(r, 2000));

  const items = mockIntelItems.filter((i) => i.contactId === contactId);
  return NextResponse.json(items);
}
