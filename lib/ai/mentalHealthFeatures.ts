import { z } from "zod"

// Feature interface for baseline risk prediction
export interface MentalHealthFeatures {
  phq9: number
  gad7: number
  ghq12: number
  avgMood7Days: number
  moodTrend: "improving" | "stable" | "declining"
  negativeChatRatio: number
  quizRiskScore: number
}

// Runtime validation schema to ensure safe, bounded inputs
export const MentalHealthFeaturesSchema = z.object({
  phq9: z.number().min(0).max(27),
  gad7: z.number().min(0).max(21),
  // GHQ-12 scoring varies (0–12 using bimodal scoring, or 0–36 Likert).
  // We standardize to 0–12 (bimodal) for clarity in this baseline module.
  ghq12: z.number().min(0).max(12),
  // Average mood over 7 days, using the app's 1–5 scale (1=bad, 5=great).
  avgMood7Days: z.number().min(1).max(5),
  moodTrend: z.enum(["improving", "stable", "declining"]),
  negativeChatRatio: z.number().min(0).max(1),
  quizRiskScore: z.number().min(0).max(1),
})

export type RiskLevel = "low" | "medium" | "high" | "crisis"

