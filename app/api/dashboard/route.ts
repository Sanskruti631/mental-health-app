import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Total clients (students)
    const totalClients = await prisma.users.count({
      where: { role: "student" },
    });

    // Today appointments
    const today = new Date();
    const todayAppointments = await prisma.appointments.count({
      where: {
        appointment_date: today,
      },
    });

    // Completed sessions
    const completedSessions = await prisma.appointments.count({
      where: {
        status: "completed",
      },
    });

    // Priority cases (example: high urgency)
    const priorityCases = await prisma.appointments.count({
      where: {
        urgency_level: "high",
      },
    });

    return NextResponse.json({
      totalClients,
      todayAppointments,
      completedSessions,
      priorityCases,
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load dashboard data" },
      { status: 500 }
    );
  }
}
