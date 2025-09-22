import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { verifyToken } from "@/lib/auth-utils"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { db } = await connectToDatabase()
    const cart = await db.collection("carts").findOne({ userId: decoded.userId })

    return NextResponse.json({
      success: true,
      cart: cart ? cart.items : [],
    })
  } catch (error) {
    console.error("Get cart error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { items } = await request.json()

    const { db } = await connectToDatabase()
    await db.collection("carts").updateOne(
      { userId: decoded.userId },
      {
        $set: {
          items,
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Save cart error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
