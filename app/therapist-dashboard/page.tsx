"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AuthGuard } from "@/components/auth-guard"
import {
  Calendar,
  Users,
  MessageCircle,
  Video,
  Phone,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Star,
  Heart,
  Shield,
} from "lucide-react"

export default function TherapistDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const upcomingAppointments = [
    {
      id: "1",
      studentName: "Anonymous Student A",
      time: "10:00 AM",
      date: "Today",
      type: "video",
      status: "confirmed",
      isFirstSession: false,
      urgency: "medium",
    },
    {
      id: "2",
      studentName: "Anonymous Student B",
      time: "2:00 PM",
      date: "Today",
      type: "phone",
      status: "confirmed",
      isFirstSession: true,
      urgency: "high",
    },
    {
      id: "3",
      studentName: "Anonymous Student C",
      time: "9:00 AM",
      date: "Tomorrow",
      type: "in-person",
      status: "pending",
      isFirstSession: false,
      urgency: "low",
    },
  ]

  const recentMessages = [
    {
      id: "1",
      studentName: "Anonymous Student D",
      message: "Thank you for the session yesterday. I'm feeling much better.",
      time: "2 hours ago",
      unread: false,
    },
    {
      id: "2",
      studentName: "Anonymous Student E",
      message: "I need to reschedule our appointment for tomorrow.",
      time: "4 hours ago",
      unread: true,
    },
  ]

  const stats = [
    {
      title: "Total Patients",
      value: "47",
      change: "+3 this month",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Sessions This Week",
      value: "23",
      change: "+2 from last week",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Average Rating",
      value: "4.9",
      change: "⭐ Excellent",
      icon: Star,
      color: "text-yellow-600",
    },
    {
      title: "Response Rate",
      value: "98%",
      change: "Within 24 hours",
      icon: MessageCircle,
      color: "text-purple-600",
    },
  ]

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="bg-primary rounded-lg p-2">
                  <Heart className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Therapist Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Welcome back, Dr. Sarah Johnson</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Online
                </Badge>
                <Button variant="outline" size="sm">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy Mode
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Privacy Notice */}
          <Alert className="mb-8 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              <div className="font-semibold mb-2">Patient Privacy Protected</div>
              <p className="text-sm">
                All patient information is anonymized in this dashboard. Full patient details are only accessible during
                scheduled sessions with proper authentication.
              </p>
            </AlertDescription>
          </Alert>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                    </div>
                    <div className={`${stat.color} bg-muted rounded-lg p-3`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="patients">Patients</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Today's Schedule */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Today's Schedule</span>
                    </CardTitle>
                    <CardDescription>Your upcoming appointments</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingAppointments
                      .filter((apt) => apt.date === "Today")
                      .map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              {appointment.type === "video" && <Video className="h-4 w-4 text-blue-600" />}
                              {appointment.type === "phone" && <Phone className="h-4 w-4 text-green-600" />}
                              {appointment.type === "in-person" && <MapPin className="h-4 w-4 text-purple-600" />}
                              <div>
                                <p className="font-medium text-sm">{appointment.time}</p>
                                <p className="text-xs text-muted-foreground">{appointment.studentName}</p>
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              {appointment.isFirstSession && (
                                <Badge variant="secondary" className="text-xs">
                                  First Session
                                </Badge>
                              )}
                              {appointment.urgency === "high" && (
                                <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  High Priority
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button size="sm">Join Session</Button>
                        </div>
                      ))}
                  </CardContent>
                </Card>

                {/* Recent Messages */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageCircle className="h-5 w-5" />
                      <span>Recent Messages</span>
                    </CardTitle>
                    <CardDescription>Patient communications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentMessages.map((message) => (
                      <div key={message.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>?</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{message.studentName}</p>
                            <p className="text-xs text-muted-foreground">{message.time}</p>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 truncate">{message.message}</p>
                        </div>
                        {message.unread && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                      </div>
                    ))}
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Messages
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Appointments</CardTitle>
                  <CardDescription>Manage your upcoming and past sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            {appointment.type === "video" && <Video className="h-5 w-5 text-blue-600" />}
                            {appointment.type === "phone" && <Phone className="h-5 w-5 text-green-600" />}
                            {appointment.type === "in-person" && <MapPin className="h-5 w-5 text-purple-600" />}
                            <div>
                              <p className="font-medium">{appointment.studentName}</p>
                              <p className="text-sm text-muted-foreground">
                                {appointment.date} at {appointment.time}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                              {appointment.status}
                            </Badge>
                            {appointment.isFirstSession && <Badge variant="outline">First Session</Badge>}
                            {appointment.urgency === "high" && (
                              <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                High Priority
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button size="sm">{appointment.date === "Today" ? "Join Session" : "View Details"}</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Messages</CardTitle>
                  <CardDescription>Secure communication with your patients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMessages.map((message) => (
                      <div key={message.id} className="flex items-start space-x-4 p-4 rounded-lg border">
                        <Avatar>
                          <AvatarFallback>?</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{message.studentName}</p>
                            <p className="text-sm text-muted-foreground">{message.time}</p>
                          </div>
                          <p className="text-muted-foreground mt-1">{message.message}</p>
                          <div className="flex space-x-2 mt-3">
                            <Button size="sm">Reply</Button>
                            <Button variant="outline" size="sm">
                              Schedule Call
                            </Button>
                          </div>
                        </div>
                        {message.unread && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="patients" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Overview</CardTitle>
                  <CardDescription>Anonymous patient statistics and progress tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 rounded-lg border">
                      <div className="text-2xl font-bold text-blue-600">47</div>
                      <p className="text-sm text-muted-foreground">Total Patients</p>
                    </div>
                    <div className="text-center p-4 rounded-lg border">
                      <div className="text-2xl font-bold text-green-600">89%</div>
                      <p className="text-sm text-muted-foreground">Improvement Rate</p>
                    </div>
                    <div className="text-center p-4 rounded-lg border">
                      <div className="text-2xl font-bold text-purple-600">4.2</div>
                      <p className="text-sm text-muted-foreground">Avg Sessions per Patient</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        Individual patient details are only accessible during scheduled sessions to maintain privacy and
                        confidentiality.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  )
}
