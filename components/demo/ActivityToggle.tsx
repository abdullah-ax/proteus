"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ActivityToggleProps {
  value: "snorkeling" | "diving";
  onChange: (value: "snorkeling" | "diving") => void;
}

export function ActivityToggle({ value, onChange }: ActivityToggleProps) {
  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant={value === "snorkeling" ? "default" : "outline"}
        className={cn("flex-1", value !== "snorkeling" && "text-white/70")}
        onClick={() => onChange("snorkeling")}
      >
        Snorkeling
      </Button>
      <Button
        type="button"
        variant={value === "diving" ? "default" : "outline"}
        className={cn("flex-1", value !== "diving" && "text-white/70")}
        onClick={() => onChange("diving")}
      >
        Diving
      </Button>
    </div>
  );
}
