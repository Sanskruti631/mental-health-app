// API route for session management
// This handles session validation and user info retrieval

import { type NextRequest, NextResponse } from "next/server"
import { getSecurityHeaders } from "@/lib/auth-utils"
import db from "@/lib/db"

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

    const [rows]: any = await db.execute(
      `SELECT u.*
       FROM user_sessions s
       JOIN users u ON s.user_id = u.id
       WHERE s.session_token = ? AND s.is_active = true AND s.expires_at > NOW()`,
      [sessionToken]
    )

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 401, headers: getSecurityHeaders() }
      )
    }

    return NextResponse.json({ user: rows[0] }, { headers: getSecurityHeaders() })
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

    await db.execute(
      "UPDATE user_sessions SET is_active = false WHERE session_token = ?",
      [sessionToken]
    )

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
