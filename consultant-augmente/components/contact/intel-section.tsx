"use client";

import { useState } from "react";
import { RefreshCw, ExternalLink, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { IntelItem } from "@/lib/types";
import type { GeneratedEngagement } from "@/lib/types";
import { INTEL_TYPE_ICONS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

interface IntelSectionProps {
  intelItems: IntelItem[];
  engagement: GeneratedEngagement | undefined;
  company: string;
}

export function IntelSection({ intelItems, engagement, company }: IntelSectionProps) {
  const [loading, setLoading] = useState(false);
  const [showItems, setShowItems] = useState(true);

  const handleRefresh = () => {
    setLoading(true);
    setShowItems(false);
    setTimeout(() => {
      setShowItems(true);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* News section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Actualités — {company}
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Rafraîchir
          </Button>
        </div>

        {loading || !showItems ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4 border border-gray-200">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/4 mb-3" />
                <Skeleton className="h-3 w-full mb-1" />
                <Skeleton className="h-3 w-5/6" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {intelItems.map((item) => (
              <Card
                key={item.id}
                className="p-4 border border-gray-200 hover:shadow-md transition-shadow"
              >
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
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.summary}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
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
            ))}
          </div>
        )}
      </div>

      {/* AI Synthesis */}
      {engagement && (
        <Card className="p-5 border border-indigo-100 bg-indigo-50/30">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-indigo-600" />
            <h4 className="font-semibold text-gray-900">Synthèse IA</h4>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                Key Insights
              </p>
              <p className="text-sm text-gray-700">{engagement.whyThis}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                Angles de conversation
              </p>
              <ul className="space-y-1">
                {engagement.conversationAngles.map((angle, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5">&#8226;</span>
                    {angle}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
