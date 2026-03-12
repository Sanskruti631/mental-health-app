import { NextResponse } from "next/server";
import db from "@/lib/db";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, name, role } = await req.json();
    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    const allowedRoles = ["student", "admin", "therapist"];
    if (!allowedRoles.includes(role)) {
      return NextResponse.json(
        { success: false, message: "Invalid role" },
        { status: 400 }
      );
    }

    // Enforce unique email
    const [exists]: any = await db.execute("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
    if (exists.length) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 409 }
      );
    }

    const id = randomUUID();
    const passwordHash = await bcrypt.hash(String(password), 10);

    const query = `
      INSERT INTO users (id, email, password_hash, name, role)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.execute(query, [
      id,
      email,
      passwordHash,
      name,
      role,
    ]);

    const sessionToken = randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await db.execute(
      "INSERT INTO user_sessions (user_id, session_token, expires_at, is_active) VALUES (?, ?, ?, true)",
      [id, sessionToken, expiresAt]
    );

    const [rows]: any = await db.execute(
      "SELECT id, email, name, role, is_verified, is_active FROM users WHERE id = ?",
      [id]
    );

    const res = NextResponse.json(
      {
        success: true,
        user: rows?.[0] || null,
      },
      { status: 201 }
    );
    res.cookies.set("session-token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60,
      path: "/",
    });
    res.cookies.set("user-role", role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60,
      path: "/",
    });
    return res;

  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
