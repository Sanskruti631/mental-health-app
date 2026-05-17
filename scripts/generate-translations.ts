import fs from "fs";
import path from "path";

const LANGUAGE_NAMES: Record<string, string> = {
  hi: "Hindi",
  mr: "Marathi",
  ta: "Tamil",
  te: "Telugu",
  bn: "Bengali",
};

const SUPPORTED_LANGUAGES = ["hi", "mr", "ta", "te", "bn"];

async function callOllama(
  text: string,
  targetLanguage: string
): Promise<string> {
  const url = process.env.TRANSLATION_API_URL || "http://localhost:11434/api/chat";
  const model = process.env.TRANSLATION_MODEL || "llama3.1:8b";

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: `You are a professional translator. Translate the following text to ${LANGUAGE_NAMES[targetLanguage]}. Only provide the translation, no extra text. Keep the tone consistent and natural for mental health content.`,
        },
        { role: "user", content: text },
      ],
      stream: false,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ollama call failed: ${errorText}`);
  }

  const data = await response.json();
  return (data.message?.content || text).trim();
}

async function generateTranslations() {
  console.log("🚀 Starting AI translation generation...\n");

  const i18nPath = path.join(process.cwd(), "lib", "i18n.ts");
  let i18nContent = fs.readFileSync(i18nPath, "utf-8");

  const englishTranslations: Record<string, string> = {};
  
  const enMatch = i18nContent.match(/en:\s*\{\s*translation:\s*\{([\s\S]*?)\n\s*\}\s*\}/);
  if (enMatch) {
    const enTrans = enMatch[1];
    const keyValueMatches = enTrans.matchAll(/(\w+):\s*"([^"]*)"/g);
    for (const match of keyValueMatches) {
      englishTranslations[match[1]] = match[2];
    }
  }

  console.log(`✅ Extracted ${Object.keys(englishTranslations).length} English translation keys\n`);

  for (const lang of SUPPORTED_LANGUAGES) {
    console.log(`\n📝 Translating to ${LANGUAGE_NAMES[lang]}...`);
    
    const langTranslations: Record<string, string> = {};
    let successCount = 0;
    let failCount = 0;

    for (const [key, text] of Object.entries(englishTranslations)) {
      try {
        process.stdout.write(`  Translating: ${key}... `);
        const translated = await callOllama(text, lang);
        langTranslations[key] = translated;
        successCount++;
        process.stdout.write("✅\n");
      } catch (error) {
        failCount++;
        process.stdout.write(`❌ (Error: ${(error as Error).message})\n`);
        langTranslations[key] = text;
      }
    }

    console.log(`\n✅ ${LANGUAGE_NAMES[lang]}: ${successCount} succeeded, ${failCount} failed`);

    const langSectionStart = `${lang}: {
        translation: {`;
    const langSectionEnd = `        },
      }`;

    let newLangContent = `${lang}: {
        translation: {`;
    
    for (const [key, value] of Object.entries(langTranslations)) {
      newLangContent += `
          ${key}: "${value.replace(/"/g, '\\"')}",`;
    }
    
    newLangContent += `
        },
      }`;

    const langSectionRegex = new RegExp(`${lang}: \\{[\\s\\S]*?\\},\\s*\\}`, "g");
    i18nContent = i18nContent.replace(langSectionRegex, newLangContent);
  }

  fs.writeFileSync(i18nPath, i18nContent, "utf-8");
  console.log("\n🎉 All translations generated and saved to lib/i18n.ts!");
}

generateTranslations().catch(console.error);
