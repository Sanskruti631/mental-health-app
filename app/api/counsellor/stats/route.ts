import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    // Get counselor/admin ID from session
    const sessionToken = request.headers.get("cookie")?.split("session-token=")[1]?.split(";")[0]
    
    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const session = await prisma.user_sessions.findFirst({
      where: {
        session_token: sessionToken,
        is_active: true,
        expires_at: { gt: new Date() },
      },
      include: { users: true },
    })

    if (!session?.users || !["admin", "therapist"].includes(session.users.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.users.id

    // Get real stats from database
    const totalStudents = await prisma.users.count({
      where: { role: "student" },
    })

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayAppointments = await prisma.appointments.count({
      where: {
        therapist_id: userId,
        appointment_date: {
          gte: today,
        },
      },
    })

    const completedSessions = await prisma.appointments.count({
      where: {
        therapist_id: userId,
        status: "confirmed",
      },
    })

    const priorityCases = await prisma.appointments.count({
      where: {
        therapist_id: userId,
        urgency_level: "high",
      },
    })

    const stats = {
      totalClients: totalStudents,
      todayAppointments,
      completedSessions,
      priorityCases,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching counsellor stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}