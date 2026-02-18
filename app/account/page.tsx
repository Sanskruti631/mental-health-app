"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function AccountPage() {
  const router = useRouter()
  const { user, isLoading, isAuthenticated, logout, updateProfile } = useAuth()

  const [name, setName] = useState("")
  const [photo, setPhoto] = useState<string | null>(null)
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  useEffect(() => {
    if (user) {
      setName(user.name || "")
    }
  }, [user])

  if (isLoading || !user) {
    return <div className="p-6">Loading...</div>
  }

  const handleProfileUpdate = async () => {
    try {
      await updateProfile({ name })
      alert("Profile updated ✅")
    } catch (err) {
      console.error(err)
    }
  }

  const handlePasswordChange = async () => {
    alert("Password change feature coming soon 🔐")
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setPhoto(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-emerald-50 flex justify-center items-start p-6">
      <Card className="w-full max-w-xl shadow-xl rounded-2xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">My Account</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage your profile & preferences
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24 ring-4 ring-emerald-100">
              {photo ? (
                <img src={photo} alt="profile" />
              ) : (
                <AvatarFallback className="text-lg">
                  {user.name?.[0]}
                </AvatarFallback>
              )}
            </Avatar>

            <Input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="max-w-xs"
            />
          </div>

          {/* User Info */}
          <div className="bg-muted/40 p-4 rounded-xl text-sm space-y-1">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>

          {/* Edit Name */}
          <div className="space-y-3">
            <Label>Update Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <Button className="w-full" onClick={handleProfileUpdate}>
              Save Changes
            </Button>
          </div>

          {/* Change Password */}
          <div className="space-y-3">
            <Label>New Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="outline"
              className="w-full"
              onClick={handlePasswordChange}
            >
              Change Password
            </Button>
          </div>

          {/* Role UI */}
          {user.role === "admin" ? (
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm">
              🛠 Admin Controls: You can manage students & reports.
            </div>
          ) : (
            <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-sm">
              🎓 Student Dashboard: View quizzes & support.
            </div>
          )}

          {/* Logout */}
          <Button
            variant="destructive"
            className="w-full"
            onClick={async () => {
              await logout()
              router.push("/login")
            }}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
