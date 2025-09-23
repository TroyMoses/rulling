import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { saveUploadedFile, extractFilesFromFormData } from "@/lib/upload-utils";

// GET /api/banners - Get all banners
export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const banners = await db
      .collection("banners")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ banners });
  } catch (error) {
    console.error("Error fetching banners:", error);
    return NextResponse.json(
      { error: "Failed to fetch banners" },
      { status: 500 }
    );
  }
}

// POST /api/banners - Create new banner
export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const formData = await request.formData();

    // Extract banner data
    const bannerData = {
      title: formData.get("title") as string,
      subtitle: (formData.get("subtitle") as string) || "",
      description: (formData.get("description") as string) || "",
      buttonText: (formData.get("buttonText") as string) || "",
      buttonLink: (formData.get("buttonLink") as string) || "",
      position: (formData.get("position") as string) || "hero",
      isActive: formData.get("isActive") === "true",
      backgroundColor: (formData.get("backgroundColor") as string) || "#ffffff",
      textColor: (formData.get("textColor") as string) || "#000000",
    };

    // Handle image upload
    const imageFiles = extractFilesFromFormData(formData, "image");
    let imagePath = "";

    if (imageFiles.length > 0) {
      imagePath = await saveUploadedFile(imageFiles[0], "banners");
    }

    // Create banner document
    const banner = {
      ...bannerData,
      image: imagePath,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await db.collection("banners").insertOne(banner);

    return NextResponse.json({
      success: true,
      bannerId: result.insertedId,
      banner: { ...banner, id: result.insertedId },
    });
  } catch (error) {
    console.error("Error creating banner:", error);
    return NextResponse.json(
      { error: "Failed to create banner" },
      { status: 500 }
    );
  }
}
