"use client"

import { useState, useEffect } from "react"
import { motion, easeInOut } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedCounter } from "@/components/animated-counter"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import {
  Shield,
  Users,
  Calendar,
  BarChart3,
  AlertTriangle,
  UserCheck,
  MessageSquare,
  TrendingUp,
  FileText,
} from "lucide-react"

const riskDistributionData = [
  { name: "Low Risk", value: 849, color: "#10b981" },
  { name: "Mild Risk", value: 28, color: "#f59e0b" },
  { name: "Moderate Risk", value: 12, color: "#f97316" },
  { name: "Severe Risk", value: 3, color: "#ef4444" },
]

const weeklyUsageData = [
  { day: "Mon", aiChats: 180, assessments: 120, games: 300, sessions: 20 },
  { day: "Tue", aiChats: 220, assessments: 140, games: 350, sessions: 25 },
  { day: "Wed", aiChats: 190, assessments: 110, games: 280, sessions: 18 },
  { day: "Thu", aiChats: 250, assessments: 160, games: 400, sessions: 30 },
  { day: "Fri", aiChats: 200, assessments: 130, games: 320, sessions: 22 },
  { day: "Sat", aiChats: 120, assessments: 80, games: 250, sessions: 15 },
  { day: "Sun", aiChats: 85, assessments: 52, games: 234, sessions: 26 },
]

const monthlyTrendsData = [
  { month: "Jan", students: 2400, counselors: 20, sessions: 580 },
  { month: "Feb", students: 2520, counselors: 21, sessions: 620 },
  { month: "Mar", students: 2680, counselors: 22, sessions: 680 },
  { month: "Apr", students: 2750, counselors: 23, sessions: 720 },
  { month: "May", students: 2847, counselors: 24, sessions: 780 },
]

const assessmentTypesData = [
  { name: "PHQ-9", value: 45, color: "#3b82f6" },
  { name: "GAD-7", value: 35, color: "#8b5cf6" },
  { name: "GHQ-12", value: 20, color: "#06b6d4" },
]

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
      ease: easeInOut,
    },
  },
}

