"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageCard } from "./message-card";
import { NbaCard } from "./nba-card";
import type { GeneratedEngagement } from "@/lib/types";

interface MessageGeneratorProps {
  engagement: GeneratedEngagement | undefined;
}

export function MessageGenerator({ engagement }: MessageGeneratorProps) {
  const [phase, setPhase] = useState<"idle" | "loading" | "analyzing" | "generating" | "done">("idle");
  const [showMessages, setShowMessages] = useState(false);

  const handleGenerate = () => {
    setPhase("loading");
    setShowMessages(false);
    setTimeout(() => setPhase("analyzing"), 1000);
    setTimeout(() => setPhase("generating"), 2500);
    setTimeout(() => {
      setPhase("done");
      setShowMessages(true);
    }, 3500);
  };

  if (!engagement) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-sm">
          Pas de données suffisantes pour générer des messages pour ce contact.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!showMessages && (
        <div className="text-center py-8">
          <Button
            onClick={handleGenerate}
            disabled={phase !== "idle" && phase !== "done"}
            size="lg"
            className="gap-2 bg-rose-600 hover:bg-rose-700 text-base px-8"
          >
            <Sparkles className="w-5 h-5" />
            Générer des messages
          </Button>

          {phase !== "idle" && phase !== "done" && (
            <div className="mt-6 space-y-4">
              <p className="text-sm text-gray-500 animate-pulse">
                {phase === "loading" && "Chargement..."}
                {phase === "analyzing" && "Analyse des actualités en cours..."}
                {phase === "generating" && "Génération des messages..."}
              </p>
              <div className="max-w-xl mx-auto space-y-4">
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-20 w-full rounded-xl" />
              </div>
            </div>
          )}
        </div>
      )}

      {showMessages && (
        <div className="space-y-4 animate-in fade-in duration-500">
          {engagement.messages.map((msg, i) => (
            <div
              key={i}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${i * 200}ms` }}
            >
              <MessageCard message={msg} />
            </div>
          ))}

          <div
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: "400ms" }}
          >
            <NbaCard
              nba={engagement.nba}
              whyThis={engagement.whyThis}
              sources={engagement.sources}
            />
          </div>
        </div>
      )}
    </div>
  );
}
