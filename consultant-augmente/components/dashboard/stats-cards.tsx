"use client";

import { Users, AlertCircle, TrendingUp, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Contact } from "@/lib/types";

interface StatsCardsProps {
  contacts: Contact[];
}

export function StatsCards({ contacts }: StatsCardsProps) {
  const toRelaunch = contacts.filter((c) => c.status === "to-relaunch").length;
  const avgScore = Math.round(
    contacts.reduce((sum, c) => sum + c.relationshipScore, 0) / contacts.length
  );
  const recentInteractions = contacts.filter((c) => {
    if (!c.lastInteractionAt) return false;
    const diff = Date.now() - new Date(c.lastInteractionAt).getTime();
    return diff < 30 * 24 * 60 * 60 * 1000;
  }).length;

  const stats = [
    {
      label: "Total Contacts",
      value: contacts.length.toString(),
      icon: Users,
      bg: "bg-gray-50",
      iconColor: "text-gray-600",
    },
    {
      label: "À Relancer",
      value: toRelaunch.toString(),
      icon: AlertCircle,
      bg: "bg-rose-50",
      iconColor: "text-rose-600",
    },
    {
      label: "Score Moyen",
      value: `${avgScore}/100`,
      icon: TrendingUp,
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Interactions ce mois",
      value: recentInteractions.toString(),
      icon: MessageCircle,
      bg: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}
            >
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
