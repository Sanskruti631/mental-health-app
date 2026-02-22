"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

export default function ResourcesPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading || !user) {
    return <div className="p-6 text-foreground">Loading...</div>
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Resources</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Helpful mental health resources and materials
            </p>
          </div>

          <Card className="border-border">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-foreground">Coming Soon</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Resources and materials will be added here shortly. Stay tuned for helpful content on mental health and well-being.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
