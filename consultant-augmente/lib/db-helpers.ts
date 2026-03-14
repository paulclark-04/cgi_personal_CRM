import type { Contact, Interaction } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dbContactToContact(dbContact: any): Contact {
  return {
    id: dbContact.id,
    firstName: dbContact.firstName,
    lastName: dbContact.lastName,
    name: dbContact.name,
    title: dbContact.title,
    company: dbContact.company,
    sector: dbContact.sector,
    linkedinUrl: dbContact.linkedinUrl,
    email: dbContact.email ?? undefined,
    avatarUrl: dbContact.avatarUrl ?? undefined,
    relationshipType: dbContact.relationshipType,
    tags: JSON.parse(dbContact.tags),
    status: dbContact.status,
    relationshipScore: dbContact.relationshipScore,
    lastInteractionAt: dbContact.lastInteractionAt
      ? dbContact.lastInteractionAt.toISOString()
      : null,
    createdAt: dbContact.createdAt.toISOString(),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dbInteractionToInteraction(dbInteraction: any): Interaction {
  return {
    id: dbInteraction.id,
    contactId: dbInteraction.contactId,
    type: dbInteraction.type,
    note: dbInteraction.note,
    outcome: dbInteraction.outcome,
    timestamp: dbInteraction.timestamp.toISOString(),
  };
}
