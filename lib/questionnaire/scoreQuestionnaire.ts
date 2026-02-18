import type { QuestionnaireAnswer, QuestionnaireItem } from "@/lib/questionnaire/types"
import { QUESTIONNAIRE_V1 } from "@/lib/questionnaire/questions"

export type QuestionnaireRiskLevel = "low" | "medium" | "high"

// Compute questionnaire score and risk level.
// The score is a weighted average normalized to 0–1:
// - Each answer contributes: weight * (value / 3)
// - Normalization: divide by sum(weights)
// Risk mapping:
// - 0.0–0.33: low
// - 0.34–0.66: medium
// - 0.67–1.00: high
export function scoreQuestionnaire(
  answers: QuestionnaireAnswer[],
  items: QuestionnaireItem[] = QUESTIONNAIRE_V1
): { score: number; riskLevel: QuestionnaireRiskLevel } {
  const itemMap = new Map(items.map((q) => [q.id, q]))
  let weightedSum = 0
  let totalWeight = 0

  for (const ans of answers) {
    const item = itemMap.get(ans.id)
    if (!item) continue
    const clamped = clamp(ans.value, 0, 3)
    const valueForScore = item.reverse ? (3 - clamped) : clamped
    weightedSum += item.weight * (valueForScore / 3)
    totalWeight += item.weight
  }

  const score = totalWeight > 0 ? roundTo(weightedSum / totalWeight, 4) : 0
  const riskLevel: QuestionnaireRiskLevel =
    score >= 0.67 ? "high" : score >= 0.34 ? "medium" : "low"

  return { score, riskLevel }
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}

function roundTo(n: number, digits: number): number {
  const p = 10 ** digits
  return Math.round(n * p) / p
}
