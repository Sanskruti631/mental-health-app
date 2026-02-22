"use client"

import { useMemo, useState } from "react"
import { WELLBEING_QUESTIONS, RESPONSE_OPTIONS } from "@/lib/wellbeing/questions"
import type { WellbeingAnswer } from "@/lib/wellbeing/types"

type StepStatus = "questions" | "crisis" | "results"

export default function WellbeingPage() {
  const total = WELLBEING_QUESTIONS.length
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, 0 | 1 | 2 | 3>>({})
  const [status, setStatus] = useState<StepStatus>("questions")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{
    totalScore: number
    riskLevel: "low" | "moderate" | "high"
    sectionBreakdown: { mood: number; stress: number; functioning: number }
    crisisFlag: boolean
    predict?: { risk?: "low" | "medium" | "high" | "crisis" }
  } | null>(null)

  const progress = Math.round(((index) / total) * 100)
  const current = WELLBEING_QUESTIONS[index]

  const canProceed = typeof answers[current?.id ?? ""] !== "undefined"

  const answerQuestion = (qid: string, value: 0 | 1 | 2 | 3) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }))
    const q = WELLBEING_QUESTIONS.find((qq) => qq.id === qid)
    if (q?.safetyCritical && value >= 2) {
      setStatus("crisis")
    }
  }

  const toNext = () => {
    if (index < total - 1) setIndex(index + 1)
  }
  const toPrev = () => {
    if (index > 0) setIndex(index - 1)
  }

  const submit = async () => {
    setLoading(true)
    setError(null)
    try {
      const payloadAnswers: WellbeingAnswer[] = WELLBEING_QUESTIONS.map((q) => ({
        id: q.id,
        value: answers[q.id] ?? 0,
      }))
      const res = await fetch("/api/wellbeing/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: payloadAnswers }),
      })
      if (!res.ok) throw new Error("Failed to score wellbeing check-in")
      const scored = await res.json()

      const quizRiskScore = scored.totalScore as number
      const predictRes = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phq9: 0,
          gad7: 0,
          ghq12: 0,
          avgMood7Days: 3,
          moodTrend: "stable",
          negativeChatRatio: 0.3,
          quizRiskScore,
        }),
      })
      let predict: { risk?: "low" | "medium" | "high" | "crisis" } | undefined
      if (predictRes.ok) {
        const pr = await predictRes.json()
        predict = { risk: pr.risk }
      }

      setResult({ ...scored, predict })
      setStatus(scored.crisisFlag ? "crisis" : "results")
    } catch (e: any) {
      setError(e?.message ?? "Unexpected error")
    } finally {
      setLoading(false)
    }
  }

  const disclaimer = useMemo(
    () =>
      "This wellbeing check-in is not a medical diagnosis. If you are in distress, please seek professional support.",
    []
  )

  if (status === "crisis") {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <h1 className="text-2xl font-semibold">Wellbeing Check-In</h1>
        <p className="mt-4 text-sm text-gray-700">{disclaimer}</p>
        <div className="mt-6 rounded-lg border p-6 bg-red-50 border-red-200">
          <h2 className="text-xl font-semibold text-red-700">You are not alone</h2>
          <p className="mt-3 text-gray-800">
            Your response suggests you may need immediate support. Consider reaching out now:
          </p>
          <ul className="mt-4 space-y-2 text-gray-900">
            <li>• Call 988 (US) or your local crisis line</li>
            <li>• Contact campus or community counseling services</li>
            <li>• Speak with someone you trust</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a href="/appointments" className="px-4 py-2 rounded-md bg-red-600 text-white">Book counseling</a>
            <a href="/resources" className="px-4 py-2 rounded-md bg-gray-800 text-white">View resources</a>
          </div>
          <div className="mt-6">
            <button
              className="px-4 py-2 rounded-md border border-gray-300"
              onClick={() => setStatus("questions")}
            >
              Continue check-in
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (status === "results" && result) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <h1 className="text-2xl font-semibold">Wellbeing Check-In</h1>
        <p className="mt-4 text-sm text-gray-700">{disclaimer}</p>

        <div className="mt-6 rounded-lg border p-6">
          <h2 className="text-xl font-semibold">Your Results</h2>
          <p className="mt-3 text-gray-800">
            Overall wellbeing score: <span className="font-semibold">{(result.totalScore * 100).toFixed(0)}%</span> ({result.riskLevel})
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3">
            <div className="rounded-md border p-3">
              <div className="font-medium">Mood & Energy</div>
              <div className="text-sm text-gray-700">{(result.sectionBreakdown.mood * 100).toFixed(0)}%</div>
            </div>
            <div className="rounded-md border p-3">
              <div className="font-medium">Stress & Worry</div>
              <div className="text-sm text-gray-700">{(result.sectionBreakdown.stress * 100).toFixed(0)}%</div>
            </div>
            <div className="rounded-md border p-3">
              <div className="font-medium">Daily Functioning</div>
              <div className="text-sm text-gray-700">{(result.sectionBreakdown.functioning * 100).toFixed(0)}%</div>
            </div>
          </div>
          {result.predict?.risk && (
            <p className="mt-4 text-sm text-gray-700">
              System risk indicator (from prediction API): <span className="font-semibold">{result.predict.risk}</span>
            </p>
          )}

          <div className="mt-6">
            <p className="text-gray-800">
              Consider small, supportive steps: take breaks, connect with someone you trust, and explore resources that may help.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="/resources" className="px-4 py-2 rounded-md bg-gray-800 text-white">Resources</a>
              <a href="/appointments" className="px-4 py-2 rounded-md bg-blue-600 text-white">Book counseling</a>
              <a href="/chat" className="px-4 py-2 rounded-md border border-gray-300">Chat support</a>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button className="px-4 py-2 rounded-md border" onClick={() => { setIndex(0); setAnswers({}); setStatus("questions"); setResult(null) }}>
            Start again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold">Wellbeing Check-In</h1>
      <p className="mt-4 text-sm text-gray-700">
        {disclaimer}
      </p>

      <div className="mt-6">
        <div className="h-2 w-full bg-gray-200 rounded">
          <div
            className="h-2 bg-blue-600 rounded"
            style={{ width: `${Math.max(5, progress)}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-gray-600">Progress: {index + 1} / {total}</div>
      </div>

      <div className="mt-6 rounded-lg border p-6">
        <div className="text-sm text-gray-600 mb-2">
          Section: {sectionLabel(current.section)}
        </div>
        <div className="text-lg font-medium">
          {current.text}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2">
          {RESPONSE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`text-left px-4 py-2 rounded-md border ${answers[current.id] === opt.value ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}
              onClick={() => answerQuestion(current.id, opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            className="px-4 py-2 rounded-md border"
            onClick={toPrev}
            disabled={index === 0}
          >
            Back
          </button>
          {index < total - 1 ? (
            <button
              className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50"
              onClick={toNext}
              disabled={!canProceed}
            >
              Next
            </button>
          ) : (
            <button
              className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50"
              onClick={submit}
              disabled={!canProceed || loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      </div>
    </div>
  )
}

function sectionLabel(s: "mood" | "stress" | "functioning") {
  return s === "mood" ? "Mood & Energy" : s === "stress" ? "Stress & Worry" : "Daily Functioning"
}
