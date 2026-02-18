"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AnimatedCounter } from "@/components/animated-counter"
import { Heart, MessageCircle, Calendar, BookOpen, AlertCircle, Phone, Users, Brain, Activity } from "lucide-react"
import Link from "next/link"

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
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
                <h1 className="text-2xl font-bold text-foreground">Welcome back, Sarah!</h1>
                <p className="text-muted-foreground">Computer Science • 3rd Year</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Crisis Support
              </Button>
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
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">PHQ-9 (Depression)</span>
                      <Badge variant="secondary">Mild</Badge>
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                    >
                      <Progress value={35} className="h-2" />
                    </motion.div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Score: <AnimatedCounter end={7} />/<AnimatedCounter end={27} /> • Last updated 3 days ago
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">GAD-7 (Anxiety)</span>
                      <Badge variant="outline">Minimal</Badge>
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.6 }}
                    >
                      <Progress value={20} className="h-2" />
                    </motion.div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Score: <AnimatedCounter end={4} />/<AnimatedCounter end={21} /> • Last updated 3 days ago
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">GHQ-12 (General Health)</span>
                      <Badge variant="secondary">Moderate</Badge>
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.7 }}
                    >
                      <Progress value={45} className="h-2" />
                    </motion.div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Score: <AnimatedCounter end={5} />/<AnimatedCounter end={12} /> • Last updated 3 days ago
                    </p>
                  </motion.div>

                  <div className="flex space-x-2 pt-4">
                    <Link href="/screening/phq9">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="outline" size="sm">
                          Retake PHQ-9
                        </Button>
                      </motion.div>
                    </Link>
                    <Link href="/screening/gad7">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="outline" size="sm">
                          Retake GAD-7
                        </Button>
                      </motion.div>
                    </Link>
                    <Link href="/screening/ghq12">
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
                    <motion.div className="flex items-center space-x-3" variants={cardVariants} whileHover={{ x: 5 }}>
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                        <MessageCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">AI Chat Session</p>
                        <p className="text-xs text-muted-foreground">
                          Discussed stress management techniques • 2 hours ago
                        </p>
                      </div>
                    </motion.div>

                    <motion.div className="flex items-center space-x-3" variants={cardVariants} whileHover={{ x: 5 }}>
                      <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                        <Brain className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Completed PHQ-9 Assessment</p>
                        <p className="text-xs text-muted-foreground">
                          Score improved from last assessment • 3 days ago
                        </p>
                      </div>
                    </motion.div>

                    <motion.div className="flex items-center space-x-3" variants={cardVariants} whileHover={{ x: 5 }}>
                      <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                        <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Read Article</p>
                        <p className="text-xs text-muted-foreground">"Managing Academic Stress" • 1 week ago</p>
                      </div>
                    </motion.div>
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
                  <motion.div className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg" whileHover={{ scale: 1.02 }}>
                    <p className="font-medium text-sm">Dr. Emily Johnson</p>
                    <p className="text-xs text-muted-foreground">Tomorrow, 2:00 PM</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Individual Counseling</p>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule New Appointment
                    </Button>
                  </motion.div>
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
                    <Button variant="destructive" size="sm" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Crisis Hotline
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Emergency Resources
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
