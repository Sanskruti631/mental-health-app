import { NextResponse } from "next/server";
import db from "@/lib/db";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const [rows]: any = await db.execute(
      "SELECT id, email, name, role, password_hash, is_verified, is_active FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const user = rows[0];

    if (user.is_active === 0) {
      return NextResponse.json(
        { success: false, message: "Account is inactive" },
        { status: 403 }
      );
    }

    const ok = await bcrypt.compare(String(password), String(user.password_hash));
    if (!ok) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const sessionToken = randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await db.execute(
      "INSERT INTO user_sessions (user_id, session_token, expires_at, is_active) VALUES (?, ?, ?, true)",
      [user.id, sessionToken, expiresAt]
    );

    const res = NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          isVerified: !!user.is_verified,
        },
      }
    );

    res.cookies.set("session-token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60,
      path: "/",
    });

    res.cookies.set("user-role", user.role, {
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
