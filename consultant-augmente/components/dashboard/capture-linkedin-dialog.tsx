"use client";

import { useState } from "react";
import { Linkedin, Search, BarChart3, CheckCircle, UserPlus } from "lucide-react";
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

const capturedContact = {
  name: "Antoine Lefèvre",
  title: "VP Engineering",
  company: "Mistral AI",
  sector: "Tech / IA",
  tags: ["engineering", "IA", "startup"],
};

type Step = "input" | "extracting" | "enriching" | "adding" | "done";

const stepLabels: Record<Step, string> = {
  input: "",
  extracting: "Extraction du profil...",
  enriching: "Enrichissement des données...",
  adding: "Ajout au CRM...",
  done: "",
};

export function CaptureLinkedinDialog() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [step, setStep] = useState<Step>("input");

  const handleCapture = () => {
    if (!url.trim()) return;
    setStep("extracting");
    setTimeout(() => setStep("enriching"), 1000);
    setTimeout(() => setStep("adding"), 2000);
    setTimeout(() => setStep("done"), 2500);
  };

  const handleAdd = () => {
    toast.success("Contact ajouté au réseau", {
      description: `${capturedContact.name} — ${capturedContact.company}`,
    });
    setOpen(false);
    setTimeout(() => {
      setStep("input");
      setUrl("");
    }, 300);
  };

  const handleClose = (v: boolean) => {
    setOpen(v);
    if (!v) {
      setTimeout(() => {
        setStep("input");
        setUrl("");
      }, 300);
    }
  };

  const isProcessing = step === "extracting" || step === "enriching" || step === "adding";

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

        {step === "input" && (
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

        {isProcessing && (
          <div className="py-8 space-y-4">
            <div className="space-y-3">
              {(["extracting", "enriching", "adding"] as const).map((s) => {
                const icons = {
                  extracting: Search,
                  enriching: BarChart3,
                  adding: CheckCircle,
                };
                const Icon = icons[s];
                const isActive = step === s;
                const isPast =
                  (s === "extracting" && (step === "enriching" || step === "adding")) ||
                  (s === "enriching" && step === "adding");

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
          </div>
        )}

        {step === "done" && (
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-rose-100 text-rose-700 font-medium">
                    AL
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900">
                    {capturedContact.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {capturedContact.title} — {capturedContact.company}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                {capturedContact.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <Button
              onClick={handleAdd}
              className="w-full gap-2 bg-rose-600 hover:bg-rose-700"
            >
              <UserPlus className="w-4 h-4" />
              Ajouter au réseau
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
