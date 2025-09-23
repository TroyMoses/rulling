import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/admin-auth";

// GET /api/admin/analytics - Get analytics data (admin only)
// export const GET = requireAdmin(async (request: NextRequest) => {
export const GET = requireAdmin(async () => {
  try {
    const db = await getDatabase();

    // Get counts
    const [totalProducts, totalUsers, totalOrders, totalReviews] =
      await Promise.all([
        db.collection("products").countDocuments(),
        db.collection("users").countDocuments(),
        db.collection("orders").countDocuments(),
        db.collection("reviews").countDocuments(),
      ]);

    // Get recent activity
    const recentProducts = await db
      .collection("products")
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    const recentOrders = await db
      .collection("orders")
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    // Calculate revenue (mock data for now)
    const totalRevenue = await db
      .collection("orders")
      .aggregate([
        { $match: { status: { $in: ["delivered", "processing"] } } },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ])
      .toArray();

    const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;

    return NextResponse.json({
      stats: {
        totalProducts,
        totalUsers,
        totalOrders,
        totalReviews,
        totalRevenue: revenue,
      },
      recentActivity: {
        products: recentProducts.map((p) => ({ ...p, id: p._id.toString() })),
        orders: recentOrders.map((o) => ({ ...o, id: o._id.toString() })),
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
});
