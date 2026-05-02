import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    // Get user ID from session
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

    const userId = session.users.id

    // Get appointments based on user role
    let appointments
    if (session.users.role === "student") {
      appointments = await prisma.appointments.findMany({
        where: { student_id: userId },
        include: {
          users_appointments_therapist_idTousers: {
            select: { name: true, id: true },
          },
        },
        orderBy: [{ appointment_date: "asc" }],
      })
    } else if (session.users.role === "therapist") {
      appointments = await prisma.appointments.findMany({
        where: { therapist_id: userId },
        include: {
          users_appointments_student_idTousers: {
            select: { name: true, id: true },
          },
        },
        orderBy: [{ appointment_date: "asc" }],
      })
    } else {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const formattedAppointments = appointments.map((apt) => ({
      id: apt.id,
      partnerName: session.users.role === "student" 
        ? apt.users_appointments_therapist_idTousers.name 
        : apt.users_appointments_student_idTousers.name,
      date: apt.appointment_date?.toISOString().split("T")[0],
      time: apt.appointment_time?.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      type: apt.session_type,
      status: apt.status,
      duration: apt.duration_minutes,
      notes: apt.notes,
    }))

    return NextResponse.json(formattedAppointments)
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Get user ID from session
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

    if (!session?.users || session.users.role !== "student") {
      return NextResponse.json({ error: "Only students can book appointments" }, { status: 403 })
    }

    const body = await request.json()
    const { therapistId, date, time, type, notes } = body

    if (!therapistId || !date || !time || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create appointment
    const appointment = await prisma.appointments.create({
      data: {
        student_id: session.users.id,
        therapist_id: therapistId,
        appointment_date: new Date(date),
        appointment_time: new Date(`2000-01-01T${time}`),
        session_type: type,
        status: "pending",
        urgency_level: "medium",
        notes: notes || null,
        duration_minutes: 60,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Appointment booked successfully",
      data: {
        id: appointment.id,
        date: appointment.appointment_date.toISOString().split("T")[0],
        time: appointment.appointment_time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      },
    })
  } catch (error) {
    console.error("Error booking appointment:", error)
    return NextResponse.json({ error: "Failed to book appointment" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    // Get user ID from session
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
    const { appointmentId, date, time, status } = body

    if (!appointmentId) {
      return NextResponse.json({ error: "Missing appointment ID" }, { status: 400 })
    }

    // Update appointment
    const appointment = await prisma.appointments.update({
      where: { id: appointmentId },
      data: {
        ...(date && { appointment_date: new Date(date) }),
        ...(time && { appointment_time: new Date(`2000-01-01T${time}`) }),
        ...(status && { status }),
      },
    })

    return NextResponse.json({
      success: true,
      message: "Appointment updated successfully",
      data: {
        id: appointment.id,
      },
    })
  } catch (error) {
    console.error("Error updating appointment:", error)
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    // Get user ID from session
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

    const { searchParams } = new URL(request.url)
    const appointmentId = searchParams.get("id")

    if (!appointmentId) {
      return NextResponse.json({ error: "Missing appointment ID" }, { status: 400 })
    }

    // Cancel appointment
    await prisma.appointments.update({
      where: { id: appointmentId },
      data: { status: "cancelled" },
    })

    return NextResponse.json({
      success: true,
      message: "Appointment cancelled successfully",
    })
  } catch (error) {
    console.error("Error cancelling appointment:", error)
    return NextResponse.json({ error: "Failed to cancel appointment" }, { status: 500 })
  }
}
