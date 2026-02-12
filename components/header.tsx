"use client";

import { User } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const router = useRouter();

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10"
      style={
        transparent
          ? {
              backgroundColor: "rgba(10, 31, 60, 0.15)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }
          : undefined
      }
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between bg-gradient-to-b from-[#0A1F3C] to-[#0F3057]">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img
            src="/logo.jpeg"
            alt="Proteus"
            className="h-10 w-10 rounded-full border border-white/25 object-cover"
            loading="eager"
            decoding="async"
          />
          <span className="text-lg font-semibold text-white">Proteus</span>
        </button>

        <div className="w-10 h-10 rounded-full bg-white/12 border border-white/25 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all">
          <User size={20} className="text-white" />
        </div>
      </div>
    </header>
  );
}
