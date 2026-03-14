"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { ContactHeader } from "@/components/contact/contact-header";
import { IntelSection } from "@/components/contact/intel-section";
import { MessageGenerator } from "@/components/contact/message-generator";
import { InteractionLog } from "@/components/contact/interaction-log";
import { LogInteractionForm } from "@/components/contact/log-interaction-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockContacts } from "@/lib/mock-data/contacts";
import { mockIntelItems } from "@/lib/mock-data/intel-items";
import { mockInteractions } from "@/lib/mock-data/interactions";
import { mockGeneratedEngagements } from "@/lib/mock-data/generated-messages";
import type { Interaction, Contact } from "@/lib/types";

export default function ContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const baseContact = mockContacts.find((c) => c.id === id);

  if (!baseContact) {
    notFound();
  }

  return <ContactPageContent contact={baseContact} />;
}

function ContactPageContent({ contact: initialContact }: { contact: Contact }) {
  const [contact, setContact] = useState(initialContact);
  const [interactions, setInteractions] = useState<Interaction[]>(
    mockInteractions.filter((i) => i.contactId === contact.id)
  );

  const intelItems = mockIntelItems.filter((i) => i.contactId === contact.id);
  const engagement = mockGeneratedEngagements.find(
    (e) => e.contactId === contact.id
  );

  const handleAddInteraction = (interaction: Interaction) => {
    setInteractions((prev) => [interaction, ...prev]);
  };

  const handleStatusChange = () => {
    if (contact.status === "to-relaunch") {
      setContact((prev) => ({
        ...prev,
        status: "relaunched",
        lastInteractionAt: new Date().toISOString(),
      }));
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-6 max-w-4xl">
        <ContactHeader contact={contact} />

        <div className="mt-6">
          <Tabs defaultValue="intelligence">
            <TabsList className="bg-gray-100/80">
              <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="historique">Historique</TabsTrigger>
            </TabsList>

            <TabsContent value="intelligence" className="mt-4">
              <IntelSection
                intelItems={intelItems}
                engagement={engagement}
                company={contact.company}
              />
            </TabsContent>

            <TabsContent value="messages" className="mt-4">
              <MessageGenerator engagement={engagement} />
            </TabsContent>

            <TabsContent value="historique" className="mt-4">
              <LogInteractionForm
                contactId={contact.id}
                onAdd={handleAddInteraction}
                onStatusChange={handleStatusChange}
              />
              <InteractionLog interactions={interactions} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
