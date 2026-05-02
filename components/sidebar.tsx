"use client"

import { useRouter, usePathname } from "next/navigation"
import { Bot } from "lucide-react"

export function AkinatorSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const isActive = pathname === "/chat"

  return (
    <div className="p-4 space-y-4">

      {/* 🤖 AI Chatbot Button */}
      <button
        onClick={() => router.push("/chat")}
        className={`group flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300
          
          ${isActive
            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
            : "hover:bg-muted/60 text-gray-700 dark:text-gray-300"
          }
        `}
      >
        {/* Icon */}
        <div className={`p-2 rounded-lg transition
          ${isActive
            ? "bg-white/20"
            : "bg-gray-200 dark:bg-gray-800 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900"
          }`}
        >
          <Bot className={`h-5 w-5 
            ${isActive ? "text-white" : "text-indigo-500"}`} 
          />
        </div>

        {/* Text */}
        <span className="font-medium text-sm tracking-wide">
          AI Chatbot
        </span>

        {/* Glow effect */}
        <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
      </button>

    </div>
  )
}
