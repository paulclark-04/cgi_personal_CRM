"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { ContactHeader } from "@/components/contact/contact-header";
import { IntelSection } from "@/components/contact/intel-section";
import { MessageGenerator } from "@/components/contact/message-generator";
import { InteractionLog } from "@/components/contact/interaction-log";
import { LogInteractionForm } from "@/components/contact/log-interaction-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockGeneratedEngagements } from "@/lib/mock-data/generated-messages";
import type { Interaction, Contact } from "@/lib/types";

export default function ContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [contact, setContact] = useState<Contact | null>(null);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    fetch(`/api/contacts/${id}`)
      .then((res) => {
        if (!res.ok) {
          setNotFoundState(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setContact(data.contact);
          setInteractions(data.interactions ?? []);
        }
      })
      .catch(() => setNotFoundState(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (notFoundState) {
    notFound();
  }

  if (loading || !contact) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="p-6 max-w-4xl space-y-4">
          <div className="h-24 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  return <ContactPageContent contact={contact} setContact={setContact} interactions={interactions} setInteractions={setInteractions} />;
}

function ContactPageContent({
  contact,
  setContact,
  interactions,
  setInteractions,
}: {
  contact: Contact;
  setContact: React.Dispatch<React.SetStateAction<Contact | null>>;
  interactions: Interaction[];
  setInteractions: React.Dispatch<React.SetStateAction<Interaction[]>>;
}) {
  const engagement = mockGeneratedEngagements.find(
    (e) => e.contactId === contact.id
  );

  const handleAddInteraction = (interaction: Interaction) => {
    setInteractions((prev) => [interaction, ...prev]);
  };

  const handleStatusChange = async () => {
    if (contact.status === "to-relaunch") {
      const newStatus = "relaunched";
      const newLastInteraction = new Date().toISOString();

      // Optimistic update
      setContact((prev) =>
        prev
          ? { ...prev, status: newStatus, lastInteractionAt: newLastInteraction }
          : prev
      );

      try {
        await fetch(`/api/contacts/${contact.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus, lastInteractionAt: newLastInteraction }),
        });
      } catch {
        // Revert on error
        setContact((prev) =>
          prev
            ? { ...prev, status: "to-relaunch", lastInteractionAt: contact.lastInteractionAt }
            : prev
        );
      }
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
                contactId={contact.id}
                engagement={engagement}
                company={contact.company}
              />
            </TabsContent>

            <TabsContent value="messages" className="mt-4">
              <MessageGenerator contactId={contact.id} hasIntel={true} />
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
