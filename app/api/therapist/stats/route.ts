import { NextResponse } from "next/server"

export async function GET() {
  try {
    const stats = [
      {
        title: "Total Patients",
        value: "47",
        change: "+3 this month",
        icon: "Users",
        color: "text-blue-600",
      },
      {
        title: "Sessions This Week",
        value: "23",
        change: "+2 from last week",
        icon: "Calendar",
        color: "text-green-600",
      },
      {
        title: "Average Rating",
        value: "4.9",
        change: "⭐ Excellent",
        icon: "Star",
        color: "text-yellow-600",
      },
      {
        title: "Response Rate",
        value: "98%",
        change: "Within 24 hours",
        icon: "MessageCircle",
        color: "text-purple-600",
      },
    ]

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching therapist stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}