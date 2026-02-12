"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, ImageIcon } from "lucide-react";

const ACCEPTED_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/heic": [".heic"],
};

const MAX_SIZE = 25 * 1024 * 1024; // 25MB

interface DropZoneProps {
  onFile: (file: File) => void;
  disabled?: boolean;
  previewUrl?: string | null;
  previewAspect?: number | null;
}

export function DropZone({ onFile, disabled, previewUrl, previewAspect }: DropZoneProps) {
  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted.length > 0) {
        onFile(accepted[0]);
      }
    },
    [onFile]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: ACCEPTED_TYPES,
      maxSize: MAX_SIZE,
      maxFiles: 1,
      disabled,
    });

  const rejection = fileRejections[0]?.errors[0];

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary bg-primary/5"
            : disabled
              ? "border-slate-700 opacity-50 cursor-not-allowed"
              : "border-slate-600 hover:border-primary/60"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col items-start gap-3 text-left">
            <div className="flex items-center gap-3">
          {isDragActive ? (
            <ImageIcon className="w-10 h-10 text-primary" />
          ) : (
            <Upload className="w-10 h-10 text-slate-400" />
          )}
              <p className="text-sm text-slate-300">
                {isDragActive
                  ? "Drop your image here"
                  : "Drag & drop an underwater photo, or click to browse"}
              </p>
            </div>
            <p className="text-xs text-slate-500">
              JPEG, PNG, or HEIC up to 25MB
            </p>
          </div>
          {previewUrl && (
            <div className="w-44">
              <div
                className="rounded-lg overflow-hidden border border-slate-700/60 bg-slate-800/70"
                style={{
                  aspectRatio: previewAspect ? `${previewAspect}` : "4 / 3",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Selected"
                  className="w-full h-full object-contain"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <p className="mt-2 text-[10px] text-slate-400">Selected</p>
            </div>
          )}
        </div>
      </div>
      {rejection && (
        <p className="mt-2 text-sm text-red-400">{rejection.message}</p>
      )}
    </div>
  );
}
