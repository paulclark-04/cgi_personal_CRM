"use client";

import { Badge } from "@/components/ui/badge";
import type { Interaction } from "@/lib/types";
import {
  INTERACTION_TYPE_ICONS,
  INTERACTION_TYPE_LABELS,
  OUTCOME_LABELS,
  OUTCOME_COLORS,
} from "@/lib/constants";
import { formatDate } from "@/lib/utils";

interface InteractionLogProps {
  interactions: Interaction[];
}

export function InteractionLog({ interactions }: InteractionLogProps) {
  const sorted = [...interactions].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  if (sorted.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center py-8">
        Aucune interaction enregistrée pour ce contact.
      </p>
    );
  }

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />

      <div className="space-y-4">
        {sorted.map((interaction) => (
          <div key={interaction.id} className="flex items-start gap-4 relative">
            {/* Circle */}
            <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center z-10 shrink-0 text-sm">
              {INTERACTION_TYPE_ICONS[interaction.type]}
            </div>

            {/* Content */}
            <div className="flex-1 bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">
                  {INTERACTION_TYPE_LABELS[interaction.type]}
                </span>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${OUTCOME_COLORS[interaction.outcome]}`}
                  >
                    {OUTCOME_LABELS[interaction.outcome]}
                  </Badge>
                  <span className="text-xs text-gray-400">
                    {formatDate(interaction.timestamp)}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{interaction.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
