"use client";

import Link from "next/link";
import { Fish, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface ImageCardProps {
  id: string;
  url: string | null;
  fileName: string;
  status: string;
  fishCount?: number;
  createdAt: number;
}

export function ImageCard({ id, url, fileName, status, fishCount, createdAt }: ImageCardProps) {
  const isProcessing = !["completed", "failed"].includes(status);

  return (
    <Link
      href={`/images/${id}`}
      className="block rounded-xl border border-slate-700/50 overflow-hidden hover:border-primary/40 transition-colors"
    >
      <div className="aspect-video bg-slate-800 relative">
        {url ? (
          <img
            src={url}
            alt={fileName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600">
            No preview
          </div>
        )}
        <div className="absolute top-2 right-2">
          {status === "completed" && (
            <span className="flex items-center gap-1 bg-emerald-500/90 text-white text-xs px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" /> Done
            </span>
          )}
          {status === "failed" && (
            <span className="flex items-center gap-1 bg-red-500/90 text-white text-xs px-2 py-0.5 rounded-full">
              <XCircle className="w-3 h-3" /> Failed
            </span>
          )}
          {isProcessing && (
            <span className="flex items-center gap-1 bg-primary/90 text-white text-xs px-2 py-0.5 rounded-full">
              <Loader2 className="w-3 h-3 animate-spin" /> Processing
            </span>
          )}
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm text-foreground truncate">{fileName}</p>
        <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {new Date(createdAt).toLocaleDateString()}
          </span>
          {fishCount !== undefined && (
            <span className="flex items-center gap-1">
              <Fish className="w-3 h-3" />
              {fishCount} fish
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
