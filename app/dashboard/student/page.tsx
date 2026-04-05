"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AnimatedCounter } from "@/components/animated-counter"
import { Heart, MessageCircle, Calendar, BookOpen, AlertCircle, Phone, Users, Brain, Activity } from "lucide-react"
import Link from "next/link"
import { UserMenu } from "@/components/user-menu"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function StudentDashboard() {
  const [studentInfo, setStudentInfo] = useState({ name: "", major: "", year: 0 })
  const [assessments, setAssessments] = useState<any>(null)
  const [appointments, setAppointments] = useState<any[]>([])
  const [activities, setActivities] = useState<any[]>([])
  const [showCrisisModal, setShowCrisisModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, assessmentsRes, appointmentsRes, activitiesRes] = await Promise.all([
          fetch("/api/student/profile"),
          fetch("/api/student/assessments"),
          fetch("/api/student/appointments"),
          fetch("/api/student/activities"),
        ])

        if (profileRes.ok) setStudentInfo(await profileRes.json())
        if (assessmentsRes.ok) setAssessments(await assessmentsRes.json())
        if (appointmentsRes.ok) setAppointments(await appointmentsRes.json())
        if (activitiesRes.ok) setActivities(await activitiesRes.json())
      } catch (error) {
        console.error("Failed to fetch student data:", error)
      }
    }

    fetchData()
  }, [])

  const handleCrisisSupport = () => {
    setShowCrisisModal(true)
  }

  const handleScheduleAppointment = () => {
    window.location.href = "/appointments"
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "MessageCircle":
        return <MessageCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      case "Brain":
        return <Brain className="h-4 w-4 text-green-600 dark:text-green-400" />
      case "BookOpen":
        return <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getActualIcon = (iconName: string) => {
    switch (iconName) {
      case "MessageCircle":
        return <MessageCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      case "Brain":
        return <Brain className="h-4 w-4 text-green-600 dark:text-green-400" />
      case "BookOpen":
        return <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const formatDate = (date: any) => {
    if (!date) return "N/A"
    const d = new Date(date)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const mins = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (mins < 60) return `${mins} minutes ago`
    if (hours < 24) return `${hours} hours ago`
    if (days < 7) return `${days} days ago`
    return d.toLocaleDateString()
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-950/20 dark:to-emerald-950/20">
      {/* Header */}
      <motion.div
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div className="bg-primary rounded-lg p-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Heart className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Welcome back, {studentInfo.name || "Student"}!</h1>
                <p className="text-muted-foreground">{studentInfo.major || "Computer Science"} • {studentInfo.year || 3}rd Year</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleCrisisSupport}>
                <Phone className="h-4 w-4 mr-2" />
                Crisis Support
              </Button>
              <UserMenu />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={cardVariants} whileHover={{ scale: 1.02 }}>
            <Link href="/chat">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold">AI Chat Support</h3>
                  <p className="text-sm text-muted-foreground">24/7 mental health assistant</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div variants={cardVariants} whileHover={{ scale: 1.02 }}>
            <Link href="/appointments">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Book Counseling</h3>
                  <p className="text-sm text-muted-foreground">Schedule with a counselor</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div variants={cardVariants} whileHover={{ scale: 1.02 }}>
            <Link href="/resources">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Resources</h3>
                  <p className="text-sm text-muted-foreground">Self-help materials</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div variants={cardVariants} whileHover={{ scale: 1.02 }}>
            <Link href="/games">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Brain className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Wellness Games</h3>
                  <p className="text-sm text-muted-foreground">Refresh your mind</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div variants={cardVariants} whileHover={{ scale: 1.02 }}>
            <Link href="/community">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Peer Support</h3>
                  <p className="text-sm text-muted-foreground">Connect with others</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mental Health Status */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    Mental Health Status
                  </CardTitle>
                  <CardDescription>Your latest screening results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {assessments && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">PHQ-9 (Depression)</span>
                          <Badge variant="secondary">{assessments.phq9?.level}</Badge>
                        </div>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                        >
                          <Progress value={(assessments.phq9?.score / assessments.phq9?.maxScore) * 100} className="h-2" />
                        </motion.div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Score: {assessments.phq9?.score}/{assessments.phq9?.maxScore} • Last updated {formatDate(assessments.phq9?.lastUpdated)}
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">GAD-7 (Anxiety)</span>
                          <Badge variant="outline">{assessments.gad7?.level}</Badge>
                        </div>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1, delay: 0.6 }}
                        >
                          <Progress value={(assessments.gad7?.score / assessments.gad7?.maxScore) * 100} className="h-2" />
                        </motion.div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Score: {assessments.gad7?.score}/{assessments.gad7?.maxScore} • Last updated {formatDate(assessments.gad7?.lastUpdated)}
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">GHQ-12 (General Health)</span>
                          <Badge variant="secondary">{assessments.ghq12?.level}</Badge>
                        </div>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1, delay: 0.7 }}
                        >
                          <Progress value={(assessments.ghq12?.score / assessments.ghq12?.maxScore) * 100} className="h-2" />
                        </motion.div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Score: {assessments.ghq12?.score}/{assessments.ghq12?.maxScore} • Last updated {formatDate(assessments.ghq12?.lastUpdated)}
                        </p>
                      </motion.div>
                    </>
                  )}

                  <div className="flex space-x-2 pt-4">
                    <Link href="/quiz?type=phq9">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="outline" size="sm">
                          Retake PHQ-9
                        </Button>
                      </motion.div>
                    </Link>
                    <Link href="/quiz?type=gad7">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="outline" size="sm">
                          Retake GAD-7
                        </Button>
                      </motion.div>
                    </Link>
                    <Link href="/quiz?type=ghq12">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="outline" size="sm">
                          Retake GHQ-12
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                    {activities.length > 0 ? (
                      activities.map((activity, idx) => (
                        <motion.div key={idx} className="flex items-center space-x-3" variants={cardVariants} whileHover={{ x: 5 }}>
                          <div className={`bg-${activity.color}-100 dark:bg-${activity.color}-900 p-2 rounded-full`}>
                            {getActualIcon(activity.icon)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {activity.description} • {formatDate(activity.timestamp)}
                            </p>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground text-sm">No activities yet</p>
                    )}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {appointments.length > 0 ? (
                    <>
                      {appointments.slice(0, 1).map((apt, idx) => (
                        <motion.div key={idx} className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg" whileHover={{ scale: 1.02 }}>
                          <p className="font-medium text-sm">Dr. {apt.therapist}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(apt.date).toLocaleDateString()}, {new Date(apt.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                          <p className="text-xs text-blue-600 dark:text-blue-400">{apt.type}</p>
                        </motion.div>
                      ))}
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={handleScheduleAppointment}>
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule New Appointment
                        </Button>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg" whileHover={{ scale: 1.02 }}>
                        <p className="font-medium text-sm">No appointments scheduled</p>
                        <p className="text-xs text-muted-foreground">Schedule your first counseling session</p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={handleScheduleAppointment}>
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule New Appointment
                        </Button>
                      </motion.div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Wellness Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Wellness Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <motion.div className="p-3 bg-green-50 dark:bg-green-950/50 rounded-lg" whileHover={{ scale: 1.02 }}>
                    <p className="text-sm font-medium">Practice Deep Breathing</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Try the 4-7-8 technique: Inhale for 4, hold for 7, exhale for 8. Repeat 3-4 times.
                    </p>
                  </motion.div>
                  <Link href="/wellness">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        More Wellness Tools
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Crisis Support */}
            <Card className="border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center text-red-600 dark:text-red-400">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Need Immediate Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="destructive" size="sm" className="w-full" onClick={handleCrisisSupport}>
                      <Phone className="h-4 w-4 mr-2" />
                      Crisis Hotline
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={() => window.location.href = "/help"}>
                      Emergency Resources
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* Crisis Modal */}
            {showCrisisModal && (
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCrisisModal(false)}
              >
                <motion.div
                  className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full p-6"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-red-600">Emergency Support</h2>
                    <Button variant="ghost" size="sm" onClick={() => setShowCrisisModal(false)}>✕</Button>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
                      <p className="font-semibold text-red-600 dark:text-red-400 mb-2">National Crisis Hotline</p>
                      <p className="text-2xl font-bold text-red-600">988</p>
                      <p className="text-sm text-muted-foreground">Available 24/7</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
                      <p className="font-semibold text-red-600 dark:text-red-400 mb-2">Text Support</p>
                      <p className="text-lg font-bold">Text HOME to 741741</p>
                      <p className="text-sm text-muted-foreground">Crisis Text Line</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <p className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Campus Resources</p>
                      <p className="text-sm">Counseling Center: ext. 2468</p>
                      <p className="text-sm text-muted-foreground">Monday-Friday, 8AM-5PM</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-red-600 hover:bg-red-700">Call Now</Button>
                      <Button variant="outline" className="flex-1" onClick={() => setShowCrisisModal(false)}>Close</Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
