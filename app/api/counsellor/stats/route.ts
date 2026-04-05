import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock data - in a real app, this would come from the database
    const stats = {
      totalClients: 47,
      todayAppointments: 5,
      completedSessions: 3,
      priorityCases: 2,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching counsellor stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}