"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export default function AccountPage() {
  const router = useRouter()
  const { user, isLoading, isAuthenticated, logout, updateProfile, changePassword } = useAuth()

  const [name, setName] = useState("")
  const [photo, setPhoto] = useState<string | null>(null)

  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")
  const [isChangingPassword, setIsChangingPassword] = useState(false)

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
    setPasswordError("")
    setPasswordSuccess("")

    if (!currentPassword) {
      setPasswordError("Please enter your current password.")
      return
    }
    if (!newPassword) {
      setPasswordError("Please enter a new password.")
      return
    }
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.")
      return
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match.")
      return
    }

    setIsChangingPassword(true)
    try {
      await changePassword(currentPassword, newPassword)
      setPasswordSuccess("Password changed successfully.")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmNewPassword("")
      setTimeout(() => {
        setPasswordDialogOpen(false)
        setPasswordSuccess("")
      }, 1500)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to change password."
      setPasswordError(message)
    } finally {
      setIsChangingPassword(false)
    }
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
          <div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setPasswordError("")
                setPasswordSuccess("")
                setCurrentPassword("")
                setNewPassword("")
                setConfirmNewPassword("")
                setPasswordDialogOpen(true)
              }}
            >
              Change Password
            </Button>
          </div>

          <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
                <DialogDescription>
                  Enter your current password and choose a new one.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-new-password">Re-enter New Password</Label>
                  <Input
                    id="confirm-new-password"
                    type="password"
                    placeholder="Re-enter new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>

                {passwordError && (
                  <p className="text-sm text-red-600">{passwordError}</p>
                )}
                {passwordSuccess && (
                  <p className="text-sm text-emerald-600">{passwordSuccess}</p>
                )}

                <Button
                  className="w-full"
                  onClick={handlePasswordChange}
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? "Changing..." : "Update Password"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

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
