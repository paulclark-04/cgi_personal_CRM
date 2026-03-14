"use client";

import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import type { InteractionType, InteractionOutcome, Interaction } from "@/lib/types";
import { INTERACTION_TYPE_LABELS, OUTCOME_LABELS } from "@/lib/constants";
import { toast } from "sonner";

interface LogInteractionFormProps {
  contactId: string;
  onAdd: (interaction: Interaction) => void;
  onStatusChange?: () => void;
}

export function LogInteractionForm({ contactId, onAdd, onStatusChange }: LogInteractionFormProps) {
  const [type, setType] = useState<InteractionType>("linkedin-message");
  const [note, setNote] = useState("");
  const [outcome, setOutcome] = useState<InteractionOutcome>("sent");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!note.trim() || submitting) return;

    setSubmitting(true);

    try {
      const res = await fetch(`/api/contacts/${contactId}/interactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          note: note.trim(),
          outcome,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create interaction");
      }

      const newInteraction: Interaction = await res.json();

      onAdd(newInteraction);
      onStatusChange?.();

      setSuccess(true);
      toast.success("Interaction enregistrée");

      setTimeout(() => {
        setSuccess(false);
        setNote("");
      }, 1500);
    } catch {
      toast.error("Erreur lors de l'enregistrement de l'interaction");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="p-4 border border-gray-200 mb-6">
      <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Logger une interaction
      </h4>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Type</label>
            <Select
              value={type}
              onValueChange={(v) => setType(v as InteractionType)}
            >
              <SelectTrigger className="h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(INTERACTION_TYPE_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Résultat</label>
            <Select
              value={outcome}
              onValueChange={(v) => setOutcome(v as InteractionOutcome)}
            >
              <SelectTrigger className="h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(OUTCOME_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1 block">Note</label>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Décrivez l'interaction..."
            className="text-sm min-h-[80px]"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!note.trim() || success || submitting}
          className={`w-full gap-2 ${success ? "bg-green-600" : "bg-rose-600 hover:bg-rose-700"}`}
        >
          {success ? (
            <>
              <Check className="w-4 h-4" />
              Enregistré !
            </>
          ) : submitting ? (
            "Enregistrement..."
          ) : (
            "Enregistrer"
          )}
        </Button>
      </div>
    </Card>
  );
}
