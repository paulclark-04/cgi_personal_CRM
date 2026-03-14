"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { MarketTrend } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface MarketTrendsProps {
  trends: MarketTrend[];
}

const impactConfig = {
  high: { label: "Impact élevé", color: "bg-red-100 text-red-700 border-red-200" },
  medium: { label: "Impact moyen", color: "bg-amber-100 text-amber-700 border-amber-200" },
  low: { label: "Impact faible", color: "bg-green-100 text-green-700 border-green-200" },
};

export function MarketTrends({ trends }: MarketTrendsProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">
        Tendances Marché
      </h3>
      {trends.map((trend) => (
        <Card
          key={trend.id}
          className="p-4 border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
              {trend.title}
            </h4>
            <Badge
              variant="outline"
              className={`text-[10px] shrink-0 ${impactConfig[trend.impactLevel].color}`}
            >
              {impactConfig[trend.impactLevel].label}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 line-clamp-3 mb-2">
            {trend.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {trend.relatedCompanies.map((company) => (
              <Badge
                key={company}
                variant="secondary"
                className="text-[10px] bg-gray-100"
              >
                {company}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-gray-400">{formatDate(trend.date)}</p>
        </Card>
      ))}
    </div>
  );
}
