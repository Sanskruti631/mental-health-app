import { NextResponse } from "next/server";
import { getSecurityHeaders, getSessionToken } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
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
      }
    });

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Session not found" },
        { status: 401, headers: getSecurityHeaders() }
      );
    }

    // Get chat session with messages
    const chatSession = await prisma.ai_chat_sessions.findFirst({
      where: {
        id: id,
        user_id: session.user_id
      },
      include: {
        ai_messages: {
          orderBy: { created_at: "asc" }
        }
      }
    });

    if (!chatSession) {
      return NextResponse.json(
        { success: false, message: "Chat session not found" },
        { status: 404, headers: getSecurityHeaders() }
      );
    }

    return NextResponse.json(
      { success: true, session: chatSession },
      { headers: getSecurityHeaders() }
    );
  } catch (error) {
    console.error("Error fetching chat session:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch chat session" },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
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

    const { title } = await request.json();

    // Update chat session
    const updatedSession = await prisma.ai_chat_sessions.updateMany({
      where: {
        id: id,
        user_id: session.user_id
      },
      data: {
        title: title || "New Chat",
        updated_at: new Date()
      }
    });

    return NextResponse.json({ success: true }, { headers: getSecurityHeaders() });
  } catch (error) {
    console.error("Error updating chat session:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update chat session" },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
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

    // Delete chat session (messages will cascade delete)
    await prisma.ai_chat_sessions.deleteMany({
      where: {
        id: id,
        user_id: session.user_id
      }
    });

    return NextResponse.json({ success: true }, { headers: getSecurityHeaders() });
  } catch (error) {
    console.error("Error deleting chat session:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete chat session" },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}
