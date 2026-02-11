"use client";

import { cn } from "@/lib/utils";

interface OceanButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
}

export function OceanButton({
  children,
  onClick,
  disabled,
  className,
  variant = "primary",
  size = "md",
  type = "button",
}: OceanButtonProps) {
  const base =
    "font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 select-none";
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  const variants = {
    primary:
      "bg-ocean-button text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
    ghost: "bg-white/10 text-white hover:bg-white/20",
    outline: "border border-white/30 text-white hover:bg-white/10",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        base,
        sizes[size],
        variants[variant],
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
    >
      {children}
    </button>
  );
}
