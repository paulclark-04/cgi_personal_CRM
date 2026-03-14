"use client";

import { useState } from "react";
import { List, Columns3 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ContactsTable } from "@/components/dashboard/contacts-table";
import { ContactsKanban } from "@/components/dashboard/contacts-kanban";
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

type ViewMode = "list" | "kanban";

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              Vue d&apos;ensemble de votre réseau professionnel
            </p>
          </div>

          {/* View toggle */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors ${
                viewMode === "list"
                  ? "bg-rose-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <List className="w-4 h-4" />
              Liste
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors ${
                viewMode === "kanban"
                  ? "bg-rose-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Columns3 className="w-4 h-4" />
              Kanban
            </button>
          </div>
        </div>

        <StatsCards contacts={mockContacts} />

        {/* Filters & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {viewMode === "list" && statusOptions.map((opt) => (
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

        {viewMode === "list" ? (
          <ContactsTable contacts={filteredContacts} />
        ) : (
          <ContactsKanban contacts={filteredContacts} />
        )}
      </div>
    </div>
  );
}
