// API route for session management
// This handles session validation and user info retrieval

import { type NextRequest, NextResponse } from "next/server"
import { getSecurityHeaders } from "@/lib/auth-utils"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("session-token")?.value

    if (!sessionToken) {
      return NextResponse.json(
        { error: "No session found" },
        {
          status: 401,
          headers: getSecurityHeaders(),
        },
      )
    }

    const session = await prisma.user_sessions.findFirst({
      where: {
        session_token: sessionToken,
        is_active: true,
        expires_at: {
          gt: new Date(),
        },
      },
      include: {
        users: true,
      },
    })

    if (!session || !session.users) {
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 401, headers: getSecurityHeaders() }
      )
    }

    return NextResponse.json({ user: session.users }, { headers: getSecurityHeaders() })
  } catch (error) {
    console.error("Session validation error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: getSecurityHeaders(),
      },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("session-token")?.value

    if (!sessionToken) {
      return NextResponse.json(
        { error: "No session found" },
        {
          status: 401,
          headers: getSecurityHeaders(),
        },
      )
    }

    await prisma.user_sessions.update({
      where: { session_token: sessionToken },
      data: { is_active: false },
    })

    const response = NextResponse.json({ message: "Session ended successfully" }, { headers: getSecurityHeaders() })

    // Clear session cookies
    response.cookies.set("session-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
    })

    response.cookies.set("user-role", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
    })

    return response
  } catch (error) {
    console.error("Session logout error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: getSecurityHeaders(),
      },
    )
  }
}
