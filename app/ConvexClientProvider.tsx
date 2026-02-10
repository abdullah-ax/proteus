"use client";

import type { ReactNode } from "react";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import {
  AuthKitProvider,
  useAccessToken,
  useAuth
} from "@workos-inc/authkit-nextjs/components";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <AuthKitProvider>
      <ConvexProviderWithAuth client={convex} useAuth={useAuth} useAccessToken={useAccessToken}>
        {children}
      </ConvexProviderWithAuth>
    </AuthKitProvider>
  );
}
