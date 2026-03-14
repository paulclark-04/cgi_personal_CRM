"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { SectorFilter } from "@/components/veille/sector-filter";
import { NewsFeed } from "@/components/veille/news-feed";
import { MarketTrends } from "@/components/veille/market-trends";
import { VeilleCharts } from "@/components/veille/veille-charts";
import { mockMarketTrends } from "@/lib/mock-data/market-trends";
import type { Contact, IntelItem } from "@/lib/types";

export default function VeillePage() {
  const [sector, setSector] = useState("Tous");
  const [newsItems, setNewsItems] = useState<IntelItem[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [contactsLoading, setContactsLoading] = useState(true);

  // Fetch contacts once
  useEffect(() => {
    fetch("/api/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .finally(() => setContactsLoading(false));
  }, []);

  // Fetch news items when sector changes
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/veille?sector=${encodeURIComponent(sector)}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setNewsItems(data);
        } else {
          setNewsItems([]);
        }
      } catch {
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [sector]);

  const filteredTrends =
    sector === "Tous"
      ? mockMarketTrends
      : mockMarketTrends.filter((t) => t.sector === sector);

  const isLoading = loading || contactsLoading;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Veille Marché
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Actualités et tendances de votre réseau — données en temps réel
          </p>
        </div>

        <SectorFilter selected={sector} onChange={setSector} />

        {contactsLoading ? (
          <div className="h-48 bg-gray-100 rounded-xl animate-pulse" />
        ) : (
          <VeilleCharts items={newsItems} contacts={contacts} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-28 bg-gray-100 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : (
              <NewsFeed items={newsItems} contacts={contacts} />
            )}
          </div>
          <div>
            <MarketTrends trends={filteredTrends} />
          </div>
        </div>
      </div>
    </div>
  );
}
