import { type NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/admin-auth";

// GET /api/admin/users - Get all users (admin only)
export const GET = requireAdmin(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number.parseInt(searchParams.get("limit") || "20");
    const skip = Number.parseInt(searchParams.get("skip") || "0");
    const search = searchParams.get("search") || "";

    const db = await getDatabase();
    const users = db.collection("users");

    // Build query
    const query: Record<string, unknown> = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const totalUsers = await users.countDocuments(query);
    const userList = await users
      .find(query, { projection: { password: 0 } })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      users: userList.map((user) => ({ ...user, id: user._id.toString() })),
      total: totalUsers,
      page: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
});
