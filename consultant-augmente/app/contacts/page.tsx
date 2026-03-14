"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { ContactsTable } from "@/components/dashboard/contacts-table";
import { ImportCsvDialog } from "@/components/dashboard/import-csv-dialog";
import { CaptureLinkedinDialog } from "@/components/dashboard/capture-linkedin-dialog";
import { mockContacts } from "@/lib/mock-data/contacts";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUS_LABELS, SECTORS } from "@/lib/constants";
import type { ContactStatus } from "@/lib/types";

export default function ContactsPage() {
  const [statusFilter, setStatusFilter] = useState<ContactStatus | "all">("all");
  const [sectorFilter, setSectorFilter] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = mockContacts.filter((c) => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    if (sectorFilter !== "Tous" && c.sector !== sectorFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const statusOptions: { value: ContactStatus | "all"; label: string }[] = [
    { value: "all", label: "Tous" },
    ...Object.entries(STATUS_LABELS).map(([value, label]) => ({
      value: value as ContactStatus,
      label,
    })),
  ];

  return (
    <div className="min-h-screen">
      <Header onSearch={setSearchQuery} />
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Contacts</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gérez votre réseau professionnel
          </p>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {statusOptions.map((opt) => (
              <Button
                key={opt.value}
                variant={statusFilter === opt.value ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(opt.value)}
                className={
                  statusFilter === opt.value
                    ? "bg-rose-600 hover:bg-rose-700"
                    : ""
                }
              >
                {opt.label}
              </Button>
            ))}

            <Select value={sectorFilter} onValueChange={(v) => { if (v) setSectorFilter(v); }}>
              <SelectTrigger className="w-[180px] h-9 text-sm">
                <SelectValue placeholder="Secteur" />
              </SelectTrigger>
              <SelectContent>
                {SECTORS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <ImportCsvDialog />
            <CaptureLinkedinDialog />
          </div>
        </div>

        <ContactsTable contacts={filteredContacts} />
      </div>
    </div>
  );
}
