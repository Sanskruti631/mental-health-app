import { NextResponse } from "next/server"
import type { QuestionnaireAnswer } from "@/lib/questionnaire/types"
import { calculateClinicalScores } from "@/lib/questionnaire/scoreQuestionnaire"
import { getSecurityHeaders } from "@/lib/auth-utils"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const json = await request.json()

    // Basic payload validation
    if (!json || !Array.isArray(json.answers)) {
      return NextResponse.json(
        { error: "Invalid payload: expected { answers: QuestionnaireAnswer[] }" },
        { status: 400, headers: getSecurityHeaders() }
      )
    }

    const answers: QuestionnaireAnswer[] = json.answers
    const clinicalScores = calculateClinicalScores(answers)

    // Get user ID from session if available
    const sessionToken = request.headers.get("cookie")?.split("session-token=")[1]?.split(";")[0]
    
    if (sessionToken) {
      try {
        const session = await prisma.user_sessions.findFirst({
          where: {
            session_token: sessionToken,
            is_active: true,
            expires_at: { gt: new Date() },
          },
          include: { users: true },
        })

        if (session?.users) {
          // Save questionnaire result to database
          const questionnaireType = json.type || "PHQ-9" // Default type

          await prisma.questionnaire_results.create({
            data: {
              user_id: session.users.id,
              questionnaire_type: questionnaireType,
              score: clinicalScores.overallRiskScore,
              risk_level: clinicalScores.riskLevel,
              responses: answers,
            },
          })
        }
      } catch (dbError) {
        console.error("Error saving questionnaire result:", dbError)
        // Don't fail the request if database save fails
      }
    }

    return NextResponse.json(
      { 
        score: clinicalScores.overallRiskScore, 
        riskLevel: clinicalScores.riskLevel,
        clinicalScores 
      },
      { headers: getSecurityHeaders() }
    )
  } catch (error) {
    console.error("Quiz submission error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: getSecurityHeaders() }
    )
  }
}

export async function GET(request: Request) {
  try {
    // Get user's questionnaire history
    const sessionToken = request.headers.get("cookie")?.split("session-token=")[1]?.split(";")[0]
    
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

    // Get user's questionnaire results
    const results = await prisma.questionnaire_results.findMany({
      where: { user_id: session.users.id },
      orderBy: { created_at: "desc" },
      take: 10,
    })

    const formattedResults = results.map((result) => ({
      id: result.id,
      type: result.questionnaire_type,
      score: result.score,
      riskLevel: result.risk_level,
      date: result.created_at?.toISOString(),
    }))

    return NextResponse.json(formattedResults)
  } catch (error) {
    console.error("Error fetching questionnaire results:", error)
    return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 })
  }
}