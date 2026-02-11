"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { OceanButton } from "@/components/ui/OceanButton";
import { PLEDGES } from "@/lib/mockData";

const STORAGE_KEY = "proteus_stewardship_v1";

export function StewardshipModal() {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<boolean[]>(() => PLEDGES.map(() => false));

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (!stored) {
      setOpen(true);
    }
  }, []);

  const allChecked = checked.every(Boolean);

  const handleConfirm = () => {
    if (!allChecked) return;
    localStorage.setItem(STORAGE_KEY, "accepted");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <GlassCard className="w-full max-w-2xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Stewardship Promise</h2>
          <span className="text-xs uppercase tracking-widest text-white/60">Proteus</span>
        </div>
        <p className="mt-2 text-sm text-white/70">
          Before you explore, agree to these five pledges to protect the Red Sea.
        </p>
        <div className="mt-6 space-y-3">
          {PLEDGES.map((pledge, index) => (
            <label
              key={pledge}
              className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/5 p-3"
            >
              <input
                type="checkbox"
                checked={checked[index]}
                onChange={() =>
                  setChecked((prev) =>
                    prev.map((value, idx) => (idx === index ? !value : value))
                  )
                }
                className="mt-1 h-4 w-4 rounded border-white/40 bg-transparent text-ocean-light"
              />
              <span className="text-sm text-white/80">{pledge}</span>
            </label>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <OceanButton size="lg" onClick={handleConfirm} disabled={!allChecked}>
            I Promise
          </OceanButton>
        </div>
      </GlassCard>
    </div>
  );
}
