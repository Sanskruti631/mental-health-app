import { NextResponse } from "next/server"

const meditations = [
  {
    id: "mindfulness",
    name: "Mindfulness Meditation",
    description: "Focus on the present moment",
    duration: "10 minutes",
    category: "Mindfulness",
    instructor: "Dr. Sarah Chen",
    hasAudio: false,
  },
  {
    id: "body-scan",
    name: "Body Scan",
    description: "Progressive relaxation technique",
    duration: "15 minutes",
    category: "Relaxation",
    instructor: "Dr. James Wilson",
    hasAudio: false,
  },
  {
    id: "loving-kindness",
    name: "Loving Kindness",
    description: "Cultivate compassion and self-love",
    duration: "12 minutes",
    category: "Self-Compassion",
    instructor: "Dr. Emma Roberts",
    hasAudio: false,
  },
  {
    id: "sleep",
    name: "Sleep Meditation",
    description: "Guided meditation for restful sleep",
    duration: "20 minutes",
    category: "Sleep",
    instructor: "Dr. Michael Brown",
    hasAudio: false,
  },
  {
    id: "stress-relief",
    name: "Stress Relief",
    description: "Quick meditation to reduce anxiety",
    duration: "8 minutes",
    category: "Relaxation",
    instructor: "Dr. Lisa Anderson",
    hasAudio: false,
  },
]

export async function GET() {
  try {
    return NextResponse.json(meditations)
  } catch (error) {
    console.error("Error fetching meditations:", error)
    return NextResponse.json({ error: "Failed to fetch meditations" }, { status: 500 })
  }
}
