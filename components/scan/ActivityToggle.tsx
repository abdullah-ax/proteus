"use client";

import { cn } from "@/lib/utils";

interface ActivityToggleProps {
  value: "snorkeling" | "diving";
  onChange: (value: "snorkeling" | "diving") => void;
}

export function ActivityToggle({ value, onChange }: ActivityToggleProps) {
  return (
    <div className="relative flex h-12 w-full items-center rounded-full border border-white/20 bg-white/10 p-1">
      <div
        className={cn(
          "absolute top-1 h-10 w-1/2 rounded-full bg-white/20 transition-transform",
          value === "diving" && "translate-x-full"
        )}
      />
      <button
        className={cn(
          "relative z-10 flex-1 text-sm font-semibold",
          value === "snorkeling" ? "text-white" : "text-white/60"
        )}
        onClick={() => onChange("snorkeling")}
        type="button"
      >
        Snorkeling
      </button>
      <button
        className={cn(
          "relative z-10 flex-1 text-sm font-semibold",
          value === "diving" ? "text-white" : "text-white/60"
        )}
        onClick={() => onChange("diving")}
        type="button"
      >
        Diving
      </button>
    </div>
  );
}
