import { NextRequest, NextResponse } from "next/server";
import { mockGeneratedEngagements } from "@/lib/mock-data/generated-messages";

export async function POST(request: NextRequest) {
  const { contactId } = await request.json();

  // Simulate AI generation latency
  await new Promise((r) => setTimeout(r, 3500));

  const engagement = mockGeneratedEngagements.find(
    (e) => e.contactId === contactId
  );

  if (!engagement) {
    return NextResponse.json(
      { error: "No engagement data available" },
      { status: 404 }
    );
  }

  return NextResponse.json(engagement);
}
