"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { DropZone } from "@/components/upload/DropZone";
import { useUpload } from "@/hooks/useUpload";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UploadPage() {
  const router = useRouter();
  const { upload, isUploading, error } = useUpload();
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewAspect, setPreviewAspect] = useState<number | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const handleFile = async (file: File) => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    const objectUrl = URL.createObjectURL(file);
    previewUrlRef.current = objectUrl;
    setPreview(objectUrl);
    setFileName(file.name);
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setPreviewAspect(img.naturalWidth / img.naturalHeight);
      }
    };
    img.src = objectUrl;

    try {
      const imageId = await upload(file);
      router.push(`/images/${imageId}`);
    } catch {
      // error is set in the hook
    }
  };

  return (
    <main className="min-h-screen px-6 py-16 max-w-2xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-300 mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <h1 className="text-2xl font-semibold text-foreground">
        Upload Image
      </h1>
      <p className="mt-1 text-sm text-slate-400">
        Upload an underwater photo from the Red Sea for fish identification
      </p>

      <div className="mt-8">
        <DropZone
          onFile={handleFile}
          disabled={isUploading}
          previewUrl={preview}
          previewAspect={previewAspect}
        />
      </div>

      {isUploading && (
        <div className="mt-6 flex items-center gap-3 text-sm text-slate-300">
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
          <span>Uploading {fileName}...</span>
        </div>
      )}

      {error && (
        <p className="mt-4 text-sm text-red-400 bg-red-400/10 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
    </main>
  );
}
