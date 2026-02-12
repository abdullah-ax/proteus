"use client";

interface CarouselCardProps {
  imageUrl: string;
  location: string;
  username: string;
}

export function CarouselCard({ imageUrl, location, username }: CarouselCardProps) {
  return (
    <div className="relative flex-shrink-0 w-[280px] h-[220px] rounded-2xl overflow-hidden">
      <img
        src={imageUrl}
        alt={location}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4">
        <p className="text-sm font-semibold text-white">{location}</p>
        <p className="text-xs text-white/70">{username}</p>
      </div>
    </div>
  );
}
