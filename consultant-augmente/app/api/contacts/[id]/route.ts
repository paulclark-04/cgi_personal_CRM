import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  dbContactToContact,
  dbInteractionToInteraction,
} from "@/lib/db-helpers";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const dbContact = await prisma.contact.findUnique({
    where: { id },
    include: { interactions: { orderBy: { timestamp: "desc" } } },
  });

  if (!dbContact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  const contact = dbContactToContact(dbContact);
  const interactions = dbContact.interactions.map(dbInteractionToInteraction);

  return NextResponse.json({ contact, intelItems: [], interactions });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const existing = await prisma.contact.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  try {
    const body = await request.json();

    // Build update data, handling tags specially
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: Record<string, any> = {};
    const allowedFields = [
      "firstName",
      "lastName",
      "title",
      "company",
      "sector",
      "linkedinUrl",
      "email",
      "avatarUrl",
      "relationshipType",
      "status",
      "relationshipScore",
    ];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        data[field] = body[field];
      }
    }

    if (body.tags !== undefined) {
      data.tags = JSON.stringify(body.tags);
    }

    // Update name if firstName or lastName changed
    if (body.firstName !== undefined || body.lastName !== undefined) {
      const firstName = body.firstName ?? existing.firstName;
      const lastName = body.lastName ?? existing.lastName;
      data.name = `${firstName} ${lastName}`;
    }

    const dbContact = await prisma.contact.update({
      where: { id },
      data,
    });

    return NextResponse.json(dbContactToContact(dbContact));
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { error: "Failed to update contact" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const existing = await prisma.contact.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  await prisma.contact.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
