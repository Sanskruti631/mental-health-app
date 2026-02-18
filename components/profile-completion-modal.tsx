"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, User, Shield, Stethoscope, CheckCircle } from "lucide-react"

interface ProfileCompletionModalProps {
  userRole: "student" | "admin" | "counsellor"
  missingFields: string[]
  onComplete: () => void
}

export default function ProfileCompletionModal({ userRole, missingFields, onComplete }: ProfileCompletionModalProps) {
  const getRoleIcon = () => {
    switch (userRole) {
      case "student":
        return <User className="h-6 w-6 text-blue-500" />
      case "admin":
        return <Shield className="h-6 w-6 text-gray-500" />
      case "counsellor":
        return <Stethoscope className="h-6 w-6 text-teal-500" />
    }
  }

  const getRoleTitle = () => {
    switch (userRole) {
      case "student":
        return "Complete Your Student Profile"
      case "admin":
        return "Complete Your Admin Profile"
      case "counsellor":
        return "Complete Your Counsellor Profile"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">{getRoleIcon()}</div>
            <CardTitle className="flex items-center justify-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              {getRoleTitle()}
            </CardTitle>
            <CardDescription>
              Please complete your profile to access your dashboard and all platform features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Progress Indicator */}
              <div className="bg-orange-50 dark:bg-orange-950/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Profile Completion</span>
                  <Badge variant="outline">{missingFields.length} fields remaining</Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  Complete all required fields to access your dashboard
                </div>
              </div>

              {/* Student Profile Form */}
              {userRole === "student" && (
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {missingFields.includes("phone") && (
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="Enter your phone number (optional)" />
                      </div>
                    )}

                    {missingFields.includes("studentId") && (
                      <div>
                        <Label htmlFor="studentId">Student ID *</Label>
                        <Input id="studentId" placeholder="Enter your student ID" />
                      </div>
                    )}

                    {missingFields.includes("department") && (
                      <div>
                        <Label htmlFor="department">Department *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="computer-science">Computer Science</SelectItem>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="psychology">Psychology</SelectItem>
                            <SelectItem value="medicine">Medicine</SelectItem>
                            <SelectItem value="arts">Arts</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {missingFields.includes("yearOfStudy") && (
                      <div>
                        <Label htmlFor="yearOfStudy">Year of Study *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1st Year</SelectItem>
                            <SelectItem value="2">2nd Year</SelectItem>
                            <SelectItem value="3">3rd Year</SelectItem>
                            <SelectItem value="4">4th Year</SelectItem>
                            <SelectItem value="graduate">Graduate</SelectItem>
                            <SelectItem value="phd">PhD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </form>
              )}

              {/* Admin Profile Form */}
              {userRole === "admin" && (
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {missingFields.includes("phone") && (
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="Enter your phone number (optional)" />
                      </div>
                    )}

                    {missingFields.includes("employeeId") && (
                      <div>
                        <Label htmlFor="employeeId">Employee ID *</Label>
                        <Input id="employeeId" placeholder="Enter your employee ID" />
                      </div>
                    )}

                    {missingFields.includes("department") && (
                      <div>
                        <Label htmlFor="department">Department *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student-affairs">Student Affairs</SelectItem>
                            <SelectItem value="counseling-services">Counseling Services</SelectItem>
                            <SelectItem value="health-services">Health Services</SelectItem>
                            <SelectItem value="administration">Administration</SelectItem>
                            <SelectItem value="academic-affairs">Academic Affairs</SelectItem>
                            <SelectItem value="it-services">IT Services</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {missingFields.includes("designation") && (
                      <div>
                        <Label htmlFor="designation">Designation *</Label>
                        <Input id="designation" placeholder="e.g., Director, Manager, Coordinator" />
                      </div>
                    )}

                    {missingFields.includes("licenseNumber") && (
                      <div className="md:col-span-2">
                        <Label htmlFor="licenseNumber">License Number</Label>
                        <Input id="licenseNumber" placeholder="Enter license number (if applicable)" />
                      </div>
                    )}
                  </div>
                </form>
              )}

              {/* Counsellor Profile Form */}
              {userRole === "counsellor" && (
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {missingFields.includes("phone") && (
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="Enter your phone number (optional)" />
                      </div>
                    )}

                    {missingFields.includes("qualification") && (
                      <div>
                        <Label htmlFor="qualification">Qualification *</Label>
                        <Input id="qualification" placeholder="e.g., PhD in Clinical Psychology" />
                      </div>
                    )}

                    {missingFields.includes("licenseNumber") && (
                      <div className="md:col-span-2">
                        <Label htmlFor="licenseNumber">License Number *</Label>
                        <Input id="licenseNumber" placeholder="Enter your license number" />
                      </div>
                    )}
                  </div>

                  {missingFields.includes("specializations") && (
                    <div>
                      <Label>Specializations *</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="anxiety" />
                          <Label htmlFor="anxiety" className="text-sm">
                            Anxiety Disorders
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="depression" />
                          <Label htmlFor="depression" className="text-sm">
                            Depression
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="trauma" />
                          <Label htmlFor="trauma" className="text-sm">
                            Trauma & PTSD
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="adhd" />
                          <Label htmlFor="adhd" className="text-sm">
                            ADHD
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="eating-disorders" />
                          <Label htmlFor="eating-disorders" className="text-sm">
                            Eating Disorders
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="substance-abuse" />
                          <Label htmlFor="substance-abuse" className="text-sm">
                            Substance Abuse
                          </Label>
                        </div>
                      </div>
                    </div>
                  )}

                  {missingFields.includes("availability") && (
                    <div className="flex items-center space-x-2">
                      <Checkbox id="availability" />
                      <Label htmlFor="availability">Currently available for new clients</Label>
                    </div>
                  )}
                </form>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button onClick={onComplete} className="flex-1">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Profile
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Save & Continue Later
                </Button>
              </div>

              {/* Help Text */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Need help? Contact support at <span className="text-primary">support@SoulSupport.com</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
