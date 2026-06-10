"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";
import { ChatInterface } from "@/components/chat-interface";
import { ChatSidebar } from "@/components/chat-sidebar";
import { WellnessSidebar } from "@/components/wellness-sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ChatSession {
  id: string;
  title: string;
  created_at: Date;
  updated_at: Date;
}

export default function ChatPage() {
  const { t } = useTranslation();

  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference
    const saved = localStorage.getItem("darkMode");
    if (saved) {
      setIsDarkMode(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Apply dark mode to document
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleNewChat = () => {
    setCurrentSession(null);
  };

  const handleSelectSession = (session: ChatSession | null) => {
    setCurrentSession(session);
  };

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      <WellnessSidebar />
      {/* Chat Sidebar */}
      <ChatSidebar
        onSelectSession={handleSelectSession}
        selectedSessionId={currentSession?.id || null}
        onNewChat={handleNewChat}
      />

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-4 border-b border-border">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t("backToHome")}
            </Link>
          </Button>
        </div>
        <ChatInterface
          currentSessionId={currentSession?.id || null}
          isDarkMode={isDarkMode}
          onUpdateSession={() => {}}
        />
      </div>
    </div>
  );
}
