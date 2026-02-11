import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// TODO: Re-enable WorkOS authentication once properly configured
// For now, authentication is disabled to allow deployment
export default function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
