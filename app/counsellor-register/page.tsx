"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function CounsellorRegisterPage() {
  const router = useRouter()
  const { register } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [licenseNumber, setLicenseNumber] = useState("")
  const [experience, setExperience] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password || !confirmPassword || !name || !specialization || !licenseNumber || !experience) {
      setError("Please fill all required fields")
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
        name,
        userType: "therapist",
        specialization,
        licenseNumber,
        experience,
      } as any)

      router.push("/dashboard/counsellor")

    } catch (err: any) {
      setError(err?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: "url('/image.png')",
          filter: "blur(5px)",
          transform: "scale(1.03)",
        }}
        aria-hidden="true"
      />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-3">
              <Heart className="h-8 w-8 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">SoulSupport</span>
          </Link>
          <p className="text-muted-foreground mt-2">Create your counsellor account</p>
        </div>

        <Card className="backdrop-blur-md bg-white/80">
          <CardHeader>
            <CardTitle className="text-center">Counsellor Registration</CardTitle>
            <CardDescription className="text-center">
              Create your counsellor account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              {/* Name */}
              <div>
                <Label htmlFor="counsellor-name">Full Name *</Label>
                <Input
                  id="counsellor-name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="counsellor-email">Email *</Label>
                <Input
                  id="counsellor-email"
                  type="email"
                  placeholder="counsellor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Specialization */}
              <div>
                <Label htmlFor="specialization">Specialization *</Label>
                <Input
                  id="specialization"
                  placeholder="e.g., Clinical Psychology, Counseling"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  required
                />
              </div>

              {/* License Number */}
              <div>
                <Label htmlFor="license-number">License Number *</Label>
                <Input
                  id="license-number"
                  placeholder="Enter your license number"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  required
                />
              </div>

              {/* Experience */}
              <div>
                <Label htmlFor="experience">Years of Experience *</Label>
                <Input
                  id="experience"
                  type="number"
                  placeholder="e.g., 5"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="counsellor-password">Password *</Label>
                <div className="relative">
                  <Input
                    id="counsellor-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="counsellor-confirm-password">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="counsellor-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Error */}
              {error && <div className="text-sm text-red-600">{error}</div>}

              {/* Submit */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create Counsellor Account"}
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
            <div className="mt-6 text-center space-y-2">
              <div className="text-sm text-muted-foreground">
                Already have a counsellor account?{" "}
                <Link href="/counselor-login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
              <div className="text-sm text-muted-foreground">
                Not a counsellor? <Link href="/register" className="text-primary hover:underline">Student registration</Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}