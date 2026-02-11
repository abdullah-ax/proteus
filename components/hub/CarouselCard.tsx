"use client";

import Image from "next/image";

interface CarouselCardProps {
  imageUrl: string;
  location: string;
  username: string;
}

export function CarouselCard({ imageUrl, location, username }: CarouselCardProps) {
  return (
    <div className="relative h-48 w-72 overflow-hidden rounded-3xl border border-white/15 bg-white/10">
      <Image src={imageUrl} alt={location} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute bottom-4 left-4">
        <p className="text-sm font-semibold text-white">{location}</p>
        <p className="text-xs text-white/70">@{username}</p>
      </div>
    </div>
  );
}
