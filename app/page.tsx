"use client";

import Link from "next/link";
import { Upload, Images } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-primary">Proteus</h1>
      <p className="mt-2 text-sm text-slate-300">
        Red Sea fish identification pipeline
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/upload"
          className="flex items-center gap-4 p-6 rounded-xl border border-slate-700/50 hover:border-primary/40 transition-colors"
        >
          <Upload className="w-8 h-8 text-primary" />
          <div>
            <p className="font-medium text-foreground">Upload Image</p>
            <p className="text-xs text-slate-400 mt-0.5">
              Submit an underwater photo for analysis
            </p>
          </div>
        </Link>
        <Link
          href="/images"
          className="flex items-center gap-4 p-6 rounded-xl border border-slate-700/50 hover:border-primary/40 transition-colors"
        >
          <Images className="w-8 h-8 text-primary" />
          <div>
            <p className="font-medium text-foreground">Gallery</p>
            <p className="text-xs text-slate-400 mt-0.5">
              View processed images and classifications
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}
