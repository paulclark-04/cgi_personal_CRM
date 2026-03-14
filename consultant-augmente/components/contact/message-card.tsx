"use client";

import { useState } from "react";
import { Copy, Check, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { GeneratedMessage } from "@/lib/types";
import { toast } from "sonner";

interface MessageCardProps {
  message: GeneratedMessage;
}

export function MessageCard({ message }: MessageCardProps) {
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [body, setBody] = useState(message.body);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(body);
    setCopied(true);
    toast.success("Message copié");
    setTimeout(() => setCopied(false), 1500);
  };

  const toneConfig =
    message.tone === "professional"
      ? { label: "Professionnel", color: "bg-blue-100 text-blue-700", border: "border-l-blue-500" }
      : { label: "Amical", color: "bg-green-100 text-green-700", border: "border-l-green-500" };

  return (
    <Card className={`p-4 border border-gray-200 border-l-4 ${toneConfig.border}`}>
      <div className="flex items-center justify-between mb-3">
        <Badge className={`${toneConfig.color} text-xs`}>{toneConfig.label}</Badge>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditing(!editing)}
            className="h-8 gap-1 text-xs"
          >
            <Pencil className="w-3 h-3" />
            {editing ? "Terminé" : "Modifier"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 gap-1 text-xs"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-green-600" />
                <span className="text-green-600">Copié !</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                Copier
              </>
            )}
          </Button>
        </div>
      </div>

      {editing ? (
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="min-h-[200px] text-sm font-mono"
        />
      ) : (
        <div className="whitespace-pre-line text-sm text-gray-700 leading-relaxed">
          {body}
        </div>
      )}
    </Card>
  );
}
