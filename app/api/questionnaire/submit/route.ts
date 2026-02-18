import { NextResponse } from "next/server"
import type { QuestionnaireAnswer } from "@/lib/questionnaire/types"
import { scoreQuestionnaire } from "@/lib/questionnaire/scoreQuestionnaire"
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
    const { score, riskLevel } = scoreQuestionnaire(answers)

    return NextResponse.json(
      { score, riskLevel },
      { headers: getSecurityHeaders() }
    )
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: getSecurityHeaders() }
    )
  }
}

