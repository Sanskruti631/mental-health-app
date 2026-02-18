import type { QuestionnaireItem } from "@/lib/questionnaire/types"

// Fixed questionnaire (8 questions, exact wording and options).
const OPTIONS = [
  { label: "Never", value: 0 },
  { label: "Sometimes", value: 1 },
  { label: "Often", value: 2 },
  { label: "Almost always", value: 3 },
]

export const QUESTIONNAIRE_V1: QuestionnaireItem[] = [
  {
    id: "q1",
    question: "How often have you felt unmotivated to do things you usually enjoy?",
    category: "motivation",
    weight: 1.2,
    options: OPTIONS,
  },
  {
    id: "q2",
    question: "How often have you felt emotionally drained during the day?",
    category: "mood",
    weight: 1.3,
    options: OPTIONS,
  },
  {
    id: "q3",
    question: "How often do you feel overwhelmed by your responsibilities?",
    category: "stress",
    weight: 1.2,
    options: OPTIONS,
  },
  {
    id: "q4",
    question: "How often do you find it difficult to relax, even during free time?",
    category: "stress",
    weight: 1.1,
    options: OPTIONS,
  },
  {
    id: "q5",
    question: "How often do you wake up feeling tired or unrested?",
    category: "sleep",
    weight: 1.0,
    options: OPTIONS,
  },
  {
    id: "q6",
    question: "How often do you find it hard to focus on your studies or tasks?",
    category: "motivation",
    weight: 1.1,
    options: OPTIONS,
  },
  {
    id: "q7",
    question: "How often do you feel disconnected from people around you?",
    category: "social",
    weight: 1.0,
    options: OPTIONS,
  },
  {
    id: "q8",
    question: "How often do you feel confident handling everyday challenges?",
    category: "mood",
    weight: 0.8,
    reverse: true,
    options: OPTIONS,
  },
]
