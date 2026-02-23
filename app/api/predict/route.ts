import { NextResponse } from "next/server"
import { MentalHealthFeaturesSchema } from "@/lib/ai/mentalHealthFeatures"
import { predictRisk } from "@/lib/ai/predictRisk"
import { getSecurityHeaders } from "@/lib/auth-utils"

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const parsed = MentalHealthFeaturesSchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid feature payload",
          issues: parsed.error.issues.map((i) => ({
            path: i.path,
            message: i.message,
          })),
        },
        { status: 400, headers: getSecurityHeaders() }
      )
    }

    // Crisis override (rule-based safety layer)
    // Rationale: ML can misclassify rare crisis patterns due to class imbalance or distribution shift.
    // These hard thresholds act as safety rails to ensure extreme signals are handled conservatively.
    const { phq9, quizRiskScore, avgMood7Days, negativeChatRatio, moodTrend } = parsed.data
    if (
      phq9 >= 22 ||
      quizRiskScore >= 0.9 ||
      (avgMood7Days < 1.5 && negativeChatRatio > 0.85)
    ) {
      return NextResponse.json(
        {
          risk: "crisis",
          confidence: 1.0,
          source: "rule_override",
          timestamp: new Date().toISOString(),
        },
        { headers: getSecurityHeaders() }
      )
    }

    // Prepare features for ML inference service
    // Map to the FastAPI schema and numeric mood trend representation
    const mlUrl = process.env.ML_API_URL || "http://127.0.0.1:8000/predict"
    const moodTrendNum =
      moodTrend === "declining" ? -1 : moodTrend === "improving" ? 1 : 0

    try {
      const resp = await fetch(mlUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phq9,
          gad7: parsed.data.gad7,
          ghq12: parsed.data.ghq12,
          quiz: quizRiskScore,
          mood_avg: avgMood7Days,
          mood_trend: moodTrendNum,
          chat_neg: negativeChatRatio,
        }),
      })

      if (!resp.ok) {
        throw new Error(`ML service returned ${resp.status}`)
      }
      const mlResult = await resp.json()
      // Return ML decision with confidence
      return NextResponse.json(
        {
          risk: mlResult.risk,
          confidence: mlResult.confidence,
          source: "ml",
          timestamp: new Date().toISOString(),
        },
        { headers: getSecurityHeaders() }
      )
    } catch (e) {
      // Fallback: use existing rule-based predictor on service failure
      // Rationale: ML alone should not determine crisis; resilient fallback ensures continuity.
      const fallbackRisk = predictRisk(parsed.data)
      return NextResponse.json(
        {
          risk: fallbackRisk,
          confidence: 0.5,
          source: "rule_fallback",
          timestamp: new Date().toISOString(),
        },
        { headers: getSecurityHeaders() }
      )
    }

    // Unreachable, kept for completeness
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: getSecurityHeaders() }
    )
  }
}

