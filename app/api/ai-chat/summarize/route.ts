import { NextResponse } from "next/server";
import { getSecurityHeaders, getSessionToken } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";

async function callOllama(
  url: string,
  model: string,
  messages: Array<{ role: string; content: string }>
): Promise<string> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ollama call failed: ${errorText}`);
  }

  const data = await response.json();
  return data.message?.content || "";
}

export async function POST(req: Request) {
  try {
    const sessionToken = getSessionToken(req);
    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401, headers: getSecurityHeaders() }
      );
    }

    const { sessionId } = await req.json();

    // Get user from session token
    const session = await prisma.user_sessions.findFirst({
      where: {
        session_token: sessionToken,
        is_active: true,
        expires_at: { gt: new Date() }
      }
    });

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Session not found" },
        { status: 401, headers: getSecurityHeaders() }
      );
    }

    // Get chat messages
    const chatSession = await prisma.ai_chat_sessions.findFirst({
      where: { id: sessionId, user_id: session.user_id },
      include: { ai_messages: { orderBy: { created_at: "asc" } } }
    });

    if (!chatSession || chatSession.ai_messages.length === 0) {
      return NextResponse.json(
        { success: false, message: "Chat session not found or empty" },
        { status: 404, headers: getSecurityHeaders() }
      );
    }

    // Format messages for summary
    const messagesForSummary = chatSession.ai_messages.map(msg => 
      `${msg.sender === "user" ? "User" : "AI"}: ${msg.content}`
    ).join("\n");

    // Call Ollama to generate summary
    const chatbotUrl = process.env.CHATBOT_API_URL || "http://localhost:11434/api/chat";
    const chatbotModel = process.env.CHATBOT_MODEL || "llama3.1:8b";

    const summary = await callOllama(chatbotUrl, chatbotModel, [
      {
        role: "system",
        content: "You are a helpful assistant that generates short, concise titles for conversations. The title should be a maximum of 6 words. Only return the title, no extra text."
      },
      {
        role: "user",
        content: `Generate a short title for this conversation:\n\n${messagesForSummary}`
      }
    ]);

    // Update chat session title
    await prisma.ai_chat_sessions.updateMany({
      where: { id: sessionId, user_id: session.user_id },
      data: { title: summary.trim().slice(0, 255) }
    });

    return NextResponse.json(
      { success: true, title: summary.trim() },
      { headers: getSecurityHeaders() }
    );
  } catch (error) {
    console.error("Error summarizing chat:", error);
    return NextResponse.json(
      { success: false, error: "Failed to summarize chat" },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}
