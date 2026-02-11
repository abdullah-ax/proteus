import type { AuthConfig } from "convex/server";

// TODO: Re-enable WorkOS authentication once properly configured
// For now, auth is disabled to allow deployment without WorkOS env vars
const clientId = process.env.WORKOS_CLIENT_ID;

const config: AuthConfig = clientId
  ? {
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
    }
  : {
      providers: []
    };

export default config;
