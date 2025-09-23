import bcrypt from "bcryptjs";
import * as jose from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export interface User {
  _id?: string;
  id?: string;
  email: string;
  name: string;
  password?: string;
  isAdmin?: boolean; // Added isAdmin field with default false
  createdAt?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function generateToken(
  userId: string,
  isAdmin: boolean
): Promise<string> {
  return new jose.SignJWT({ userId, isAdmin })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
}

export async function verifyToken(
  token: string
): Promise<{ userId: string; isAdmin: boolean } | null> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return {
      userId: payload.userId as string,
      isAdmin: Boolean(payload.isAdmin),
    };
  } catch (err) {
    console.error("[verifyToken] Invalid token:", err);
    return null;
  }
}
