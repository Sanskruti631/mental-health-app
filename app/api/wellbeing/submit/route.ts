import { NextResponse } from "next/server"
import { getSecurityHeaders } from "@/lib/auth-utils"
import type { WellbeingAnswer } from "@/lib/wellbeing/types"
import { scoreWellbeing } from "@/lib/wellbeing/scoreWellbeing"

export async function POST(request: Request) {
  try {
    const json = await request.json()

    if (!json || !Array.isArray(json.answers)) {
      return NextResponse.json(
        { error: "Invalid payload: expected { answers: WellbeingAnswer[] }" },
        { status: 400, headers: getSecurityHeaders() }
      )
    }

    const answers: WellbeingAnswer[] = json.answers
    const result = scoreWellbeing(answers)

    return NextResponse.json(result, { headers: getSecurityHeaders() })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: getSecurityHeaders() }
    )
  }
}
