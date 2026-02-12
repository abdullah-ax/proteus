"use client";

import { cn } from "@/lib/utils";

interface OceanButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  type?: "button" | "submit";
}

export function OceanButton({ children, onClick, variant = "primary", type = "button" }: OceanButtonProps) {
  const base = "rounded-2xl px-5 py-2 text-sm font-semibold transition-transform active:scale-95";
  const styles = {
    primary: "bg-ocean-button text-white",
    ghost: "bg-white/10 text-white",
  };
  return (
    <button type={type} onClick={onClick} className={cn(base, styles[variant])}>
      {children}
    </button>
  );
}
