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

export default function AdminRegisterPage() {
  const router = useRouter()
  const { register } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [collegeName, setCollegeName] = useState("")
  const [collegeId, setCollegeId] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password || !confirmPassword || !name || !collegeName || !collegeId) {
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
        userType: "admin",
        collegeName,
        collegeId,
      } as any)

      router.push("/dashboard")

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
          <p className="text-muted-foreground mt-2">Create your admin account</p>
        </div>

        <Card className="backdrop-blur-md bg-white/80">
          <CardHeader>
            <CardTitle className="text-center">Admin Registration</CardTitle>
            <CardDescription className="text-center">
              Create your administrator account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              {/* Name */}
              <div>
                <Label htmlFor="admin-name">Full Name *</Label>
                <Input
                  id="admin-name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="admin-email">Email *</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* College Name */}
              <div>
                <Label htmlFor="college-name">College Name *</Label>
                <Input
                  id="college-name"
                  placeholder="Enter college name"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  required
                />
              </div>

              {/* College ID */}
              <div>
                <Label htmlFor="college-id">College ID *</Label>
                <Input
                  id="college-id"
                  placeholder="Enter college ID"
                  value={collegeId}
                  onChange={(e) => setCollegeId(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="admin-password">Password *</Label>
                <div className="relative">
                  <Input
                    id="admin-password"
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
                <Label htmlFor="admin-confirm-password">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="admin-confirm-password"
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
                {loading ? "Creating..." : "Create Admin Account"}
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
                Already have an admin account?{" "}
                <Link href="/admin-login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
              <div className="text-sm text-muted-foreground">
                Not an admin? <Link href="/register" className="text-primary hover:underline">Student registration</Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}