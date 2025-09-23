import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET /api/reviews - Get reviews with optional product filtering
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);

    const productId = searchParams.get("productId");
    const limit = Number.parseInt(searchParams.get("limit") || "20");
    const skip = Number.parseInt(searchParams.get("skip") || "0");

    // Build query
    const query: Record<string, unknown> = { status: "approved" };
    if (productId) query.productId = productId;

    const reviews = await db
      .collection("reviews")
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// POST /api/reviews - Submit product review
export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const formData = await request.formData();

    // Extract review data
    const reviewData = {
      productId: formData.get("productId") as string,
      customerName: formData.get("customerName") as string,
      customerEmail: formData.get("customerEmail") as string,
      rating: Number.parseInt(formData.get("rating") as string),
      title: formData.get("title") as string,
      comment: formData.get("comment") as string,
      status: "pending", // Reviews need approval
      createdAt: new Date().toISOString(),
    };

    // Validate required fields
    if (
      !reviewData.productId ||
      !reviewData.customerName ||
      !reviewData.rating ||
      !reviewData.comment
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate rating range
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Save review
    const result = await db.collection("reviews").insertOne(reviewData);

    // Update product rating (recalculate average)
    await updateProductRating(db, reviewData.productId);

    return NextResponse.json({
      success: true,
      message: "Review submitted successfully and is pending approval",
      reviewId: result.insertedId,
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}

// Helper function to update product rating
import type { Db } from "mongodb";

async function updateProductRating(db: Db, productId: string) {
  try {
    const reviews = await db
      .collection("reviews")
      .find({ productId, status: "approved" })
      .toArray();

    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (sum: number, review) =>
          sum + (typeof review.rating === "number" ? review.rating : 0),
        0
      );
      const averageRating = totalRating / reviews.length;

      await db.collection("products").updateOne(
        { _id: new ObjectId(productId) },
        {
          $set: {
            rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
            reviewCount: reviews.length,
          },
        }
      );
    }
  } catch (error) {
    console.error("Error updating product rating:", error);
  }
}
