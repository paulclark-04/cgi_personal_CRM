"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { SectorFilter } from "@/components/veille/sector-filter";
import { NewsFeed } from "@/components/veille/news-feed";
import { MarketTrends } from "@/components/veille/market-trends";
import { mockIntelItems } from "@/lib/mock-data/intel-items";
import { mockContacts } from "@/lib/mock-data/contacts";
import { mockMarketTrends } from "@/lib/mock-data/market-trends";

export default function VeillePage() {
  const [sector, setSector] = useState("Tous");

  const filteredItems =
    sector === "Tous"
      ? mockIntelItems
      : mockIntelItems.filter((item) => {
          const contact = mockContacts.find((c) => c.id === item.contactId);
          return contact?.sector === sector;
        });

  const filteredTrends =
    sector === "Tous"
      ? mockMarketTrends
      : mockMarketTrends.filter((t) => t.sector === sector);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Veille Marché
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Actualités et tendances de votre réseau
          </p>
        </div>

        <SectorFilter selected={sector} onChange={setSector} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <NewsFeed items={filteredItems} contacts={mockContacts} />
          </div>
          <div>
            <MarketTrends trends={filteredTrends} />
          </div>
        </div>
      </div>
    </div>
  );
}
