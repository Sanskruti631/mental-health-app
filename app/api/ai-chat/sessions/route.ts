import { NextResponse } from "next/server";
import { getSecurityHeaders, getSessionToken } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const sessionToken = getSessionToken(request);
    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401, headers: getSecurityHeaders() }
      );
    }

    // Get user from session token
    const session = await prisma.user_sessions.findFirst({
      where: {
        session_token: sessionToken,
        is_active: true,
        expires_at: { gt: new Date() }
      },
      include: { users: true }
    });

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Session not found" },
        { status: 401, headers: getSecurityHeaders() }
      );
    }

    // Get all chat sessions for this user
    const chatSessions = await prisma.ai_chat_sessions.findMany({
      where: { user_id: session.user_id },
      orderBy: { updated_at: "desc" }
    });

    return NextResponse.json({ success: true, sessions: chatSessions }, { headers: getSecurityHeaders() });
  } catch (error) {
    console.error("Error fetching chat sessions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch chat sessions" },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}

export async function POST(request: Request) {
  try {
    const sessionToken = getSessionToken(request);
    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401, headers: getSecurityHeaders() }
      );
    }

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

    // Create new chat session
    const newSession = await prisma.ai_chat_sessions.create({
      data: {
        user_id: session.user_id,
        title: "New Chat"
      }
    });

    return NextResponse.json({ success: true, session: newSession }, { headers: getSecurityHeaders() });
  } catch (error) {
    console.error("Error creating chat session:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create chat session" },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}
