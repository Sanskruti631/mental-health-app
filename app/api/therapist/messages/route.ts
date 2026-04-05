import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// ✅ GET (2 MODES)
// 1. Dashboard → unread messages
// 2. Chat → full conversation messages

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get("conversationId")

    const sessionToken = request.headers
      .get("cookie")
      ?.split("session-token=")[1]
      ?.split(";")[0]

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

    // 💬 MODE 1: FULL CHAT (for your Chat UI)
    if (conversationId) {
      const messages = await prisma.messages.findMany({
        where: { conversation_id: conversationId },
        orderBy: { created_at: "asc" },
      })

      return NextResponse.json(messages)
    }

    // 📊 MODE 2: DASHBOARD (your existing logic)
    if (session.users.role !== "therapist") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const conversations = await prisma.conversations.findMany({
      where: { therapist_id: session.users.id },
      include: {
        messages: {
          where: {
            is_read: false,
            sender_id: { not: session.users.id },
          },
          orderBy: { created_at: "desc" },
          take: 1,
        },
        student: { select: { name: true } },
      },
    })

    const messages = conversations
      .filter((conv) => conv.messages.length > 0)
      .map((conv) => ({
        id: conv.id,
        studentName: conv.student.name || "Anonymous Student",
        message: conv.messages[0].message_text,
        time: conv.messages[0].created_at
          ? new Date(conv.messages[0].created_at).toLocaleString()
          : "Just now",
        unread: !conv.messages[0].is_read,
      }))

    return NextResponse.json(messages)

  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

// ✅ POST (SEND MESSAGE)

export async function POST(request: Request) {
  try {
    const sessionToken = request.headers
      .get("cookie")
      ?.split("session-token=")[1]
      ?.split(";")[0]

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
    const { conversationId, message } = body

    if (!conversationId || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newMessage = await prisma.messages.create({
      data: {
        conversation_id: conversationId,
        sender_id: session.users.id,
        message_text: message,
        is_read: false,
      },
    })

    return NextResponse.json({
      id: newMessage.id,
      conversationId: newMessage.conversation_id,
      message: newMessage.message_text,
      created_at: newMessage.created_at,
      sender_id: newMessage.sender_id,
    })

  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
