import type { QuestionnaireItem } from "@/lib/questionnaire/types"

// Frequency-based options (0-3 scale) for PHQ-9 and GAD-7.
const FREQUENCY_OPTIONS = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
]

// Comparison-based options for GHQ-12 (Positive items: e.g., Concentration)
const GHQ_POSITIVE_OPTIONS = [
  { label: "More than usual", value: 0 },
  { label: "Same as usual", value: 1 },
  { label: "Less than usual", value: 2 },
  { label: "Much less than usual", value: 3 },
]

// Comparison-based options for GHQ-12 (Negative items: e.g., Sleep loss)
const GHQ_NEGATIVE_OPTIONS = [
  { label: "Not at all", value: 0 },
  { label: "No more than usual", value: 1 },
  { label: "Rather more than usual", value: 2 },
  { label: "Much more than usual", value: 3 },
]

// PHQ-9: Depression screening with regional nuances for Indian students.
export const PHQ9_QUESTIONS: QuestionnaireItem[] = [
  {
    id: "phq1",
    question: "Over the last 2 weeks, how often have you been bothered by having little interest or pleasure in doing things?",
    category: "motivation",
    scale: "phq9",
    weight: 1.0,
    options: FREQUENCY_OPTIONS,
  },
  {
    id: "phq2",
    question: "Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?",
    category: "mood",
    scale: "phq9",
    weight: 1.0,
    options: FREQUENCY_OPTIONS,
  },
  {
    id: "phq3",
    question: "Over the last 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?",
    category: "sleep",
    scale: "phq9",
    weight: 1.0,
    options: FREQUENCY_OPTIONS,
  },
  {
    id: "phq4",
    question: "Over the last 2 weeks, how often have you felt tired or had little energy (feeling weak or heavy in the head)?",
    category: "sleep",
    scale: "phq9",
    weight: 1.0,
    options: FREQUENCY_OPTIONS,
  },
  {
    id: "phq5",
    question: "Over the last 2 weeks, how often have you had poor appetite or been overeating?",
    category: "mood",
    scale: "phq9",
    weight: 1.0,
    options: FREQUENCY_OPTIONS,
  },
  {
    id: "phq6",
    question: "Over the last 2 weeks, how often have you felt bad about yourself, or that you are a failure, or have let your family down?",
    category: "mood",
    scale: "phq9",
    weight: 1.0,
    options: FREQUENCY_OPTIONS,
  },
  {
    id: "phq7",
    question: "Over the last 2 weeks, how often have you had trouble concentrating on things, such as lectures or self-study?",
    category: "motivation",
    scale: "phq9",
    weight: 1.0,
    options: FREQUENCY_OPTIONS,
  },
  {
    id: "phq8",
    question: "Over the last 2 weeks, how often have you been moving or speaking so slowly that others noticed, or being so fidgety/restless?",
    category: "mood",
    scale: "phq9",
    weight: 1.0,
    options: FREQUENCY_OPTIONS,
  },
  {
    id: "phq9",
    question: "Over the last 2 weeks, have you had thoughts that you would be better off dead, or of hurting yourself in some way?",
    category: "mood",
    scale: "phq9",
    weight: 1.0,
    options: FREQUENCY_OPTIONS,
  },
]

