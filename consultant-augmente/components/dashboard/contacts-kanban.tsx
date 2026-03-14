"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Contact, ContactStatus } from "@/lib/types";
import {
  STATUS_LABELS,
  STATUS_COLORS,
  RELATIONSHIP_LABELS,
} from "@/lib/constants";
import { getInitials, getScoreColor, formatRelativeDate } from "@/lib/utils";
import { toast } from "sonner";

interface ContactsKanbanProps {
  contacts: Contact[];
}

const COLUMNS: { status: ContactStatus; color: string; bg: string }[] = [
  { status: "to-relaunch", color: "border-red-400", bg: "bg-red-50/50" },
  { status: "relaunched", color: "border-amber-400", bg: "bg-amber-50/50" },
  { status: "up-to-date", color: "border-green-400", bg: "bg-green-50/50" },
  { status: "new", color: "border-blue-400", bg: "bg-blue-50/50" },
];

export function ContactsKanban({ contacts }: ContactsKanbanProps) {
  // Track status overrides from drag & drop (contactId -> new status)
  const [statusOverrides, setStatusOverrides] = useState<Record<string, ContactStatus>>({});
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<ContactStatus | null>(null);

  // Apply overrides to contacts from props
  const resolvedContacts = useMemo(
    () =>
      contacts.map((c) =>
        statusOverrides[c.id] ? { ...c, status: statusOverrides[c.id] } : c
      ),
    [contacts, statusOverrides]
  );

  const handleDragStart = (e: React.DragEvent, contactId: string) => {
    setDraggedId(contactId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", contactId);
  };

  const handleDragOver = (e: React.DragEvent, status: ContactStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverColumn(status);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, newStatus: ContactStatus) => {
    e.preventDefault();
    const contactId = e.dataTransfer.getData("text/plain");
    const contact = resolvedContacts.find((c) => c.id === contactId);

    if (contact && contact.status !== newStatus) {
      setStatusOverrides((prev) => ({ ...prev, [contactId]: newStatus }));
      toast.success(`${contact.name} déplacé vers "${STATUS_LABELS[newStatus]}"`);
    }

    setDraggedId(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverColumn(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {COLUMNS.map((col) => {
        const columnContacts = resolvedContacts.filter((c) => c.status === col.status);
        const isOver = dragOverColumn === col.status;

        return (
          <div
            key={col.status}
            onDragOver={(e) => handleDragOver(e, col.status)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, col.status)}
            className={`rounded-xl border-2 border-dashed transition-all min-h-[300px] ${
              isOver
                ? `${col.color} ${col.bg} scale-[1.01]`
                : "border-gray-200 bg-gray-50/30"
            }`}
          >
            {/* Column header */}
            <div className={`px-3 py-2.5 border-b ${isOver ? col.color : "border-gray-200"}`}>
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className={`text-xs font-medium ${STATUS_COLORS[col.status]}`}
                >
                  {STATUS_LABELS[col.status]}
                </Badge>
                <span className="text-xs text-gray-400 font-medium">
                  {columnContacts.length}
                </span>
              </div>
            </div>

            {/* Cards */}
            <div className="p-2 space-y-2">
              {columnContacts.map((contact) => (
                <Card
                  key={contact.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, contact.id)}
                  onDragEnd={handleDragEnd}
                  className={`p-3 border border-gray-200 cursor-grab active:cursor-grabbing hover:shadow-md transition-all ${
                    draggedId === contact.id ? "opacity-40 scale-95" : ""
                  }`}
                >
                  <Link
                    href={`/contacts/${contact.id}`}
                    className="block"
                    draggable={false}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <Avatar className="w-8 h-8 shrink-0">
                        <AvatarFallback className="bg-rose-100 text-rose-700 text-[10px] font-medium">
                          {getInitials(contact.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {contact.name}
                        </p>
                        <p className="text-[11px] text-gray-500 truncate">
                          {contact.title}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 mb-2 truncate">
                      {contact.company}
                    </p>

                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${getScoreColor(contact.relationshipScore)}`}
                      >
                        {contact.relationshipScore}/100
                      </Badge>
                      <span className="text-[10px] text-gray-400">
                        {formatRelativeDate(contact.lastInteractionAt)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 mt-2">
                      <Badge
                        variant="secondary"
                        className="text-[9px] bg-gray-100 text-gray-500"
                      >
                        {RELATIONSHIP_LABELS[contact.relationshipType]}
                      </Badge>
                    </div>
                  </Link>
                </Card>
              ))}

              {columnContacts.length === 0 && (
                <div className="text-center py-8 text-xs text-gray-400">
                  Aucun contact
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
