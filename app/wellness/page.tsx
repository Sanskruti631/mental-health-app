"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, RotateCcw, Leaf, Moon, Zap, Users, Phone } from "lucide-react"

const breathingExercises = [
  {
    id: "box",
    name: "4-7-8 Breathing",
    description: "Inhale for 4, hold for 7, exhale for 8",
    duration: "5 minutes",
    difficulty: "Beginner",
  },
  {
    id: "square",
    name: "Box Breathing",
    description: "Equal counts for inhale, hold, exhale, hold",
    duration: "10 minutes",
    difficulty: "Intermediate",
  },
]

const meditations = [
  {
    id: "mindfulness",
    name: "Mindfulness Meditation",
    description: "Focus on the present moment",
    duration: "10 minutes",
    category: "Mindfulness",
  },
  {
    id: "body-scan",
    name: "Body Scan",
    description: "Progressive relaxation technique",
    duration: "15 minutes",
    category: "Relaxation",
  },
  {
    id: "loving-kindness",
    name: "Loving Kindness",
    description: "Cultivate compassion and self-love",
    duration: "12 minutes",
    category: "Self-Compassion",
  },
]

const wellnessTips = [
  {
    category: "Sleep",
    icon: Moon,
    tips: [
      "Maintain a consistent sleep schedule",
      "Create a relaxing bedtime routine",
      "Avoid screens 1 hour before bed",
      "Keep your bedroom cool and dark",
    ],
  },
  {
    category: "Exercise",
    icon: Zap,
    tips: [
      "Take a 10-minute walk daily",
      "Try desk stretches during study breaks",
      "Join a campus sports club",
      "Use stairs instead of elevators",
    ],
  },
  {
    category: "Nutrition",
    icon: Leaf,
    tips: [
      "Eat regular, balanced meals",
      "Stay hydrated throughout the day",
      "Limit caffeine and alcohol",
      "Keep healthy snacks handy",
    ],
  },
  {
    category: "Social",
    icon: Users,
    tips: [
      "Connect with friends regularly",
      "Join study groups or clubs",
      "Practice active listening",
      "Set healthy boundaries",
    ],
  },
]

export default function WellnessPage() {
  const [activeTimer, setActiveTimer] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)

  const startBreathing = (exerciseId: string, duration: number) => {
    setActiveTimer(exerciseId)
    setTimeLeft(duration)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="bg-primary rounded-lg p-3">
              <Leaf className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">Wellness Center</h1>
          </div>
          <p className="text-muted-foreground">Tools and resources for your mental and physical wellbeing</p>
        </div>

        <Tabs defaultValue="breathing" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="breathing">Breathing</TabsTrigger>
            <TabsTrigger value="meditation">Meditation</TabsTrigger>
            <TabsTrigger value="tips">Wellness Tips</TabsTrigger>
            <TabsTrigger value="crisis">Crisis Support</TabsTrigger>
          </TabsList>

          {/* Breathing Exercises */}
          <TabsContent value="breathing" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {breathingExercises.map((exercise) => (
                <Card key={exercise.id}>
                  <CardHeader>
                    <CardTitle>{exercise.name}</CardTitle>
                    <CardDescription>{exercise.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{exercise.duration}</Badge>
                      <Badge variant="secondary">{exercise.difficulty}</Badge>
                    </div>
                    <Button onClick={() => startBreathing(exercise.id, 300)} className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Start Exercise
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Breathing Timer */}
            {activeTimer && (
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                <CardContent className="p-8 text-center">
                  <div className="space-y-6">
                    <div className="text-6xl font-bold text-primary">
                      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                    </div>
                    <div className="text-xl text-muted-foreground">Breathe in... Hold... Breathe out...</div>
                    <div className="flex justify-center space-x-4">
                      <Button variant="outline" onClick={() => setActiveTimer(null)}>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                      <Button variant="outline" onClick={() => setActiveTimer(null)}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Meditation */}
          <TabsContent value="meditation" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {meditations.map((meditation) => (
                <Card key={meditation.id}>
                  <CardHeader>
                    <CardTitle>{meditation.name}</CardTitle>
                    <CardDescription>{meditation.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{meditation.duration}</Badge>
                      <Badge variant="secondary">{meditation.category}</Badge>
                    </div>
                    <Button className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Start Meditation
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Wellness Tips */}
          <TabsContent value="tips" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {wellnessTips.map((category) => {
                const Icon = category.icon
                return (
                  <Card key={category.category}>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon className="h-5 w-5" />
                        <span>{category.category}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.tips.map((tip, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Crisis Support */}
          <TabsContent value="crisis" className="space-y-6">
            <div className="grid gap-6">
              <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
                <CardHeader>
                  <CardTitle className="text-red-800 dark:text-red-200">Emergency Crisis Support</CardTitle>
                  <CardDescription className="text-red-700 dark:text-red-300">
                    If you're having thoughts of self-harm or suicide, please reach out immediately
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      <Phone className="h-4 w-4 mr-2" />
                      Call 988 (Suicide & Crisis Lifeline)
                    </Button>
                    <Button variant="outline" className="border-red-300 text-red-700 bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      Text "HELLO" to 741741
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Campus Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="font-medium">Counseling Center</div>
                      <div className="text-sm text-muted-foreground">(555) 123-4567</div>
                      <div className="text-sm text-muted-foreground">Available 24/7</div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium">Campus Safety</div>
                      <div className="text-sm text-muted-foreground">(555) 123-4568</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>National Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="font-medium">Crisis Text Line</div>
                      <div className="text-sm text-muted-foreground">Text HOME to 741741</div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium">NAMI Helpline</div>
                      <div className="text-sm text-muted-foreground">1-800-950-NAMI (6264)</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
