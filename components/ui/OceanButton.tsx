"use client";

import { cn } from "@/lib/utils";

interface OceanButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary: "bg-ocean-button text-white shadow-lg shadow-ocean-mid/30 hover:shadow-ocean-mid/50 hover:brightness-110",
  ghost: "bg-white/10 text-white hover:bg-white/20",
  outline: "bg-transparent border border-white/30 text-white hover:bg-white/10",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-8 py-3.5 text-base rounded-xl",
};

export function OceanButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: OceanButtonProps) {
  return (
    <button
      className={cn(
        "font-medium transition-all duration-200 active:scale-95",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
