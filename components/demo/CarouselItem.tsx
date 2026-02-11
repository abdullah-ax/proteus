"use client";

import Image from "next/image";

interface CarouselItemProps {
  imageUrl: string;
  location: string;
  username: string;
}

export function CarouselItem({ imageUrl, location, username }: CarouselItemProps) {
  return (
    <div className="relative h-44 w-72 overflow-hidden rounded-2xl border border-white/20">
      <Image src={imageUrl} alt={location} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute bottom-3 left-3">
        <p className="text-sm font-semibold text-white">{location}</p>
        <p className="text-xs text-white/70">by @{username}</p>
      </div>
    </div>
  );
}
