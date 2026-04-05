import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock data - in a real app, this would come from the database
    const priorityCases = [
      {
        id: 1,
        name: "Sarah M.",
        studentId: "CS2021-0847",
        major: "Computer Science",
        year: "3rd Year",
        assessment: "PHQ-9: 19 (Severe Depression)",
        lastSession: "3 days ago",
        priority: "high",
      },
      {
        id: 2,
        name: "Michael R.",
        studentId: "ENG2020-0234",
        major: "Engineering",
        year: "4th Year",
        assessment: "GAD-7: 16 (Severe Anxiety)",
        lastSession: "1 week ago",
        priority: "high",
      },
      {
        id: 3,
        name: "Jessica L.",
        studentId: "PSY2022-0156",
        major: "Psychology",
        year: "2nd Year",
        assessment: "PHQ-9: 15 (Moderately Severe Depression)",
        lastSession: "5 days ago",
        priority: "medium",
      },
    ]

    return NextResponse.json(priorityCases)
  } catch (error) {
    console.error("Error fetching priority cases:", error)
    return NextResponse.json({ error: "Failed to fetch priority cases" }, { status: 500 })
  }
}