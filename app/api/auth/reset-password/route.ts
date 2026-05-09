import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { getSecurityHeaders } from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  const { token, password } = await request.json()

  if (!token || !password) {
    return NextResponse.json(
      { error: "Token and new password are required" },
      { status: 400, headers: getSecurityHeaders() }
    )
  }

  const resetToken = await prisma.password_reset_tokens.findUnique({
    where: { token },
    include: { users: true },
  })

  if (
    !resetToken ||
    resetToken.used_at !== null ||
    resetToken.expires_at <= new Date()
  ) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400, headers: getSecurityHeaders() }
    )
  }

  const hashedPassword = await bcrypt.hash(String(password), 10)

  await prisma.users.update({
    where: { id: resetToken.user_id },
    data: { password_hash: hashedPassword },
  })

  await prisma.password_reset_tokens.update({
    where: { token },
    data: { used_at: new Date() },
  })

  return NextResponse.json(
    { success: true, message: "Password reset successful" },
    { headers: getSecurityHeaders() }
  )
}
