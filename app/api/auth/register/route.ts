import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // ❌ Removed role from request
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ FORCE ROLE = STUDENT
    const role = "student";

    // Check existing user
    const existingUser = await prisma.users.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 409 }
      );
    }

    const userId = randomUUID();
    const passwordHash = await bcrypt.hash(String(password), 10);

    // ✅ Transaction (ONLY STUDENT PROFILE)
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.users.create({
        data: {
          id: userId,
          email,
          password_hash: passwordHash,
          name,
          role, // always student
          is_active: true,
          is_verified: false,
        },
      });

      // ✅ ONLY student profile created
      await tx.student_profiles.create({
        data: {
          user_id: userId,
          student_id: `STU-${randomUUID().slice(0, 8)}`,
          admin_id: "SYSTEM",
        },
      });

      return user;
    });

    // ✅ Create session
    const sessionToken = randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.user_sessions.create({
      data: {
        user_id: newUser.id,
        session_token: sessionToken,
        expires_at: expiresAt,
        is_active: true,
      },
    });

    const res = NextResponse.json(
      {
        success: true,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        },
      },
      { status: 201 }
    );

    // 🍪 Cookies
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
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
