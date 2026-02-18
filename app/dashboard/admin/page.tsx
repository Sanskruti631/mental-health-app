"use client"

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

export default function AdminDashboard() {
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
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
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
                      <AnimatedCounter end={2847} />
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
                      <AnimatedCounter end={24} />
                    </p>
                    <p className="text-xs text-blue-600 flex items-center mt-1">
                      <UserCheck className="h-3 w-3 mr-1" />
                      18 available now
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
                      <AnimatedCounter end={156} />
                    </p>
                    <p className="text-xs text-orange-600 flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      32 scheduled today
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
                      <AnimatedCounter end={3} />
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
                  <Button className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Counselor Approval
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Reports
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
    </div>
  )
}
