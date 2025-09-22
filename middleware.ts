import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth-utils";
import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(
        new URL("/login?redirect=/admin", request.url)
      );
    }

    try {
      // Verify token
      const payload = verifyToken(token);
      if (!payload) {
        return NextResponse.redirect(
          new URL("/login?redirect=/admin", request.url)
        );
      }

      // Check if user is admin
      const db = await getDatabase();
      const users = db.collection("users");
      const user = await users.findOne(
        { _id: new ObjectId(payload.userId) },
        { projection: { isAdmin: 1 } }
      );

      if (!user || !user.isAdmin) {
        // Redirect to home if not admin
        return NextResponse.redirect(
          new URL("/?error=unauthorized", request.url)
        );
      }

      // Allow access to admin routes
      return NextResponse.next();
    } catch (error) {
      console.error("Middleware error:", error);
      return NextResponse.redirect(
        new URL("/login?redirect=/admin", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
