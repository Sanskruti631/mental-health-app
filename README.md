# SoulSupport Multilingual Update

This folder contains all the files needed to add AI-powered multilingual support to the SoulSupport project.

## 📁 Files Included

### New Files:
- `app/api/translate/route.ts` - AI translation API endpoint using Ollama
- `app/translate/page.tsx` - Interactive translation generator page
- `scripts/generate-translations.ts` - Script to generate translations automatically

### Modified Files:
- `lib/i18n.ts` - Complete i18n configuration with 6 language translations
- `components/navigation.tsx` - Fixed translation keys and imports
- `components/features-section.tsx` - Full translation support
- `components/stats-section.tsx` - Full translation support
- `components/footer.tsx` - Full translation support

## 🌐 Supported Languages

1. English (en)
2. Hindi (hi)
3. Marathi (mr)
4. Tamil (ta)
5. Telugu (te)
6. Bengali (bn)

## 🚀 Installation

1. Copy all files from this folder to your project root
2. Make sure Ollama is running locally with the translation model
3. Start your dev server: `npm run dev`

## 🔧 Environment Variables

Make sure your `.env.local` has:
```
TRANSLATION_API_URL=http://localhost:11434/api/chat
TRANSLATION_MODEL=llama3.1:8b
```

## 📝 Usage

- **Language Switcher**: Available in the navigation bar
- **Translation Generator**: Visit `/translate` to generate new translations
- **Persistent Language**: User's language choice is saved to localStorage

## ✨ Features

- AI-powered translation using Ollama
- 6 fully supported Indian languages
- All homepage components translated
- Crisis banner and helpline translated
- SEO-friendly and culturally appropriate translations
