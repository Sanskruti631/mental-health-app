import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function getSessionToken(request: Request): string | null {
  return request.headers.get("cookie")?.split("session-token=")[1]?.split(";")[0] ?? null
}

export async function GET(request: Request) {
  try {
    const sessionToken = getSessionToken(request)
    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const session = await prisma.user_sessions.findFirst({
      where: {
        session_token: sessionToken,
        is_active: true,
        expires_at: { gt: new Date() },
      },
      include: { users: true },
    })

    if (!session?.users) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [phq9Result, gad7Result, ghq12Result] = await Promise.all([
      prisma.questionnaire_results.findFirst({
        where: { user_id: session.users.id, questionnaire_type: "PHQ-9" },
        orderBy: { created_at: "desc" },
      }),
      prisma.questionnaire_results.findFirst({
        where: { user_id: session.users.id, questionnaire_type: "GAD-7" },
        orderBy: { created_at: "desc" },
      }),
      prisma.questionnaire_results.findFirst({
        where: { user_id: session.users.id, questionnaire_type: "GHQ-12" },
        orderBy: { created_at: "desc" },
      }),
    ])

    return NextResponse.json({
      phq9: {
        score: phq9Result?.score ?? 0,
        maxScore: 27,
        level: phq9Result?.risk_level ?? "No result",
        lastUpdated: phq9Result?.created_at ?? new Date(),
        description: "Depression screening score",
      },
      gad7: {
        score: gad7Result?.score ?? 0,
        maxScore: 21,
        level: gad7Result?.risk_level ?? "No result",
        lastUpdated: gad7Result?.created_at ?? new Date(),
        description: "Anxiety screening score",
      },
      ghq12: {
        score: ghq12Result?.score ?? 0,
        maxScore: 12,
        level: ghq12Result?.risk_level ?? "No result",
        lastUpdated: ghq12Result?.created_at ?? new Date(),
        description: "General health screening score",
      },
    })
  } catch (error) {
    console.error("Failed to fetch assessments:", error)
    return NextResponse.json(
      { error: "Failed to fetch assessments" },
      { status: 500 }
    )
  }
}
