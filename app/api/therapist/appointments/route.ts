import { NextResponse } from "next/server"

export async function GET() {
  try {
    const appointments = [
      {
        id: "1",
        studentName: "Anonymous Student A",
        time: "10:00 AM",
        date: "Today",
        type: "video",
        status: "confirmed",
        isFirstSession: false,
        urgency: "medium",
      },
      {
        id: "2",
        studentName: "Anonymous Student B",
        time: "2:00 PM",
        date: "Today",
        type: "phone",
        status: "confirmed",
        isFirstSession: true,
        urgency: "high",
      },
      {
        id: "3",
        studentName: "Anonymous Student C",
        time: "9:00 AM",
        date: "Tomorrow",
        type: "in-person",
        status: "pending",
        isFirstSession: false,
        urgency: "low",
      },
    ]

    return NextResponse.json(appointments)
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, date, time } = body

    // In a real app, this would update the database
    const updatedAppointment = {
      id,
      date: date || "Updated",
      time: time || "Updated",
      message: "Appointment rescheduled successfully"
    }

    return NextResponse.json(updatedAppointment)
  } catch (error) {
    console.error("Error updating appointment:", error)
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 })
  }
}