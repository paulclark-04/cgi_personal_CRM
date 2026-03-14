import { PrismaClient } from "@prisma/client";
import { mockContacts } from "../lib/mock-data/contacts";
import { mockInteractions } from "../lib/mock-data/interactions";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.interaction.deleteMany();
  await prisma.contact.deleteMany();

  // Insert contacts
  for (const c of mockContacts) {
    await prisma.contact.create({
      data: {
        id: c.id,
        firstName: c.firstName,
        lastName: c.lastName,
        name: c.name,
        title: c.title,
        company: c.company,
        sector: c.sector,
        linkedinUrl: c.linkedinUrl,
        email: c.email ?? null,
        avatarUrl: c.avatarUrl ?? null,
        relationshipType: c.relationshipType,
        tags: JSON.stringify(c.tags),
        status: c.status,
        relationshipScore: c.relationshipScore,
        lastInteractionAt: c.lastInteractionAt
          ? new Date(c.lastInteractionAt)
          : null,
        createdAt: new Date(c.createdAt),
      },
    });
  }
  console.log(`Inserted ${mockContacts.length} contacts`);

  // Insert interactions
  for (const i of mockInteractions) {
    await prisma.interaction.create({
      data: {
        id: i.id,
        contactId: i.contactId,
        type: i.type,
        note: i.note,
        outcome: i.outcome,
        timestamp: new Date(i.timestamp),
      },
    });
  }
  console.log(`Inserted ${mockInteractions.length} interactions`);

  console.log("Seeding complete!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
