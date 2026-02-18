"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface AuthRedirectProps {
  userRole: "student" | "admin" | "counsellor"
  profileComplete: boolean
}

export default function AuthRedirect({ userRole, profileComplete }: AuthRedirectProps) {
  const router = useRouter()

  useEffect(() => {
    // Check if profile is complete
    if (!profileComplete) {
      router.push("/profile-completion")
      return
    }

    // Redirect to appropriate dashboard based on role
    switch (userRole) {
      case "student":
        router.push("/dashboard/student")
        break
      case "admin":
        router.push("/dashboard/admin")
        break
      case "counsellor":
        router.push("/dashboard/counsellor")
        break
      default:
        router.push("/dashboard/student")
    }
  }, [userRole, profileComplete, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirecting to your dashboard...</p>
      </div>
    </div>
  )
}
