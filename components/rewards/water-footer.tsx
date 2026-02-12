"use client";

import { MapPin, Plus, Fish } from "lucide-react";
import { useEffect, useRef } from "react";

interface WaterFooterProps {
  onCenterBubbleClick?: () => void;
  onLeftBubbleClick?: () => void;
  onRightBubbleClick?: () => void;
}

export default function WaterFooter({
  onCenterBubbleClick,
  onLeftBubbleClick,
  onRightBubbleClick,
}: WaterFooterProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || 256;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let time = 0;
    let animationId: number;

    const drawWaveLayer = (
      baseY: number,
      waveHeight: number,
      frequency: number,
      speed: number,
      amplitude: number,
      color: string,
      opacity: number
    ) => {
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.moveTo(0, baseY);

      for (let x = 0; x <= canvas.width; x += 10) {
        const wave1 = Math.sin((x * frequency + time * speed) * 0.02) * amplitude;
        const wave2 =
          Math.sin((x * frequency * 0.5 - time * speed * 0.7) * 0.02) *
          (amplitude * 0.6);
        const y = baseY + wave1 + wave2 + waveHeight;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const drawWaves = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      drawWaveLayer(height * 0.2, -10, 1.5, 2.2, 20, "#144E8C", 0.3);
      drawWaveLayer(height * 0.35, -5, 1.2, 1.8, 15, "#1C6FB7", 0.35);
      drawWaveLayer(height * 0.5, 0, 0.8, 1.5, 12, "#2D8ED6", 0.4);

      animationId = requestAnimationFrame(drawWaves);
    };

    drawWaves();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="w-full h-64 pointer-events-none relative mt-0">
      <canvas ref={canvasRef} className="w-full h-full block" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto px-4">
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className="absolute left-1/3 -translate-x-12 bottom-32"
            style={{ animation: "float 3s ease-in-out infinite" }}
          >
            <button
              onClick={onLeftBubbleClick}
              className="w-20 h-20 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer group rounded-full"
              style={{
                backgroundColor: "rgba(255,255,255,0.12)",
                borderColor: "rgba(255,255,255,0.25)",
                borderWidth: "1px",
              }}
            >
              <Fish className="w-9 h-9 text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div
            className="absolute bottom-20"
            style={{ animation: "float 3.5s ease-in-out infinite", animationDelay: "0.2s" }}
          >
            <button
              onClick={onCenterBubbleClick}
              className="w-28 h-28 flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer group rounded-full"
              style={{
                backgroundColor: "rgba(255,255,255,0.12)",
                borderColor: "rgba(255,255,255,0.25)",
                borderWidth: "1px",
              }}
            >
              <Plus className="w-12 h-12 text-white group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            </button>
          </div>

          <div
            className="absolute right-1/3 translate-x-12 bottom-32"
            style={{ animation: "float 3.2s ease-in-out infinite", animationDelay: "0.4s" }}
          >
            <button
              onClick={onRightBubbleClick}
              className="w-20 h-20 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer group rounded-full"
              style={{
                backgroundColor: "rgba(255,255,255,0.12)",
                borderColor: "rgba(255,255,255,0.25)",
                borderWidth: "1px",
              }}
            >
              <MapPin className="w-9 h-9 text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.85;
          }
          25% {
            transform: translateY(-15px) translateX(5px);
            opacity: 0.95;
          }
          50% {
            transform: translateY(-25px) translateX(-5px);
            opacity: 1;
          }
          75% {
            transform: translateY(-15px) translateX(5px);
            opacity: 0.95;
          }
        }
      `}</style>
    </div>
  );
}
