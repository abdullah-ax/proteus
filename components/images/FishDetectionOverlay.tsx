"use client";

import { useEffect, useRef } from "react";

interface Detection {
  bbox: { x: number; y: number; width: number; height: number };
  commonName?: string;
}

interface FishDetectionOverlayProps {
  imageUrl: string;
  detections: Detection[];
}

export function FishDetectionOverlay({
  imageUrl,
  detections,
}: FishDetectionOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      for (const det of detections) {
        const x = det.bbox.x * canvas.width;
        const y = det.bbox.y * canvas.height;
        const w = det.bbox.width * canvas.width;
        const h = det.bbox.height * canvas.height;

        ctx.strokeStyle = "rgba(14, 165, 233, 0.8)";
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, w, h);

        if (det.commonName) {
          ctx.font = `${Math.max(14, canvas.width * 0.015)}px sans-serif`;
          ctx.fillStyle = "rgba(14, 165, 233, 0.8)";
          const textWidth = ctx.measureText(det.commonName).width;
          ctx.fillRect(x, y - 22, textWidth + 8, 22);
          ctx.fillStyle = "#ffffff";
          ctx.fillText(det.commonName, x + 4, y - 6);
        }
      }
    };

    if (img.complete) {
      draw();
    } else {
      img.onload = draw;
    }
  }, [imageUrl, detections]);

  return (
    <div className="relative">
      <img
        ref={imgRef}
        src={imageUrl}
        alt="Analyzed image"
        className="hidden"
        crossOrigin="anonymous"
      />
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-lg"
      />
    </div>
  );
}
