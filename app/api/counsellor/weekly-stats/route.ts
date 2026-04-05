import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock data - in a real app, this would come from the database
    const weeklyStats = {
      sessionsCompleted: 24,
      newClients: 3,
      followUpsScheduled: 18,
      notesWritten: 24,
      averageSessionDuration: 50, // minutes
      clientSatisfaction: 4.8, // out of 5
    }

    return NextResponse.json(weeklyStats)
  } catch (error) {
    console.error("Error fetching weekly stats:", error)
    return NextResponse.json({ error: "Failed to fetch weekly stats" }, { status: 500 })
  }
}