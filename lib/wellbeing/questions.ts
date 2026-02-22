import type { WellbeingQuestion } from "@/lib/wellbeing/types"

export const WELLBEING_QUESTIONS: WellbeingQuestion[] = [
  // A) Mood & Energy
  { id: "safety_01", text: "Have you had thoughts that you would be better off not being here?", section: "mood", weight: 1.2, safetyCritical: true },
  { id: "mood_01", text: "Have you felt down or low in spirits?", section: "mood", weight: 1.2 },
  { id: "mood_02", text: "Have you had less interest in activities you usually enjoy?", section: "mood", weight: 1.2 },
  { id: "mood_03", text: "Have your energy levels felt lower than usual?", section: "mood", weight: 1.0 },
  { id: "mood_04", text: "Have you found it hard to feel hopeful about things?", section: "mood", weight: 1.0 },
  { id: "mood_05", text: "Have you felt more easily irritated or frustrated?", section: "mood", weight: 1.0 },
  { id: "mood_06", text: "Have you felt disconnected from people or activities?", section: "mood", weight: 1.0 },

  // B) Stress & Worry
  { id: "stress_01", text: "Have you felt nervous or on edge?", section: "stress", weight: 1.2 },
  { id: "stress_02", text: "Have you found yourself worrying more than you can control?", section: "stress", weight: 1.2 },
  { id: "stress_03", text: "Have you felt restless or struggled to relax?", section: "stress", weight: 1.0 },
  { id: "stress_04", text: "Have you felt overly tense in your body (e.g., tightness, knots)?", section: "stress", weight: 1.0 },
  { id: "stress_05", text: "Have worries made it hard to focus on what you’re doing?", section: "stress", weight: 1.0 },
  { id: "stress_06", text: "Have you felt overwhelmed by responsibilities or expectations?", section: "stress", weight: 1.0 },

  // C) Daily Functioning
  { id: "func_01", text: "Have you found it hard to start or finish everyday tasks?", section: "functioning", weight: 1.2 },
  { id: "func_02", text: "Have your sleep patterns been disrupted (too little or too much)?", section: "functioning", weight: 1.0 },
  { id: "func_03", text: "Have you had difficulty concentrating on studies or work?", section: "functioning", weight: 1.2 },
  { id: "func_04", text: "Have changes in appetite affected your day-to-day wellbeing?", section: "functioning", weight: 1.0 },
  { id: "func_05", text: "Have you felt less able to connect with friends, family, or peers?", section: "functioning", weight: 1.0 },
  { id: "func_06", text: "Have you avoided tasks or social activities more than usual?", section: "functioning", weight: 1.0 },
  { id: "func_07", text: "Have you felt less confident managing daily responsibilities?", section: "functioning", weight: 1.0 },
]

export const RESPONSE_OPTIONS = [
  { label: "Not at all", value: 0 as const },
  { label: "Several days", value: 1 as const },
  { label: "More than half the days", value: 2 as const },
  { label: "Nearly every day", value: 3 as const },
]
