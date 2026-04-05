import { NextResponse } from "next/server"

export async function GET() {
  try {
    const messages = [
      {
        id: "1",
        studentName: "Anonymous Student D",
        message: "Thank you for the session yesterday. I'm feeling much better.",
        time: "2 hours ago",
        unread: false,
      },
      {
        id: "2",
        studentName: "Anonymous Student E",
        message: "I need to reschedule our appointment for tomorrow.",
        time: "4 hours ago",
        unread: true,
      },
    ]

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { studentName, message, replyTo } = body

    // In a real app, this would save to database and send notification
    const newMessage = {
      id: Date.now().toString(),
      studentName: replyTo || studentName,
      message: message,
      time: "Just now",
      unread: false,
      isSent: true,
    }

    return NextResponse.json({
      message: "Message sent successfully",
      data: newMessage
    })
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}