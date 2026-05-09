import { NextResponse } from "next/server";
import { calculateNegativityScore, containsCrisisKeywords } from "@/lib/ai/sentiment";
import { getSecurityHeaders } from "@/lib/auth-utils";

export async function POST(req: Request) {
  try {
    const { message, history, contextFeatures } = await req.json();

    if (!message) {
      return NextResponse.json(
        { success: false, message: "Message is required" },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    // 1. Calculate Negativity Score
    const chatNeg = calculateNegativityScore(message);

    // 2. Call ML Predict API
    const predictUrl = `${new URL(req.url).origin}/api/predict`;
    let riskResult = { risk: "low", confidence: 0.5 };

    try {
      const predictResp = await fetch(predictUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phq9: contextFeatures?.phq9 || 0,
          gad7: contextFeatures?.gad7 || 0,
          ghq12: contextFeatures?.ghq12 || 0,
          quizRiskScore: contextFeatures?.quizRiskScore || 0,
          avgMood7Days: contextFeatures?.avgMood7Days || 3,
          moodTrend: contextFeatures?.moodTrend || "stable",
          negativeChatRatio: chatNeg,
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

    // 3. Prepare System Prompt based on Risk
    let riskPrompt = "";
    if (riskResult.risk === "crisis") {
      riskPrompt = "CRITICAL: The user is in crisis. Provide immediate support, validate their pain, and gently but firmly encourage them to call the 988 Suicide & Crisis Lifeline. Keep the response short and prioritize safety.";
    } else if (riskResult.risk === "high") {
      riskPrompt = "URGENT: The user shows high risk. Be extremely supportive and strongly encourage them to speak with a professional or a trusted person immediately.";
    } else if (riskResult.risk === "moderate") {
      riskPrompt = "MODERATE RISK: Suggest specific, gentle coping strategies like breathing exercises or grounding techniques.";
    } else {
      riskPrompt = "LOW RISK: Provide general supportive and empathetic conversation.";
    }

    const systemPrompt = `You are a supportive mental health assistant for the SoulSupport platform. 
Use empathetic, non-clinical language. 
Do not diagnose. Encourage healthy coping strategies.
${riskPrompt}`;

    // 4. Call Local DeepSeek (Ollama) API
    const llmUrl = process.env.LLM_API_URL || "http://localhost:11434/api/chat";
    const llmModel = process.env.LLM_MODEL || "deepseek-r1:1.5b";

    const llmResp = await fetch(llmUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: llmModel,
        messages: [
          { role: "system", content: systemPrompt },
          ...history.map((msg: any) => ({
            role: msg.role === "user" ? "user" : "assistant",
            content: msg.content,
          })),
          { role: "user", content: message },
        ],
        stream: false,
      }),
    });

    if (!llmResp.ok) {
      const errorText = await llmResp.text();
      throw new Error(`Local LLM service error: ${errorText}`);
    }

    const llmData = await llmResp.json();
    const reply = llmData.message?.content || "I'm sorry, I'm having trouble processing that right now.";

    // 5. Final Response Format
    return NextResponse.json(
      {
        success: true,
        reply,
        risk: riskResult.risk,
        confidence: riskResult.confidence,
        chat_neg: chatNeg,
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
