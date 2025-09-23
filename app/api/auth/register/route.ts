import { type NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import {
  hashPassword,
  generateToken,
  type RegisterCredentials,
} from "@/lib/auth-utils";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password }: RegisterCredentials = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const users = db.collection("users");

    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const result = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      isAdmin: false, // Default isAdmin to false for new users
      createdAt: new Date(),
    });

    // Generate token
    const token = await generateToken(result.insertedId.toString(), false);

    // Create response with user data (without password)
    const user = {
      id: result.insertedId.toString(),
      name,
      email,
      isAdmin: false, // Include isAdmin in response
    };

    const response = NextResponse.json({
      success: true,
      user,
      token,
    });

    // Set HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
