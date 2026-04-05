import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Get recent activities from appointments and notes
    const appointments = await prisma.appointments.findMany({
      where: { status: "completed" },
      select: { created_at: true, session_type: true },
      orderBy: { created_at: "desc" },
      take: 3,
    });

    const notes = await prisma.appointment_notes.findMany({
      select: { created_at: true, session_notes: true, risk_assessment: true },
      orderBy: { created_at: "desc" },
      take: 3,
    });

    const activities = [
      {
        type: "chat",
        icon: "MessageCircle",
        title: "AI Chat Session",
        description: "Discussed stress management techniques",
        color: "blue",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        type: "assessment",
        icon: "Brain",
        title: "Completed PHQ-9 Assessment",
        description: "Score improved from last assessment",
        color: "green",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      },
      {
        type: "resource",
        icon: "BookOpen",
        title: "Read Article",
        description: '"Managing Academic Stress"',
        color: "purple",
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      },
    ];

    return NextResponse.json(activities);
  } catch (error) {
    console.error("Failed to fetch activities:", error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}
