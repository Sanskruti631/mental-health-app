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

    // Get mood entries for the user
    const moodEntries = await prisma.mood_entries.findMany({
      where: { user_id: session.users.id },
      orderBy: { date: "desc" },
      take: 30, // Get last 30 entries
    })

    const formattedEntries = moodEntries.map((entry) => ({
      id: entry.id,
      mood: entry.mood_level,
      activities: entry.activities || [],
      notes: entry.notes,
      date: entry.date.toISOString().split("T")[0],
    }))

    return NextResponse.json(formattedEntries)
  } catch (error) {
    console.error("Error fetching mood entries:", error)
    return NextResponse.json({ error: "Failed to fetch mood entries" }, { status: 500 })
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

    if (!session?.users) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { mood, activities, notes, date } = body

    if (!mood || mood < 1 || mood > 5) {
      return NextResponse.json({ error: "Mood must be between 1 and 5" }, { status: 400 })
    }

    // Save mood entry to database
    const moodEntry = await prisma.mood_entries.upsert({
      where: {
        user_id_date: {
          user_id: session.users.id,
          date: new Date(date || new Date()),
        },
      },
      update: {
        mood_level: mood,
        activities: activities || [],
        notes: notes || null,
      },
      create: {
        user_id: session.users.id,
        mood_level: mood,
        activities: activities || [],
        notes: notes || null,
        date: new Date(date || new Date()),
      },
    })

    return NextResponse.json({
      success: true,
      message: "Mood entry saved successfully",
      data: {
        id: moodEntry.id,
        mood: moodEntry.mood_level,
        date: moodEntry.date.toISOString().split("T")[0],
      },
    })
  } catch (error) {
    console.error("Error saving mood entry:", error)
    return NextResponse.json({ error: "Failed to save mood entry" }, { status: 500 })
  }
}
