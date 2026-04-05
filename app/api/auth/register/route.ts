import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, name, role = "student", licenseNumber, yearsExperience, bio } = await req.json();

    // ✅ Accept role from request (defaults to "student")
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Validate role
    if (!["student", "therapist", "admin"].includes(role)) {
      return NextResponse.json(
        { success: false, message: "Invalid role" },
        { status: 400 }
      );
    }

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

    // ✅ Transaction - create appropriate profile based on role
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.users.create({
        data: {
          id: userId,
          email,
          password_hash: passwordHash,
          name,
          role, // Use the provided role
          is_active: true,
          is_verified: false,
        },
      });

      // ✅ Create profile based on role
      if (role === "student") {
        await tx.student_profiles.create({
          data: {
            user_id: userId,
            student_id: `STU-${randomUUID().slice(0, 8)}`,
            admin_id: "SYSTEM",
          },
        });
      } else if (role === "therapist") {
        // For therapist, create therapist profile
        await tx.therapist_profiles.create({
          data: {
            user_id: userId,
            license_number: licenseNumber || `LIC-${randomUUID().slice(0, 8)}`,
            years_experience: yearsExperience || "0",
            bio: bio || "",
            is_accepting_patients: true,
          },
        });
      } else if (role === "admin") {
        // For admin, create admin profile
        await tx.admin_profiles.create({
          data: {
            user_id: userId,
            college_name: "System Admin",
            college_id: `COL-${randomUUID().slice(0, 8)}`,
          },
        });
      }

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
