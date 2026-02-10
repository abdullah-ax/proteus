import type { AuthConfig } from "convex/server";

const clientId = process.env.WORKOS_CLIENT_ID;
if (!clientId) {
  throw new Error("Missing WORKOS_CLIENT_ID environment variable — JWT verification will fail");
}

export default {
  providers: [
    {
      type: "customJwt",
      issuer: "https://api.workos.com/",
      algorithm: "RS256",
      applicationID: clientId,
      jwks: `https://api.workos.com/sso/jwks/${clientId}`
    },
    {
      type: "customJwt",
      issuer: `https://api.workos.com/user_management/${clientId}`,
      algorithm: "RS256",
      jwks: `https://api.workos.com/sso/jwks/${clientId}`
    }
  ]
} satisfies AuthConfig;
