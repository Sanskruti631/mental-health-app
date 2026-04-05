import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    // Get therapist ID from session
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

    if (!session?.users || session.users.role !== "therapist") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get appointments for this therapist
    const appointments = await prisma.appointments.findMany({
      where: { therapist_id: session.users.id },
      include: {
        users_appointments_student_idTousers: {
          select: { name: true },
        },
      },
      orderBy: [
        { appointment_date: "asc" },
        { appointment_time: "asc" },
      ],
    })

    const formattedAppointments = appointments.map((apt) => ({
      id: apt.id,
      studentName: apt.users_appointments_student_idTousers.name || "Anonymous Student",
      time: apt.appointment_time?.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      date: apt.appointment_date?.toLocaleDateString(),
      type: apt.session_type || "video",
      status: apt.status,
      isFirstSession: apt.is_first_session,
      urgency: apt.urgency_level,
    }))

    return NextResponse.json(formattedAppointments)
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
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

    if (!session?.users) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { id, date, time } = body

    // Update appointment in database
    const updatedAppointment = await prisma.appointments.update({
      where: { id },
      data: {
        appointment_date: new Date(date),
        appointment_time: new Date(`2000-01-01T${time}`),
      },
    })

    return NextResponse.json({
      id: updatedAppointment.id,
      message: "Appointment rescheduled successfully",
    })
  } catch (error) {
    console.error("Error updating appointment:", error)
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 })
  }
}