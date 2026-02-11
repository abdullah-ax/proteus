"use client";

interface ActivityToggleProps {
  value: "snorkeling" | "diving";
  onChange: (value: "snorkeling" | "diving") => void;
}

export function ActivityToggle({ value, onChange }: ActivityToggleProps) {
  return (
    <div className="relative flex h-12 w-full items-center rounded-full border border-white/20 bg-white/10 p-1">
      <div
        className={`absolute top-1 h-10 w-1/2 rounded-full bg-white/20 transition-transform ${
          value === "diving" ? "translate-x-full" : ""
        }`}
      />
      <button
        type="button"
        onClick={() => onChange("snorkeling")}
        className={`relative z-10 flex-1 text-sm font-semibold ${
          value === "snorkeling" ? "text-white" : "text-white/60"
        }`}
      >
        Snorkeling
      </button>
      <button
        type="button"
        onClick={() => onChange("diving")}
        className={`relative z-10 flex-1 text-sm font-semibold ${
          value === "diving" ? "text-white" : "text-white/60"
        }`}
      >
        Diving
      </button>
    </div>
  );
}
