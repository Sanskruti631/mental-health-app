import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// Get session token from cookies
function getSessionToken(request: Request): string | null {
  return request.headers.get("cookie")?.split("session-token=")[1]?.split(";")[0] ?? null
}

// Calculate mood average and trend from mood entries
function calculateMoodFeatures(moodEntries: any[]) {
  if (moodEntries.length === 0) {
    return { mood_avg: 3.0, mood_trend: 0.0 } // Default: neutral average, stable trend
  }

  // Sort entries by date (newest last)
  const sorted = [...moodEntries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Calculate average
  const avg = sorted.reduce((sum, entry) => sum + entry.mood_level, 0) / sorted.length

  // Calculate trend (simple linear regression slope)
  let trend = 0.0
  if (sorted.length >= 2) {
    const n = sorted.length
    const xMean = (n - 1) / 2
    const yMean = avg

    let numerator = 0
    let denominator = 0

    for (let i = 0; i < n; i++) {
      numerator += (i - xMean) * (sorted[i].mood_level - yMean)
      denominator += Math.pow(i - xMean, 2)
    }

    trend = denominator !== 0 ? numerator / denominator : 0
  }

  return { mood_avg: avg, mood_trend: trend }
}

// Simple sentiment analysis for chat negativity (0-1 scale)
function calculateChatNegativity(messages: any[]) {
  if (messages.length === 0) {
    return 0.0
  }

  // Get last 20 user messages
  const userMessages = messages
    .filter(m => m.sender_id !== "ai" && m.sender_id !== "system")
    .slice(-20)
    .map(m => m.message_text.toLowerCase())

  if (userMessages.length === 0) {
    return 0.0
  }

  // Negative keywords (simple lexicon-based)
  const negativeKeywords = [
    "sad", "depressed", "hopeless", "worthless", "empty", "tired", "exhausted",
    "anxious", "worried", "scared", "afraid", "nervous", "panic",
    "angry", "frustrated", "irritated", "hate", "suicide", "kill", "die",
    "can't sleep", "insomnia", "no appetite", "overeat", "can't focus",
    "fail", "failure", "disappointed", "let down"
  ]

  let totalNegativity = 0

  for (const text of userMessages) {
    let count = 0
    for (const keyword of negativeKeywords) {
      if (text.includes(keyword)) {
        count++
      }
    }
    totalNegativity += Math.min(count / 3, 1.0) // Cap at 1.0 per message
  }

  return totalNegativity / userMessages.length
}

// Get latest questionnaire scores for user
async function getQuestionnaireScores(userId: string) {
  const results = await prisma.questionnaire_results.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
    take: 3,
  })

  let phq9 = 0
  let gad7 = 0
  let ghq12 = 0

  for (const result of results) {
    if (result.questionnaire_type === "PHQ-9" && phq9 === 0) {
      phq9 = result.score
    } else if (result.questionnaire_type === "GAD-7" && gad7 === 0) {
      gad7 = result.score
    } else if (result.questionnaire_type === "GHQ-12" && ghq12 === 0) {
      ghq12 = result.score
    }
  }

  return { phq9, gad7, ghq12 }
}

