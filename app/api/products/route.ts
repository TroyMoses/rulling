import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import {
  saveMultipleFiles,
  extractFilesFromFormData,
} from "@/lib/upload-utils";

// GET /api/products - Get all products with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const limit = Number.parseInt(searchParams.get("limit") || "0");
    const skip = Number.parseInt(searchParams.get("skip") || "0");

    // Build query
    const query: Record<string, unknown> = {};
    if (category) query.category = category;
    if (featured) query.featured = featured === "true";

    const products = await db
      .collection("products")
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products - Create new product
export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const formData = await request.formData();

    // Extract product data
    const productData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number.parseInt(formData.get("price") as string),
      originalPrice: formData.get("originalPrice")
        ? Number.parseInt(formData.get("originalPrice") as string)
        : undefined,
      category: formData.get("category") as string,
      subcategory: (formData.get("subcategory") as string) || undefined,
      brand: formData.get("brand") as string,
      stock: Number.parseInt(formData.get("stock") as string),
      featured: formData.get("featured") === "true",
      tags: formData.get("tags")
        ? (formData.get("tags") as string).split(",").map((tag) => tag.trim())
        : [],
      specifications: formData.get("specifications")
        ? JSON.parse(formData.get("specifications") as string)
        : {},
      mainFeatures: formData.get("mainFeatures")
        ? (formData.get("mainFeatures") as string)
            .split(",")
            .map((f) => f.trim())
        : [],
      keyFeatures: formData.get("keyFeatures")
        ? (formData.get("keyFeatures") as string)
            .split(",")
            .map((f) => f.trim())
        : [],
      whatsInTheBox: formData.get("whatsInTheBox")
        ? (formData.get("whatsInTheBox") as string)
            .split(",")
            .map((f) => f.trim())
        : [],
    };

    // Handle image uploads
    const imageFiles = extractFilesFromFormData(formData, "images");
    const imagePaths =
      imageFiles.length > 0
        ? await saveMultipleFiles(imageFiles, "products")
        : [];

    // Create product document
    const product = {
      ...productData,
      images: imagePaths,
      rating: 0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await db.collection("products").insertOne(product);

    return NextResponse.json({
      success: true,
      productId: result.insertedId,
      product: { ...product, id: result.insertedId },
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
