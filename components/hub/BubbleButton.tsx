"use client";

import { cn } from "@/lib/utils";

interface BubbleButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function BubbleButton({ label, icon, onClick, className }: BubbleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex h-14 w-14 flex-col items-center justify-center gap-1 rounded-full border border-white/30 bg-white/10 text-white shadow-lg backdrop-blur transition-transform",
        className
      )}
      aria-label={label}
    >
      {icon}
      <span className="text-[10px] font-semibold uppercase tracking-wide">{label}</span>
    </button>
  );
}
