import { NextResponse } from "next/server";
import { calculateNegativityScore, containsCrisisKeywords } from "@/lib/ai/sentiment";
import { getSecurityHeaders, getSessionToken } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  hi: "Hindi",
  mr: "Marathi",
  ta: "Tamil",
  te: "Telugu",
  bn: "Bengali",
};

async function callOllama(
  url: string,
  model: string,
  messages: Array<{ role: string; content: string }>
): Promise<string> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ollama call failed: ${errorText}`);
  }

  const data = await response.json();
  return data.message?.content || "";
}

async function extractMoodFeatures(
  history: Array<{ role: string; content: string }>,
  translationUrl: string,
  translationModel: string
): Promise<{ mood_avg: number; mood_trend: string }> {
  const conversationText = history
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join("\n");

  const extractionPrompt = `Based on the conversation below, extract these features as JSON only (no extra text):
- mood_avg: average mood 1-5 (1=bad, 5=great, default 3 if not mentioned)
- mood_trend: "improving", "stable", or "declining" (default "stable")

Conversation:
${conversationText}

Return ONLY valid JSON, no other text.`;

  try {
    const result = await callOllama(translationUrl, translationModel, [
      { role: "system", content: "You are a helpful assistant that extracts mood-related data from conversations. Always return valid JSON only." },
      { role: "user", content: extractionPrompt }
    ]);
    
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        mood_avg: Math.max(1, Math.min(5, parsed.mood_avg || 3)),
        mood_trend: ["improving", "stable", "declining"].includes(parsed.mood_trend) ? parsed.mood_trend : "stable"
      };
    }
  } catch (e) {
    console.error("Mood feature extraction failed:", e);
  }
  
  return { mood_avg: 3, mood_trend: "stable" };
}

async function getUserQuizScores(userId: string): Promise<{ phq9: number; gad7: number; ghq12: number; quiz: number }> {
  try {
    const results = await prisma.questionnaire_results.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
      take: 3
    });

    let phq9 = 0, gad7 = 0, ghq12 = 0;
    for (const result of results) {
      if (result.questionnaire_type === "PHQ-9" && phq9 === 0) phq9 = result.score;
      if (result.questionnaire_type === "GAD-7" && gad7 === 0) gad7 = result.score;
      if (result.questionnaire_type === "GHQ-12" && ghq12 === 0) ghq12 = result.score;
    }

    return {
      phq9,
      gad7,
      ghq12,
      quiz: (phq9 + gad7 + ghq12) / 3
    };
  } catch (e) {
    console.error("Error fetching quiz scores:", e);
    return { phq9: 0, gad7: 0, ghq12: 0, quiz: 0 };
  }
}

function getPersonalizedTips(risk: string): string[] {
  const tips: Record<string, string[]> = {
    low: [
      "Keep up the good work! Try to maintain your daily routines.",
      "Stay connected with friends and family - social support is important.",
      "Remember to take breaks and do things you enjoy."
    ],
    moderate: [
      "Try the 5-4-3-2-1 grounding technique: 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
      "Practice deep breathing: Inhale for 4 counts, hold for 4, exhale for 6.",
      "Consider talking to a trusted friend or family member about how you're feeling."
    ],
    high: [
      "Please reach out to a counselor or mental health professional as soon as possible.",
      "You don't have to go through this alone - professional support can make a big difference.",
      "Try to stay connected with people who care about you."
    ],
    crisis: [
      "Please call a crisis helpline immediately: iCall (TISS): 9152987821 or Vandrevala Foundation: 1860 2662 345.",
      "Your life matters - please reach out for help right away.",
      "Call emergency services at 112 if you feel you're in immediate danger."
    ]
  };
  return tips[risk] || tips.low;
}

export async function POST(req: Request) {
  try {
    const { message, history, language = "en", sessionId } = await req.json();

    if (!message) {
      return NextResponse.json(
        { success: false, message: "Message is required" },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    const translationUrl = process.env.TRANSLATION_API_URL || "http://localhost:11434/api/chat";
    const translationModel = process.env.TRANSLATION_MODEL || "llama3.1:8b";
    const chatbotUrl = process.env.CHATBOT_API_URL || "http://localhost:11434/api/chat";
    const chatbotModel = process.env.CHATBOT_MODEL || "llama3.1:8b";
    const predictUrl = `${new URL(req.url).origin}/api/predict`;

    const sessionToken = getSessionToken(req);
    let userId: string | null = null;
    let chatSessionId: string | null = null;
    
    if (sessionToken) {
      try {
        const session = await prisma.user_sessions.findFirst({
          where: {
            session_token: sessionToken,
            is_active: true,
            expires_at: { gt: new Date() }
          }
        });
        if (session) {
          userId = session.user_id;
          
          // Create or get chat session
          if (sessionId) {
            chatSessionId = sessionId;
            // Update chat session's updated_at
            await prisma.ai_chat_sessions.updateMany({
              where: { id: sessionId, user_id: userId },
              data: { updated_at: new Date() }
            });
          } else {
            // Create new chat session
            const newChatSession = await prisma.ai_chat_sessions.create({
              data: {
                user_id: userId,
                title: "New Chat"
              }
            });
            chatSessionId = newChatSession.id;
          }
        }
      } catch (e) {
        console.error("Session lookup error:", e);
      }
    }

    const chat_neg = calculateNegativityScore(message);
    let messageInEnglish = message;
    let needsTranslation = language !== "en";

    if (needsTranslation) {
      try {
        messageInEnglish = await callOllama(
          translationUrl,
          translationModel,
          [
            { role: "system", content: "You are a professional translator. Translate the following text to English. Only provide the translation, no extra text." },
            { role: "user", content: message }
          ]
        );
      } catch (translateErr) {
        console.error("Translation error (to English):", translateErr);
        messageInEnglish = message;
      }
    }

    const moodFeatures = await extractMoodFeatures(
      [...(history || []), { role: "user", content: messageInEnglish }],
      translationUrl,
      translationModel
    );

    let quizScores = { phq9: 0, gad7: 0, ghq12: 0, quiz: 0 };
    if (userId) {
      quizScores = await getUserQuizScores(userId);
    }

    let riskResult = { risk: "low", confidence: 0.5 };
    try {
      const moodTrendNum = moodFeatures.mood_trend === "declining" ? -1 : moodFeatures.mood_trend === "improving" ? 1 : 0;
      const predictResp = await fetch(predictUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phq9: quizScores.phq9,
          gad7: quizScores.gad7,
          ghq12: quizScores.ghq12,
          quizRiskScore: quizScores.quiz,
          avgMood7Days: moodFeatures.mood_avg,
          moodTrend: moodFeatures.mood_trend,
          negativeChatRatio: chat_neg,
        }),
      });

      if (predictResp.ok) {
        riskResult = await predictResp.json();
      }
    } catch (err) {
      console.error("Risk prediction error in chat:", err);
      if (containsCrisisKeywords(message)) {
        riskResult = { risk: "crisis", confidence: 1.0 };
      }
    }

    if (userId) {
      try {
        // Prisma client typings may not include severity_assessments depending on the schema
        // Cast to any to avoid TypeScript errors while still attempting to write to the DB
        await (prisma as any).severity_assessments.create({
          data: {
            user_id: userId,
            phq9_score: quizScores.phq9,
            gad7_score: quizScores.gad7,
            ghq12_score: quizScores.ghq12,
            quiz_score: quizScores.quiz,
            mood_avg: moodFeatures.mood_avg,
            mood_trend: moodFeatures.mood_trend === "declining" ? -1 : moodFeatures.mood_trend === "improving" ? 1 : 0,
            chat_neg: chat_neg,
            risk_level: riskResult.risk,
            confidence: riskResult.confidence
          }
        });
      } catch (dbErr) {
        console.error("Error storing assessment:", dbErr);
      }
    }

    const personalizedTips = getPersonalizedTips(riskResult.risk);

    let riskPrompt = "";
    if (riskResult.risk === "crisis") {
      riskPrompt = "CRITICAL: The user is in crisis. Provide immediate support, validate their pain, and gently but firmly encourage them to call a crisis helpline. Keep the response short and prioritize safety. Include one of these crisis helplines: iCall (TISS): 9152987821 or Vandrevala Foundation: 1860 2662 345 or AASRA: 9820466726.";
    } else if (riskResult.risk === "high") {
      riskPrompt = `URGENT: The user shows high risk. Be extremely supportive and strongly encourage them to speak with a professional or a trusted person immediately. Personalized tip: ${personalizedTips[0]}`;
    } else if (riskResult.risk === "moderate") {
      riskPrompt = `MODERATE RISK: Suggest specific, gentle coping strategies. Personalized tips: ${personalizedTips.slice(0, 2).join(" ")}`;
    } else {
      riskPrompt = `LOW RISK: Provide general supportive and empathetic conversation. Positive note: ${personalizedTips[0]}`;
    }

    const chatbotSystemPrompt = `You are SoulSupport, a compassionate mental health companion. ${riskPrompt}

