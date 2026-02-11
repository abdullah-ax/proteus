"use client";

import { DIVE_SITES } from "@/lib/mockData";

interface DiveSiteSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function DiveSiteSelector({ value, onChange }: DiveSiteSelectorProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white"
    >
      <option value="" className="text-slate-900">
        Select dive site
      </option>
      {DIVE_SITES.map((site) => (
        <option key={site} value={site} className="text-slate-900">
          {site}
        </option>
      ))}
    </select>
  );
}
