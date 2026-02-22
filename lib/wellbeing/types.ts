export interface WellbeingQuestion {
  id: string
  text: string
  section: "mood" | "stress" | "functioning"
  weight: number
  safetyCritical?: boolean
}

export interface WellbeingAnswer {
  id: string
  value: 0 | 1 | 2 | 3
}

export type WellbeingRiskLevel = "low" | "moderate" | "high"
