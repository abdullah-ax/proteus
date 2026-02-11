"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { OceanButton } from "@/components/ui/OceanButton";
import { STEWARDSHIP_PLEDGES } from "@/lib/mockData";

const STORAGE_KEY = "proteus_promise_v1";

export function PromiseModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) setOpen(true);
  }, []);

  const handleAgree = () => {
    localStorage.setItem(STORAGE_KEY, "agreed");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <GlassCard className="w-full max-w-2xl p-6">
        <h2 className="text-2xl font-semibold text-white">Promise of Stewardship</h2>
        <p className="mt-2 text-sm text-white/70">
          Proteus explorers commit to protecting the Red Sea with every dive.
        </p>
        <ul className="mt-5 space-y-3 text-sm text-white/80">
          {STEWARDSHIP_PLEDGES.map((pledge) => (
            <li key={pledge} className="rounded-xl border border-white/10 bg-white/5 p-3">
              {pledge}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-end">
          <OceanButton onClick={handleAgree}>Agree</OceanButton>
        </div>
      </GlassCard>
    </div>
  );
}
