"use client";

import { useState } from "react";
import { Sparkles, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { MessageCard } from "./message-card";
import { NbaCard } from "./nba-card";
import type { GeneratedEngagement } from "@/lib/types";

interface MessageGeneratorProps {
  contactId: string;
  hasIntel: boolean;
}

export function MessageGenerator({ contactId, hasIntel }: MessageGeneratorProps) {
  const [phase, setPhase] = useState<"idle" | "loading" | "analyzing" | "generating" | "done" | "error">("idle");
  const [engagement, setEngagement] = useState<GeneratedEngagement | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleGenerate = async () => {
    setPhase("loading");
    setEngagement(null);
    setErrorMsg("");

    // Show phase transitions while waiting for the API
    const t1 = setTimeout(() => setPhase("analyzing"), 800);
    const t2 = setTimeout(() => setPhase("generating"), 2000);

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId }),
      });

      clearTimeout(t1);
      clearTimeout(t2);

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setEngagement(data);
      setPhase("done");
    } catch (err) {
      clearTimeout(t1);
      clearTimeout(t2);
      console.error("Generation error:", err);
      setErrorMsg(err instanceof Error ? err.message : "Erreur lors de la génération");
      setPhase("error");
    }
  };

  if (!hasIntel) {
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
      {phase !== "done" && (
        <div className="text-center py-8">
          <Button
            onClick={handleGenerate}
            disabled={phase !== "idle" && phase !== "error"}
            size="lg"
            className="gap-2 bg-rose-600 hover:bg-rose-700 text-base px-8"
          >
            <Sparkles className="w-5 h-5" />
            Générer des messages
          </Button>

          <div className="flex items-center justify-center gap-1.5 mt-3">
            <Bot className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-400">
              Propulsé par IA — GPT OSS 120B via OpenRouter
            </span>
          </div>

          {(phase === "loading" || phase === "analyzing" || phase === "generating") && (
            <div className="mt-6 space-y-4">
              <p className="text-sm text-gray-500 animate-pulse">
                {phase === "loading" && "Connexion à l'IA..."}
                {phase === "analyzing" && "Analyse des actualités en cours..."}
                {phase === "generating" && "Génération des messages personnalisés..."}
              </p>
              <div className="max-w-xl mx-auto space-y-4">
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-20 w-full rounded-xl" />
              </div>
            </div>
          )}

          {phase === "error" && (
            <div className="mt-6 max-w-md mx-auto">
              <p className="text-sm text-red-600 bg-red-50 rounded-lg p-3">
                {errorMsg}
              </p>
              <Button
                onClick={handleGenerate}
                variant="outline"
                size="sm"
                className="mt-3"
              >
                Réessayer
              </Button>
            </div>
          )}
        </div>
      )}

      {phase === "done" && engagement && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="gap-1 text-xs">
              <Bot className="w-3 h-3" />
              Généré par IA
            </Badge>
            <Button
              onClick={handleGenerate}
              variant="outline"
              size="sm"
              className="gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Regénérer
            </Button>
          </div>

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
