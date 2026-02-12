"use client";

export function ConditionalDiveFields({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white/60">Max Depth (m)</label>
        <input
          placeholder="18"
          className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50"
        />
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white/60">Dive Duration (min)</label>
        <input
          placeholder="45"
          className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50"
        />
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white/60">Dive Buddy Name</label>
        <input
          placeholder="Optional"
          className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50"
        />
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-white/60">Diver ID / Passport</label>
        <input
          placeholder="Required"
          className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50"
        />
      </div>
    </div>
  );
}
