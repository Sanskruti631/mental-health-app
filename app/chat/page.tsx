"use client"

import { useState, useEffect } from "react"
import { ChatInterface } from "@/components/chat-interface"
import { ChatSidebar } from "@/components/chat-sidebar"

interface ChatSession {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
  unreadCount?: number
}

export default function ChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Mental Health Support",
      lastMessage: "Hello! I'm your AI mental health support assistant...",
      timestamp: new Date(),
    },
  ])
  const [activeSessionId, setActiveSessionId] = useState("1")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    // Check for saved dark mode preference
    const saved = localStorage.getItem("darkMode")
    if (saved) {
      setIsDarkMode(JSON.parse(saved))
    }

    // Check for saved sidebar state
    const sidebarState = localStorage.getItem("sidebarCollapsed")
    if (sidebarState) {
      setSidebarCollapsed(JSON.parse(sidebarState))
    }
  }, [])

  useEffect(() => {
    // Apply dark mode to document
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode))
  }, [isDarkMode])

  useEffect(() => {
    // Save sidebar state
    localStorage.setItem("sidebarCollapsed", JSON.stringify(sidebarCollapsed))
  }, [sidebarCollapsed])

  const handleNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Conversation",
      lastMessage: "Start a new conversation...",
      timestamp: new Date(),
    }
    setSessions(prev => [newSession, ...prev])
    setActiveSessionId(newSession.id)
  }

  const handleDeleteSession = (id: string) => {
    setSessions(prev => prev.filter(session => session.id !== id))
    if (activeSessionId === id && sessions.length > 1) {
      const remainingSessions = sessions.filter(session => session.id !== id)
      setActiveSessionId(remainingSessions[0].id)
    }
  }

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <ChatSidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSessionSelect={setActiveSessionId}
        onNewSession={handleNewSession}
        onDeleteSession={handleDeleteSession}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        isCollapsed={sidebarCollapsed}
        onToggleSidebar={toggleSidebar}
      />

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatInterface
          sessionId={activeSessionId}
          isDarkMode={isDarkMode}
          onUpdateSession={(id, title, lastMessage) => {
            setSessions(prev => prev.map(session =>
              session.id === id
                ? { ...session, title, lastMessage, timestamp: new Date() }
                : session
            ))
          }}
        />
      </div>
    </div>
  )
}
