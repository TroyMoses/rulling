import { verifyToken } from "@/lib/auth-utils";
import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import type { NextRequest } from "next/server";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export async function getAdminUser(
  request: NextRequest
): Promise<AdminUser | null> {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return null;
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return null;
    }

    const db = await getDatabase();
    const users = db.collection("users");
    const user = await users.findOne(
      { _id: new ObjectId(payload.userId) },
      { projection: { password: 0 } }
    );

    if (!user || !user.isAdmin) {
      return null;
    }

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    };
  } catch (error) {
    console.error("Admin auth error:", error);
    return null;
  }
}

export function requireAdmin(
  handler: (
    request: NextRequest,
    adminUser: AdminUser,
    context?: unknown
  ) => Promise<Response>
) {
  return async (request: NextRequest, context?: unknown) => {
    const adminUser = await getAdminUser(request);

    if (!adminUser) {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    return handler(request, adminUser, context);
  };
}
