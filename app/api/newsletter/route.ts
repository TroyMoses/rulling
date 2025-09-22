import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

// POST /api/newsletter - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const formData = await request.formData();

    const email = formData.get("email") as string;
    const name = (formData.get("name") as string) || "";

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await db
      .collection("newsletter_subscribers")
      .findOne({ email });

    if (existingSubscriber) {
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 409 }
      );
    }

    // Create subscription
    const subscription = {
      email,
      name,
      status: "active",
      subscribedAt: new Date().toISOString(),
      preferences: {
        promotions: true,
        newProducts: true,
        newsletters: true,
      },
    };

    const result = await db
      .collection("newsletter_subscribers")
      .insertOne(subscription);

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
      subscriptionId: result.insertedId,
    });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}

// GET /api/newsletter - Get all newsletter subscribers (admin only)
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);

    const status = searchParams.get("status") || "active";
    const limit = Number.parseInt(searchParams.get("limit") || "100");
    const skip = Number.parseInt(searchParams.get("skip") || "0");

    const subscribers = await db
      .collection("newsletter_subscribers")
      .find({ status })
      .skip(skip)
      .limit(limit)
      .sort({ subscribedAt: -1 })
      .toArray();

    return NextResponse.json({ subscribers, count: subscribers.length });
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}
