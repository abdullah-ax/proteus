"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CAROUSEL_ITEMS } from "@/lib/mockData";
import { CarouselItem } from "./CarouselItem";

export function CarouselSection({ dimmed }: { dimmed?: boolean }) {
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

  return (
    <div className={dimmed ? "opacity-0 translate-y-4 transition-all duration-300" : "transition-all duration-300"}>
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          style={{ x }}
          className="flex gap-4 cursor-grab active:cursor-grabbing"
        >
          {CAROUSEL_ITEMS.map((item) => (
            <CarouselItem key={item.id} {...item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
