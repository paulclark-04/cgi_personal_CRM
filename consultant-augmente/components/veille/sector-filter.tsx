"use client";

import { Button } from "@/components/ui/button";
import { SECTORS } from "@/lib/constants";

interface SectorFilterProps {
  selected: string;
  onChange: (sector: string) => void;
}

export function SectorFilter({ selected, onChange }: SectorFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {SECTORS.map((sector) => (
        <Button
          key={sector}
          variant={selected === sector ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(sector)}
          className={
            selected === sector ? "bg-rose-600 hover:bg-rose-700" : ""
          }
        >
          {sector}
        </Button>
      ))}
    </div>
  );
}
