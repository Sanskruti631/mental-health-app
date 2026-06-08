"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ResetPasswordPage() {
  const { token } = useParams()
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // 🔐 password strength
  const getStrength = (pass: string) => {
    let score = 0
    if (pass.length >= 6) score++
    if (pass.length >= 10) score++
    if (/[A-Z]/.test(pass)) score++
    if (/[0-9]/.test(pass)) score++
    if (/[^A-Za-z0-9]/.test(pass)) score++
    return score
  }

  const strength = getStrength(password)

  const strengthLabel = [
    "Very Weak",
    "Weak",
    "Okay",
    "Good",
    "Strong",
    "Very Strong",
  ]

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message || "Something went wrong")
      setLoading(false)
      return
    }

    router.push("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">

      {/* 🌄 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: "url('/image.png')",
          filter: "blur(5px)",
          transform: "scale(1.03)",
        }}
        aria-hidden="true"
      />

      {/* 🌫️ Dark overlay */}
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* 🧾 Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8">

        <h1 className="text-2xl font-bold text-center mb-2">
          Reset Password
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Choose a strong password for your account
        </p>

        <form onSubmit={handleReset} className="space-y-4">

          {/* PASSWORD FIELD */}
          <div>
            <Label>New Password</Label>

            <div className="relative mt-1">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* 🔐 Strength meter */}
            {password && (
              <div className="mt-2">
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className={`h-2 rounded transition-all ${
                      strength <= 1
                        ? "bg-red-500 w-1/5"
                        : strength === 2
                        ? "bg-orange-400 w-2/5"
                        : strength === 3
                        ? "bg-yellow-400 w-3/5"
                        : strength === 4
                        ? "bg-blue-400 w-4/5"
                        : "bg-green-500 w-full"
                    }`}
                  />
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  Strength: {strengthLabel[strength]}
                </p>
              </div>
            )}
          </div>

          {/* ERROR */}
          {error && (
            <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          {/* BUTTON */}
          <Button className="w-full" disabled={loading || password.length < 6}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>

        </form>
      </div>
    </div>
  )
}