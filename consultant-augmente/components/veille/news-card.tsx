"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { IntelItem, Contact } from "@/lib/types";
import { INTEL_TYPE_ICONS } from "@/lib/constants";
import { formatDate, getInitials } from "@/lib/utils";

interface NewsCardProps {
  item: IntelItem;
  contact: Contact | undefined;
}

export function NewsCard({ item, contact }: NewsCardProps) {
  return (
    <Card className="p-4 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span>{INTEL_TYPE_ICONS[item.type]}</span>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sm text-gray-900 hover:text-rose-600 line-clamp-1"
            >
              {item.title}
              <ExternalLink className="w-3 h-3 inline ml-1 opacity-50" />
            </a>
          </div>
          <p className="text-xs text-gray-500 mb-2">
            {item.source} — {formatDate(item.date)}
          </p>
          <p className="text-sm text-gray-600 line-clamp-2">{item.summary}</p>

          <div className="flex items-center gap-2 mt-3">
            {item.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-[10px] bg-gray-100"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {contact && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-400">Contact lié :</span>
              <Link
                href={`/contacts/${contact.id}`}
                className="flex items-center gap-1.5 hover:opacity-80"
              >
                <Avatar className="w-5 h-5">
                  <AvatarFallback className="bg-rose-100 text-rose-700 text-[8px]">
                    {getInitials(contact.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-700 font-medium">
                  {contact.name}
                </span>
              </Link>
            </div>
          )}
        </div>

        <Badge
          variant="outline"
          className={`text-[10px] shrink-0 ${
            item.score >= 0.9
              ? "bg-green-50 text-green-700 border-green-200"
              : item.score >= 0.8
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-gray-50 text-gray-600"
          }`}
        >
          {Math.round(item.score * 100)}%
        </Badge>
      </div>
    </Card>
  );
}
