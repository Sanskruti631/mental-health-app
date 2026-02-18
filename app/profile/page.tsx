"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Shield, Save, Upload, CheckCircle, AlertTriangle, GraduationCap, Stethoscope } from "lucide-react"

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    specialties: user?.specialties?.join(", ") || "",
  })



  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setMessage(null)
  }

  const handleSave = async () => {
    setIsLoading(true)
    setMessage(null)

    try {
      const updates: any = {
        name: formData.name,
        email: formData.email,
      }

      if (user?.role === "therapist") {
        updates.bio = formData.bio
        updates.specialties = formData.specialties
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      }

      await updateProfile(updates)
      setMessage({ type: "success", text: "Profile updated successfully!" })
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update profile. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleIcon = () => {
    const role = user?.role ?? "user"
    switch (role) {
      case "student":
        return <GraduationCap className="h-5 w-5" />
      case "admin":
        return <Shield className="h-5 w-5" />
      case "therapist":
        return <Stethoscope className="h-5 w-5" />
      default:
        return <User className="h-5 w-5" />
    }
  }

  return (
    <div
      className="min-h-screen bg-background"
      style={{
        backgroundImage: `url('/signupbg1.jpg')`,
        filter: "blur(5px)",
        transform: "scale(1.03)",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your account information and preferences</p>
          
        </div>

        {message && (
          <Alert
            className={`mb-6 ${message.type === "error" ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20" : "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"}`}
          >
            {message.type === "error" ? (
              <AlertTriangle className="h-4 w-4 text-red-600" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
            <AlertDescription
              className={
                message.type === "error" ? "text-red-800 dark:text-red-200" : "text-green-800 dark:text-green-200"
              }
            >
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={user?.photo ?? "/placeholder.svg"} alt={user?.name ?? "User"} />
                  <AvatarFallback className="text-lg">
                  {(user?.name ?? "U")
                    .split(" ")
                    .map((n) => n.charAt(0))
                    .join("")
                    .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <h3 className="text-xl font-semibold mb-2">{user?.name??"U"}</h3>
                <p className="text-muted-foreground mb-4">{user?.email??"U"}</p>

                <Badge className="mb-4">
                  {getRoleIcon()}
                  <span className="ml-1 capitalize">{user?.role??"U"}</span>
                </Badge>

                {user && user.role === "therapist" && (
                  <div className="space-y-2 text-sm">
                    {user.isVerified ? (
                      <div className="flex items-center justify-center space-x-1 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>Verified Professional</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-1 text-yellow-600">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Verification Pending</span>
                      </div>
                    )}
                    {user.rating && <div className="text-muted-foreground">⭐ {user.rating} Rating</div>}
                  </div>
                )}

                <Button variant="outline" className="mt-4 w-full bg-transparent">
                  <Upload className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                {user && user.role === "therapist" && <TabsTrigger value="professional">Professional</TabsTrigger>}
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>General Information</CardTitle>
                    <CardDescription>Update your basic profile information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Role-specific fields */}
                    {user && user.role === "student" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label>Student ID</Label>
                          <Input value={user.studentId || ""} disabled />
                        </div>
                        <div>
                          <Label>Admin ID</Label>
                          <Input value={user.adminId || ""} disabled />
                        </div>
                      </div>
                    )}

                    {user && user.role === "admin" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label>College Name</Label>
                          <Input value={user.collegeName || ""} disabled />
                        </div>
                        <div>
                          <Label>College ID</Label>
                          <Input value={user.collegeId || ""} disabled />
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button onClick={handleSave} disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {user && user.role === "therapist" && (
                <TabsContent value="professional">
                  <Card>
                    <CardHeader>
                      <CardTitle>Professional Information</CardTitle>
                      <CardDescription>Manage your professional profile and credentials</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label>License Number</Label>
                          <Input value={user.licenseNumber || ""} disabled />
                        </div>
                        <div>
                          <Label>Years of Experience</Label>
                          <Input value={user.yearsExperience || ""} disabled />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="specialties">Specialties</Label>
                        <Input
                          id="specialties"
                          value={formData.specialties}
                          onChange={(e) => handleInputChange("specialties", e.target.value)}
                          placeholder="e.g., Anxiety, Depression, ADHD"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Separate multiple specialties with commas</p>
                      </div>

                      <div>
                        <Label htmlFor="bio">Professional Bio</Label>
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={(e) => handleInputChange("bio", e.target.value)}
                          rows={4}
                          placeholder="Tell patients about your background and approach..."
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={handleSave} disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security and privacy</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Password</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Change your password to keep your account secure
                      </p>
                      <Button variant="outline">Change Password</Button>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Add an extra layer of security to your account
                      </p>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Account Deletion</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Permanently delete your account and all associated data
                      </p>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
