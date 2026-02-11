"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { CAROUSEL_ITEMS } from "@/lib/mockData";
import { CarouselCard } from "./CarouselCard";

export function ImageCarousel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const [maxDrag, setMaxDrag] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current || !trackRef.current) return;
      const max = Math.max(0, trackRef.current.scrollWidth - containerRef.current.offsetWidth);
      setMaxDrag(max);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!maxDrag) return;
      const current = x.get();
      const next = Math.abs(current) + 260;
      x.set(next > maxDrag ? 0 : -next);
    }, 3200);
    return () => clearInterval(interval);
  }, [maxDrag, x]);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <motion.div
        ref={trackRef}
        drag="x"
        dragConstraints={{ left: -maxDrag, right: 0 }}
        style={{ x }}
        className="flex gap-4 cursor-grab active:cursor-grabbing"
      >
        {CAROUSEL_ITEMS.map((item) => (
          <CarouselCard
            key={item.id}
            imageUrl={item.imageUrl}
            location={item.location}
            username={item.username}
          />
        ))}
      </motion.div>
    </div>
  );
}
