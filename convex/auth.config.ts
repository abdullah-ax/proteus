import type { AuthConfig } from "convex/server";

// TODO: Re-enable WorkOS authentication once properly configured
// For now, auth is disabled to allow deployment without WorkOS env vars

export default {
  providers: []
} satisfies AuthConfig;
