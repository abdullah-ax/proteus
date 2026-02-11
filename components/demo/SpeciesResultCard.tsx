"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface SpeciesResultCardProps {
  name: string;
  description: string;
  funFacts: string[];
}

export function SpeciesResultCard({ name, description, funFacts }: SpeciesResultCardProps) {
  return (
    <Card className="p-5">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-white/70">{description}</p>
        <ul className="mt-3 space-y-2 text-xs text-white/70">
          {funFacts.map((fact) => (
            <li key={fact}>• {fact}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
