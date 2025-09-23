import { type NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/admin-auth";
import { ObjectId } from "mongodb";

// GET /api/admin/orders/[id] - Get single order (admin only)
export const GET = requireAdmin(
  async (request: NextRequest, adminUser, context?: unknown) => {
    const params = (context as { params: { id: string } })?.params;
    try {
      const db = await getDatabase();
      const orders = db.collection("orders");

      const order = await orders.findOne({ _id: new ObjectId(params.id) });

      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      return NextResponse.json({
        order: { ...order, id: order._id.toString() },
      });
    } catch (error) {
      console.error("Error fetching order:", error);
      return NextResponse.json(
        { error: "Failed to fetch order" },
        { status: 500 }
      );
    }
  }
);

export const PUT = requireAdmin(
  async (request: NextRequest, adminUser, context?: unknown) => {
    const params = (context as { params: { id: string } })?.params;
    try {
      const { status } = await request.json();

      if (!status) {
        return NextResponse.json(
          { error: "Status is required" },
          { status: 400 }
        );
      }

      const validStatuses = [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ];
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }

      const db = await getDatabase();
      const orders = db.collection("orders");

      const result = await orders.updateOne(
        { _id: new ObjectId(params.id) },
        {
          $set: {
            status,
            updatedAt: new Date(),
          },
        }
      );

      if (result.matchedCount === 0) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        message: "Order status updated successfully",
      });
    } catch (error) {
      console.error("Error updating order:", error);
      return NextResponse.json(
        { error: "Failed to update order" },
        { status: 500 }
      );
    }
  }
);
