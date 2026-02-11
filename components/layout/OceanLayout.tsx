"use client";

import { cn } from "@/lib/utils";

export function OceanLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "min-h-screen bg-ocean-gradient ocean-theme relative overflow-x-hidden",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-ocean-light/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-ocean-surface/20 blur-3xl" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
