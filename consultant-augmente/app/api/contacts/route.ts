import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { dbContactToContact } from "@/lib/db-helpers";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const sector = searchParams.get("sector");

  const where: Record<string, string> = {};
  if (status) where.status = status;
  if (sector) where.sector = sector;

  const dbContacts = await prisma.contact.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const contacts = dbContacts.map(dbContactToContact);

  return NextResponse.json(contacts);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const dbContact = await prisma.contact.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        name: `${body.firstName} ${body.lastName}`,
        title: body.title,
        company: body.company,
        sector: body.sector,
        linkedinUrl: body.linkedinUrl ?? "",
        email: body.email ?? null,
        avatarUrl: body.avatarUrl ?? null,
        relationshipType: body.relationshipType ?? "prospect",
        tags: JSON.stringify(body.tags ?? []),
        status: body.status ?? "new",
        relationshipScore: body.relationshipScore ?? 50,
      },
    });

    return NextResponse.json(dbContactToContact(dbContact), { status: 201 });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { error: "Failed to create contact" },
      { status: 500 }
    );
  }
}
