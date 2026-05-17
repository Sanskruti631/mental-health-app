"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Copy } from "lucide-react";

const LANGUAGES = [
  { code: "hi", name: "Hindi" },
  { code: "mr", name: "Marathi" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "bn", name: "Bengali" },
];

const ENGLISH_TRANSLATIONS = {
  selectLanguage: "Select Language",
  backToHome: "Back to Home",
  shareWhatsOnYourMind: "Share what's on your mind...",
  send: "Send",
  stopRecording: "Stop recording",
  startVoiceInput: "Start voice input",
  aiProvidesSupport: "This AI provides support but is not a replacement for professional mental health care.",
  immediateHelpAvailable: "Immediate Help Available",
  call988: "Call 988 (Suicide & Crisis Lifeline) or Text HOME to 741741",
  professionalHelpRecommended: "Professional Help Recommended",
  basedOnConversation: "Based on your conversation, we recommend speaking with a professional counselor. Would you like to schedule an appointment?",
  notNow: "Not Now",
  scheduleAppointment: "Schedule Appointment",
  heroTitle: "Your Mental Health Matters",
  heroDescription: "A comprehensive digital platform providing AI-guided support and professional counseling for students in higher education. Available 24/7, stigma-free, and culturally sensitive.",
  startChat: "Start AI Chat",
  bookCounseling: "Book Counseling",
  aiSupport: "AI-Guided Support",
  aiSupportDesc: "24/7 intelligent chatbot providing immediate coping strategies and crisis intervention",
  confidential: "Confidential & Safe",
  confidentialDesc: "Complete privacy protection with secure, anonymous support options",
  alwaysAvailable: "Always Available",
  alwaysAvailableDesc: "Round-the-clock access to mental health resources and emergency support",
  features: "Features",
  about: "About",
  login: "Login",
  signUp: "Sign Up",
  alreadyHaveAccount: "Already have an account?",
  signIn: "Sign in",
  aiChatbot: "AI Chatbot",
  bookAppointment: "Book Appointment",
  dashboard: "Dashboard",
  userManagement: "User Management",
  analytics: "Analytics",
  appointments: "Appointments",
  messages: "Messages",
  newConversation: "New Conversation",
  startNewConversation: "Start a new conversation...",
  mentalHealthSupport: "Mental Health Support",
  featuresSectionTitle: "Everything You Need for Better Mental Health",
  featuresSectionDescription: "From AI-powered support to professional counseling, we provide comprehensive tools designed specifically for students.",
  aiChatSupport: "AI-Powered Chat Support",
  aiChatSupportDesc: "Get instant, confidential mental health guidance from our intelligent chatbot trained to help with stress, anxiety, and more.",
  bookCounselingSessions: "Book Counseling Sessions",
  bookCounselingSessionsDesc: "Schedule appointments with verified therapists and counselors who specialize in student mental health.",
  selfHelpResources: "Self-Help Resources",
  selfHelpResourcesDesc: "Access curated articles, guided exercises, and evidence-based techniques for managing your mental wellbeing.",
  mentalHealthAssessments: "Mental Health Assessments",
  mentalHealthAssessmentsDesc: "Take clinically validated questionnaires like PHQ-9 and GAD-7 to better understand your mental health.",
  learnMore: "Learn More",
  crisisSupportAvailable: "Crisis Support Available 24/7",
  crisisSupportDescription: "If you're experiencing a mental health emergency, immediate help is available.",
  crisisHelpline: "Crisis Helpline : 18008914413",
  emergencyResources: "Emergency Resources",
  statsSectionTitle: "Making a Difference",
  statsSectionDescription: "Our evidence-based approach is helping students across institutions build resilience and maintain better mental health.",
  studentsSupported: "of students report high stress levels",
  studentsSupportedDesc: "Academic pressure and social challenges affect majority of students",
  sessionsCompleted: "Sessions Completed",
  counselorsAvailable: "Counselors Available",
  averageRating: "Average Rating",
  soulSupport: "SoulSupport",
  soulSupportTagline: "Your companion in mental wellness",
  quickLinks: "Quick Links",
  support: "Support",
  home: "Home",
  resources: "Resources",
  contact: "Contact",
  privacy: "Privacy",
  terms: "Terms",
  legal: "Legal",
  privacyPolicy: "Privacy Policy",
  termsOfService: "Terms of Service",
  followUs: "Follow Us",
  copyright: "© 2026 SoulSupport Digital Mental Health Platform. Built with care for student wellbeing.",
};

export default function TranslatePage() {
  const [targetLang, setTargetLang] = useState("hi");
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isTranslating, setIsTranslating] = useState(false);
  const [progress, setProgress] = useState(0);

  async function translateText(text: string, lang: string) {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, targetLanguage: lang }),
    });

    const data = await response.json();
    return data.translation || text;
  }

  async function generateAllTranslations() {
    setIsTranslating(true);
    setProgress(0);
    setTranslations({});

    const newTranslations: Record<string, string> = {};
    const keys = Object.keys(ENGLISH_TRANSLATIONS);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const text = ENGLISH_TRANSLATIONS[key as keyof typeof ENGLISH_TRANSLATIONS];
      
      try {
        const translated = await translateText(text, targetLang);
        newTranslations[key] = translated;
      } catch (error) {
        newTranslations[key] = text;
      }

      setProgress(Math.round(((i + 1) / keys.length) * 100));
      setTranslations({ ...newTranslations });
    }

    setIsTranslating(false);
  }

  function copyToClipboard() {
    const output = Object.entries(translations)
      .map(([key, value]) => `          ${key}: "${value.replace(/"/g, '\\"')}",`)
      .join("\n");
    navigator.clipboard.writeText(output);
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">AI Translation Generator</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Generate Translations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Target Language</label>
                <Select value={targetLang} onValueChange={setTargetLang}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={generateAllTranslations} disabled={isTranslating}>
                {isTranslating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Translating {progress}%
                  </>
                ) : (
                  "Generate Translations"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {Object.keys(translations).length > 0 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Generated Translations</CardTitle>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy All
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea
                value={Object.entries(translations)
                  .map(([key, value]) => `          ${key}: "${value.replace(/"/g, '\\"')}",`)
                  .join("\n")}
                rows={20}
                readOnly
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
