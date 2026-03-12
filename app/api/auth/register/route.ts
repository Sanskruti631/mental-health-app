import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
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

    // Create user and profile in a transaction
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.users.create({
        data: {
          id: userId,
          email,
          password_hash: passwordHash,
          name,
          role,
          is_active: true,
          is_verified: false,
        },
      });

      // Create role-specific profile if needed
      if (role === "student") {
        await tx.student_profiles.create({
          data: {
            user_id: userId,
            student_id: `STU-${randomUUID().slice(0, 8)}`, // Placeholder student ID
            admin_id: "SYSTEM", // Placeholder admin ID
          },
        });
      } else if (role === "admin") {
        await tx.admin_profiles.create({
          data: {
            user_id: userId,
            college_name: "SoulSupport Academy", // Placeholder
            college_id: `ADM-${randomUUID().slice(0, 8)}`, // Placeholder
          },
        });
      } else if (role === "therapist") {
        await tx.therapist_profiles.create({
          data: {
            user_id: userId,
            license_number: `LIC-${randomUUID().slice(0, 8)}`, // Placeholder
          },
        });
      }

      return user;
    });

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
