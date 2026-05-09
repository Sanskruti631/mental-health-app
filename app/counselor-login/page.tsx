"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Heart, Eye, EyeOff } from "lucide-react";

export default function CounselorLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login({ email, password, userType: "therapist" });
      router.push("/dashboard/counsellor");
    } catch (err: any) {
      setError(err?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          <p className="text-muted-foreground mt-2">Counsellor access to the SoulSupport platform</p>
        </div>

        {/* Card */}
        <Card className="backdrop-blur-md bg-white/80">
          <CardHeader>
            <CardTitle className="text-center">Counsellor Login</CardTitle>
            <CardDescription className="text-center">
              Sign in with your counsellor account.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <Label htmlFor="counsellor-email">Email</Label>
                <Input
                  id="counsellor-email"
                  type="email"
                  placeholder="counsellor@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="counsellor-password">Password</Label>
                <div className="relative">
                  <Input
                    id="counsellor-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Error */}
              {error && <div className="text-sm text-red-600">{error}</div>}

              {/* Login Button */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>

              {/* Back Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.back()}
              >
                Back
              </Button>
            </form>

            {/* Links */}
            <div className="mt-6 text-center space-y-2">
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot your password?
              </Link>
              <div className="text-sm text-muted-foreground">
                Don't have a counsellor account?{" "}
                <Link href="/counsellor-register" className="text-primary hover:underline">
                  Sign up as counsellor
                </Link>
              </div>
              <div className="text-sm text-muted-foreground">
                Not a counsellor? <Link href="/login" className="text-primary hover:underline">Go to student login</Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
