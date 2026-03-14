"use client";

import { useState } from "react";
import { Linkedin, Search, BarChart3, CheckCircle, UserPlus, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { RELATIONSHIP_LABELS } from "@/lib/constants";
import type { RelationshipType } from "@/lib/types";

interface CapturedProfile {
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  sector: string;
  tags: string[];
  linkedinUrl: string;
}

type Step = "input" | "extracting" | "enriching" | "done";

const stepLabels: Record<Step, string> = {
  input: "",
  extracting: "Extraction du profil...",
  enriching: "Enrichissement des données...",
  done: "",
};

export function CaptureLinkedinDialog() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [step, setStep] = useState<Step>("input");
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<CapturedProfile | null>(null);
  const [relationshipType, setRelationshipType] = useState<RelationshipType>("prospect");
  const [isAdding, setIsAdding] = useState(false);

  const resetState = () => {
    setStep("input");
    setUrl("");
    setError(null);
    setProfile(null);
    setRelationshipType("prospect");
    setIsAdding(false);
  };

  const handleCapture = async () => {
    if (!url.trim()) return;
    setError(null);

    // Step 1: Extract profile from LinkedIn URL
    setStep("extracting");
    try {
      const extractRes = await fetch("/api/linkedin/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!extractRes.ok) {
        const data = await extractRes.json().catch(() => ({}));
        throw new Error(data.error || "Échec de l'extraction du profil");
      }

      const extractData = await extractRes.json();

      // Step 2: Enrich with sector / tags
      setStep("enriching");

      const enrichRes = await fetch("/api/linkedin/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: extractData.title,
          company: extractData.company,
        }),
      });

      if (!enrichRes.ok) {
        const data = await enrichRes.json().catch(() => ({}));
        throw new Error(data.error || "Échec de l'enrichissement des données");
      }

      const enrichData = await enrichRes.json();

      setProfile({
        firstName: extractData.firstName ?? "",
        lastName: extractData.lastName ?? "",
        title: extractData.title ?? "",
        company: extractData.company ?? "",
        sector: enrichData.sector ?? "",
        tags: enrichData.tags ?? [],
        linkedinUrl: url.trim(),
      });

      setStep("done");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Une erreur est survenue";
      setError(message);
    }
  };

  const handleRetry = () => {
    setError(null);
    handleCapture();
  };

  const handleAdd = async () => {
    if (!profile) return;
    setIsAdding(true);

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: profile.firstName,
          lastName: profile.lastName,
          title: profile.title,
          company: profile.company,
          sector: profile.sector,
          linkedinUrl: profile.linkedinUrl,
          email: null,
          relationshipType,
          tags: profile.tags,
          status: "new",
          relationshipScore: 50,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Échec de l'ajout du contact");
      }

      toast.success("Contact ajouté au réseau", {
        description: `${profile.firstName} ${profile.lastName} — ${profile.company}`,
      });
      setOpen(false);
      setTimeout(resetState, 300);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Une erreur est survenue";
      toast.error("Erreur", { description: message });
    } finally {
      setIsAdding(false);
    }
  };

  const handleClose = (v: boolean) => {
    setOpen(v);
    if (!v) {
      setTimeout(resetState, 300);
    }
  };

  const isProcessing = (step === "extracting" || step === "enriching") && !error;

  const initials = profile
    ? `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase()
    : "";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger
        render={<Button size="sm" className="gap-2 bg-rose-600 hover:bg-rose-700" />}
      >
        <Linkedin className="w-4 h-4" />
        Capturer LinkedIn
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Capturer un profil LinkedIn</DialogTitle>
        </DialogHeader>

        {/* Step: Input */}
        {step === "input" && !error && (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Collez l&apos;URL du profil LinkedIn
              </label>
              <Input
                placeholder="https://linkedin.com/in/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button
              onClick={handleCapture}
              disabled={!url.trim()}
              className="w-full bg-rose-600 hover:bg-rose-700"
            >
              Capturer
            </Button>
          </div>
        )}

        {/* Processing steps */}
        {(isProcessing || error) && step !== "input" && step !== "done" && (
          <div className="py-8 space-y-4">
            <div className="space-y-3">
              {(["extracting", "enriching"] as const).map((s) => {
                const icons = {
                  extracting: Search,
                  enriching: BarChart3,
                };
                const Icon = icons[s];
                const isActive = step === s && !error;
                const isPast =
                  s === "extracting" && step === "enriching";

                return (
                  <div
                    key={s}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? "bg-rose-50 text-rose-700"
                        : isPast
                          ? "text-green-600"
                          : "text-gray-300"
                    }`}
                  >
                    {isPast ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Icon
                        className={`w-5 h-5 ${isActive ? "animate-pulse" : ""}`}
                      />
                    )}
                    <span className="text-sm font-medium">
                      {stepLabels[s]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Error state */}
            {error && (
              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setError(null);
                      setStep("input");
                    }}
                    className="flex-1"
                  >
                    Retour
                  </Button>
                  <Button
                    onClick={handleRetry}
                    className="flex-1 bg-rose-600 hover:bg-rose-700"
                  >
                    Réessayer
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step: Done — show profile + relationship picker */}
        {step === "done" && profile && (
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-rose-100 text-rose-700 font-medium">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900">
                    {profile.firstName} {profile.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {profile.title} — {profile.company}
                  </p>
                  {profile.sector && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {profile.sector}
                    </p>
                  )}
                </div>
              </div>
              {profile.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {profile.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Relationship type selector */}
            <div>
              <label
                htmlFor="relationship-type"
                className="text-sm text-gray-600 mb-1 block"
              >
                Type de relation
              </label>
              <select
                id="relationship-type"
                value={relationshipType}
                onChange={(e) => setRelationshipType(e.target.value as RelationshipType)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              >
                {(Object.entries(RELATIONSHIP_LABELS) as [RelationshipType, string][]).map(
                  ([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  )
                )}
              </select>
            </div>

            <Button
              onClick={handleAdd}
              disabled={isAdding}
              className="w-full gap-2 bg-rose-600 hover:bg-rose-700"
            >
              <UserPlus className="w-4 h-4" />
              {isAdding ? "Ajout en cours..." : "Ajouter au réseau"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
