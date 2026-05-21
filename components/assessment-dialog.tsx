"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertTriangle,
  CheckCircle,
  Heart,
  BookOpen,
  Calendar,
} from "lucide-react"

interface AssessmentResult {
  id: string
  riskLevel: "low" | "moderate" | "high" | "crisis"
  confidence: number
  features: {
    phq9: number
    gad7: number
    ghq12: number
    quiz: number
    mood_avg: number
    mood_trend: number
    chat_neg: number
  }
  recommendations: {
    immediate: string[]
    resources: string[]
    actions: string[]
  }
  createdAt: Date
}

interface AssessmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  assessment: AssessmentResult | null
  onBookAppointment: () => void
}

export function AssessmentDialog({
  open,
  onOpenChange,
  assessment,
  onBookAppointment,
}: AssessmentDialogProps) {
  if (!assessment) return null

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "crisis":
      case "high":
        return "text-red-600"
      case "moderate":
        return "text-orange-600"
      default:
        return "text-emerald-600"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "crisis":
      case "high":
        return <AlertTriangle className="h-6 w-6" />
      case "moderate":
        return <Heart className="h-6 w-6" />
      default:
        return <CheckCircle className="h-6 w-6" />
    }
  }

  const getProgressColor = (risk: string) => {
    switch (risk) {
      case "crisis":
      case "high":
        return "bg-red-600"
      case "moderate":
        return "bg-orange-600"
      default:
        return "bg-emerald-600"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className={`${getRiskColor(assessment.riskLevel)}`}>
              {getRiskIcon(assessment.riskLevel)}
            </div>
            Your Wellness Assessment
          </DialogTitle>
          <DialogDescription>
            Based on your recent activity and conversations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Risk Level Card */}
          <Card className={`border-l-4 ${
            assessment.riskLevel === "crisis" || assessment.riskLevel === "high"
              ? "border-l-red-500"
              : assessment.riskLevel === "moderate"
              ? "border-l-orange-500"
              : "border-l-emerald-500"
          }`}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Risk Level</p>
                  <p className={`text-2xl font-bold capitalize ${getRiskColor(assessment.riskLevel)}`}>
                    {assessment.riskLevel}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Confidence</p>
                  <p className="text-xl font-bold">
                    {(assessment.confidence * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
              <Progress
                value={assessment.confidence * 100}
                className={`h-2 ${getProgressColor(assessment.riskLevel)}`}
              />
            </CardContent>
          </Card>

          {/* Assessment Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">PHQ-9</p>
                <p className="text-2xl font-bold">{assessment.features.phq9}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">GAD-7</p>
                <p className="text-2xl font-bold">{assessment.features.gad7}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">GHQ-12</p>
                <p className="text-2xl font-bold">{assessment.features.ghq12}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Mood Avg</p>
                <p className="text-2xl font-bold">{assessment.features.mood_avg.toFixed(1)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <div className="space-y-4">
            {assessment.recommendations.immediate.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Immediate Steps
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {assessment.recommendations.immediate.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {assessment.recommendations.actions.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Suggested Actions
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {assessment.recommendations.actions.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {assessment.recommendations.resources.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Resources
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {assessment.recommendations.resources.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {(assessment.riskLevel === "moderate" ||
            assessment.riskLevel === "high" ||
            assessment.riskLevel === "crisis") && (
            <Button onClick={onBookAppointment}>
              Book an Appointment
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
