import { NextResponse } from "next/server"

export async function GET() {
  try {
    const patientOverview = {
      totalPatients: 47,
      improvementRate: 89,
      avgSessionsPerPatient: 4.2,
      patientBreakdown: {
        active: 35,
        inactive: 12,
        referrals: 3,
      },
      conditionsHandled: [
        "Depression",
        "Anxiety",
        "Trauma & PTSD",
        "Academic Stress",
        "Relationship Issues",
        "Career Counseling",
      ],
      successMetrics: {
        patientsImproved: 42,
        sessionsCompleted: 456,
        averageRating: 4.9,
        responseTime: "24 hours",
      },
    }

    return NextResponse.json(patientOverview)
  } catch (error) {
    console.error("Error fetching patient overview:", error)
    return NextResponse.json({ error: "Failed to fetch patient overview" }, { status: 500 })
  }
}