// Authentication utilities and helpers
// This provides helper functions for authentication operations

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export interface User {
  id: string
  email: string
  name: string
  role: "student" | "admin" | "therapist"
  isVerified: boolean
  profile?: StudentProfile | AdminProfile | TherapistProfile
}

export interface StudentProfile {
  studentId: string
  adminId: string
  enrollmentDate?: string
  graduationYear?: number
  major?: string
}

export interface AdminProfile {
  collegeName: string
  collegeId: string
  position?: string
  department?: string
}

export interface TherapistProfile {
  licenseNumber: string
  specialties: string[]
  yearsExperience?: string
  bio?: string
  photoUrl?: string
  rating: number
  totalReviews: number
  isAcceptingPatients: boolean
}

export interface Session {
  id: string
  userId: string
  sessionToken: string
  expiresAt: Date
  user: User
}

// Server-side authentication check
export async function getServerSession(): Promise<Session | null> {
  const cookieStore = cookies()
  const sessionToken = (await cookieStore).get("session-token")?.value

  if (!sessionToken) {
    return null
  }

  try {
    // In a real app, validate session with database
    // For now, return mock session data
    const mockSession: Session = {
      id: "session-123",
      userId: "user-123",
      sessionToken,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      user: {
        id: "user-123",
        email: "user@example.com",
        name: "Test User",
        role: "student",
        isVerified: true,
      },
    }

    return mockSession
  } catch (error) {
    console.error("Session validation error:", error)
    return null
  }
}

// Server-side user check with role validation
export async function requireAuth(allowedRoles?: string[]): Promise<User> {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    redirect(getDashboardForRole(session.user.role))
  }

  return session.user
}

// Get appropriate dashboard URL for user role
export function getDashboardForRole(role: string): string {
  switch (role) {
    case "admin":
      return "/dashboard"
    case "therapist":
      return "/therapist-dashboard"
    case "student":
      return "/"
    default:
      return "/"
  }
}

// Password validation
export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long")
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number")
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Generate secure session token
export function generateSessionToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}
// Generate password reset token
export function generatePasswordResetToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("")
}

// Password reset token expiry (15 minutes)
export function getPasswordResetExpiry(): Date {
  return new Date(Date.now() + 15 * 60 * 1000)
}

// Hash password (mock implementation)
export async function hashPassword(password: string): Promise<string> {
  // In a real app, use bcrypt or similar
  return `hashed_${password}`
}

// Verify password (mock implementation)
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // In a real app, use bcrypt.compare or similar
  return hash === `hashed_${password}`
}

// Role-based permission checks
export function hasPermission(userRole: string, requiredRoles: string[]): boolean {
  return requiredRoles.includes(userRole)
}

// Check if user can access resource
export function canAccessResource(user: User, resourceType: string, resourceId?: string): boolean {
  switch (resourceType) {
    case "appointments":
      // Students can only access their own appointments
      // Therapists can access appointments where they are the therapist
      // Admins can access all appointments
      return user.role === "admin" || user.role === "therapist" || user.role === "student"

    case "messages":
      // Only students and therapists can access messages
      return user.role === "student" || user.role === "therapist"

    case "dashboard":
      // Role-specific dashboard access
      return user.role === "admin"

    case "therapist-dashboard":
      return user.role === "therapist"

    default:
      return false
  }
}

// Security headers for API responses
export function getSecurityHeaders(): Record<string, string> {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Content-Security-Policy":
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
  }
}
