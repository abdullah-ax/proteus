"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FishClassificationCardProps {
  croppedUrl: string | null;
  species?: string;
  commonName?: string;
  confidence?: number;
  classificationDetails?: string;
}

export function FishClassificationCard({
  croppedUrl,
  species,
  commonName,
  confidence,
  classificationDetails,
}: FishClassificationCardProps) {
  const [expanded, setExpanded] = useState(false);

  let details: { family?: string; characteristics?: string; conservationStatus?: string } | null = null;
  if (classificationDetails) {
    try {
      details = JSON.parse(classificationDetails);
    } catch {
      // ignore
    }
  }

  return (
    <div className="rounded-lg border border-slate-700/50 overflow-hidden">
      {croppedUrl && (
        <div className="aspect-square bg-slate-800">
          <img
            src={croppedUrl}
            alt={commonName ?? "Fish"}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-3">
        <p className="text-sm font-medium text-foreground">
          {commonName ?? "Unidentified"}
        </p>
        {species && (
          <p className="text-xs text-slate-400 italic">{species}</p>
        )}
        {confidence !== undefined && (
          <div className="mt-2">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Confidence</span>
              <span>{Math.round(confidence * 100)}%</span>
            </div>
            <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${confidence * 100}%` }}
              />
            </div>
          </div>
        )}
        {details && (
          <div className="mt-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-300"
            >
              Details
              {expanded ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
            {expanded && (
              <div className="mt-1.5 text-xs text-slate-400 space-y-1">
                {details.family && <p>Family: {details.family}</p>}
                {details.characteristics && (
                  <p>{details.characteristics}</p>
                )}
                {details.conservationStatus && (
                  <p>IUCN: {details.conservationStatus}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
