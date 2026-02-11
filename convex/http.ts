import { httpRouter } from "convex/server";
// import { authKit } from "./auth";

const http = httpRouter();

// TODO: Re-enable WorkOS authentication once properly configured
// authKit.registerRoutes(http);

export default http;
