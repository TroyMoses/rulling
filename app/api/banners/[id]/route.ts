import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { saveUploadedFile, extractFilesFromFormData } from "@/lib/upload-utils";
import { ObjectId } from "mongodb";

// GET /api/banners/[id] - Get single banner
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase();
    const banner = await db
      .collection("banners")
      .findOne({ _id: new ObjectId(params.id) });

    if (!banner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json({ banner: { ...banner, id: banner._id } });
  } catch (error) {
    console.error("Error fetching banner:", error);
    return NextResponse.json(
      { error: "Failed to fetch banner" },
      { status: 500 }
    );
  }
}

// PUT /api/banners/[id] - Update banner
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase();
    const formData = await request.formData();

    // Extract banner data
    interface BannerUpdateData {
      title: string;
      subtitle: string;
      description: string;
      buttonText: string;
      buttonLink: string;
      position: string;
      isActive: boolean;
      backgroundColor: string;
      textColor: string;
      updatedAt: string;
      image?: string;
    }

    const updateData: BannerUpdateData = {
      title: formData.get("title") as string,
      subtitle: (formData.get("subtitle") as string) || "",
      description: (formData.get("description") as string) || "",
      buttonText: (formData.get("buttonText") as string) || "",
      buttonLink: (formData.get("buttonLink") as string) || "",
      position: (formData.get("position") as string) || "hero",
      isActive: formData.get("isActive") === "true",
      backgroundColor: (formData.get("backgroundColor") as string) || "#ffffff",
      textColor: (formData.get("textColor") as string) || "#000000",
      updatedAt: new Date().toISOString(),
    };

    // Handle new image upload
    const imageFiles = extractFilesFromFormData(formData, "image");
    if (imageFiles.length > 0) {
      updateData.image = await saveUploadedFile(imageFiles[0], "banners");
    }

    const result = await db
      .collection("banners")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Banner updated successfully",
    });
  } catch (error) {
    console.error("Error updating banner:", error);
    return NextResponse.json(
      { error: "Failed to update banner" },
      { status: 500 }
    );
  }
}

// DELETE /api/banners/[id] - Delete banner
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase();

    const result = await db
      .collection("banners")
      .deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting banner:", error);
    return NextResponse.json(
      { error: "Failed to delete banner" },
      { status: 500 }
    );
  }
}
