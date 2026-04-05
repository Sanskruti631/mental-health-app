import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock data - in a real app, this would come from the database
    const recentNotes = [
      {
        id: 1,
        clientName: "Alex T.",
        sessionNumber: 8,
        timeAgo: "2 hours ago",
        notes: "Continued CBT for social anxiety. Client reported improvement in social situations. Homework: Practice exposure exercises in low-stakes social settings.",
      },
      {
        id: 2,
        clientName: "Maria G.",
        sessionNumber: 3,
        timeAgo: "Yesterday",
        notes: "Discussed coping strategies for academic pressure. Introduced mindfulness techniques. Client expressed willingness to try meditation apps.",
      },
      {
        id: 3,
        clientName: "Ryan P.",
        sessionNumber: 12,
        timeAgo: "2 days ago",
        notes: "Progress in trauma processing. Client showing better emotional regulation. Recommended continued journaling and grounding exercises.",
      },
    ]

    return NextResponse.json(recentNotes)
  } catch (error) {
    console.error("Error fetching recent notes:", error)
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 })
  }
}