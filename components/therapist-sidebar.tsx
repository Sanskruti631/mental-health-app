"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Calendar,
  MessageCircle,
  Users,
  FileText,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

interface SidebarItem {
  name: string
  href: string
  icon: React.ReactNode
  color: string
}

export function TherapistSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  const sidebarItems: SidebarItem[] = [
    {
      name: "Dashboard",
      href: "/therapist-dashboard",
      icon: <BarChart3 className="h-5 w-5" />,
      color: "text-blue-600",
    },
    {
      name: "Appointments",
      href: "/therapist-dashboard?tab=appointments",
      icon: <Calendar className="h-5 w-5" />,
      color: "text-green-600",
    },
    {
      name: "Messages",
      href: "/therapist-dashboard?tab=messages",
      icon: <MessageCircle className="h-5 w-5" />,
      color: "text-purple-600",
    },
    {
      name: "Patients",
      href: "/therapist-dashboard?tab=patients",
      icon: <Users className="h-5 w-5" />,
      color: "text-orange-600",
    },
    {
      name: "Session Notes",
      href: "/notes",
      icon: <FileText className="h-5 w-5" />,
      color: "text-pink-600",
    },
  ]

  const isActive = (href: string) => {
    if (href.includes("?")) {
      const basePath = href.split("?")[0]
      return pathname === basePath
    }
    return pathname === href
  }

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 border-r border-slate-700 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        } pt-16 flex-col z-40`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 bg-slate-700 hover:bg-slate-600 text-white rounded-full p-1 transition"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <button
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-slate-700 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                }`}
              >
                <span className={`${item.color} flex-shrink-0`}>{item.icon}</span>
                {!isCollapsed && <span className="text-sm font-medium truncate">{item.name}</span>}
              </button>
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 px-4 py-4 space-y-2">
          {/* Settings */}
          <Link href="/settings">
            <button className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 text-slate-300 hover:bg-slate-700/50 hover:text-white">
              <Settings className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
            </button>
          </Link>

          {/* Profile */}
          <Link href="/profile">
            <button className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 text-slate-300 hover:bg-slate-700/50 hover:text-white">
              <User className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">Profile</span>}
            </button>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 text-red-400 hover:bg-red-950/30 hover:text-red-300"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </>
  )
}