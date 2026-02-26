// API route for forgot password
// This handles password reset requests

import { type NextRequest, NextResponse } from "next/server"
import { getSecurityHeaders } from "@/lib/auth-utils"

// Mock user database (in production, this would be a real database)
const mockUsers: { [key: string]: { id: string; email: string; name: string } } = {
  "admin123": {
    id: "admin-123",
    email: "admin@university.edu",
    name: "Jane Admin",
  },
  "therapist01": {
    id: "therapist-123",
    email: "therapistsoulsup2025@gmail.com",
    name: "Dr. Sarah Johnson",
  },
  "student007": {
    id: "student-123",
    email: "student@university.edu",
    name: "John Student",
  },
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate input
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        {
          status: 400,
          headers: getSecurityHeaders(),
        }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        {
          status: 400,
          headers: getSecurityHeaders(),
        }
      )
    }

    // Find user by email
    const user = Object.values(mockUsers).find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    )

    // For security, always return success message even if user doesn't exist
    // This prevents email enumeration attacks
    if (!user) {
      return NextResponse.json(
        {
          message:
            "If an account exists with this email, you will receive a password reset link.",
          success: true,
        },
        {
          status: 200,
          headers: getSecurityHeaders(),
        }
      )
    }

    // In a real app, you would:
    // 1. Generate a secure reset token
    // 2. Store it in database with expiration time
    // 3. Send an email with the reset link
    // For now, we'll just return success

    console.log(`Password reset requested for: ${email}`)

    return NextResponse.json(
      {
        message:
          "If an account exists with this email, you will receive a password reset link.",
        success: true,
      },
      {
        status: 200,
        headers: getSecurityHeaders(),
      }
    )
  } catch (err) {
    console.error("Forgot password error:", err)

    return NextResponse.json(
      { message: "Failed to process password reset request. Please try again." },
      {
        status: 500,
        headers: getSecurityHeaders(),
      }
    )
  }
}
