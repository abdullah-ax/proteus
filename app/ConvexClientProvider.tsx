"use client";

import type { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useState } from "react";

// TODO: Re-enable auth integration once WorkOS is properly configured
// For now, using ConvexProvider without authentication
export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const [convex] = useState(
    () => new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string)
  );

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
