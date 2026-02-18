// API route for session management
// This handles session validation and user info retrieval

import { type NextRequest, NextResponse } from "next/server"
import { getSecurityHeaders } from "@/lib/auth-utils"

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

    // In a real app, validate session with database
    // For now, return mock user data based on session token
    const mockUser = {
      id: "user-123",
      email: "student@university.edu",
      name: "John Student",
      role: "student",
      isVerified: true,
      profile: {
        studentId: "STU12345",
        adminId: "ADM001",
        major: "Computer Science",
        graduationYear: 2026,
      },
    }

    return NextResponse.json({ user: mockUser }, { headers: getSecurityHeaders() })
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

    // In a real app, invalidate session in database
    console.log("Invalidating session:", sessionToken)

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
