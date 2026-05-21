"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SetupPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [result, setResult] = useState<any>(null)

  const setupDummyData = async () => {
    setStatus("loading")
    try {
      const response = await fetch("/api/setup-dummy-data")
      const data = await response.json()
      setResult(data)
      if (data.success) {
        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch (error) {
      setStatus("error")
      setResult({ error: String(error) })
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Setup Dummy Counselors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              This will create 3 dummy counselors in the database for testing. They will have:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
              <li>Dr. Sarah Johnson (Clinical Psychologist)</li>
              <li>Dr. Michael Chen (Professional Counselor)</li>
              <li>Dr. Emily Rodriguez (Marriage & Family Therapist)</li>
            </ul>

            <p className="text-sm text-muted-foreground mb-6">
              All counselors will have the password: <code className="bg-muted px-2 py-1 rounded">Test@12345</code>
            </p>

            <div className="flex gap-4">
              <Button onClick={setupDummyData} disabled={status === "loading" || status === "success"}>
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Setting up...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete!
                  </>
                ) : (
                  "Setup Dummy Counselors"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {status === "success" && result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                Success!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4 bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800">
                <AlertDescription className="text-green-800 dark:text-green-200">
                  {result.message}
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Created Counselors:</h3>
                  <ul className="space-y-2">
                    {result.counselors?.map((c: any) => (
                      <li key={c.id} className="p-3 bg-muted rounded-lg">
                        <div className="font-medium">{c.name}</div>
                        <div className="text-sm text-muted-foreground">{c.email}</div>
                        <div className="text-xs text-muted-foreground">License: {c.licenseNumber}</div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-950/20 dark:border-blue-800">
                  <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Login Credentials:</h3>
                  <ul className="text-sm space-y-1 text-blue-700 dark:text-blue-300">
                    {result.notes?.map((note: string, i: number) => (
                      <li key={i}>{note}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button asChild>
                    <Link href="/appointments">Go to Appointments</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/">Back to Home</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {status === "error" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                Error
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertDescription>
                  {result?.error || "Something went wrong"}
                </AlertDescription>
              </Alert>
              <Button onClick={setupDummyData} className="mt-4">
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
