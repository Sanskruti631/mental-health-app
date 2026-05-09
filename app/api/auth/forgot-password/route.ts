import { type NextRequest, NextResponse } from "next/server"
import { randomUUID } from "crypto"
import prisma from "@/lib/prisma"
import { getSecurityHeaders, validateEmail } from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

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

    const user = await prisma.users.findUnique({
      where: { email },
      select: { id: true },
    })

    if (user) {
      const token = randomUUID()
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

      await prisma.password_reset_tokens.create({
        data: {
          user_id: user.id,
          token,
          expires_at: expiresAt,
        },
      })

      console.log(`Password reset requested for ${email}. Token: ${token}`)
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "If an account exists with this email, you will receive a password reset link.",
      },
      { status: 200, headers: getSecurityHeaders() }
    )
  } catch (err) {
    console.error("Forgot password error:", err)
    return NextResponse.json(
      { error: "Failed to process password reset request. Please try again." },
      { status: 500, headers: getSecurityHeaders() }
    )
  }
}
