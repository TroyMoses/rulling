import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { saveUploadedFile, extractFilesFromFormData } from "@/lib/upload-utils";

// GET /api/testimonials - Get all approved testimonials
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);

    const limit = Number.parseInt(searchParams.get("limit") || "10");
    const skip = Number.parseInt(searchParams.get("skip") || "0");

    const testimonials = await db
      .collection("testimonials")
      .find({ status: "approved" })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

// POST /api/testimonials - Submit testimonial
export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const formData = await request.formData();

    // Extract testimonial data
    const testimonialData = {
      customerName: formData.get("customerName") as string,
      customerEmail: (formData.get("customerEmail") as string) || "",
      company: (formData.get("company") as string) || "",
      position: (formData.get("position") as string) || "",
      testimonial: formData.get("testimonial") as string,
      rating: Number.parseInt(formData.get("rating") as string) || 5,
      status: "pending", // Testimonials need approval
      createdAt: new Date().toISOString(),
    };

    // Handle optional avatar upload
    const avatarFiles = extractFilesFromFormData(formData, "avatar");
    let avatarPath = "";

    if (avatarFiles.length > 0) {
      avatarPath = await saveUploadedFile(avatarFiles[0], "testimonials");
    }

    // Validate required fields
    if (!testimonialData.customerName || !testimonialData.testimonial) {
      return NextResponse.json(
        { error: "Name and testimonial are required" },
        { status: 400 }
      );
    }

    // Create testimonial document
    const testimonial = {
      ...testimonialData,
      avatar: avatarPath,
    };

    const result = await db.collection("testimonials").insertOne(testimonial);

    return NextResponse.json({
      success: true,
      message: "Testimonial submitted successfully and is pending approval",
      testimonialId: result.insertedId,
    });
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    return NextResponse.json(
      { error: "Failed to submit testimonial" },
      { status: 500 }
    );
  }
}