// Call ML service for prediction
async function callMLModel(features: {
  phq9: number
  gad7: number
  ghq12: number
  quiz: number
  mood_avg: number
  mood_trend: number
  chat_neg: number
}) {
  const mlServiceUrl = process.env.ML_SERVICE_URL || "http://localhost:8000"

  try {
    const response = await fetch(`${mlServiceUrl}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(features),
    })

    if (!response.ok) {
      throw new Error(`ML service error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error calling ML model:", error)
    // Fallback risk assessment if ML service is down
    const totalScore = features.phq9 + features.gad7 + features.ghq12 + (features.chat_neg * 20)
    let risk = "low"
    if (totalScore > 40) risk = "crisis"
    else if (totalScore > 25) risk = "high"
    else if (totalScore > 10) risk = "moderate"

    return {
      risk,
      confidence: 0.7,
      probabilities: { low: 0.25, moderate: 0.25, high: 0.25, crisis: 0.25 },
    }
  }
}

export async function POST(request: Request) {
  try {
    const sessionToken = getSessionToken(request)
    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user session
    const session = await prisma.user_sessions.findFirst({
      where: {
        session_token: sessionToken,
        is_active: true,
        expires_at: { gt: new Date() },
      },
      include: { users: true },
    })

    if (!session?.users) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.users.id

    // 1. Fetch all required data from database
    const [
      questionnaireScores,
      moodEntries,
      recentMessages,
    ] = await Promise.all([
      getQuestionnaireScores(userId),
      prisma.mood_entries.findMany({
        where: { user_id: userId },
        orderBy: { date: "desc" },
        take: 30,
      }),
      prisma.messages.findMany({
        where: {
          conversation: { student_id: userId },
        },
        orderBy: { created_at: "desc" },
        take: 50,
      }),
    ])

    // 2. Feature engineering
    const { mood_avg, mood_trend } = calculateMoodFeatures(moodEntries)
    const chat_neg = calculateChatNegativity(recentMessages)

    // "quiz" feature - combined quiz score normalized
    const quiz = (questionnaireScores.phq9 + questionnaireScores.gad7 + questionnaireScores.ghq12) / 3

    const features = {
      phq9: questionnaireScores.phq9,
      gad7: questionnaireScores.gad7,
      ghq12: questionnaireScores.ghq12,
      quiz,
      mood_avg,
      mood_trend,
      chat_neg,
    }

    // 3. Call ML model for prediction
    const mlPrediction = await callMLModel(features)

    // 4. Store the assessment in database
    const assessment = await prisma.severity_assessments.create({
      data: {
        user_id: userId,
        phq9_score: features.phq9,
        gad7_score: features.gad7,
        ghq12_score: features.ghq12,
        quiz_score: features.quiz,
        mood_avg: features.mood_avg,
        mood_trend: features.mood_trend,
        chat_neg: features.chat_neg,
        risk_level: mlPrediction.risk,
        confidence: mlPrediction.confidence,
        probabilities: mlPrediction.probabilities,
      },
    })

    // 5. Generate personalized recommendations based on risk
    const recommendations = generateRecommendations(mlPrediction.risk, features)

    return NextResponse.json({
      success: true,
      assessment: {
        id: assessment.id,
        riskLevel: mlPrediction.risk,
        confidence: mlPrediction.confidence,
        features,
        recommendations,
        createdAt: assessment.created_at,
      },
    })
  } catch (error) {
    console.error("Assessment error:", error)
    return NextResponse.json(
      { error: "Failed to generate assessment" },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const sessionToken = getSessionToken(request)
    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const session = await prisma.user_sessions.findFirst({
      where: {
        session_token: sessionToken,
        is_active: true,
        expires_at: { gt: new Date() },
      },
      include: { users: true },
    })

    if (!session?.users) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const assessments = await prisma.severity_assessments.findMany({
      where: { user_id: session.users.id },
      orderBy: { created_at: "desc" },
      take: 10,
    })

    return NextResponse.json(assessments)
  } catch (error) {
    console.error("Fetch assessments error:", error)
    return NextResponse.json(
      { error: "Failed to fetch assessments" },
      { status: 500 }
    )
  }
}

function generateRecommendations(riskLevel: string, features: any) {
  const recommendations = {
    immediate: [] as string[],
    resources: [] as string[],
    actions: [] as string[],
  }

  switch (riskLevel) {
    case "crisis":
      recommendations.immediate.push("Please call emergency helpline immediately: 112 or iCall (9152987821)")
      recommendations.immediate.push("You are not alone - reach out to someone you trust right now")
      recommendations.actions.push("Request an urgent appointment with a counselor immediately")
      recommendations.resources.push("AASRA Suicide Helpline: 9820466726")
      recommendations.resources.push("Vandrevala Foundation: 1860 2662 345")
      break

    case "high":
      recommendations.immediate.push("Consider talking to a trusted friend or family member today")
      recommendations.actions.push("Book an appointment with a counselor this week")
      recommendations.actions.push("Try the 5-4-3-2-1 grounding technique when feeling overwhelmed")
      recommendations.resources.push("iCall Helpline: 9152987821 (available 24/7)")
      recommendations.resources.push("Guided meditation for anxiety in wellness resources")
      break

    case "moderate":
      recommendations.immediate.push("Take a 10-minute walk outside if you can")
      recommendations.actions.push("Try journaling your thoughts for 5 minutes daily")
      recommendations.actions.push("Consider scheduling a check-in with a counselor")
      recommendations.resources.push("Explore breathing exercises in wellness section")
      recommendations.resources.push("Try mood tracking to notice patterns")
      break

    case "low":
    default:
      recommendations.immediate.push("Great job taking care of your mental health!")
      recommendations.actions.push("Keep up the self-care routine")
      recommendations.actions.push("Check in with yourself weekly using the mood tracker")
      recommendations.resources.push("Explore wellness resources for maintaining good mental health")
      recommendations.resources.push("Consider helping a friend who might need support")
      break
  }

  // Add personalized recommendations based on features
  if (features.phq9 > 10) {
    recommendations.actions.push("Focus on small, achievable goals each day")
  }
  if (features.gad7 > 8) {
    recommendations.resources.push("Try progressive muscle relaxation exercises")
  }
  if (features.mood_avg < 2.5) {
    recommendations.actions.push("Try to engage in one activity you used to enjoy")
  }

  return recommendations
}
