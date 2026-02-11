"use client";

export function PointsEarnedBanner({ points }: { points: number }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/15 p-4 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-white/70">Identification Complete</p>
      <p className="mt-2 text-2xl font-semibold text-white">+{points} points earned</p>
    </div>
  );
}
