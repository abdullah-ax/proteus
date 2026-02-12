"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ImageCard } from "@/components/images/ImageCard";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePreloadImages } from "@/hooks/usePreloadImages";

export default function ImagesPage() {
  const images = useQuery(api.images.list);
  const imageUrls =
    images?.map((image) => image.url).filter((url): url is string => Boolean(url)) ??
    [];
  usePreloadImages(imageUrls);

  return (
    <main className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-300 mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Gallery</h1>
        <Link
          href="/upload"
          className="text-sm text-primary hover:text-primary/80"
        >
          + Upload
        </Link>
      </div>

      {images === undefined ? (
        <div className="mt-12 flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-slate-500" />
        </div>
      ) : images.length === 0 ? (
        <p className="mt-12 text-center text-sm text-slate-400">
          No images uploaded yet.{" "}
          <Link href="/upload" className="text-primary hover:underline">
            Upload one
          </Link>
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageCard
              key={image._id}
              id={image._id}
              url={image.url}
              fileName={image.fileName}
              status={image.pipelineStatus}
              fishCount={image.fishCount}
              createdAt={image.createdAt}
            />
          ))}
        </div>
      )}
    </main>
  );
}
