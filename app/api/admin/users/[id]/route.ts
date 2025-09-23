import { type NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/admin-auth";
import { ObjectId } from "mongodb";

// GET /api/admin/users/[id] - Get single user (admin only)
export const GET = requireAdmin(
  async (_request: NextRequest, _adminUser, context?: unknown) => {
    const params = (context as { params: { id: string } })?.params;
    try {
      const db = await getDatabase();
      const users = db.collection("users");

      const user = await users.findOne(
        { _id: new ObjectId(params.id) },
        { projection: { password: 0 } }
      );

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({ user: { ...user, id: user._id.toString() } });
    } catch (error) {
      console.error("Error fetching user:", error);
      return NextResponse.json(
        { error: "Failed to fetch user" },
        { status: 500 }
      );
    }
  }
);

// PUT /api/admin/users/[id] - Update user (admin only)
export const PUT = requireAdmin(
  async (request: NextRequest, _adminUser, context?: unknown) => {
    const params = (context as { params: { id: string } })?.params;
    try {
      const { name, email, isAdmin } = await request.json();

      if (!name || !email) {
        return NextResponse.json(
          { error: "Name and email are required" },
          { status: 400 }
        );
      }

      const db = await getDatabase();
      const users = db.collection("users");

      // Check if email is already taken by another user
      const existingUser = await users.findOne({
        email,
        _id: { $ne: new ObjectId(params.id) },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 400 }
        );
      }

      const result = await users.updateOne(
        { _id: new ObjectId(params.id) },
        {
          $set: {
            name,
            email,
            isAdmin: Boolean(isAdmin),
            updatedAt: new Date(),
          },
        }
      );

      if (result.matchedCount === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        message: "User updated successfully",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 }
      );
    }
  }
);

// DELETE /api/admin/users/[id] - Delete user (admin only)
export const DELETE = requireAdmin(
  async (request: NextRequest, adminUser, context?: unknown) => {
    const params = (context as { params: { id: string } })?.params;
    try {
      // Prevent admin from deleting themselves
      if (params.id === adminUser.id) {
        return NextResponse.json(
          { error: "Cannot delete your own account" },
          { status: 400 }
        );
      }

      const db = await getDatabase();
      const users = db.collection("users");

      const result = await users.deleteOne({ _id: new ObjectId(params.id) });

      if (result.deletedCount === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      return NextResponse.json(
        { error: "Failed to delete user" },
        { status: 500 }
      );
    }
  }
);
