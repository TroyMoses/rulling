import { type NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/admin-auth";

// GET /api/admin/orders - Get all orders (admin only)
export const GET = requireAdmin(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number.parseInt(searchParams.get("limit") || "20");
    const skip = Number.parseInt(searchParams.get("skip") || "0");
    const status = searchParams.get("status");

    const db = await getDatabase();
    const orders = db.collection("orders");

    // Build query
    const query: Record<string, unknown> = {};
    if (status) {
      query.status = status;
    }

    const totalOrders = await orders.countDocuments(query);
    const orderList = await orders
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      orders: orderList.map((order) => ({
        ...order,
        id: order._id.toString(),
      })),
      total: totalOrders,
      page: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(totalOrders / limit),
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
});
