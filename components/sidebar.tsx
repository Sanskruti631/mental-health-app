"use client"
import { useRouter } from "next/navigation"
import { Bot } from "lucide-react"

export function AkinatorSidebar() {
  const router = useRouter()

  return (
    <div className="p-4 space-y-4">
      {/* Other sidebar options… */}

      <button
        onClick={() => router.push("/chat")}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted"
      >
        <Bot className="h-5 w-5" />
        AI Chatbot
      </button>
    </div>
  )
}
