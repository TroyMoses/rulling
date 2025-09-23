import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import {
  saveMultipleFiles,
  extractFilesFromFormData,
} from "@/lib/upload-utils";
import { ObjectId } from "mongodb";

// GET /api/products/[id] - Get single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase();
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(params.id) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product: { ...product, id: product._id } });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase();
    const formData = await request.formData();

    // Extract product data
    interface ProductUpdateData {
      whatsInTheBox: string[];
      keyFeatures: string[];
      mainFeatures: string[];
      specifications: Record<string, unknown>;
      name: string;
      description: string;
      price: number;
      category: string;
      brand: string;
      stock: number;
      featured: boolean;
      updatedAt: string;
      originalPrice?: number;
      subcategory?: string;
      tags?: string[];
      images?: string[];
    }

    const updateData: ProductUpdateData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number.parseInt(formData.get("price") as string),
      category: formData.get("category") as string,
      brand: formData.get("brand") as string,
      stock: Number.parseInt(formData.get("stock") as string),
      featured: formData.get("featured") === "true",
      updatedAt: new Date().toISOString(),
      whatsInTheBox: [],
      keyFeatures: [],
      mainFeatures: [],
      specifications: {},
    };

    // Handle optional fields
    if (formData.get("originalPrice")) {
      updateData.originalPrice = Number.parseInt(
        formData.get("originalPrice") as string
      );
    }
    if (formData.get("subcategory")) {
      updateData.subcategory = formData.get("subcategory") as string;
    }
    if (formData.get("tags")) {
      updateData.tags = (formData.get("tags") as string)
        .split(",")
        .map((tag) => tag.trim());
    }

    // Handle specifications, mainFeatures, keyFeatures, and whatsInTheBox
    if (formData.get("specifications")) {
      try {
        updateData.specifications = JSON.parse(
          formData.get("specifications") as string
        );
      } catch {
        // If JSON parsing fails, treat as empty object
        updateData.specifications = {};
      }
    }

    if (formData.get("mainFeatures")) {
      const mainFeaturesStr = formData.get("mainFeatures") as string;
      updateData.mainFeatures = mainFeaturesStr
        ? mainFeaturesStr.split(",").map((feature) => feature.trim())
        : [];
    }

    if (formData.get("keyFeatures")) {
      const keyFeaturesStr = formData.get("keyFeatures") as string;
      updateData.keyFeatures = keyFeaturesStr
        ? keyFeaturesStr.split(",").map((feature) => feature.trim())
        : [];
    }

    if (formData.get("whatsInTheBox")) {
      const whatsInTheBoxStr = formData.get("whatsInTheBox") as string;
      updateData.whatsInTheBox = whatsInTheBoxStr
        ? whatsInTheBoxStr.split(",").map((item) => item.trim())
        : [];
    }

    // Handle new image uploads
    const imageFiles = extractFilesFromFormData(formData, "images");
    if (imageFiles.length > 0) {
      const newImagePaths = await saveMultipleFiles(imageFiles, "products");
      // Get existing images
      const existingProduct = await db
        .collection("products")
        .findOne({ _id: new ObjectId(params.id) });
      updateData.images = [
        ...(existingProduct?.images || []),
        ...newImagePaths,
      ];
    }

    const result = await db
      .collection("products")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase();

    const result = await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