// GAD-7: Anxiety screening with academic and competitive exam stress context.
export const GAD7_QUESTIONS: QuestionnaireItem[] = [
  {
    id: "gad1",
    question: "Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?",
    category: "stress",
    scale: "gad7",
    weight: 1.0,
    options: FREQUENCY_OPTIONS,
  },
  {
    id: "gad2",
    question: "Over the last 2 weeks, how often have you not been able to stop or control worrying?",
    category: "stress",
    scale: "gad7",
    weight: 1.0,
    options: FREQUENCY_OPTIONS,
  },
  {
    id: "gad3",
    question: "Over the last 2 weeks, how often have you been worrying too much about different things (e.g., exams, future, job)?",
    category: "stress",
    scale: "gad7",
    weight: 1.0,
    options: FREQUENCY_OPTIONS,
  },
  {
    id: "gad4",
    question: "Over the last 2 weeks, how often have you had trouble relaxing even during free time?",
    category: "stress",
    scale: "gad7",
    weight: 1.0,
    options: FREQUENCY_OPTIONS,
  },
  {
    id: "gad5",
    question: "Over the last 2 weeks, how often have you been so restless that it is hard to sit still?",
    category: "stress",
    scale: "gad7",
    weight: 1.0,
    options: FREQUENCY_OPTIONS,
  },
  {
    id: "gad6",
    question: "Over the last 2 weeks, how often have you been becoming easily annoyed or irritable?",
    category: "mood",
    scale: "gad7",
    weight: 1.0,
    options: FREQUENCY_OPTIONS,
  },
  {
    id: "gad7",
    question: "Over the last 2 weeks, how often have you felt afraid as if something awful might happen?",
    category: "stress",
    scale: "gad7",
    weight: 1.0,
    options: FREQUENCY_OPTIONS,
  },
]

// GHQ-12: General health and coping with comparison-based natural phrasing.
export const GHQ12_QUESTIONS: QuestionnaireItem[] = [
  {
    id: "ghq1",
    question: "Have you recently been able to concentrate on whatever you're doing?",
    category: "general",
    scale: "ghq12",
    weight: 1.0,
    options: GHQ_POSITIVE_OPTIONS,
  },
  {
    id: "ghq2",
    question: "Have you recently lost much sleep over worry?",
    category: "sleep",
    scale: "ghq12",
    weight: 1.0,
    options: GHQ_NEGATIVE_OPTIONS,
  },
  {
    id: "ghq3",
    question: "Have you recently felt that you were playing a useful part in things?",
    category: "social",
    scale: "ghq12",
    weight: 1.0,
    options: GHQ_POSITIVE_OPTIONS,
  },
  {
    id: "ghq4",
    question: "Have you recently felt capable of making decisions about things?",
    category: "general",
    scale: "ghq12",
    weight: 1.0,
    options: GHQ_POSITIVE_OPTIONS,
  },
  {
    id: "ghq5",
    question: "Have you recently felt constantly under strain?",
    category: "stress",
    scale: "ghq12",
    weight: 1.0,
    options: GHQ_NEGATIVE_OPTIONS,
  },
  {
    id: "ghq6",
    question: "Have you recently felt you couldn't overcome your difficulties?",
    category: "stress",
    scale: "ghq12",
    weight: 1.0,
    options: GHQ_NEGATIVE_OPTIONS,
  },
  {
    id: "ghq7",
    question: "Have you recently been able to enjoy your normal day-to-day activities?",
    category: "general",
    scale: "ghq12",
    weight: 1.0,
    options: GHQ_POSITIVE_OPTIONS,
  },
  {
    id: "ghq8",
    question: "Have you recently been able to face up to your problems?",
    category: "general",
    scale: "ghq12",
    weight: 1.0,
    options: GHQ_POSITIVE_OPTIONS,
  },
  {
    id: "ghq9",
    question: "Have you recently been feeling unhappy and depressed?",
    category: "mood",
    scale: "ghq12",
    weight: 1.0,
    options: GHQ_NEGATIVE_OPTIONS,
  },
  {
    id: "ghq10",
    question: "Have you recently been losing confidence in yourself?",
    category: "mood",
    scale: "ghq12",
    weight: 1.0,
    options: GHQ_NEGATIVE_OPTIONS,
  },
  {
    id: "ghq11",
    question: "Have you recently been thinking of yourself as a worthless person?",
    category: "mood",
    scale: "ghq12",
    weight: 1.0,
    options: GHQ_NEGATIVE_OPTIONS,
  },
  {
    id: "ghq12",
    question: "Have you recently been feeling reasonably happy, all things considered?",
    category: "mood",
    scale: "ghq12",
    weight: 1.0,
    options: GHQ_POSITIVE_OPTIONS,
  },
]

// Combined questionnaire for legacy compatibility (though steps are preferred).
export const QUESTIONNAIRE_V1 = [
  ...PHQ9_QUESTIONS,
  ...GAD7_QUESTIONS,
  ...GHQ12_QUESTIONS,
]
