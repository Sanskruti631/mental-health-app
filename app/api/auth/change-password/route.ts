import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { getSecurityHeaders } from "@/lib/auth-utils"

async function getAuthenticatedUser(request: NextRequest) {
  const sessionToken = request.cookies.get("session-token")?.value

  if (!sessionToken) {
    return null
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

  return session?.users ?? null
}

export async function POST(request: NextRequest) {
  const user = await getAuthenticatedUser(request)

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: getSecurityHeaders() }
    )
  }

  const { currentPassword, newPassword } = await request.json()

  if (!currentPassword || !newPassword) {
    return NextResponse.json(
      { error: "Both current and new passwords are required" },
      { status: 400, headers: getSecurityHeaders() }
    )
  }

  const passwordMatch = await bcrypt.compare(
    String(currentPassword),
    String(user.password_hash)
  )

  if (!passwordMatch) {
    return NextResponse.json(
      { error: "Current password is incorrect" },
      { status: 401, headers: getSecurityHeaders() }
    )
  }

  const hashedPassword = await bcrypt.hash(String(newPassword), 10)

  await prisma.users.update({
    where: { id: user.id },
    data: { password_hash: hashedPassword },
  })

  return NextResponse.json(
    { success: true, message: "Password updated successfully" },
    { headers: getSecurityHeaders() }
  )
}
