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
        "transition-all duration-300",
        onClick && "cursor-pointer hover:bg-white/20",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
