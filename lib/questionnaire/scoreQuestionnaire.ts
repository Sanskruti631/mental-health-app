import type { QuestionnaireAnswer, QuestionnaireItem, ClinicalScale } from "@/lib/questionnaire/types"
import { PHQ9_QUESTIONS, GAD7_QUESTIONS, GHQ12_QUESTIONS, QUESTIONNAIRE_V1 } from "@/lib/questionnaire/questions"

export interface ClinicalScores {
  phq9: number
  gad7: number
  ghq12: number
  overallRiskScore: number
  riskLevel: "low" | "medium" | "high" | "crisis"
}

/**
 * Calculates clinical scores for PHQ-9, GAD-7, and GHQ-12.
 * PHQ-9: 0-27 (Sum of items)
 * GAD-7: 0-21 (Sum of items)
 * GHQ-12: 0-12 (Bimodal scoring: 0-0-1-1)
 */
export function calculateClinicalScores(answers: QuestionnaireAnswer[]): ClinicalScores {
  const answerMap = new Map(answers.map(a => [a.id, a.value]))
  
  // 1. PHQ-9 Calculation (Sum 0-27)
  let phq9 = 0
  PHQ9_QUESTIONS.forEach(q => {
    const val = answerMap.get(q.id) ?? 0
    // Values are already 0-3 based on frequency
    phq9 += val
  })

  // 2. GAD-7 Calculation (Sum 0-21)
  let gad7 = 0
  GAD7_QUESTIONS.forEach(q => {
    const val = answerMap.get(q.id) ?? 0
    // Values are already 0-3 based on frequency
    gad7 += val
  })

  // 3. GHQ-12 Calculation (Bimodal 0-12: 0,1 -> 0; 2,3 -> 1)
  // Options are already mapped such that higher values (2,3) = more distress
  let ghq12 = 0
  GHQ12_QUESTIONS.forEach(q => {
    const val = answerMap.get(q.id) ?? 0
    if (val >= 2) ghq12 += 1
  })

  // Calculate overall normalized risk score (0-1) for compatibility
  // We weight PHQ-9 and GAD-7 more heavily
  const normalizedPhq9 = phq9 / 27
  const normalizedGad7 = gad7 / 21
  const normalizedGhq12 = ghq12 / 12
  
  const overallRiskScore = (normalizedPhq9 * 0.4) + (normalizedGad7 * 0.4) + (normalizedGhq12 * 0.2)

  // Determine risk level based on clinical thresholds
  let riskLevel: "low" | "medium" | "high" | "crisis" = "low"
  
  if (phq9 >= 20 || gad7 >= 15 || answerMap.get("phq9")! >= 2) {
    riskLevel = "crisis"
  } else if (phq9 >= 15 || gad7 >= 10 || ghq12 >= 4) {
    riskLevel = "high"
  } else if (phq9 >= 10 || gad7 >= 5 || ghq12 >= 2) {
    riskLevel = "medium"
  }

  return {
    phq9,
    gad7,
    ghq12,
    overallRiskScore: roundTo(overallRiskScore, 4),
    riskLevel
  }
}

// Legacy support for the original function signature if needed
export function scoreQuestionnaire(
  answers: QuestionnaireAnswer[]
) {
  const scores = calculateClinicalScores(answers)
  return {
    score: scores.overallRiskScore,
    riskLevel: scores.riskLevel === "crisis" ? "high" : scores.riskLevel
  }
}

function roundTo(n: number, digits: number): number {
  const p = 10 ** digits
  return Math.round(n * p) / p
}
