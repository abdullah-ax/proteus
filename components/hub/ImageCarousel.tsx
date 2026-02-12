"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { CAROUSEL_ITEMS } from "@/lib/mockData";
import { CarouselCard } from "./CarouselCard";

export function ImageCarousel() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={constraintsRef} className="overflow-hidden">
      <motion.div
        className="flex gap-3 px-5 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={constraintsRef}
        dragElastic={0.1}
      >
        {CAROUSEL_ITEMS.map((item) => (
          <CarouselCard key={item.id} {...item} />
        ))}
      </motion.div>
    </div>
  );
}