function generateReport(statsData: any, usersInfo: any, counselorsInfo: any, analyticsInfo: any) {
  const reportData = {
    generatedAt: new Date().toLocaleString(),
    reportPeriod: "Monthly Report",
    metrics: {
      totalStudents: statsData.totalStudents,
      activeCounselors: statsData.activeCounselors,
      weekSessions: statsData.weekSessions,
      crisisAlerts: statsData.crisisAlerts,
      aiChats: statsData.aiChats,
    },
    counselorStats: {
      total: counselorsInfo.totalCounselors,
      activeNow: counselorsInfo.activeNow,
      inSession: counselorsInfo.inSession,
      offline: counselorsInfo.offline,
    },
    analyticsMetrics: analyticsInfo.metrics,
  }

  // Create CSV content
  let csvContent = "SOUL SUPPORT - ADMIN DASHBOARD REPORT\n"
  csvContent += `Generated: ${reportData.generatedAt}\n`
  csvContent += `Period: ${reportData.reportPeriod}\n\n`

  csvContent += "=== KEY METRICS ===\n"
  Object.entries(reportData.metrics).forEach(([key, value]) => {
    csvContent += `${key.replace(/([A-Z])/g, " $1").toUpperCase()},${value}\n`
  })

  csvContent += "\n=== COUNSELOR STATISTICS ===\n"
  Object.entries(reportData.counselorStats).forEach(([key, value]) => {
    csvContent += `${key.replace(/([A-Z])/g, " $1").toUpperCase()},${value}\n`
  })

  csvContent += "\n=== ANALYTICS METRICS ===\n"
  Object.entries(reportData.analyticsMetrics).forEach(([key, value]) => {
    csvContent += `${key.replace(/([A-Z])/g, " $1").toUpperCase()},${value}\n`
  })

  // Create blob and download
  const element = document.createElement("a")
  const file = new Blob([csvContent], { type: "text/csv" })
  element.href = URL.createObjectURL(file)
  element.download = `SoulSupport_Report_${new Date().toISOString().split("T")[0]}.csv`
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export default function AdminDashboard() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeSection, setActiveSection] = useState<"dashboard" | "users" | "counselors" | "analytics" | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Data states
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeCounselors: 0,
    weekSessions: 0,
    crisisAlerts: 0,
    aiChats: 0,
  })
  const [usersData, setUsersData] = useState({ stats: { totalUsers: 0, activeToday: 0, pendingApproval: 0 }, users: [] })
  const [counselorsData, setCounselorsData] = useState({ 
    totalCounselors: 0, 
    activeNow: 0, 
    inSession: 0, 
    offline: 0,
    counselors: [] 
  })
  const [analyticsData, setAnalyticsData] = useState({
    metrics: { engagementRate: 0, userGrowth: 0, avgSessionDuration: 0, satisfactionScore: 0 },
    featureUsage: { wellnessGames: 0, aiChat: 0, assessments: 0, resources: 0 },
    timeDistribution: { peakHours: "6-9 PM", avgDailyActive: 0 },
  })
  const [loading, setLoading] = useState(true)

  // Fetch stats on mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats")
        const data = await res.json()
        setStats(data)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch stats:", error)
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  // Fetch users data when users modal opens
  useEffect(() => {
    if (activeSection === "users") {
      const fetchUsers = async () => {
        try {
          const res = await fetch("/api/admin/users")
          const data = await res.json()
          setUsersData(data)
        } catch (error) {
          console.error("Failed to fetch users:", error)
        }
      }
      fetchUsers()
    }
  }, [activeSection])

  // Fetch counselors data when counselors modal opens
  useEffect(() => {
    if (activeSection === "counselors") {
      const fetchCounselors = async () => {
        try {
          const res = await fetch("/api/admin/counselors")
          const data = await res.json()
          setCounselorsData(data)
        } catch (error) {
          console.error("Failed to fetch counselors:", error)
        }
      }
      fetchCounselors()
    }
  }, [activeSection])

  // Fetch analytics data when analytics modal opens
  useEffect(() => {
    if (activeSection === "analytics") {
      const fetchAnalytics = async () => {
        try {
          const res = await fetch("/api/admin/analytics")
          const data = await res.json()
          setAnalyticsData(data)
        } catch (error) {
          console.error("Failed to fetch analytics:", error)
        }
      }
      fetchAnalytics()
    }
  }, [activeSection])

  const handleGenerateReport = () => {
    setIsGenerating(true)
    // Simulate processing time
    setTimeout(() => {
      generateReport(stats, usersData, counselorsData, analyticsData)
      setIsGenerating(false)
    }, 500)
  }

  const handleManageUsers = () => {
    setActiveSection("users")
    setShowModal(true)
  }

  const handleCounselorApproval = () => {
    setActiveSection("counselors")
    setShowModal(true)
  }

  const handleViewAnalytics = () => {
    setActiveSection("analytics")
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setActiveSection(null)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20">
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
                <Shield className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground">Student Affairs • Director</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Online</Badge>
              <Button variant="outline" size="sm" onClick={handleGenerateReport} disabled={isGenerating}>
                <FileText className="h-4 w-4 mr-2" />
                {isGenerating ? "Generating..." : "Generate Report"}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={cardVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                    <p className="text-3xl font-bold">
                      <AnimatedCounter end={stats.totalStudents} />
                    </p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12% from last month
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Counselors</p>
                    <p className="text-3xl font-bold">
                      <AnimatedCounter end={stats.activeCounselors} />
                    </p>
                    <p className="text-xs text-blue-600 flex items-center mt-1">
                      <UserCheck className="h-3 w-3 mr-1" />
                      {stats.activeCounselors - 6} available now
                    </p>
                  </div>
                  <UserCheck className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">This Week's Sessions</p>
                    <p className="text-3xl font-bold">
                      <AnimatedCounter end={stats.weekSessions} />
                    </p>
                    <p className="text-xs text-orange-600 flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {Math.round(stats.weekSessions / 7)} scheduled today
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Crisis Alerts</p>
                    <p className="text-3xl font-bold">
                      <AnimatedCounter end={stats.crisisAlerts} />
                    </p>
                    <p className="text-xs text-red-600 flex items-center mt-1">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Requires attention
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Risk Distribution Pie Chart */}
          <motion.div variants={cardVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Risk Level Distribution</CardTitle>
                <CardDescription>Assessment results breakdown this month</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    lowRisk: { label: "Low Risk", color: "#10b981" },
                    mildRisk: { label: "Mild Risk", color: "#f59e0b" },
                    moderateRisk: { label: "Moderate Risk", color: "#f97316" },
                    severeRisk: { label: "Severe Risk", color: "#ef4444" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskDistributionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                      >
                        {riskDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Assessment Types Pie Chart */}
          <motion.div variants={cardVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Assessment Types Usage</CardTitle>
                <CardDescription>Popular assessment tools this week</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    phq9: { label: "PHQ-9", color: "#3b82f6" },
                    gad7: { label: "GAD-7", color: "#8b5cf6" },
                    ghq12: { label: "GHQ-12", color: "#06b6d4" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={assessmentTypesData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                      >
                        {assessmentTypesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Weekly Usage Bar Chart */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Weekly Platform Usage</CardTitle>
              <CardDescription>Daily activity across different platform features</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  aiChats: { label: "AI Chats", color: "#3b82f6" },
                  assessments: { label: "Assessments", color: "#10b981" },
                  games: { label: "Wellness Games", color: "#8b5cf6" },
                  sessions: { label: "Therapy Sessions", color: "#f59e0b" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyUsageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="aiChats" fill="var(--color-aiChats)" name="AI Chats" />
                    <Bar dataKey="assessments" fill="var(--color-assessments)" name="Assessments" />
                    <Bar dataKey="games" fill="var(--color-games)" name="Wellness Games" />
                    <Bar dataKey="sessions" fill="var(--color-sessions)" name="Therapy Sessions" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Trends Line Chart */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Monthly Growth Trends</CardTitle>
              <CardDescription>Platform growth over the past 5 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  students: { label: "Students", color: "#3b82f6" },
                  counselors: { label: "Counselors", color: "#10b981" },
                  sessions: { label: "Sessions", color: "#f59e0b" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="students"
                      stackId="1"
                      stroke="var(--color-students)"
                      fill="var(--color-students)"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="sessions"
                      stackId="2"
                      stroke="var(--color-sessions)"
                      fill="var(--color-sessions)"
                      fillOpacity={0.6}
                    />
                    <Line type="monotone" dataKey="counselors" stroke="var(--color-counselors)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* High-Risk Assessment Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-orange-200 dark:border-orange-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-600 dark:text-orange-400">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    High-Risk Assessment Summary
                  </CardTitle>
                  <CardDescription>Overall risk level distribution this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.div
                    className="grid grid-cols-2 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div
                      className="p-4 bg-red-50 dark:bg-red-950/50 rounded-lg"
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-sm font-medium text-red-600 dark:text-red-400">Severe Risk</p>
                      <p className="text-2xl font-bold">
                        <AnimatedCounter end={3} />
                      </p>
                      <p className="text-xs text-muted-foreground">Assessments flagged</p>
                    </motion.div>
                    <motion.div
                      className="p-4 bg-orange-50 dark:bg-orange-950/50 rounded-lg"
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Moderate Risk</p>
                      <p className="text-2xl font-bold">
                        <AnimatedCounter end={12} />
                      </p>
                      <p className="text-xs text-muted-foreground">Assessments flagged</p>
                    </motion.div>
                    <motion.div
                      className="p-4 bg-yellow-50 dark:bg-yellow-950/50 rounded-lg"
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Mild Risk</p>
                      <p className="text-2xl font-bold">
                        <AnimatedCounter end={28} />
                      </p>
                      <p className="text-xs text-muted-foreground">Assessments flagged</p>
                    </motion.div>
                    <motion.div
                      className="p-4 bg-green-50 dark:bg-green-950/50 rounded-lg"
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">Low Risk</p>
                      <p className="text-2xl font-bold">
                        <AnimatedCounter end={849} />
                      </p>
                      <p className="text-xs text-muted-foreground">Assessments completed</p>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Platform Analytics Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Platform Analytics Overview
                  </CardTitle>
                  <CardDescription>Comprehensive usage statistics and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div
                      className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg"
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-sm font-medium">AI Chat Sessions</p>
                      <p className="text-2xl font-bold">
                        <AnimatedCounter end={1247} />
                      </p>
                      <p className="text-xs text-green-600 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +23% this week
                      </p>
                    </motion.div>

                    <motion.div
                      className="p-4 bg-green-50 dark:bg-green-950/50 rounded-lg"
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-sm font-medium">Assessments Completed</p>
                      <p className="text-2xl font-bold">
                        <AnimatedCounter end={892} />
                      </p>
                      <p className="text-xs text-green-600 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +15% this week
                      </p>
                    </motion.div>

                    <motion.div
                      className="p-4 bg-purple-50 dark:bg-purple-950/50 rounded-lg"
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-sm font-medium">Wellness Games Played</p>
                      <p className="text-2xl font-bold">
                        <AnimatedCounter end={2134} />
                      </p>
                      <p className="text-xs text-green-600 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +45% this week
                      </p>
                    </motion.div>

                    <motion.div
                      className="p-4 bg-orange-50 dark:bg-orange-950/50 rounded-lg"
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-sm font-medium">Therapy Sessions</p>
                      <p className="text-2xl font-bold">
                        <AnimatedCounter end={156} />
                      </p>
                      <p className="text-xs text-blue-600">32 scheduled today</p>
                    </motion.div>

                    <motion.div
                      className="p-4 bg-teal-50 dark:bg-teal-950/50 rounded-lg"
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-sm font-medium">Resource Downloads</p>
                      <p className="text-2xl font-bold">
                        <AnimatedCounter end={3456} />
                      </p>
                      <p className="text-xs text-green-600 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +8% this week
                      </p>
                    </motion.div>

                    <motion.div
                      className="p-4 bg-pink-50 dark:bg-pink-950/50 rounded-lg"
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-sm font-medium">Average Session Time</p>
                      <p className="text-2xl font-bold">
                        <AnimatedCounter end={12} suffix="m" />
                      </p>
                      <p className="text-xs text-muted-foreground">AI chat sessions</p>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* System Activity Log */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>System Activity Log</CardTitle>
                  <CardDescription>Recent platform events and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                    <motion.div className="flex items-center space-x-3" variants={cardVariants} whileHover={{ x: 5 }}>
                      <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                        <UserCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New counselor registered</p>
                        <p className="text-xs text-muted-foreground">
                          Platform now has 24 active counselors • 2 hours ago
                        </p>
                      </div>
                    </motion.div>

                    <motion.div className="flex items-center space-x-3" variants={cardVariants} whileHover={{ x: 5 }}>
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                        <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Peak usage period detected</p>
                        <p className="text-xs text-muted-foreground">
                          AI chat usage increased by 45% during evening hours • 4 hours ago
                        </p>
                      </div>
                    </motion.div>

                    <motion.div className="flex items-center space-x-3" variants={cardVariants} whileHover={{ x: 5 }}>
                      <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                        <BarChart3 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Weekly analytics report generated</p>
                        <p className="text-xs text-muted-foreground">
                          Mental health trends and platform usage summary • 1 day ago
                        </p>
                      </div>
                    </motion.div>

                    <motion.div className="flex items-center space-x-3" variants={cardVariants} whileHover={{ x: 5 }}>
                      <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-full">
                        <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">System maintenance completed</p>
                        <p className="text-xs text-muted-foreground">
                          Database optimization and security updates applied • 2 days ago
                        </p>
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
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full justify-start" onClick={handleManageUsers}>
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleCounselorApproval}>
                    <UserCheck className="h-4 w-4 mr-2" />
                    Counselor Approval
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleViewAnalytics}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleGenerateReport} disabled={isGenerating}>
                    <FileText className="h-4 w-4 mr-2" />
                    {isGenerating ? "Generating..." : "Generate Reports"}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>

            {/* Counselor Status */}
            <Card>
              <CardHeader>
                <CardTitle>Counselor Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Available Now</span>
                    <Badge variant="secondary">
                      <AnimatedCounter end={18} />
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">In Session</span>
                    <Badge variant="outline">
                      <AnimatedCounter end={6} />
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Offline</span>
                    <Badge variant="secondary">
                      <AnimatedCounter end={3} />
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Chat Service</span>
                    <Badge className="bg-green-500">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <Badge className="bg-green-500">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Notifications</span>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Users Management Modal */}
            {activeSection === "users" && (
              <div>
                <div className="sticky top-0 bg-white dark:bg-gray-900 border-b p-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Manage Users</h2>
                  <Button variant="ghost" size="sm" onClick={closeModal}>✕</Button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">Total Users</p>
                        <p className="text-3xl font-bold">{usersData.stats.totalUsers}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">Active Today</p>
                        <p className="text-3xl font-bold">{usersData.stats.activeToday}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">Pending Approval</p>
                        <p className="text-3xl font-bold">{usersData.stats.pendingApproval}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {usersData.users.length > 0 ? (
                          usersData.users.map((user: any) => (
                            <motion.div
                              key={user.id}
                              className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg"
                              whileHover={{ x: 5 }}
                            >
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <Badge variant={user.status === "Active" ? "default" : "outline"}>
                                  {user.status}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : "N/A"}
                                </span>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <p className="text-center text-muted-foreground">No users found</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  <Button className="w-full" onClick={closeModal}>Close</Button>
                </div>
              </div>
            )}

            {/* Counselor Approval Modal */}
            {activeSection === "counselors" && (
              <div>
                <div className="sticky top-0 bg-white dark:bg-gray-900 border-b p-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Counselor Availability</h2>
                  <Button variant="ghost" size="sm" onClick={closeModal}>✕</Button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">Total Counselors</p>
                        <p className="text-3xl font-bold">{counselorsData.totalCounselors}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">Available Now</p>
                        <p className="text-3xl font-bold">{counselorsData.activeNow}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">In Session</p>
                        <p className="text-3xl font-bold text-orange-600">{counselorsData.inSession}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Counselor Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {counselorsData.counselors.length > 0 ? (
                          counselorsData.counselors.map((c: any) => (
                            <motion.div
                              key={c.id}
                              className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg"
                              whileHover={{ x: 5 }}
                            >
                              <div>
                                <p className="font-medium">{c.name}</p>
                                <p className="text-xs text-muted-foreground">{c.email}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant={c.availability === "Available" ? "default" : "secondary"}
                                >
                                  {c.availability}
                                </Badge>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <p className="text-center text-muted-foreground">No counselors found</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  <Button className="w-full" onClick={closeModal}>Close</Button>
                </div>
              </div>
            )}

            {/* Analytics Modal */}
            {activeSection === "analytics" && (
              <div>
                <div className="sticky top-0 bg-white dark:bg-gray-900 border-b p-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Analytics Dashboard</h2>
                  <Button variant="ghost" size="sm" onClick={closeModal}>✕</Button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">Engagement Rate</p>
                        <p className="text-3xl font-bold text-blue-600">{analyticsData.metrics.engagementRate}%</p>
                        <p className="text-xs text-green-600 flex items-center mt-2">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +12% from last month
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">User Growth</p>
                        <p className="text-3xl font-bold text-green-600">+{analyticsData.metrics.userGrowth}</p>
                        <p className="text-xs text-green-600 flex items-center mt-2">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          This month
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">Avg Session Duration</p>
                        <p className="text-3xl font-bold text-purple-600">{analyticsData.metrics.avgSessionDuration}m</p>
                        <p className="text-xs text-muted-foreground">Therapy Sessions</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">Satisfaction Score</p>
                        <p className="text-3xl font-bold text-orange-600">{analyticsData.metrics.satisfactionScore}/5</p>
                        <p className="text-xs text-muted-foreground">Based on reviews</p>
                      </CardContent>
                    </Card>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Top Features by Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { feature: "Wellness Games", usage: analyticsData.featureUsage.wellnessGames, percent: 35 },
                          { feature: "AI Chat Support", usage: analyticsData.featureUsage.aiChat, percent: 28 },
                          { feature: "Assessments", usage: analyticsData.featureUsage.assessments, percent: 22 },
                          { feature: "Resource Hub", usage: analyticsData.featureUsage.resources, percent: 15 },
                        ].map((item, idx) => (
                          <motion.div key={idx} whileHover={{ x: 5 }}>
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium">{item.feature}</p>
                              <p className="text-sm text-muted-foreground">{item.usage.toLocaleString()} users</p>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <motion.div
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${item.percent}%` }}
                                transition={{ duration: 1 }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Time Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                          <p className="text-sm text-muted-foreground">Peak Hours</p>
                          <p className="text-2xl font-bold">{analyticsData.timeDistribution.peakHours}</p>
                        </div>
                        <div className="text-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                          <p className="text-sm text-muted-foreground">Avg Daily Active</p>
                          <p className="text-2xl font-bold">{analyticsData.timeDistribution.avgDailyActive}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Button className="w-full" onClick={closeModal}>Close</Button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
