"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PHQ9_QUESTIONS,
  GAD7_QUESTIONS,
  GHQ12_QUESTIONS,
  QUESTIONNAIRE_V1,
} from "@/lib/questionnaire/questions";
import type {
  QuestionnaireAnswer,
  ClinicalScale,
} from "@/lib/questionnaire/types";
import {
  Home,
  Cpu,
  Settings,
  User,
  MessageCircle,
  ArrowLeft,
  Check,
  Circle,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function QuizWithSidebarPage() {
  const router = useRouter();

  // Group questions by scale for the multi-step flow
  const steps: {
    title: string;
    subtitle: string;
    scale: ClinicalScale;
    questions: any[];
  }[] = [
    {
      title: "Mood & Motivation",
      subtitle: "Screening for depressive symptoms (PHQ-9)",
      scale: "phq9",
      questions: PHQ9_QUESTIONS,
    },
    {
      title: "Anxiety & Stress",
      subtitle: "Screening for anxiety levels (GAD-7)",
      scale: "gad7",
      questions: GAD7_QUESTIONS,
    },
    {
      title: "General Wellbeing",
      subtitle: "Overall health and coping (GHQ-12)",
      scale: "ghq12",
      questions: GHQ12_QUESTIONS,
    },
  ];

  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<{
    score: number;
    riskLevel: string;
    phq9?: number;
    gad7?: number;
    ghq12?: number;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const currentStep = steps[currentStepIdx];
  const currentQuestion = currentStep.questions[currentQuestionIdx];

  const totalQuestions = steps.reduce((acc, s) => acc + s.questions.length, 0);
  const questionsBeforeCurrentStep = steps
    .slice(0, currentStepIdx)
    .reduce((acc, s) => acc + s.questions.length, 0);
  const globalQuestionIdx = questionsBeforeCurrentStep + currentQuestionIdx;

  const progress = useMemo(
    () => Math.round(((globalQuestionIdx + 1) / totalQuestions) * 100),
    [globalQuestionIdx, totalQuestions],
  );

  const handleSelect = (val: number) => {
    setSelected(val);
  };

  const handleNext = () => {
    if (selected === null) return;

    // Save answer
    const newAnswers = { ...answers, [currentQuestion.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);

    // Check if there are more questions in current step
    if (currentQuestionIdx < currentStep.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    }
    // Check if there are more steps
    else if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
      setCurrentQuestionIdx(0);
    }
    // Final submission
    else {
      submit(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
      const prevQuestionId = currentStep.questions[currentQuestionIdx - 1].id;
      setSelected(answers[prevQuestionId] ?? null);
    } else if (currentStepIdx > 0) {
      const prevStepIdx = currentStepIdx - 1;
      const prevStep = steps[prevStepIdx];
      setCurrentStepIdx(prevStepIdx);
      setCurrentQuestionIdx(prevStep.questions.length - 1);
      const prevQuestionId =
        prevStep.questions[prevStep.questions.length - 1].id;
      setSelected(answers[prevQuestionId] ?? null);
    }
  };

  const resetAll = () => {
    setSelected(null);
    setAnswers({});
    setCurrentStepIdx(0);
    setCurrentQuestionIdx(0);
    setResult(null);
  };

  const submit = async (finalAnswers: Record<string, number>) => {
    setSubmitting(true);
    const payload: { answers: QuestionnaireAnswer[] } = {
      answers: Object.entries(finalAnswers).map(([id, value]) => ({
        id,
        value,
      })),
    };
    try {
      const res = await fetch("/api/questionnaire/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({
          score: data.score,
          riskLevel: data.riskLevel,
          phq9: data.clinicalScores?.phq9,
          gad7: data.clinicalScores?.gad7,
          ghq12: data.clinicalScores?.ghq12,
        });
        setTimeout(() => {
          router.push("/chat");
        }, 2000);
      } else {
        setResult({ score: 0, riskLevel: "low" });
      }
    } catch {
      setResult({ score: 0, riskLevel: "low" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-emerald-50">
      <aside className="w-72 bg-white/90 border-r border-gray-100 p-6 hidden md:flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold">
            SS
          </div>
          <div>
            <h3 className="text-lg font-semibold">SoulSupport</h3>
            <p className="text-sm text-muted-foreground">Wellness Dashboard</p>
          </div>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link
                href="/quiz"
                className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 hover:bg-emerald-100"
              >
                <Cpu className="w-5 h-5 text-emerald-600" />
                <span className="font-medium">Questionnaire</span>
              </Link>
            </li>

            <li>
              <Link
                href="/chat"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span className="font-medium">AI Chatbot</span>
              </Link>
            </li>

            <li>
              <Link
                href="/resources"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
              >
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <span className="font-medium">Resources</span>
              </Link>
            </li>

            <li>
              <Link
                href="/settings"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
              >
                <Settings className="w-5 h-5 text-emerald-600" />
                <span className="font-medium">Settings</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-auto">
          <Button variant="ghost" className="w-full" asChild>
            <Link href="/" className="w-full flex items-center justify-center">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <div
          className="rounded-xl overflow-hidden mb-6 relative"
          style={{ height: 160 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-800/30"></div>
          <div className="absolute inset-0 flex items-center justify-between p-6">
            <div>
              <h1 className="text-2xl font-bold text-dark-green drop-shadow">
                {currentStep.title}
              </h1>
              <p className="text-ss text-green-100/90">
                {currentStep.subtitle}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/90 text-sm">
                Question {globalQuestionIdx + 1} of {totalQuestions}
              </p>
              <p className="text-white/80 text-xs">{progress}%</p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Question {globalQuestionIdx + 1} of {totalQuestions}
                  </p>
                </div>
                <div className="w-48">
                  <Progress value={progress} className="h-3 rounded-full" />
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4">
                {currentQuestion.question}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((opt) => {
                  const isActive = selected === opt.value;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full text-left p-4 rounded-lg border transition-shadow flex items-center gap-4
                        ${isActive ? "bg-emerald-600/10 border-emerald-200 ring-2 ring-emerald-200" : "bg-white"}
                        hover:shadow-sm`}
                    >
                      <span
                        className={`w-6 h-6 grid place-items-center rounded-full border ${isActive ? "bg-emerald-600 text-white border-emerald-600" : "border-gray-300 text-gray-500"}`}
                      >
                        {isActive ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Circle className="w-3 h-3" />
                        )}
                      </span>
                      <span className="flex-1">{opt.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStepIdx === 0 && currentQuestionIdx === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                <div className="flex items-center gap-3">
                  <Button variant="ghost" onClick={resetAll}>
                    Reset
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="px-6"
                    disabled={selected === null || submitting}
                  >
                    {globalQuestionIdx === totalQuestions - 1
                      ? submitting
                        ? "Submitting..."
                        : "Submit"
                      : "Next"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {result && (
            <div className="mt-8 space-y-4">
              <Card className="bg-emerald-50 border-emerald-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-emerald-900 mb-2">
                    Assessment Summary
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="p-3 bg-white rounded-lg border border-emerald-100 text-center">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        PHQ-9 (Mood)
                      </p>
                      <p className="text-2xl font-bold text-emerald-700">
                        {result.phq9 ?? 0}
                      </p>
                      <p className="text-[10px] text-emerald-600/70">
                        Scale: 0-27
                      </p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-emerald-100 text-center">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        GAD-7 (Anxiety)
                      </p>
                      <p className="text-2xl font-bold text-emerald-700">
                        {result.gad7 ?? 0}
                      </p>
                      <p className="text-[10px] text-emerald-600/70">
                        Scale: 0-21
                      </p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-emerald-100 text-center">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        GHQ-12 (Health)
                      </p>
                      <p className="text-2xl font-bold text-emerald-700">
                        {result.ghq12 ?? 0}
                      </p>
                      <p className="text-[10px] text-emerald-600/70">
                        Scale: 0-12
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-emerald-200 shadow-sm">
                    <div>
                      <p className="text-sm font-medium text-emerald-800">
                        Overall Risk Level
                      </p>
                      <p
                        className={`text-xl font-bold capitalize ${
                          result.riskLevel === "crisis"
                            ? "text-red-600"
                            : result.riskLevel === "high"
                              ? "text-orange-600"
                              : result.riskLevel === "medium"
                                ? "text-yellow-600"
                                : "text-emerald-600"
                        }`}
                      >
                        {result.riskLevel}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-emerald-800">
                        Score
                      </p>
                      <p className="text-xl font-bold text-emerald-700">
                        {(result.score * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-emerald-700/60 italic text-center">
                    Redirecting to chat for personalized support...
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-emerald-600 w-10 h-10 grid place-items-center text-white">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Support</p>
                    <p className="text-sm text-muted-foreground">
                      Chat with our assistant for immediate help.
                    </p>
                    <div className="mt-3">
                      <Link href="/chat">
                        <Button variant="outline" size="sm">
                          Open Chat
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-emerald-600 w-10 h-10 grid place-items-center text-white">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Profile</p>
                    <p className="text-sm text-muted-foreground">
                      Complete your profile for personalized tips.
                    </p>
                    <div className="mt-3">
                      <Link href="/account">
                        <Button variant="ghost" size="sm">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
