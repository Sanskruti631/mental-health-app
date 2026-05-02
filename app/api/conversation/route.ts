import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET all conversations
export async function GET() {
  const conversations = await prisma.conversations.findMany({
    orderBy: { created_at: "desc" },
  })

  return NextResponse.json(conversations)
}

// CREATE conversation
export async function POST() {
  const conversation = await prisma.conversations.create({
    data: {
      student_id: "USER_ID_HERE",   // 🔥 replace with logged-in user
      therapist_id: "AI_ID",        // dummy AI or therapist
    },
  })

  return NextResponse.json(conversation)
}
