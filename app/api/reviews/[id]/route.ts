import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// PUT /api/reviews/[id] - Update review status (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase();
    const formData = await request.formData();

    const status = formData.get("status") as string;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const result = await db.collection("reviews").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          status,
          updatedAt: new Date().toISOString(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // If approved, update product rating
    if (status === "approved") {
      const review = await db
        .collection("reviews")
        .findOne({ _id: new ObjectId(params.id) });
      if (review) {
        await updateProductRating(db, review.productId);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Review status updated successfully",
    });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}

// DELETE /api/reviews/[id] - Delete review (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase();

    const review = await db
      .collection("reviews")
      .findOne({ _id: new ObjectId(params.id) });
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    await db.collection("reviews").deleteOne({ _id: new ObjectId(params.id) });

    // Update product rating after deletion
    await updateProductRating(db, review.productId);

    return NextResponse.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}

// Helper function to update product rating
import type { Db } from "mongodb";

async function updateProductRating(db: Db, productId: string) {
  try {
    const reviews = await db
      .collection<{ rating: number }>("reviews")
      .find({ productId, status: "approved" })
      .toArray();

    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (sum: number, review) => sum + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;

      await db.collection("products").updateOne(
        { _id: new ObjectId(productId) },
        {
          $set: {
            rating: Math.round(averageRating * 10) / 10,
            reviewCount: reviews.length,
          },
        }
      );
    } else {
      // No approved reviews, reset rating
      await db.collection("products").updateOne(
        { _id: new ObjectId(productId) },
        {
          $set: {
            rating: 0,
            reviewCount: 0,
          },
        }
      );
    }
  } catch (error) {
    console.error("Error updating product rating:", error);
  }
}
