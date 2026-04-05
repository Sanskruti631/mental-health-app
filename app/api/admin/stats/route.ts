import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Total students
    const totalStudents = await prisma.users.count({
      where: { role: "student" },
    });

    // Active counselors
    const activeCounselors = await prisma.users.count({
      where: { 
        role: "therapist",
        is_active: true
      },
    });

    // This week's sessions
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const weekSessions = await prisma.appointments.count({
      where: {
        appointment_date: {
          gte: sevenDaysAgo,
        },
      },
    });

    // Crisis alerts (high urgency appointments)
    const crisisAlerts = await prisma.appointments.count({
      where: {
        urgency_level: "high",
        status: { in: ["pending", "confirmed"] },
      },
    });

    // AI Chats (estimated from appointment notes)
    const aiChats = await prisma.appointment_notes.count();

    // Completed sessions
    const completedSessions = await prisma.appointments.count({
      where: { status: "completed" },
    });

    // Today's sessions
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todaySessions = await prisma.appointments.count({
      where: {
        appointment_date: today,
      },
    });

    return NextResponse.json({
      totalStudents,
      activeCounselors,
      weekSessions,
      crisisAlerts,
      aiChats,
      completedSessions,
      todaySessions,
    });
  } catch (error) {
    console.error("Failed to load admin stats:", error);
    return NextResponse.json(
      { error: "Failed to load admin stats" },
      { status: 500 }
    );
  }
}
