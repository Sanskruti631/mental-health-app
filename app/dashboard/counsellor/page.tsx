"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

import {
  Stethoscope,
  Calendar,
  Users,
  Clock,
  MessageCircle,
  FileText,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Phone,
} from "lucide-react"
import { AvailabilityModal } from "@/components/availability-modal"
import { ScheduleModal } from "@/components/schedule-modal"

interface PriorityCase {
  id: number
  name: string
  studentId: string
  major: string
  year: string
  assessment: string
  lastSession: string
  priority: string
}

interface Appointment {
  id: number
  time: string
  clientName: string
  sessionType: string
  focus: string
  status: string
}

interface SessionNote {
  id: number
  clientName: string
  sessionNumber: number
  timeAgo: string
  notes: string
}
export default function CounsellorDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalClients: 0,
    todayAppointments: 0,
    completedSessions: 0,
    priorityCases: 0,
  });
  const [priorityCases, setPriorityCases] = useState<PriorityCase[]>([])
  const [todaySchedule, setTodaySchedule] = useState<Appointment[]>([])
  const [recentNotes, setRecentNotes] = useState<SessionNote[]>([])
  const [weeklyStats, setWeeklyStats] = useState({
    sessionsCompleted: 0,
    newClients: 0,
    followUpsScheduled: 0,
    notesWritten: 0,
  })
  const [availability, setAvailability] = useState({
    currentStatus: "available",
    nextAvailable: "Tomorrow 9:00 AM",
    todaySchedule: [] as Array<{ time: string; status: string }>,
  })
  const [loading, setLoading] = useState(true)
  const [availabilityModalOpen, setAvailabilityModalOpen] = useState(false)
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, priorityRes, scheduleRes, notesRes, weeklyRes, availRes] = await Promise.all([
          fetch("/api/counsellor/stats"),
          fetch("/api/counsellor/priority-cases"),
          fetch("/api/counsellor/today-schedule"),
          fetch("/api/counsellor/recent-notes"),
          fetch("/api/counsellor/weekly-stats"),
          fetch("/api/counsellor/availability"),
        ])

        if (statsRes.ok) setStats(await statsRes.json())
        if (priorityRes.ok) setPriorityCases(await priorityRes.json())
        if (scheduleRes.ok) setTodaySchedule(await scheduleRes.json())
        if (notesRes.ok) setRecentNotes(await notesRes.json())
        if (weeklyRes.ok) setWeeklyStats(await weeklyRes.json())
        if (availRes.ok) setAvailability(await availRes.json())
      } catch (error) {
        console.error("Error fetching counsellor data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
         <div className="flex items-center space-x-3">

  {/* 🔙 Back Button */}
  <button
    onClick={() => router.back()}
    className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 transition"
  >
    <ArrowLeft className="h-5 w-5 text-green-700" />
  </button>

  <div className="bg-primary rounded-lg p-2">
    <Stethoscope className="h-6 w-6 text-primary-foreground" />
  </div>

  <div>
    <h1 className="text-2xl font-bold text-foreground">
      Dr. Emily Johnson
    </h1>
    <p className="text-muted-foreground">
      Clinical Psychologist • License #PSY12345
    </p>
  </div>

</div>

            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500">Available</Badge>
              <Button variant="outline" size="sm" onClick={() => {
                alert('Availability settings would open here')
              }}>
                <Clock className="h-4 w-4 mr-2" />
                Set Availability
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
                  <p className="text-3xl font-bold">{stats.totalClients}</p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <Users className="h-3 w-3 mr-1" />3 new this week
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today's Sessions</p>
                  <p className="text-3xl font-bold">{stats.todayAppointments}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <CheckCircle className="h-3 w-3 mr-1" />{stats.completedSessions}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Week</p>
                  <p className="text-3xl font-bold">28</p>
                  <p className="text-xs text-purple-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15% from last week
                  </p>
                </div>
                <Clock className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Priority Cases</p>
                  <p className="text-3xl font-bold">{stats.priorityCases}</p>
                  <p className="text-xs text-red-600 flex items-center mt-1">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Needs attention
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Priority Cases */}
            <Card className="border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center text-red-600 dark:text-red-400">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Priority Cases
                </CardTitle>
                <CardDescription>Clients requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {loading ? (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">Loading priority cases...</p>
                    </div>
                  ) : priorityCases.length > 0 ? (
                    priorityCases.map((case_, index) => (
                      <div key={case_.id} className={`p-4 rounded-lg ${
                        case_.priority === 'high' ? 'bg-red-50 dark:bg-red-950/50' : 'bg-orange-50 dark:bg-orange-950/50'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{case_.name} (Student ID: {case_.studentId})</p>
                            <p className="text-sm text-muted-foreground">{case_.major} • {case_.year}</p>
                            <p className={`text-sm mt-1 ${
                              case_.priority === 'high' ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400'
                            }`}>
                              {case_.assessment} • Last session: {case_.lastSession}
                            </p>
                          </div>
                          <div className="space-x-2">
                            <Button size="sm" variant="destructive" onClick={() => {
                              alert(`Calling ${case_.name}...`)
                            }}>
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => {
                              router.push(`/appointments?client=${case_.name}`)
                            }}>
                              Schedule
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No priority cases at this time</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Today's Schedule
                </CardTitle>
                <CardDescription>Thursday, March 21, 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">Loading today's schedule...</p>
                    </div>
                  ) : todaySchedule.length > 0 ? (
                    todaySchedule.map((appointment) => (
                      <div key={appointment.id} className={`flex items-center space-x-4 p-3 rounded-lg ${
                        appointment.status === 'completed' ? 'bg-green-50 dark:bg-green-950/50' :
                        appointment.status === 'upcoming' ? 'bg-blue-50 dark:bg-blue-950/50' :
                        'bg-purple-50 dark:bg-purple-950/50'
                      }`}>
                        <div className="text-center">
                          <p className="text-sm font-medium">{appointment.time.split(' ')[0]}</p>
                          <p className="text-xs text-muted-foreground">{appointment.time.split(' ')[1]}</p>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{appointment.clientName}</p>
                          <p className="text-sm text-muted-foreground">{appointment.sessionType} • {appointment.focus}</p>
                        </div>
                        <Badge className={
                          appointment.status === 'completed' ? 'bg-green-500' :
                          appointment.status === 'upcoming' ? 'variant-outline' :
                          'variant-secondary'
                        }>
                          {appointment.status === 'completed' ? 'Completed' :
                           appointment.status === 'upcoming' ? 'Upcoming' :
                           'New Client'}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No appointments scheduled for today</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Recent Session Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">Loading recent notes...</p>
                    </div>
                  ) : recentNotes.length > 0 ? (
                    recentNotes.map((note) => (
                      <div key={note.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">{note.clientName} - Session #{note.sessionNumber}</p>
                          <p className="text-xs text-muted-foreground">{note.timeAgo}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {note.notes}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No recent session notes</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                    className="w-full justify-start"
                      onClick={() => router.push("/appointments")}
                       >
                     <Calendar className="h-4 w-4 mr-2" />
                         Schedule Appointment
                          </Button>

                <Button 
  variant="outline" 
  className="w-full justify-start bg-transparent"
  onClick={() => router.push("/notes")}
>
  <FileText className="h-4 w-4 mr-2" />
  Add Session Notes
</Button>

                <Button 
  variant="outline" 
  className="w-full justify-start bg-transparent"
  onClick={() => router.push("/clients")}
>
  <Users className="h-4 w-4 mr-2" />
  View All Clients
</Button>

                <Button 
  variant="outline"
  className="w-full justify-start bg-transparent"
  onClick={() => router.push("/messages")}
>
  <MessageCircle className="h-4 w-4 mr-2" />
  Send Message
</Button>


              </CardContent>
            </Card>

            {/* Specializations */}
            <Card>
              <CardHeader>
                <CardTitle>Your Specializations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Anxiety Disorders</Badge>
                  <Badge variant="secondary">Depression</Badge>
                  <Badge variant="secondary">Trauma & PTSD</Badge>
                  <Badge variant="secondary">Academic Stress</Badge>
                </div>
              </CardContent>
            </Card>

            {/* This Week's Stats */}
            <Card>
              <CardHeader>
                <CardTitle>This Week's Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {loading ? (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">Loading weekly stats...</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Sessions Completed</span>
                        <Badge variant="outline">{weeklyStats.sessionsCompleted}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">New Clients</span>
                        <Badge variant="outline">{weeklyStats.newClients}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Follow-ups Scheduled</span>
                        <Badge variant="outline">{weeklyStats.followUpsScheduled}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Notes Written</span>
                        <Badge variant="outline">{weeklyStats.notesWritten}</Badge>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Availability Status */}
            <Card>
              <CardHeader>
                <CardTitle>Availability Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {loading ? (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">Loading availability...</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Current Status</span>
                        <Badge className={availability.currentStatus === 'available' ? 'bg-green-500' : 'bg-red-500'}>
                          {availability.currentStatus === 'available' ? 'Available' : 'Unavailable'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Next Available</span>
                        <span className="text-sm text-muted-foreground">{availability.nextAvailable}</span>
                      </div>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={() => setAvailabilityModalOpen(true)}>
                          <Clock className="h-4 w-4 mr-2" />
                          Set Availability
                        </Button>
                        <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={() => setScheduleModalOpen(true)}>
                          <Clock className="h-4 w-4 mr-2" />
                          Update Schedule
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AvailabilityModal
        isOpen={availabilityModalOpen}
        onClose={() => setAvailabilityModalOpen(false)}
        currentStatus={availability.currentStatus}
        nextAvailable={availability.nextAvailable}
        todaySchedule={availability.todaySchedule}
        onUpdate={(updatedAvailability) => {
          setAvailability(updatedAvailability)
          // Refresh the data to get updated schedule
          window.location.reload()
        }}
      />

      <ScheduleModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onUpdate={() => {
          // Refresh the data to get updated schedule
          window.location.reload()
        }}
      />
    </div>
  )
}
