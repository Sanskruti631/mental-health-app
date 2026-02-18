"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Wind,
  Heart,
  Brain,
  Waves,
  Sun,
  Moon,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Target,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function WellnessGames() {
  const [breathingActive, setBreathingActive] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState("inhale")
  const [breathingCount, setBreathingCount] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [focusScore, setFocusScore] = useState(0)
  const [moodPoints, setMoodPoints] = useState(0)
  const [currentColor, setCurrentColor] = useState("#10b981")
  const [colorSequence, setColorSequence] = useState<string[]>([])
  const [userSequence, setUserSequence] = useState<string[]>([])
  const [gameActive, setGameActive] = useState(false)
  const [showSequence, setShowSequence] = useState(false)

  const colors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"]
  const breathingTimer = useRef<NodeJS.Timeout>()

  // Breathing Exercise Logic
  const startBreathing = () => {
    setBreathingActive(true)
    setBreathingCount(0)
    breathingCycle()
  }

  const breathingCycle = () => {
    // Inhale (4 seconds)
    setBreathingPhase("inhale")
    breathingTimer.current = setTimeout(() => {
      // Hold (7 seconds)
      setBreathingPhase("hold")
      breathingTimer.current = setTimeout(() => {
        // Exhale (8 seconds)
        setBreathingPhase("exhale")
        breathingTimer.current = setTimeout(() => {
          setBreathingCount((prev) => {
            const newCount = prev + 1
            if (newCount < 4 && breathingActive) {
              breathingCycle()
            } else {
              setBreathingActive(false)
              setMoodPoints((prev) => prev + 10)
            }
            return newCount
          })
        }, 8000)
      }, 7000)
    }, 4000)
  }

  const stopBreathing = () => {
    setBreathingActive(false)
    if (breathingTimer.current) {
      clearTimeout(breathingTimer.current)
    }
  }

  // Color Memory Game Logic
  const startColorGame = () => {
    const newSequence = [colors[Math.floor(Math.random() * colors.length)]]
    setColorSequence(newSequence)
    setUserSequence([])
    setGameActive(true)
    setShowSequence(true)

    setTimeout(() => {
      setShowSequence(false)
    }, 1000)
  }

  const handleColorClick = (color: string) => {
    if (showSequence || !gameActive) return

    const newUserSequence = [...userSequence, color]
    setUserSequence(newUserSequence)

    if (newUserSequence[newUserSequence.length - 1] !== colorSequence[newUserSequence.length - 1]) {
      // Wrong color
      setGameActive(false)
      setFocusScore(0)
    } else if (newUserSequence.length === colorSequence.length) {
      // Correct sequence completed
      setFocusScore((prev) => prev + 10)
      setMoodPoints((prev) => prev + 5)

      // Add new color to sequence
      setTimeout(() => {
        const nextSequence = [...colorSequence, colors[Math.floor(Math.random() * colors.length)]]
        setColorSequence(nextSequence)
        setUserSequence([])
        setShowSequence(true)

        setTimeout(
          () => {
            setShowSequence(false)
          },
          1000 + nextSequence.length * 200,
        )
      }, 1000)
    }
  }

  useEffect(() => {
    return () => {
      if (breathingTimer.current) {
        clearTimeout(breathingTimer.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-500 rounded-lg p-2">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Wellness Games</h1>
                <p className="text-muted-foreground">Refresh your mind with relaxing activities</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Mood Points</p>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                  {moodPoints} pts
                </Badge>
              </div>
              <Link href="/dashboard/student">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="breathing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="breathing" className="flex items-center space-x-2">
              <Wind className="h-4 w-4" />
              <span>Breathing</span>
            </TabsTrigger>
            <TabsTrigger value="focus" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Focus</span>
            </TabsTrigger>
            <TabsTrigger value="memory" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>Memory</span>
            </TabsTrigger>
            <TabsTrigger value="relaxation" className="flex items-center space-x-2">
              <Waves className="h-4 w-4" />
              <span>Relaxation</span>
            </TabsTrigger>
          </TabsList>

          {/* Breathing Exercise */}
          <TabsContent value="breathing">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wind className="h-5 w-5 mr-2 text-emerald-500" />
                  4-7-8 Breathing Exercise
                </CardTitle>
                <CardDescription>A calming breathing technique to reduce stress and anxiety</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <div
                    className={`w-32 h-32 rounded-full border-4 border-emerald-500 flex items-center justify-center transition-all duration-1000 ${
                      breathingActive
                        ? breathingPhase === "inhale"
                          ? "scale-125 bg-emerald-100 dark:bg-emerald-900/30"
                          : breathingPhase === "hold"
                            ? "scale-125 bg-emerald-200 dark:bg-emerald-800/50"
                            : "scale-75 bg-emerald-50 dark:bg-emerald-950/30"
                        : "bg-emerald-50 dark:bg-emerald-950/30"
                    }`}
                  >
                    <div className="text-center">
                      <p className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">
                        {breathingActive ? breathingPhase.charAt(0).toUpperCase() + breathingPhase.slice(1) : "Ready"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {breathingActive ? `${breathingCount + 1}/4` : "Start"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {breathingActive
                        ? breathingPhase === "inhale"
                          ? "Breathe in slowly through your nose (4 seconds)"
                          : breathingPhase === "hold"
                            ? "Hold your breath (7 seconds)"
                            : "Exhale slowly through your mouth (8 seconds)"
                        : "Click start to begin the 4-7-8 breathing exercise"}
                    </p>
                    {breathingActive && <Progress value={breathingCount * 25} className="w-full max-w-md mx-auto" />}
                  </div>

                  <div className="flex justify-center space-x-2">
                    {!breathingActive ? (
                      <Button onClick={startBreathing} className="bg-emerald-500 hover:bg-emerald-600">
                        <Play className="h-4 w-4 mr-2" />
                        Start Breathing
                      </Button>
                    ) : (
                      <Button onClick={stopBreathing} variant="outline">
                        <Pause className="h-4 w-4 mr-2" />
                        Stop
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => setSoundEnabled(!soundEnabled)}>
                      {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Focus Game */}
          <TabsContent value="focus">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-500" />
                  Focus Challenge
                </CardTitle>
                <CardDescription>Follow the moving dot to improve concentration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg h-64 overflow-hidden">
                  <div
                    className="absolute w-4 h-4 bg-blue-500 rounded-full transition-all duration-2000 ease-in-out"
                    style={{
                      left: `${Math.random() * 90}%`,
                      top: `${Math.random() * 90}%`,
                      animation: "float 3s ease-in-out infinite",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Follow the blue dot with your eyes</p>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-lg font-semibold">Focus Score: {focusScore}</p>
                  <Button onClick={() => setFocusScore((prev) => prev + 1)} className="bg-blue-500 hover:bg-blue-600">
                    <Zap className="h-4 w-4 mr-2" />
                    Practice Focus
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Memory Game */}
          <TabsContent value="memory">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-500" />
                  Color Memory Challenge
                </CardTitle>
                <CardDescription>Remember and repeat the color sequence to boost memory</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-5 gap-4 max-w-md mx-auto">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => handleColorClick(color)}
                      className={`w-16 h-16 rounded-lg border-2 transition-all duration-200 ${
                        showSequence && colorSequence.includes(color)
                          ? "border-white shadow-lg scale-110"
                          : "border-gray-300 hover:scale-105"
                      }`}
                      style={{
                        backgroundColor: color,
                        opacity: showSequence && !colorSequence.includes(color) ? 0.3 : 1,
                      }}
                      disabled={showSequence}
                    />
                  ))}
                </div>

                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <p className="text-lg font-semibold">Level: {colorSequence.length}</p>
                    <p className="text-sm text-muted-foreground">
                      {showSequence
                        ? "Watch the sequence..."
                        : gameActive
                          ? "Repeat the sequence by clicking the colors"
                          : "Click start to begin the memory challenge"}
                    </p>
                  </div>

                  <div className="flex justify-center space-x-2">
                    <Button
                      onClick={startColorGame}
                      disabled={gameActive && !showSequence}
                      className="bg-purple-500 hover:bg-purple-600"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {gameActive ? "New Game" : "Start Game"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setGameActive(false)
                        setColorSequence([])
                        setUserSequence([])
                        setShowSequence(false)
                      }}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Relaxation */}
          <TabsContent value="relaxation">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sun className="h-5 w-5 mr-2 text-yellow-500" />
                    Sunrise Visualization
                  </CardTitle>
                  <CardDescription>Imagine a peaceful sunrise to start your day</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-t from-orange-200 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-lg h-32 flex items-center justify-center">
                    <Sun className="h-12 w-12 text-yellow-500 animate-pulse" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Close your eyes and imagine watching a beautiful sunrise. Feel the warmth on your face.
                  </p>
                  <Button
                    className="w-full bg-yellow-500 hover:bg-yellow-600"
                    onClick={() => setMoodPoints((prev) => prev + 5)}
                  >
                    Start Visualization
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Moon className="h-5 w-5 mr-2 text-indigo-500" />
                    Night Sky Meditation
                  </CardTitle>
                  <CardDescription>Find peace under the stars</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-t from-indigo-900 to-purple-800 rounded-lg h-32 flex items-center justify-center relative overflow-hidden">
                    <Moon className="h-8 w-8 text-yellow-200" />
                    <div className="absolute inset-0">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Imagine lying under a starry sky. Let your worries drift away like clouds.
                  </p>
                  <Button
                    className="w-full bg-indigo-500 hover:bg-indigo-600"
                    onClick={() => setMoodPoints((prev) => prev + 5)}
                  >
                    Start Meditation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Achievement Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-emerald-500" />
              Your Wellness Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                <Heart className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                <p className="font-semibold">Mood Points</p>
                <p className="text-2xl font-bold text-emerald-600">{moodPoints}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="font-semibold">Focus Score</p>
                <p className="text-2xl font-bold text-blue-600">{focusScore}</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                <Brain className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="font-semibold">Memory Level</p>
                <p className="text-2xl font-bold text-purple-600">{colorSequence.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(20px, -20px); }
          50% { transform: translate(-15px, 10px); }
          75% { transform: translate(10px, -15px); }
        }
      `}</style>
    </div>
  )
}
