"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Mail } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Contact } from "@/lib/types";
import {
  STATUS_LABELS,
  STATUS_COLORS,
  RELATIONSHIP_LABELS,
  RELATIONSHIP_COLORS,
} from "@/lib/constants";
import { getInitials, getScoreBarColor, formatRelativeDate } from "@/lib/utils";

interface ContactHeaderProps {
  contact: Contact;
}

export function ContactHeader({ contact }: ContactHeaderProps) {
  return (
    <div className="space-y-4">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au dashboard
      </Link>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
            <AvatarFallback className="bg-rose-100 text-rose-700 text-xl font-semibold">
              {getInitials(contact.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl font-semibold text-gray-900">
                {contact.name}
              </h1>
              <Badge
                variant="outline"
                className={RELATIONSHIP_COLORS[contact.relationshipType]}
              >
                {RELATIONSHIP_LABELS[contact.relationshipType]}
              </Badge>
              <Badge
                variant="outline"
                className={STATUS_COLORS[contact.status]}
              >
                {STATUS_LABELS[contact.status]}
              </Badge>
            </div>

            <p className="text-gray-600">
              {contact.title} — {contact.company}
            </p>
            <p className="text-sm text-gray-500 mt-1">{contact.sector}</p>

            {/* Score bar */}
            <div className="mt-3 max-w-xs">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-500">Score relationnel</span>
                <span className="font-semibold text-gray-900">
                  {contact.relationshipScore}/100
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${getScoreBarColor(contact.relationshipScore)}`}
                  style={{ width: `${contact.relationshipScore}%` }}
                />
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {contact.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-gray-100 text-gray-600"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <p className="text-sm text-gray-500 mt-3">
              Dernière interaction :{" "}
              <span className="text-gray-700">
                {formatRelativeDate(contact.lastInteractionAt)}
              </span>
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            <a
              href={contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="gap-2 w-full">
                <ExternalLink className="w-4 h-4" />
                LinkedIn
              </Button>
            </a>
            {contact.email && (
              <a href={`mailto:${contact.email}`}>
                <Button variant="outline" size="sm" className="gap-2 w-full">
                  <Mail className="w-4 h-4" />
                  Email
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
