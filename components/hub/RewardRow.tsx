"use client";

interface RewardRowProps {
  reward: {
    id: string;
    image: string;
    title: string;
    description: string;
    points: number;
  };
  onClick: () => void;
}

export function RewardRow({ reward, onClick }: RewardRowProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full p-3 rounded-xl bg-white/[0.08] border border-white/10 text-left hover:bg-white/[0.14] transition-colors"
    >
      <img
        src={reward.image}
        alt={reward.title}
        className="w-12 h-12 rounded-[10px] object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-white truncate">{reward.title}</p>
        <p className="text-[11px] text-white/70 truncate">{reward.description}</p>
      </div>
      <div className="px-2.5 py-1 rounded-full bg-ocean-surface/20 shrink-0">
        <span className="text-[11px] font-medium font-mono text-ocean-surface">{reward.points}</span>
      </div>
    </button>
  );
}
