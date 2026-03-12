import { NextResponse } from "next/server"
import type { QuestionnaireAnswer } from "@/lib/questionnaire/types"
import { calculateClinicalScores } from "@/lib/questionnaire/scoreQuestionnaire"
import { getSecurityHeaders } from "@/lib/auth-utils"

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

