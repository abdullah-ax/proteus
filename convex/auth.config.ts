import type { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      domain: process.env.WORKOS_DOMAIN,
      applicationID: process.env.WORKOS_APPLICATION_ID
    }
  ]
} satisfies AuthConfig;
