import type { MentalHealthFeatures, RiskLevel } from "@/lib/ai/mentalHealthFeatures"

// Rule-based baseline mental health risk prediction.
// This module is intentionally simple, transparent, and explainable.
// It uses established clinical thresholds for PHQ-9, GAD-7, and GHQ-12,
// plus supportive behavioral signals (mood and chat sentiment).
//
// Mapping references (simplified, common academic thresholds):
// - PHQ-9: 0–4 (minimal), 5–9 (mild), 10–14 (moderate), 15–19 (moderately severe), 20–27 (severe)
// - GAD-7: 0–4 (minimal), 5–9 (mild), 10–14 (moderate), 15–21 (severe)
// - GHQ-12: using bimodal scoring 0–12; ≥4 indicates possible distress, ≥8 likely significant distress
//
// The scoring logic combines these signals into a risk score, then maps to a RiskLevel.
// CRISIS is reserved for combinations of severe clinical scores + strongly negative behavioral signals.

export function predictRisk(features: MentalHealthFeatures): RiskLevel {
  const { phq9, gad7, ghq12, avgMood7Days, moodTrend, negativeChatRatio, quizRiskScore } = features

  // Clinical components
  let score = 0
  const reasons: string[] = []

  // PHQ-9 contribution
  if (phq9 >= 20) {
    score += 6
    reasons.push("PHQ-9 severe (≥20)")
  } else if (phq9 >= 15) {
    score += 5
    reasons.push("PHQ-9 moderately severe (15–19)")
  } else if (phq9 >= 10) {
    score += 3
    reasons.push("PHQ-9 moderate (10–14)")
  } else if (phq9 >= 5) {
    score += 1
    reasons.push("PHQ-9 mild (5–9)")
  }

  // GAD-7 contribution
  if (gad7 >= 15) {
    score += 4
    reasons.push("GAD-7 severe (≥15)")
  } else if (gad7 >= 10) {
    score += 2
    reasons.push("GAD-7 moderate (10–14)")
  } else if (gad7 >= 5) {
    score += 1
    reasons.push("GAD-7 mild (5–9)")
  }

  // GHQ-12 contribution (bimodal 0–12)
  if (ghq12 >= 8) {
    score += 3
    reasons.push("GHQ-12 high distress (≥8)")
  } else if (ghq12 >= 4) {
    score += 1
    reasons.push("GHQ-12 possible distress (4–7)")
  }

  // Behavioral components
  // Mood: lower average mood increases risk; scale 1 (bad) to 5 (great)
  if (avgMood7Days <= 2) {
    score += 3
    reasons.push("Low average mood (≤2)")
  } else if (avgMood7Days <= 3) {
    score += 1
    reasons.push("Suboptimal average mood (≤3)")
  }

  // Mood trend: declining trend increases risk
  if (moodTrend === "declining") {
    score += 2
    reasons.push("Mood trend declining")
  } else if (moodTrend === "stable") {
    score += 1
    reasons.push("Mood trend stable")
  }

  // Chat sentiment: higher negative ratio increases risk
  if (negativeChatRatio >= 0.7) {
    score += 3
    reasons.push("High negative chat ratio (≥0.7)")
  } else if (negativeChatRatio >= 0.4) {
    score += 1
    reasons.push("Moderate negative chat ratio (≥0.4)")
  }

  // Quiz risk score (0–1): contributes proportionally
  if (quizRiskScore >= 0.8) {
    score += 3
    reasons.push("Quiz risk score very high (≥0.8)")
  } else if (quizRiskScore >= 0.5) {
    score += 1
    reasons.push("Quiz risk score moderate (≥0.5)")
  }

  // Crisis override: combine clinical severity + behavior to flag crisis
  const clinicalSevere = phq9 >= 20 || gad7 >= 15 || ghq12 >= 10
  const behaviorSevere = (avgMood7Days <= 2 && moodTrend === "declining") || negativeChatRatio >= 0.85 || quizRiskScore >= 0.9
  if (clinicalSevere && behaviorSevere) {
    return "crisis"
  }

  // Map cumulative score to risk level.
  // Ranges chosen to create clear bands for explainability:
  // 0–3: low, 4–7: medium, 8–11: high, ≥12: crisis
  if (score >= 12) return "crisis"
  if (score >= 8) return "high"
  if (score >= 4) return "medium"
  return "low"
}

