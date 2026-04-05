"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Eye, EyeOff } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useAuth } from "@/contexts/auth-context"

export default function RegisterPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const { register } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [nickname, setNickname] = useState("")
  const [role, setRole] = useState<"student" | "therapist">("student")
  const [licenseNumber, setLicenseNumber] = useState("")
  const [yearsExperience, setYearsExperience] = useState("")
  const [bio, setBio] = useState("")

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password || !confirmPassword || !nickname) {
      setError("Please fill all required fields")
      return
    }

    if (role === "therapist" && !licenseNumber) {
      setError("License number is required for therapists")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      await register({
        email,
        password,
        confirmPassword,
        name: nickname,
        userType: role,
        licenseNumber: role === "therapist" ? licenseNumber : undefined,
        yearsExperience: role === "therapist" ? yearsExperience : undefined,
        bio: role === "therapist" ? bio : undefined,
      } as any)

      // ✅ Role-based redirect
      if (role === "therapist") {
        router.push("/therapist-dashboard")
      } else {
        router.push("/chat")
      }

    } catch (err: any) {
      setError(err?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url('/signupbg1.jpg')` }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center space-x-1.5">
            <div className="bg-primary rounded-lg p-3">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">SoulSupport</span>
          </Link>
          <p className="text-muted-foreground mt-1.5">Create your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">SoulSupport</CardTitle>
            <CardDescription className="text-center">
              Create your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-3" onSubmit={onSubmit}>

              {/* Nickname */}
              <div>
                <Label>Nickname *</Label>
                <Input
                  placeholder="This name will appear on dashboard"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>

              {/* Email */}
              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Role Selection */}
              <div>
                <Label>Account Type *</Label>
                <select
                  className="w-full border rounded-md p-2 bg-white dark:bg-slate-900"
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                >
                  <option value="student">Student</option>
                  <option value="therapist">Therapist</option>
                </select>
              </div>

              {/* Therapist Fields */}
              {role === "therapist" && (
                <>
                  <div>
                    <Label>License Number *</Label>
                    <Input
                      placeholder="Your professional license number"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Years of Experience</Label>
                    <Input
                      placeholder="e.g., 5+"
                      value={yearsExperience}
                      onChange={(e) => setYearsExperience(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Bio</Label>
                    <textarea
                      className="w-full border rounded-md p-2 min-h-20"
                      placeholder="Brief professional bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>
                </>
              )}

              {/* Password */}
              <div>
                <Label>Password *</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <Label>Confirm Password *</Label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
              </div>

              {/* Error */}
              {error && <div className="text-sm text-red-600">{error}</div>}

              {/* Submit */}
              <Button type="submit" className="w-full">
                {loading ? "Creating..." : "Create Account"}
              </Button>

              {/* Back */}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.back()}
              >
                Back
              </Button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <div className="text-sm text-muted-foreground">
                {t("AlreadyHaveAccount")}{" "}
                <Link href="/login" className="text-primary hover:underline">
                  {t("SignIn")}
                </Link>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}