RESPONSE RULES:
1. Keep responses concise (2-4 sentences MAX, unless crisis)
2. Use simple, easy-to-understand language
3. Always be empathetic and validate feelings
4. DO NOT make medical diagnoses
5. Ask gentle, open-ended questions to learn more
6. Keep tone warm and supportive
7. For crisis: SHORT, urgent, safety-focused
8. Reference what the user has shared
9. Never mention you're analyzing data - just have a natural conversation
10. Include relevant coping tips when appropriate
11. When you identify a specific topic (anxiety, stress, depression, sleep issues/insomnia, or lust/porn addiction, you MUST recommend the appropriate resources from our Learning Resources page using markdown links like:
    - For anxiety or stress: [Stress and Anxiety Resources](http://localhost:3000/resources?category=Stress%20and%20Anxiety)
    - For depression: [Depression Resources](http://localhost:3000/resources?category=Depression)
    - For sleep issues or insomnia: [Sleep Disorders Resources](http://localhost:3000/resources?category=Sleep%20Disorders%20%28Insomnia%29)
    - For lust or porn addiction: [Lust Resources](http://localhost:3000/resources?category=Lust)
12. Always make resource recommendations only when appropriate and relevant, and use the links above (use http://localhost:3000 as the base URL)`;

    const chatMessages: Array<{ role: string; content: string }> = [
      { role: "system", content: chatbotSystemPrompt }
    ];

    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        chatMessages.push({
          role: msg.role === "user" ? "user" : "assistant",
          content: msg.content
        });
      });
    }

    chatMessages.push({ role: "user", content: messageInEnglish });

    let replyInEnglish = "";
    try {
      replyInEnglish = await callOllama(
        chatbotUrl,
        chatbotModel,
        chatMessages
      );
    } catch (chatbotErr) {
      console.error("Chatbot error:", chatbotErr);
      replyInEnglish = "I'm here for you. Can you tell me more about how you're feeling?";
    }

    let finalReply = replyInEnglish;
    if (needsTranslation) {
      try {
        finalReply = await callOllama(
          translationUrl,
          translationModel,
          [
            { role: "system", content: `You are a professional translator. Translate the following text to ${LANGUAGE_NAMES[language] || "English"}. Only provide the translation, no extra text.` },
            { role: "user", content: replyInEnglish }
          ]
        );
      } catch (translateErr) {
        console.error("Translation error (from English):", translateErr);
        finalReply = replyInEnglish;
      }
    }

    // Save chat messages to database
    if (userId && chatSessionId) {
      try {
        // Save user message
        await prisma.ai_chat_messages.create({
          data: {
            session_id: chatSessionId,
            sender: "user",
            content: message
          }
        });
        
        // Save AI message
        await prisma.ai_chat_messages.create({
          data: {
            session_id: chatSessionId,
            sender: "ai",
            content: finalReply
          }
        });
      } catch (dbErr) {
        console.error("Error saving chat messages:", dbErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        reply: finalReply,
        sessionId: chatSessionId,
        risk: riskResult.risk,
        confidence: riskResult.confidence,
        chat_neg: chat_neg,
        tips: personalizedTips
      },
      { headers: getSecurityHeaders() }
    );

  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process chat",
      },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}
