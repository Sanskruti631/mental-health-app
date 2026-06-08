import { type NextRequest, NextResponse } from "next/server"
import { randomUUID } from "crypto"
import prisma from "@/lib/prisma"
import { getSecurityHeaders, validateEmail } from "@/lib/auth-utils"
import { sendPasswordResetEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400, headers: getSecurityHeaders() }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400, headers: getSecurityHeaders() }
      )
    }

    // Find user
    const user = await prisma.users.findUnique({
      where: { email },
      select: { id: true },
    })

    if (user) {
      // Generate reset token
      const token = randomUUID()
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 mins

      // Save token in database
      await prisma.password_reset_tokens.create({
        data: {
          user_id: user.id,
          token,
          expires_at: expiresAt,
        },
      })

      // Create reset link
      const resetLink =
`${process.env.NEXT_PUBLIC_APP_URL}/resetPassword/${token}`
      try {
        // Send email
        await sendPasswordResetEmail(email, resetLink)

        console.log(`Password reset email sent to ${email}`)
      } catch (emailError) {
        console.error("Email sending failed:", emailError)
      }
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "If an account exists with this email, you will receive a password reset link.",
      },
      {
        status: 200,
        headers: getSecurityHeaders(),
      }
    )
  } catch (err) {
    console.error("Forgot password error:", err)

    return NextResponse.json(
      {
        error:
          "Failed to process password reset request. Please try again.",
      },
      {
        status: 500,
        headers: getSecurityHeaders(),
      }
    )
  }
}