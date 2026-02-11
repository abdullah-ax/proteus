"use client";

import { CHALLENGES } from "@/lib/mockData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ChallengesCard() {
  return (
    <Card className="p-6">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-base">Seasonal Challenges</CardTitle>
        <Badge variant="outline">Live</Badge>
      </CardHeader>
      <CardContent className="mt-3 space-y-4">
        {CHALLENGES.map((challenge) => (
          <div key={challenge.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white">{challenge.title}</p>
              <span className="text-xs text-white/70">+{challenge.reward} pts</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${challenge.progress}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
