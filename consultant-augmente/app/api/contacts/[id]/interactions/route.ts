import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { dbInteractionToInteraction } from "@/lib/db-helpers";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: contactId } = await params;

  const contact = await prisma.contact.findUnique({
    where: { id: contactId },
  });
  if (!contact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  try {
    const body = await request.json();

    const dbInteraction = await prisma.interaction.create({
      data: {
        contactId,
        type: body.type,
        note: body.note ?? "",
        outcome: body.outcome ?? "pending",
        timestamp: body.timestamp ? new Date(body.timestamp) : new Date(),
      },
    });

    // Update the contact's lastInteractionAt
    // If status is "to-relaunch", change it to "relaunched"
    const updateData: Record<string, unknown> = {
      lastInteractionAt: dbInteraction.timestamp,
    };
    if (contact.status === "to-relaunch") {
      updateData.status = "relaunched";
    }

    await prisma.contact.update({
      where: { id: contactId },
      data: updateData,
    });

    return NextResponse.json(dbInteractionToInteraction(dbInteraction), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating interaction:", error);
    return NextResponse.json(
      { error: "Failed to create interaction" },
      { status: 500 }
    );
  }
}
