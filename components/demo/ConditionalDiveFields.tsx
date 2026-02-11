"use client";

import { Input } from "@/components/ui/input";

export function ConditionalDiveFields({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white/60">Max Depth (m)</label>
        <Input placeholder="18" />
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white/60">Dive Duration (min)</label>
        <Input placeholder="45" />
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white/60">Dive Buddy Name</label>
        <Input placeholder="Optional" />
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white/60">Diver ID / Passport</label>
        <Input placeholder="Required" />
      </div>
    </div>
  );
}
