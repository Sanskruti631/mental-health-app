import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { token, password } = await req.json()

  const resetToken = await prisma.password_reset_tokens.findUnique({
    where: { token },
  })

  if (!resetToken || resetToken.expires_at < new Date()) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 400 }
    )
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.users.update({
    where: { id: resetToken.user_id },
    data: {
    password_hash: hashedPassword,
  },
  })

  await prisma.password_reset_tokens.delete({
    where: { token },
  })

  return NextResponse.json({ message: "Password reset successful" })
}
