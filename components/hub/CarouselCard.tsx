"use client";

interface CarouselCardProps {
  imageUrl: string;
  location: string;
  username: string;
}

export function CarouselCard({ imageUrl, location, username }: CarouselCardProps) {
  return (
    <div className="relative h-48 w-72 overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-[0_20px_45px_-30px_rgba(0,0,0,0.7)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(66,165,245,0.45),transparent_60%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 opacity-70 mix-blend-screen">
        <div className="absolute -right-10 top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute left-8 bottom-6 h-16 w-16 rounded-full bg-white/10 blur-2xl" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute bottom-4 left-4">
        <p className="text-sm font-semibold text-white">{location}</p>
        <p className="text-xs text-white/70">@{username}</p>
      </div>
    </div>
  );
}
