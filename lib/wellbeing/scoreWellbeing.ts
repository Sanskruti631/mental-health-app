import type { WellbeingAnswer, WellbeingQuestion, WellbeingRiskLevel } from "@/lib/wellbeing/types"
import { WELLBEING_QUESTIONS } from "@/lib/wellbeing/questions"

export interface WellbeingScoreResult {
  totalScore: number
  riskLevel: WellbeingRiskLevel
  sectionBreakdown: {
    mood: number
    stress: number
    functioning: number
  }
  crisisFlag: boolean
}

// Compute normalized scores (0–1) overall and per section.
// weightedScore = sum(answer * weight)
// maxScore = sum(3 * weight)
// normalizedScore = weightedScore / maxScore
export function scoreWellbeing(
  answers: WellbeingAnswer[],
  questions: WellbeingQuestion[] = WELLBEING_QUESTIONS
): WellbeingScoreResult {
  const qMap = new Map(questions.map((q) => [q.id, q]))
  const bySection = {
    mood: { weighted: 0, max: 0 },
    stress: { weighted: 0, max: 0 },
    functioning: { weighted: 0, max: 0 },
  }

  let weightedSum = 0
  let maxSum = 0
  let crisisFlag = false

  for (const q of questions) {
    const ans = answers.find((a) => a.id === q.id)
    const v = clamp(ans?.value ?? 0, 0, 3)
    const w = q.weight
    weightedSum += v * w
    maxSum += 3 * w
    bySection[q.section].weighted += v * w
    bySection[q.section].max += 3 * w

    if (q.safetyCritical && v >= 2) {
      crisisFlag = true
    }
  }

  const totalScore = normalize(weightedSum, maxSum)
  const sectionBreakdown = {
    mood: normalize(bySection.mood.weighted, bySection.mood.max),
    stress: normalize(bySection.stress.weighted, bySection.stress.max),
    functioning: normalize(bySection.functioning.weighted, bySection.functioning.max),
  }

  const riskLevel: WellbeingRiskLevel =
    totalScore >= 0.67 ? "high" :
    totalScore >= 0.34 ? "moderate" : "low"

  return {
    totalScore: roundTo(totalScore, 4),
    riskLevel,
    sectionBreakdown: {
      mood: roundTo(sectionBreakdown.mood, 4),
      stress: roundTo(sectionBreakdown.stress, 4),
      functioning: roundTo(sectionBreakdown.functioning, 4),
    },
    crisisFlag,
  }
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}

function normalize(weighted: number, max: number): number {
  return max > 0 ? weighted / max : 0
}

function roundTo(n: number, digits: number): number {
  const p = 10 ** digits
  return Math.round(n * p) / p
}
