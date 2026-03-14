"use client";

import Link from "next/link";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { Contact } from "@/lib/types";
import { STATUS_LABELS, STATUS_COLORS, RELATIONSHIP_LABELS } from "@/lib/constants";
import { getInitials, getScoreColor, formatRelativeDate } from "@/lib/utils";
import { useState } from "react";

interface ContactsTableProps {
  contacts: Contact[];
}

type SortKey = "name" | "relationshipScore" | "lastInteractionAt";

export function ContactsTable({ contacts }: ContactsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("relationshipScore");
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const sorted = [...contacts].sort((a, b) => {
    let cmp = 0;
    if (sortKey === "name") {
      cmp = a.name.localeCompare(b.name);
    } else if (sortKey === "relationshipScore") {
      cmp = a.relationshipScore - b.relationshipScore;
    } else if (sortKey === "lastInteractionAt") {
      const da = a.lastInteractionAt ? new Date(a.lastInteractionAt).getTime() : 0;
      const db = b.lastInteractionAt ? new Date(b.lastInteractionAt).getTime() : 0;
      cmp = da - db;
    }
    return sortAsc ? cmp : -cmp;
  });

  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50">
            <TableHead className="w-[250px]">
              <button
                onClick={() => handleSort("name")}
                className="flex items-center gap-1 hover:text-gray-900"
              >
                Contact <ArrowUpDown className="w-3 h-3" />
              </button>
            </TableHead>
            <TableHead>Titre</TableHead>
            <TableHead>Entreprise</TableHead>
            <TableHead>Secteur</TableHead>
            <TableHead>
              <button
                onClick={() => handleSort("relationshipScore")}
                className="flex items-center gap-1 hover:text-gray-900"
              >
                Score <ArrowUpDown className="w-3 h-3" />
              </button>
            </TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>
              <button
                onClick={() => handleSort("lastInteractionAt")}
                className="flex items-center gap-1 hover:text-gray-900"
              >
                Dernière interaction <ArrowUpDown className="w-3 h-3" />
              </button>
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((contact) => (
            <TableRow
              key={contact.id}
              className="hover:bg-gray-50/50 transition-colors"
            >
              <TableCell>
                <Link
                  href={`/contacts/${contact.id}`}
                  className="flex items-center gap-3 hover:opacity-80"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-rose-100 text-rose-700 text-xs font-medium">
                      {getInitials(contact.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm text-gray-900">
                      {contact.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {RELATIONSHIP_LABELS[contact.relationshipType]}
                    </p>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {contact.title}
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {contact.company}
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {contact.sector}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`text-xs font-medium ${getScoreColor(contact.relationshipScore)}`}
                >
                  {contact.relationshipScore}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`text-xs ${STATUS_COLORS[contact.status]}`}
                >
                  {STATUS_LABELS[contact.status]}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {formatRelativeDate(contact.lastInteractionAt)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="ghost" size="icon" className="h-8 w-8" />}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      render={<Link href={`/contacts/${contact.id}`} />}
                    >
                      Voir profil
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      render={<Link href={`/contacts/${contact.id}?tab=messages`} />}
                    >
                      Générer message
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      render={<Link href={`/contacts/${contact.id}?tab=historique`} />}
                    >
                      Logger interaction
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
