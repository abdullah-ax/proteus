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
      {children}
    </div>
  );
}
