"use client";

import type { ReactNode } from "react";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import {
  AuthKitProvider,
  useAccessToken,
  useAuth,
} from "@workos-inc/authkit-nextjs/components";
import { useCallback, useState } from "react";

function useAuthFromAuthKit() {
  const { user, loading: isLoading } = useAuth();
  const { getAccessToken, refresh } = useAccessToken();
  const isAuthenticated = !!user;

  const fetchAccessToken = useCallback(
    async ({
      forceRefreshToken = false,
    }: {
      forceRefreshToken?: boolean;
    } = {}): Promise<string | null> => {
      if (!user) return null;
      try {
        if (forceRefreshToken) {
          return (await refresh()) ?? null;
        }
        return (await getAccessToken()) ?? null;
      } catch (error) {
        console.error("Failed to get access token:", error);
        return null;
      }
    },
    [user, refresh, getAccessToken]
  );

  return { isLoading, isAuthenticated, fetchAccessToken };
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const [convex] = useState(
    () => new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string)
  );

  return (
    <AuthKitProvider>
      <ConvexProviderWithAuth client={convex} useAuth={useAuthFromAuthKit}>
        {children}
      </ConvexProviderWithAuth>
    </AuthKitProvider>
  );
}
