"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  MessageSquare,
  Bot,
  User,
  Trash2,
  Settings,
  Moon,
  Sun,
  Search,
  PanelLeftOpen,
  PanelLeftClose
} from "lucide-react"
import { Input } from "@/components/ui/input"

interface ChatSession {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
  unreadCount?: number
}

export function ChatSidebar({
  sessions,
  activeSessionId,
  onSessionSelect,
  onNewSession,
  onDeleteSession,
  isDarkMode,
  onToggleDarkMode,
  isCollapsed,
  onToggleSidebar
}: {
  sessions: ChatSession[]
  activeSessionId: string
  onSessionSelect: (id: string) => void
  onNewSession: () => void
  onDeleteSession: (id: string) => void
  isDarkMode: boolean
  onToggleDarkMode: () => void
  isCollapsed: boolean
  onToggleSidebar: () => void
}) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSessions = sessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className={`h-full bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header with Toggle and Theme */}
      <div className="p-3 border-b border-border flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-2 ${isCollapsed ? 'hidden' : ''}`}>
            <span className="font-semibold text-foreground text-sm uppercase tracking-wider opacity-60">Conversations</span>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="w-8 h-8 p-0 rounded-md hover:bg-accent/50 flex-shrink-0"
              title={isCollapsed ? "Show sidebar" : "Hide sidebar"}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </Button>

            {!isCollapsed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleDarkMode}
                className="w-8 h-8 p-0 rounded-md hover:bg-accent/50"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-yellow-500" />
                ) : (
                  <Moon className="w-4 h-4 text-muted-foreground" />
                )}
              </Button>
            )}
          </div>
        </div>

        {!isCollapsed && (
          <>
            <div className="mt-3">
              <Button
                onClick={onNewSession}
                className="w-full bg-primary/10 hover:bg-primary/20 text-primary rounded-lg shadow-none border border-primary/20 h-9 text-sm font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                New chat
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Sessions List - only show when expanded */}
      {!isCollapsed && (
        <>
          <ScrollArea className="flex-1 p-1">
            <div className="space-y-0">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => onSessionSelect(session.id)}
                  className={`group relative px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-150 ${
                    activeSessionId === session.id
                      ? "bg-accent"
                      : "hover:bg-accent/50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-normal text-foreground truncate text-sm flex-1">
                      {session.title}
                    </h3>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteSession(session.id)
                      }}
                      className="w-6 h-6 p-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20 hover:text-destructive flex-shrink-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-3 border-t border-border flex-shrink-0">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:bg-accent/50 rounded-lg h-9 text-sm font-normal px-3">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </>
      )}
    </div>
  )
}