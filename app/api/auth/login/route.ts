// API route for user login
// This handles authentication and session creation

import { type NextRequest, NextResponse } from "next/server"
import { verifyPassword, generateSessionToken, getSecurityHeaders } from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        {
          status: 400,
          headers: getSecurityHeaders(),
        }
      )
    }

    // In a real app, query database for user
    // For now, use mock authentication based on username
    const mockUsers = {
      "admin123": {
        id: "admin-123",
        username: "admin123",
        email: "admin@university.edu",
        name: "Jane Admin",
        role: "admin",
        passwordHash: "hashed_admin123",
        isVerified: true,
        profile: {
          collegeName: "University of Excellence",
          collegeId: "UOE001",
          position: "Mental Health Coordinator",
          department: "Student Services",
        },
      },
      "therapist01": {
        id: "therapist-123",
        username: "therapist01",
        email: "therapistsoulsup2025@gmail.com",
        name: "Dr. Sarah Johnson",
        role: "therapist",
        passwordHash: "hashed_therapist123",
        isVerified: true,
        profile: {
          licenseNumber: "LIC123456",
          specialties: ["Anxiety", "Depression", "Academic Stress"],
          yearsExperience: "12 years",
          bio: "Experienced clinical psychologist specializing in student mental health.",
          rating: 4.9,
          totalReviews: 127,
          isAcceptingPatients: true,
        },
      },
      "student007": {
        id: "student-123",
        username: "student007",
        email: "student@university.edu",
        name: "John Student",
        role: "student",
        passwordHash: "hashed_student123",
        isVerified: true,
        profile: {
          studentId: "STU12345",
          adminId: "ADM001",
          major: "Computer Science",
          graduationYear: 2026,
        },
      },
    }

    const user = mockUsers[username as keyof typeof mockUsers]

    if (!user) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        {
          status: 401,
          headers: getSecurityHeaders(),
        }
      )
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.passwordHash)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        {
          status: 401,
          headers: getSecurityHeaders(),
        }
      )
    }

    // Check if user is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { error: "Please verify your account before logging in" },
        {
          status: 403,
          headers: getSecurityHeaders(),
        }
      )
    }

    // Generate session token
    const sessionToken = generateSessionToken()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    console.log("Creating session for user:", user.id)

    // Response with user data
    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          role: user.role,
          isVerified: user.isVerified,
          profile: user.profile,
        },
        message: "Login successful",
      },
      { headers: getSecurityHeaders() }
    )

    // Set session cookies
    response.cookies.set("session-token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: expiresAt,
    })

    response.cookies.set("user-role", user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: expiresAt,
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: getSecurityHeaders(),
      }
    )
  }
}
