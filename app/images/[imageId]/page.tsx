"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { PipelineStatus } from "@/components/pipeline/PipelineStatus";
import { FishDetectionOverlay } from "@/components/images/FishDetectionOverlay";
import { FishClassificationCard } from "@/components/images/FishClassificationCard";
import {
  ArrowLeft,
  Loader2,
  MapPin,
  Camera,
  Calendar,
  AlertTriangle,
  Paintbrush,
} from "lucide-react";
import Link from "next/link";
import { usePreloadImages } from "@/hooks/usePreloadImages";

export default function ImageDetailPage() {
  const params = useParams();
  const imageId = params.imageId as Id<"images">;

  const image = useQuery(api.images.getById, { imageId });
  const detections = useQuery(api.fishDetections.getByImage, { imageId });

  if (image === undefined) {
    return (
      <main className="min-h-screen px-6 py-16 flex justify-center items-center">
        <Loader2 className="w-6 h-6 animate-spin text-slate-500" />
      </main>
    );
  }

  if (image === null) {
    return (
      <main className="min-h-screen px-6 py-16 max-w-4xl mx-auto">
        <p className="text-sm text-slate-400">Image not found.</p>
      </main>
    );
  }

  const displayUrl = image.recoloredUrl ?? image.url;
  const detectionUrls =
    detections
      ?.map((det) => det.croppedUrl ?? null)
      .filter((url): url is string => Boolean(url)) ?? [];
  usePreloadImages([displayUrl, ...detectionUrls].filter(Boolean));

  return (
    <main className="min-h-screen px-6 py-16 max-w-5xl mx-auto">
      <Link
        href="/images"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-300 mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Gallery
      </Link>

      <h1 className="text-xl font-semibold text-foreground truncate">
        {image.fileName}
      </h1>

      {/* Pipeline progress */}
      <div className="mt-6 p-4 bg-slate-800/50 rounded-xl">
        <PipelineStatus
          status={image.pipelineStatus}
          currentStage={image.currentStage}
          error={image.pipelineError}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image with detections */}
        <div className="lg:col-span-2">
          {displayUrl && detections && detections.length > 0 ? (
            <FishDetectionOverlay
              imageUrl={displayUrl}
              detections={detections.map((d) => ({
                bbox: d.bbox,
                commonName: d.commonName ?? undefined,
              }))}
            />
          ) : displayUrl ? (
            <img
              src={displayUrl}
              alt={image.fileName}
              className="w-full rounded-lg"
            />
          ) : null}

          {image.wasRecolored && (
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <Paintbrush className="w-3.5 h-3.5" />
              Color-corrected version shown.{" "}
              {image.url && (
                <a
                  href={image.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View original
                </a>
              )}
            </div>
          )}
        </div>

        {/* Metadata sidebar */}
        <div className="space-y-4">
          <div className="p-4 bg-slate-800/50 rounded-xl space-y-3">
            <h2 className="text-sm font-medium text-foreground">Metadata</h2>

            {image.exif?.latitude && image.exif?.longitude && (
              <div className="flex items-start gap-2 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>
                  {image.exif.latitude.toFixed(4)},{" "}
                  {image.exif.longitude.toFixed(4)}
                </span>
              </div>
            )}

            {image.exif?.camera && (
              <div className="flex items-start gap-2 text-xs text-slate-400">
                <Camera className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>{image.exif.camera}</span>
              </div>
            )}

            {image.exif?.timestamp && (
              <div className="flex items-start gap-2 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>
                  {new Date(image.exif.timestamp).toLocaleString()}
                </span>
              </div>
            )}

            {image.isRedSeaVerified === false &&
              image.pipelineStatus !== "uploaded" && (
                <div className="flex items-start gap-2 text-xs text-amber-400">
                  <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>Red Sea location not verified (no GPS data)</span>
                </div>
              )}

            {image.isRedSeaVerified === true && (
              <div className="flex items-start gap-2 text-xs text-emerald-400">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>Red Sea location verified</span>
              </div>
            )}
          </div>

          {image.fishCount !== undefined && (
            <div className="p-4 bg-slate-800/50 rounded-xl">
              <p className="text-sm text-slate-400">
                Fish detected:{" "}
                <span className="text-foreground font-medium">
                  {image.fishCount}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Fish classifications */}
      {detections && detections.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-medium text-foreground mb-4">
            Fish Identified
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {detections.map((det) => (
              <FishClassificationCard
                key={det._id}
                croppedUrl={det.croppedUrl}
                species={det.species ?? undefined}
                commonName={det.commonName ?? undefined}
                confidence={det.confidence ?? undefined}
                classificationDetails={det.classificationDetails ?? undefined}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
