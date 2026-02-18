// API route for user registration
// This handles new user creation with role-specific profiles

import { type NextRequest, NextResponse } from "next/server"
import {
  validateEmail,
  validatePassword,
  hashPassword,
  generateSessionToken,
  getSecurityHeaders,
} from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role, profileData } = await request.json()

    // Validate required fields
    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: "All fields are required" },
        {
          status: 400,
          headers: getSecurityHeaders(),
        },
      )
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        {
          status: 400,
          headers: getSecurityHeaders(),
        },
      )
    }

    // Validate password strength
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: "Password requirements not met", details: passwordValidation.errors },
        {
          status: 400,
          headers: getSecurityHeaders(),
        },
      )
    }

    // Validate role
    const validRoles = ["student", "admin", "therapist"]
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: "Invalid role specified" },
        {
          status: 400,
          headers: getSecurityHeaders(),
        },
      )
    }

    // Validate role-specific profile data
    const profileValidation = validateProfileData(role, profileData)
    if (!profileValidation.isValid) {
      return NextResponse.json(
        { error: "Profile data validation failed", details: profileValidation.errors },
        {
          status: 400,
          headers: getSecurityHeaders(),
        },
      )
    }

    // In a real app, check if user already exists in database
    // For now, simulate user creation
    const userId = `${role}-${Date.now()}`
    const passwordHash = await hashPassword(password)

    // Create user record
    const newUser = {
      id: userId,
      email,
      name,
      role,
      passwordHash,
      isVerified: false, // Require email verification
      isActive: true,
      createdAt: new Date(),
    }

    // In a real app, save user and profile to database
    console.log("Creating user:", newUser)
    console.log("Profile data:", profileData)

    // Generate email verification token (in real app)
    const verificationToken = generateSessionToken()
    console.log("Email verification token:", verificationToken)

    return NextResponse.json(
      {
        message: "Registration successful. Please check your email to verify your account.",
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          isVerified: newUser.isVerified,
        },
      },
      {
        status: 201,
        headers: getSecurityHeaders(),
      },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: getSecurityHeaders(),
      },
    )
  }
}

function validateProfileData(role: string, profileData: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!profileData) {
    errors.push("Profile data is required")
    return { isValid: false, errors }
  }

  switch (role) {
    case "student":
      if (!profileData.studentId) errors.push("Student ID is required")
      if (!profileData.adminId) errors.push("Admin ID is required")
      if (profileData.graduationYear && (profileData.graduationYear < 2024 || profileData.graduationYear > 2030)) {
        errors.push("Graduation year must be between 2024 and 2030")
      }
      break

    case "admin":
      if (!profileData.collegeName) errors.push("College name is required")
      if (!profileData.collegeId) errors.push("College ID is required")
      break

    case "therapist":
      if (!profileData.licenseNumber) errors.push("License number is required")
      if (!profileData.specialties || !Array.isArray(profileData.specialties) || profileData.specialties.length === 0) {
        errors.push("At least one specialty is required")
      }
      break

    default:
      errors.push("Invalid role")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
