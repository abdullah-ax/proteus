"use client";

import { DIVE_SITES } from "@/lib/mockData";

interface DiveSiteSelectorProps {
  value: string;
  onChange: (v: string) => void;
}

export function DiveSiteSelector({ value, onChange }: DiveSiteSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-11 px-3.5 rounded-xl bg-white/[0.06] border border-white/12 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:border-ocean-surface/50"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.6)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 14px center",
      }}
    >
      {DIVE_SITES.map((site) => (
        <option key={site} value={site} className="bg-ocean-deep text-white">
          {site}
        </option>
      ))}
    </select>
  );
}
