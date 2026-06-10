"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, MessageSquare, Trash2 } from "lucide-react";

interface ChatSession {
  id: string;
  title: string;
  created_at: Date;
  updated_at: Date;
}

interface ChatSidebarProps {
  onSelectSession: (session: ChatSession | null) => void;
  selectedSessionId: string | null;
  onNewChat: () => void;
}

export function ChatSidebar({
  onSelectSession,
  selectedSessionId,
  onNewChat
}: ChatSidebarProps) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const res = await fetch("/api/ai-chat/sessions");
      if (res.ok) {
        const data = await res.json();
        setSessions(data.sessions || []);
      }
    } catch (error) {
      console.error("Error loading sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSession = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/ai-chat/sessions/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        if (selectedSessionId === id) {
          onSelectSession(null);
        }
        loadSessions();
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <div className="w-64 border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <Button
          className="w-full"
          onClick={() => {
            onNewChat();
            loadSessions();
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1">
        {loading ? (
          <div className="p-4 text-center text-muted-foreground">
            Loading...
          </div>
        ) : sessions.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No chat sessions yet
          </div>
        ) : (
          <div className="p-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`p-3 rounded-lg mb-2 cursor-pointer flex items-center justify-between group transition-colors ${
                  selectedSessionId === session.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
                onClick={() => onSelectSession(session)}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm truncate max-w-36">
                    {session.title}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 h-6 w-6"
                  onClick={(e) => handleDeleteSession(e, session.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
