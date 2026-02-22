"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { User, Lock, Bell, Palette, AlertTriangle } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, logout, updateProfile, changePassword } = useAuth()

  const [activeSection, setActiveSection] = useState<"account" | "security" | "notifications" | "appearance" | "danger">("account")

  const [name, setName] = useState("")
  const [photo, setPhoto] = useState<string | null>(null)

  const [emailNotifications, setEmailNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

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
    return <div className="p-6 text-foreground">Loading...</div>
  }

  const handleProfileUpdate = async () => {
    try {
      await updateProfile({ name })
      alert("Profile updated successfully")
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

  const handleDeleteAccount = async () => {
    const ok = confirm("Are you sure you want to delete your account?")
    if (!ok) return
    alert("Delete API will be connected with database later.")
  }

  const sidebarItems = [
    { id: "account" as const, label: "Account", icon: User },
    { id: "security" as const, label: "Security", icon: Lock },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "appearance" as const, label: "Appearance", icon: Palette },
    { id: "danger" as const, label: "Danger Zone", icon: AlertTriangle },
  ]

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your account, preferences, and security
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <nav className="md:w-56 flex-shrink-0">
              <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap md:w-full text-left ${
                      activeSection === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Account Section */}
              {activeSection === "account" && (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Account</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Manage your profile and personal information
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Avatar */}
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                        {photo ? (
                          <img src={photo} alt="profile" />
                        ) : (
                          <AvatarFallback className="text-lg bg-muted text-foreground">
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
                    <div className="bg-muted/40 p-4 rounded-xl text-sm text-foreground">
                      <p><strong>Email:</strong> {user.email}</p>
                      <p className="mt-1"><strong>Role:</strong> <span className="capitalize">{user.role}</span></p>
                    </div>

                    {/* Edit Name */}
                    <div className="space-y-3">
                      <Label className="text-foreground">Update Name</Label>
                      <Input value={name} onChange={(e) => setName(e.target.value)} />
                      <Button className="w-full" onClick={handleProfileUpdate}>
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Security Section */}
              {activeSection === "security" && (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Security</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Manage your password and security settings
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-muted/40 rounded-xl">
                      <h3 className="font-medium text-foreground mb-1">Password</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Change your password to keep your account secure.
                      </p>
                      <Button
                        variant="outline"
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
                  </CardContent>
                </Card>
              )}

              {/* Notifications Section */}
              {activeSection === "notifications" && (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Notifications</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Control how you receive notifications
                    </p>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <Label className="text-foreground">Email Notifications</Label>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Appearance Section */}
              {activeSection === "appearance" && (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Appearance</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Customize how the app looks
                    </p>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <Label className="text-foreground">Dark Mode</Label>
                    <Switch
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Danger Zone Section */}
              {activeSection === "danger" && (
                <Card className="border-destructive/30">
                  <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Irreversible actions for your account
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={async () => {
                        await logout()
                        router.push("/login")
                      }}
                    >
                      Logout
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleDeleteAccount}
                    >
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Dialog */}
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
              <p className="text-sm text-destructive">{passwordError}</p>
            )}
            {passwordSuccess && (
              <p className="text-sm text-primary">{passwordSuccess}</p>
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
    </>
  )
}
