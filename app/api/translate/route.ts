import { NextResponse } from "next/server";
import { getSecurityHeaders } from "@/lib/auth-utils";

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
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
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

export async function POST(req: Request) {
  try {
    const { text, targetLanguage } = await req.json();

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { success: false, message: "Text and target language are required" },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    if (targetLanguage === "en") {
      return NextResponse.json(
        { success: true, translation: text },
        { headers: getSecurityHeaders() }
      );
    }

    const translationUrl = process.env.TRANSLATION_API_URL || "http://localhost:11434/api/chat";
    const translationModel = process.env.TRANSLATION_MODEL || "llama3.1:8b";

    const translation = await callOllama(
      translationUrl,
      translationModel,
      `You are a professional translator. Translate the following text to ${LANGUAGE_NAMES[targetLanguage] || "English"}. Only provide the translation, no extra text.`,
      text
    );

    return NextResponse.json(
      { success: true, translation: translation.trim() },
      { headers: getSecurityHeaders() }
    );

  } catch (error: any) {
    console.error("Translation API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to translate text",
      },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}
