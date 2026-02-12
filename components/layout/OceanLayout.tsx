"use client";

import { cn } from "@/lib/utils";

interface OceanLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function OceanLayout({ children, className }: OceanLayoutProps) {
  return (
    <div
      className={cn("min-h-screen w-full bg-ocean-gradient ocean-theme", className)}
    >
      {children}
    </div>
  );
}
