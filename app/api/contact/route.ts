import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

// POST /api/contact - Submit contact form
export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const formData = await request.formData();

    // Extract contact data
    const contactData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || "",
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      status: "unread",
      createdAt: new Date().toISOString(),
    };

    // Validate required fields
    if (
      !contactData.name ||
      !contactData.email ||
      !contactData.subject ||
      !contactData.message
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save contact submission
    const result = await db.collection("contacts").insertOne(contactData);

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
      contactId: result.insertedId,
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}

// GET /api/contact - Get all contact submissions (admin only)
export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);

    const status = searchParams.get("status");
    const limit = Number.parseInt(searchParams.get("limit") || "50");
    const skip = Number.parseInt(searchParams.get("skip") || "0");

    // Build query
    const query: Record<string, unknown> = {};
    if (status) query.status = status;

    const contacts = await db
      .collection("contacts")
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
