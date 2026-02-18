"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Smile, Meh, Frown, Heart, Brain, Activity, TrendingUp } from "lucide-react"

const moodOptions = [
  { id: "great", label: "Great", icon: Smile, color: "bg-green-500", description: "Feeling amazing!" },
  { id: "good", label: "Good", icon: Smile, color: "bg-blue-500", description: "Pretty good day" },
  { id: "okay", label: "Okay", icon: Meh, color: "bg-yellow-500", description: "Just okay" },
  { id: "low", label: "Low", icon: Frown, color: "bg-orange-500", description: "Not great" },
  { id: "bad", label: "Bad", icon: Frown, color: "bg-red-500", description: "Really struggling" },
]

const activities = ["Exercise", "Sleep", "Social Time", "Work/Study", "Meditation", "Hobbies", "Therapy", "Medication"]

export default function MoodTrackerPage() {
  const [selectedMood, setSelectedMood] = useState("")
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [notes, setNotes] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())

  const handleActivityToggle = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity) ? prev.filter((a) => a !== activity) : [...prev, activity],
    )
  }

  const handleSave = () => {
    const entry = {
      date: date?.toISOString(),
      mood: selectedMood,
      activities: selectedActivities,
      notes,
      timestamp: new Date().toISOString(),
    }

    // Save to localStorage for now
    const existingEntries = JSON.parse(localStorage.getItem("moodEntries") || "[]")
    existingEntries.push(entry)
    localStorage.setItem("moodEntries", JSON.stringify(existingEntries))

    // Reset form
    setSelectedMood("")
    setSelectedActivities([])
    setNotes("")
    alert("Mood entry saved!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="bg-primary rounded-lg p-3">
              <Heart className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">Mood Tracker</h1>
          </div>
          <p className="text-muted-foreground">Track your daily mood and activities to understand patterns</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Mood Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>How are you feeling today?</span>
              </CardTitle>
              <CardDescription>Select the mood that best describes how you're feeling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {moodOptions.map((mood) => {
                  const Icon = mood.icon
                  return (
                    <Button
                      key={mood.id}
                      variant={selectedMood === mood.id ? "default" : "outline"}
                      className={`justify-start h-auto p-4 ${selectedMood === mood.id ? mood.color : ""}`}
                      onClick={() => setSelectedMood(mood.id)}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">{mood.label}</div>
                        <div className="text-sm opacity-70">{mood.description}</div>
                      </div>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Activities & Factors</span>
              </CardTitle>
              <CardDescription>What activities did you do today?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {activities.map((activity) => (
                  <Badge
                    key={activity}
                    variant={selectedActivities.includes(activity) ? "default" : "outline"}
                    className="cursor-pointer px-3 py-1"
                    onClick={() => handleActivityToggle(activity)}
                  >
                    {activity}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notes & Reflections</CardTitle>
              <CardDescription>Any additional thoughts or observations?</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="What happened today? How did you feel? Any insights or patterns you noticed?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Calendar & Save */}
          <Card>
            <CardHeader>
              <CardTitle>Date & Save</CardTitle>
              <CardDescription>Select the date for this entry</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              <Button onClick={handleSave} className="w-full" disabled={!selectedMood}>
                Save Mood Entry
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Your Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">7</div>
                <div className="text-sm text-muted-foreground">Days Tracked</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-blue-600">Good</div>
                <div className="text-sm text-muted-foreground">Average Mood</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-600">5</div>
                <div className="text-sm text-muted-foreground">Activities</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-orange-600">↗️</div>
                <div className="text-sm text-muted-foreground">Trending Up</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
