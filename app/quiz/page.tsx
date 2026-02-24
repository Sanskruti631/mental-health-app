"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QUESTIONNAIRE_V1 } from "@/lib/questionnaire/questions";
import type { QuestionnaireAnswer } from "@/lib/questionnaire/types";
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
  const items = QUESTIONNAIRE_V1;
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<{
    score: number;
    riskLevel: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const current = items[step];
  const progress = useMemo(
    () => Math.round(((step + 1) / items.length) * 100),
    [step, items.length],
  );

  const handleSelect = (val: number) => {
    setSelected(val);
  };

  const handleNext = () => {
    if (selected === null) return;
    setAnswers((prev) => ({ ...prev, [current.id]: selected }));
    setSelected(null);
    if (step < items.length - 1) {
      setStep((s) => s + 1);
    } else {
      submit();
    }
  };

  const handleBack = () => {
    if (step === 0) return;
    const prevStep = step - 1;
    const prevItem = items[prevStep];
    setStep(prevStep);
    setSelected(answers[prevItem.id] ?? null);
  };

  const resetAll = () => {
    setSelected(null);
    setAnswers({});
    setStep(0);
    setResult(null);
  };

  const submit = async () => {
    setSubmitting(true);
    const payload: { answers: QuestionnaireAnswer[] } = {
      answers: items
        .filter((it) => typeof answers[it.id] === "number")
        .map((it) => ({ id: it.id, value: answers[it.id] })),
    };
    try {
      const res = await fetch("/api/questionnaire/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ score: data.score, riskLevel: data.riskLevel });
        setTimeout(() => {
          router.push("/chat");
        }, 1500);
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
                SoulSupport
              </h1>
              <p className="text-ss text-green-100/90">Wellness Check-In</p>
            </div>
            <div className="text-right">
              <p className="text-white/90 text-sm">
                Question {step + 1} of {items.length}
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
                    Question {step + 1} of {items.length}
                  </p>
                </div>
                <div className="w-48">
                  <Progress value={progress} className="h-3 rounded-full" />
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4">{current.question}</h2>

              <div className="space-y-3">
                {current.options.map((opt) => {
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
                  disabled={step === 0}
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
                    {step === items.length - 1
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
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Submitted. Score: {result.score}, Risk: {result.riskLevel}
              </p>
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
