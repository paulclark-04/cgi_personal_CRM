"use client";

import { useState } from "react";
import { Upload, CheckCircle, FileSpreadsheet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Contact } from "@/lib/types";

interface ImportCsvDialogProps {
  contacts?: Contact[];
}

export function ImportCsvDialog({ contacts = [] }: ImportCsvDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"upload" | "progress" | "done">("upload");
  const [progress, setProgress] = useState(0);

  const handleImport = () => {
    setStep("progress");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep("done");
          return 100;
        }
        return prev + 5;
      });
    }, 50);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep("upload");
      setProgress(0);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant="outline" size="sm" className="gap-2" />}
      >
        <Upload className="w-4 h-4" />
        Importer CSV
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Importer des contacts</DialogTitle>
        </DialogHeader>

        {step === "upload" && (
          <div className="space-y-4">
            <div
              onClick={handleImport}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-rose-400 hover:bg-rose-50/30 transition-colors"
            >
              <FileSpreadsheet className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-700">
                Glissez votre fichier CSV ici
              </p>
              <p className="text-xs text-gray-500 mt-1">
                ou cliquez pour parcourir
              </p>
            </div>
          </div>
        )}

        {step === "progress" && (
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600 text-center">
              Analyse du fichier en cours...
            </p>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-gray-500 text-center">
              {Math.min(Math.floor(progress / 8), 12)} contacts détectés
            </p>
          </div>
        )}

        {step === "done" && (
          <div className="space-y-4 py-4">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-lg font-semibold text-gray-900">
                12 contacts importés avec succès
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Les contacts ont été ajoutés à votre réseau
              </p>
            </div>

            <div className="border rounded-lg max-h-48 overflow-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-3 py-2 text-xs text-gray-500 font-medium">
                      Nom
                    </th>
                    <th className="px-3 py-2 text-xs text-gray-500 font-medium">
                      Entreprise
                    </th>
                    <th className="px-3 py-2 text-xs text-gray-500 font-medium">
                      Titre
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.slice(0, 6).map((c) => (
                    <tr key={c.id} className="border-t">
                      <td className="px-3 py-2 text-gray-900">{c.name}</td>
                      <td className="px-3 py-2 text-gray-600">{c.company}</td>
                      <td className="px-3 py-2 text-gray-600">{c.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Button className="w-full" onClick={handleClose}>
              Confirmer l&apos;import
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
