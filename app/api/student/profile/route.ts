import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const studentId = "default-student"; // In production, get from session/auth
    
    // Get student profile info
    const studentProfile = await prisma.student_profiles.findFirst({
      include: {
        users: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    const studentName = studentProfile?.users?.name || "Student";
    const major = studentProfile?.major || "Computer Science";
    const enrollmentYear = studentProfile?.enrollment_date
      ? new Date().getFullYear() - new Date(studentProfile.enrollment_date).getFullYear()
      : 3;

    return NextResponse.json({
      name: studentName,
      major,
      year: enrollmentYear,
      email: studentProfile?.users?.email || "",
    });
  } catch (error) {
    console.error("Failed to fetch student info:", error);
    return NextResponse.json(
      { error: "Failed to fetch student info" },
      { status: 500 }
    );
  }
}
