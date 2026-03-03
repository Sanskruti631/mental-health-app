import { NextResponse } from "next/server";
import db from "@/lib/db";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const { email, password, name, role } = await req.json();

    const id = randomUUID();

    const query = `
      INSERT INTO users (id, email, password_hash, name, role)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.execute(query, [
      id,
      email,
      password,
      name,
      role,
    ]);

    const sessionToken = randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await db.execute(
      "INSERT INTO user_sessions (user_id, session_token, expires_at, is_active) VALUES (?, ?, ?, true)",
      [id, sessionToken, expiresAt]
    );

    const [rows]: any = await db.execute("SELECT * FROM users WHERE id = ?", [id]);

    const res = NextResponse.json({
      success: true,
      user: rows?.[0] || null,
    });
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
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
