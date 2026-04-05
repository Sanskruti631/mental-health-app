"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AuthGuard } from "@/components/auth-guard"
import { TherapistSidebar } from "@/components/therapist-sidebar"
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

interface Appointment {
  id: string
  studentName: string
  time: string
  date: string
  type: string
  status: string
  isFirstSession: boolean
  urgency: string
}

interface Message {
  id: string
  studentName: string
  message: string
  time: string
  unread: boolean
}

interface Stat {
  title: string
  value: string
  change: string
  icon: string
  color: string
}

export default function TherapistDashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") || "overview"
  
  const [activeTab, setActiveTab] = useState(initialTab)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [stats, setStats] = useState<Stat[]>([])
  const [patientOverview, setPatientOverview] = useState({
    totalPatients: 0,
    improvementRate: 0,
    avgSessionsPerPatient: 0,
  })
  const [loading, setLoading] = useState(true)
  const [privacyMode, setPrivacyMode] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, appointmentsRes, messagesRes, patientsRes] = await Promise.all([
          fetch("/api/therapist/stats"),
          fetch("/api/therapist/appointments"),
          fetch("/api/therapist/messages"),
          fetch("/api/therapist/patients"),
        ])

        if (statsRes.ok) setStats(await statsRes.json())
        if (appointmentsRes.ok) setAppointments(await appointmentsRes.json())
        if (messagesRes.ok) setMessages(await messagesRes.json())
        if (patientsRes.ok) {
          const patientData = await patientsRes.json()
          setPatientOverview({
            totalPatients: patientData.totalPatients,
            improvementRate: patientData.improvementRate,
            avgSessionsPerPatient: patientData.avgSessionsPerPatient,
          })
        }
      } catch (error) {
        console.error("Error fetching therapist data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleJoinSession = (appointmentId: string) => {
    alert(`Starting video session for appointment ${appointmentId}...`)
    router.push(`/therapist-dashboard?session=${appointmentId}`)
  }

  const handleReschedule = (appointmentId: string) => {
    alert(`Opening reschedule dialog for appointment ${appointmentId}...`)
    router.push(`/appointments?reschedule=${appointmentId}`)
  }

  const handleViewDetails = (appointmentId: string) => {
    alert(`Loading appointment details for ${appointmentId}...`)
  }

  const handleReplyMessage = (studentName: string, messageId: string) => {
    alert(`Opening reply dialog for ${studentName}...`)
    router.push(`/messages?reply=${messageId}&to=${studentName}`)
  }

  const handleScheduleCall = (studentName: string) => {
    alert(`Opening call scheduler for ${studentName}...`)
    router.push(`/appointments?type=call&student=${studentName}`)
  }

  const handleViewAllMessages = () => {
    router.push("/messages")
  }

  const handlePrivacyMode = () => {
    setPrivacyMode(!privacyMode)
    alert(`Privacy Mode ${!privacyMode ? "enabled" : "disabled"}`)
  }

  const upcomingAppointments = appointments
  const recentMessages = messages

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Users: Users,
      Calendar: Calendar,
      Star: Star,
      MessageCircle: MessageCircle,
    }
    return iconMap[iconName] || Users
  }

  return (
    <AuthGuard>
      <TherapistSidebar />
      <div className="min-h-screen bg-background md:ml-64 transition-all duration-300">
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
            {loading ? (
              <div className="text-center">Loading stats...</div>
            ) : (
              stats.map((stat, index) => {
                const IconComponent = getIconComponent(stat.icon)
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                        </div>
                        <div className={`${stat.color} bg-muted rounded-lg p-3`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
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
                    {loading ? (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">Loading appointments...</p>
                      </div>
                    ) : upcomingAppointments.filter((apt) => apt.date === "Today").length > 0 ? (
                      upcomingAppointments
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
                            <Button size="sm" onClick={() => handleJoinSession(appointment.id)}>Join Session</Button>
                          </div>
                        ))
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">No appointments for today</p>
                      </div>
                    )}
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
                    {loading ? (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">Loading messages...</p>
                      </div>
                    ) : recentMessages.length > 0 ? (
                      recentMessages.map((message) => (
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
                      ))
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">No messages</p>
                      </div>
                    )}
                    <Button variant="outline" className="w-full bg-transparent" onClick={handleViewAllMessages}>
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
                    {loading ? (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">Loading appointments...</p>
                      </div>
                    ) : upcomingAppointments.length > 0 ? (
                      upcomingAppointments.map((appointment) => (
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
                            <Button variant="outline" size="sm" onClick={() => handleReschedule(appointment.id)}>
                              Reschedule
                            </Button>
                            <Button size="sm" onClick={() => appointment.date === "Today" ? handleJoinSession(appointment.id) : handleViewDetails(appointment.id)}>
                              {appointment.date === "Today" ? "Join Session" : "View Details"}
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">No appointments scheduled</p>
                      </div>
                    )}
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
                    {loading ? (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">Loading messages...</p>
                      </div>
                    ) : recentMessages.length > 0 ? (
                      recentMessages.map((message) => (
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
                              <Button size="sm" onClick={() => handleReplyMessage(message.studentName, message.id)}>Reply</Button>
                              <Button variant="outline" size="sm" onClick={() => handleScheduleCall(message.studentName)}>
                                Schedule Call
                              </Button>
                            </div>
                          </div>
                          {message.unread && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">No messages</p>
                      </div>
                    )}
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
                      <div className="text-2xl font-bold text-blue-600">{patientOverview.totalPatients}</div>
                      <p className="text-sm text-muted-foreground">Total Patients</p>
                    </div>
                    <div className="text-center p-4 rounded-lg border">
                      <div className="text-2xl font-bold text-green-600">{patientOverview.improvementRate}%</div>
                      <p className="text-sm text-muted-foreground">Improvement Rate</p>
                    </div>
                    <div className="text-center p-4 rounded-lg border">
                      <div className="text-2xl font-bold text-purple-600">{patientOverview.avgSessionsPerPatient}</div>
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
