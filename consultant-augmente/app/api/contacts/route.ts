import { NextRequest, NextResponse } from "next/server";
import { mockContacts } from "@/lib/mock-data/contacts";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const sector = searchParams.get("sector");

  let contacts = [...mockContacts];

  if (status) {
    contacts = contacts.filter((c) => c.status === status);
  }
  if (sector) {
    contacts = contacts.filter((c) => c.sector === sector);
  }

  return NextResponse.json(contacts);
}
