"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CAROUSEL_ITEMS } from "@/lib/mockData";

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
  };

  const getPrevIndex = () =>
    (currentIndex - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length;
  const getNextIndex = () => (currentIndex + 1) % CAROUSEL_ITEMS.length;

  const currentImage = CAROUSEL_ITEMS[currentIndex];
  const prevImage = CAROUSEL_ITEMS[getPrevIndex()];
  const nextImage = CAROUSEL_ITEMS[getNextIndex()];

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={goToPrev}
        className="flex-shrink-0 relative w-16 h-16 rounded-lg overflow-hidden border border-gray-300/50 hover:border-gray-400 transition-all duration-200 opacity-50 hover:opacity-80 group"
      >
        <img
          src={prevImage.imageUrl}
          alt={prevImage.location}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all" />
      </button>

      <div className="relative w-72 h-52 rounded-2xl overflow-hidden bg-white/60 backdrop-blur-lg border border-gray-300/60 shadow-md">
        <img
          src={currentImage.imageUrl}
          alt={currentImage.location}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="font-semibold text-xs">{currentImage.location}</p>
          <p className="text-xs text-gray-100">{currentImage.username}</p>
        </div>
      </div>

      <button
        onClick={goToNext}
        className="flex-shrink-0 relative w-16 h-16 rounded-lg overflow-hidden border border-gray-300/50 hover:border-gray-400 transition-all duration-200 opacity-50 hover:opacity-80 group"
      >
        <img
          src={nextImage.imageUrl}
          alt={nextImage.location}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all" />
      </button>
    </div>
  );
}
