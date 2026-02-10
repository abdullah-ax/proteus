"use client";

import { CheckCircle2, Circle, Loader2, XCircle } from "lucide-react";

const STAGES = [
  { key: "uploaded", label: "Upload" },
  { key: "metadata_extracted", label: "Metadata" },
  { key: "duplicate_checked", label: "Duplicate Check" },
  { key: "recolored", label: "Recoloration" },
  { key: "fish_extracted", label: "Fish Detection" },
  { key: "classified", label: "Classification" },
  { key: "completed", label: "Complete" },
];

const STATUS_ORDER = STAGES.map((s) => s.key);

interface PipelineStatusProps {
  status: string;
  currentStage?: string;
  error?: string;
}

export function PipelineStatus({ status, currentStage, error }: PipelineStatusProps) {
  const currentIndex = STATUS_ORDER.indexOf(status);
  const isFailed = status === "failed";

  return (
    <div>
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {STAGES.map((stage, i) => {
          let state: "done" | "active" | "pending" | "error" = "pending";
          if (isFailed && i === currentIndex) {
            state = "error";
          } else if (i < currentIndex || status === "completed") {
            state = "done";
          } else if (i === currentIndex) {
            state = "active";
          }

          return (
            <div key={stage.key} className="flex items-center">
              <div className="flex flex-col items-center gap-1 min-w-[80px]">
                {state === "done" && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                )}
                {state === "active" && (
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                )}
                {state === "pending" && (
                  <Circle className="w-5 h-5 text-slate-600" />
                )}
                {state === "error" && (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
                <span
                  className={`text-xs ${
                    state === "done"
                      ? "text-emerald-400"
                      : state === "active"
                        ? "text-primary"
                        : state === "error"
                          ? "text-red-400"
                          : "text-slate-500"
                  }`}
                >
                  {stage.label}
                </span>
              </div>
              {i < STAGES.length - 1 && (
                <div
                  className={`w-6 h-px mx-1 ${
                    i < currentIndex && !isFailed
                      ? "bg-emerald-400"
                      : "bg-slate-700"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      {currentStage && !isFailed && (
        <p className="mt-2 text-xs text-slate-400">{currentStage}...</p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-400 bg-red-400/10 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
    </div>
  );
}
