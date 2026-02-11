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
        "p-4 shadow-[0_20px_50px_-35px_rgba(0,0,0,0.8)] transition-all duration-300",
        onClick && "cursor-pointer hover:bg-white/20 hover:-translate-y-0.5",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
