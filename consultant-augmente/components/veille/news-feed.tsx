"use client";

import { NewsCard } from "./news-card";
import type { IntelItem, Contact } from "@/lib/types";

interface NewsFeedProps {
  items: IntelItem[];
  contacts: Contact[];
}

export function NewsFeed({ items, contacts }: NewsFeedProps) {
  const sorted = [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">Flux d&apos;actualités</h3>
      {sorted.map((item) => (
        <NewsCard
          key={item.id}
          item={item}
          contact={contacts.find((c) => c.id === item.contactId)}
        />
      ))}
    </div>
  );
}
