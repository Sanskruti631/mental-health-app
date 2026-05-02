"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Cpu, MessageCircle, BookOpen, Settings, Home, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function WellnessSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  const navItems = [
    {
      href: "/quiz",
      label: "Questionnaire",
      icon: Cpu,
    },
    {
      href: "/chat",
      label: "AI Chatbot",
      icon: MessageCircle,
    },
    {
      href: "/resources",
      label: "Resources",
      icon: BookOpen,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
    },
  ]

  return (
    <aside className="w-72 bg-white/90 dark:bg-gray-900/90 border-r border-gray-100 dark:border-gray-800 p-6 hidden md:flex flex-col gap-6 h-screen sticky top-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold">
          SS
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">SoulSupport</h3>
          <p className="text-sm text-muted-foreground">Wellness Dashboard</p>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-emerald-600" : "text-emerald-600/70"}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="mt-auto space-y-4">
        {user && (
          <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.photo || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium text-foreground truncate">{user.name}</span>
              <span className="text-xs text-muted-foreground truncate capitalize">{user.role}</span>
            </div>
          </div>
        )}
        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <Link href="/">
            <Home className="w-5 h-5 text-emerald-600/70" />
            <span className="font-medium">Home</span>
          </Link>
        </Button>
      </div>
    </aside>
  )
}
