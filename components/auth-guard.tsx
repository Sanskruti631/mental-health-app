"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { canAccessRoute } from "@/lib/auth"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // 🔐 Redirect ONLY after loading is complete
  useEffect(() => {
    if (isLoading) return

    const hasAccess = canAccessRoute(user, pathname)

    if (!hasAccess) {
      router.replace("/login") // replace avoids history issues
    }
  }, [user, isLoading, pathname, router])

  // ⏳ While auth is resolving, show loader
  if (isLoading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <div className="bg-primary rounded-lg p-3 w-fit mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-muted-foreground">Loading...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    )
  }

  // 🚫 Block render while redirecting
  const hasAccess = canAccessRoute(user, pathname)
  if (!hasAccess) return null

  return <>{children}</>
}
