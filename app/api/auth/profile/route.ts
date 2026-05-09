import { NextRequest, NextResponse } from "next/server"
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
      users: {
        include: {
          therapist_profiles: true,
        },
      },
    },
  })

  return session?.users ?? null
}

function buildUserResponse(user: any) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    isVerified: !!user.is_verified,
    bio: user.therapist_profiles?.bio || null,
    specialties: user.therapist_profiles?.specialties || null,
  }
}

export async function GET(request: NextRequest) {
  const user = await getAuthenticatedUser(request)

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: getSecurityHeaders() }
    )
  }

  return NextResponse.json({ user: buildUserResponse(user) }, { headers: getSecurityHeaders() })
}

export async function PATCH(request: NextRequest) {
  const user = await getAuthenticatedUser(request)

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: getSecurityHeaders() }
    )
  }

  const body = await request.json()
  const { name, email, bio, specialties } = body

  if (!name && !email && bio === undefined && specialties === undefined) {
    return NextResponse.json(
      { error: "No fields provided to update" },
      { status: 400, headers: getSecurityHeaders() }
    )
  }

  if (email && email !== user.email) {
    const existingUser = await prisma.users.findUnique({
      where: { email },
      select: { id: true },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already in use" },
        { status: 409, headers: getSecurityHeaders() }
      )
    }
  }

  let updatedUser = user

  if (name || email) {
    updatedUser = await prisma.users.update({
      where: { id: user.id },
      data: {
        ...(name ? { name } : {}),
        ...(email ? { email } : {}),
      },
      include: {
        therapist_profiles: true,
      },
    })
  }

  if (user.role === "therapist" && (bio !== undefined || specialties !== undefined)) {
    const parsedSpecialties =
      typeof specialties === "string"
        ? specialties
            .split(",")
            .map((item: string) => item.trim())
            .filter(Boolean)
        : Array.isArray(specialties)
        ? specialties
        : undefined

    const profileData: Record<string, any> = {}
    if (bio !== undefined) profileData.bio = bio
    if (parsedSpecialties !== undefined) profileData.specialties = parsedSpecialties

    if (Object.keys(profileData).length > 0) {
      const existingProfile = await prisma.therapist_profiles.findUnique({
        where: { user_id: user.id },
      })

      if (existingProfile) {
        await prisma.therapist_profiles.update({
          where: { user_id: user.id },
          data: profileData,
        })
      } else {
        await prisma.therapist_profiles.create({
          data: {
            user_id: user.id,
            license_number: `LIC-${user.id.slice(0, 8)}`,
            specialties: parsedSpecialties || [],
            bio: bio || "",
            is_accepting_patients: true,
          },
        })
      }
    }
  }

  const refreshedUser = await prisma.users.findUnique({
    where: { id: user.id },
    include: {
      therapist_profiles: true,
    },
  })

  return NextResponse.json(
    { user: buildUserResponse(refreshedUser) },
    { headers: getSecurityHeaders() }
  )
}
