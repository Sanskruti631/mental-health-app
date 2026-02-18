// Questionnaire types for collecting structured, non-clinical signals
export interface QuestionnaireOption {
  label: string
  value: number // 0–3 scale
}

export type QuestionnaireCategory = "mood" | "stress" | "sleep" | "motivation" | "social"

export interface QuestionnaireItem {
  id: string
  question: string
  options: QuestionnaireOption[]
  category: QuestionnaireCategory
  weight: number // contribution strength to aggregate score
  reverse?: boolean // if true, reverse-score (3 -> 0, 2 -> 1, etc.)
}

// User answer model used by scoring and API
export interface QuestionnaireAnswer {
  id: string
  value: number // must match one of the item's option values (0–3)
}
