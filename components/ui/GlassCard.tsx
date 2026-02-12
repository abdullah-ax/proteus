"use client";

import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className, strong, onClick }: GlassCardProps) {
  return (
    <div
      className={cn(
        strong ? "glass-card-strong" : "glass-card",
        "p-4",
        onClick && "cursor-pointer hover:bg-white/25 transition-colors duration-200",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
