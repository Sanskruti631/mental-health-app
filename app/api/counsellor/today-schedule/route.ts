import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock data - in a real app, this would come from the database
    const todaySchedule = [
      {
        id: 1,
        time: "10:00 AM",
        clientName: "Jessica L.",
        sessionType: "Individual Therapy",
        focus: "Anxiety Management",
        status: "completed",
      },
      {
        id: 2,
        time: "2:00 PM",
        clientName: "David K.",
        sessionType: "Follow-up Session",
        focus: "Depression Treatment",
        status: "upcoming",
      },
      {
        id: 3,
        time: "4:00 PM",
        clientName: "Emma S.",
        sessionType: "Initial Assessment",
        focus: "Academic Stress",
        status: "new-client",
      },
    ]

    return NextResponse.json(todaySchedule)
  } catch (error) {
    console.error("Error fetching today's schedule:", error)
    return NextResponse.json({ error: "Failed to fetch schedule" }, { status: 500 })
  }
}