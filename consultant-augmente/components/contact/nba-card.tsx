"use client";

import { useState } from "react";
import { Zap, Check, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface NbaCardProps {
  nba: string;
  whyThis: string;
  sources: string[];
}

export function NbaCard({ nba, whyThis, sources }: NbaCardProps) {
  const [done, setDone] = useState(false);

  const handleDone = () => {
    setDone(true);
    toast.success("Action marquée comme faite");
  };

  return (
    <div className="space-y-3">
      <Card className="p-4 border border-amber-200 bg-amber-50/50">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-xs font-medium text-amber-600 uppercase mb-1">
              Next Best Action
            </p>
            <p className="text-sm font-medium text-gray-900">{nba}</p>
          </div>
          <Button
            variant={done ? "secondary" : "outline"}
            size="sm"
            onClick={handleDone}
            disabled={done}
            className="shrink-0 gap-1"
          >
            <Check className="w-3 h-3" />
            {done ? "Fait" : "Marquer comme fait"}
          </Button>
        </div>
      </Card>

      <Card className="p-4 border border-gray-200 bg-gray-50/50">
        <p className="text-xs font-medium text-gray-500 uppercase mb-1">
          Pourquoi maintenant ?
        </p>
        <p className="text-sm text-gray-700 mb-3">{whyThis}</p>

        <p className="text-xs font-medium text-gray-500 uppercase mb-1">
          Sources
        </p>
        <ul className="space-y-1">
          {sources.map((src, i) => (
            <li key={i}>
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline flex items-center gap-1"
              >
                {src.length > 50 ? src.slice(0, 50) + "..." : src}
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
