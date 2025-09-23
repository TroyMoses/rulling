import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth-utils";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get("auth-token")?.value;
    console.log("[v1] Middleware - Token present:", !!token);

    if (!token) {
      return NextResponse.redirect(
        new URL("/login?redirect=/admin", request.url)
      );
    }

    const payload = await verifyToken(token);
    console.log("[v1] Middleware - Token payload:", payload);

    if (!payload) {
      return NextResponse.redirect(
        new URL("/login?redirect=/admin", request.url)
      );
    }

    if (!payload.isAdmin) {
      return NextResponse.redirect(
        new URL("/?error=unauthorized", request.url)
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
  // ⚡ stays in Edge runtime by default
};
