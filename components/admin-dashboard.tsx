"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  Users,
  MessageCircle,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  Heart,
  Brain,
  Shield,
  Download,
  Activity,
} from "lucide-react"

export function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("all")

  // Sample data - in a real app, this would come from an API
  const overviewStats = [
    {
      title: "Total Active Users",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      description: "Students who used the platform this month",
    },
    {
      title: "AI Chat Sessions",
      value: "1,234",
      change: "+8.3%",
      trend: "up",
      icon: MessageCircle,
      description: "AI support conversations initiated",
    },
    {
      title: "Appointments Booked",
      value: "456",
      change: "+15.2%",
      trend: "up",
      icon: Calendar,
      description: "Professional counseling sessions scheduled",
    },
    {
      title: "Crisis Interventions",
      value: "23",
      change: "-5.1%",
      trend: "down",
      icon: AlertTriangle,
      description: "High-risk situations identified and addressed",
    },
  ]

  const usageData = [
    { name: "Mon", aiChat: 45, appointments: 12, resources: 78, community: 34 },
    { name: "Tue", aiChat: 52, appointments: 15, resources: 85, community: 41 },
    { name: "Wed", aiChat: 48, appointments: 18, resources: 92, community: 38 },
    { name: "Thu", aiChat: 61, appointments: 14, resources: 76, community: 45 },
    { name: "Fri", aiChat: 55, appointments: 20, resources: 88, community: 52 },
    { name: "Sat", aiChat: 38, appointments: 8, resources: 65, community: 28 },
    { name: "Sun", aiChat: 42, appointments: 6, resources: 71, community: 31 },
  ]

  const mentalHealthTrends = [
    { month: "Jan", anxiety: 65, depression: 45, stress: 78, sleep: 52 },
    { month: "Feb", anxiety: 68, depression: 48, stress: 82, sleep: 55 },
    { month: "Mar", anxiety: 72, depression: 52, stress: 85, sleep: 58 },
    { month: "Apr", anxiety: 75, depression: 55, stress: 88, sleep: 62 },
    { month: "May", anxiety: 78, depression: 58, stress: 92, sleep: 65 },
    { month: "Jun", anxiety: 74, depression: 54, stress: 89, sleep: 61 },
  ]

  const categoryDistribution = [
    { name: "Anxiety", value: 35, color: "#3b82f6" },
    { name: "Academic Stress", value: 28, color: "#10b981" },
    { name: "Depression", value: 18, color: "#8b5cf6" },
    { name: "Sleep Issues", value: 12, color: "#f59e0b" },
    { name: "Relationships", value: 7, color: "#ef4444" },
  ]

  const peakUsageHours = [
    { hour: "6 AM", usage: 12 },
    { hour: "8 AM", usage: 45 },
    { hour: "10 AM", usage: 78 },
    { hour: "12 PM", usage: 92 },
    { hour: "2 PM", usage: 85 },
    { hour: "4 PM", usage: 98 },
    { hour: "6 PM", usage: 105 },
    { hour: "8 PM", usage: 88 },
    { hour: "10 PM", usage: 65 },
    { hour: "12 AM", usage: 32 },
  ]

  const riskAssessment = [
    {
      level: "High Risk",
      count: 23,
      percentage: 2.1,
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      description: "Students requiring immediate intervention",
    },
    {
      level: "Medium Risk",
      count: 156,
      percentage: 14.2,
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      description: "Students needing additional support",
    },
    {
      level: "Low Risk",
      count: 892,
      percentage: 81.3,
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      description: "Students with general wellness needs",
    },
    {
      level: "No Assessment",
      count: 26,
      percentage: 2.4,
      color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
      description: "Students who haven't completed screening",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Privacy Notice */}
      <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <div className="font-semibold mb-2">Privacy Protected Analytics</div>
          <p className="text-sm">
            All data is anonymized and aggregated to protect student privacy. Individual student information is never
            displayed or accessible through this dashboard.
          </p>
        </AlertDescription>
      </Alert>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Metrics</SelectItem>
              <SelectItem value="usage">Platform Usage</SelectItem>
              <SelectItem value="mental-health">Mental Health Trends</SelectItem>
              <SelectItem value="risk">Risk Assessment</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <div className={`flex items-center text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {stat.change}
                </div>
                <span className="text-sm text-muted-foreground ml-2">vs last period</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage Patterns</TabsTrigger>
          <TabsTrigger value="mental-health">Mental Health</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Usage Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Platform Usage</CardTitle>
                <CardDescription>Student engagement across different features</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="aiChat" fill="#3b82f6" name="AI Chat" />
                    <Bar dataKey="appointments" fill="#10b981" name="Appointments" />
                    <Bar dataKey="resources" fill="#8b5cf6" name="Resources" />
                    <Bar dataKey="community" fill="#f59e0b" name="Community" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Support Categories</CardTitle>
                <CardDescription>Distribution of student concerns</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Peak Usage Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Peak Usage Hours</CardTitle>
                <CardDescription>When students are most active on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={peakUsageHours}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="usage" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Feature Adoption */}
            <Card>
              <CardHeader>
                <CardTitle>Feature Adoption Rates</CardTitle>
                <CardDescription>How students engage with different platform features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">AI Chat Support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }} />
                      </div>
                      <span className="text-sm text-muted-foreground">85%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Appointment Booking</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "62%" }} />
                      </div>
                      <span className="text-sm text-muted-foreground">62%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: "48%" }} />
                      </div>
                      <span className="text-sm text-muted-foreground">48%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Brain className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium">Resource Library</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{ width: "73%" }} />
                      </div>
                      <span className="text-sm text-muted-foreground">73%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mental-health" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mental Health Trends Over Time</CardTitle>
              <CardDescription>Tracking changes in student mental health concerns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={mentalHealthTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="anxiety" stroke="#3b82f6" strokeWidth={2} name="Anxiety" />
                  <Line type="monotone" dataKey="depression" stroke="#8b5cf6" strokeWidth={2} name="Depression" />
                  <Line type="monotone" dataKey="stress" stroke="#10b981" strokeWidth={2} name="Academic Stress" />
                  <Line type="monotone" dataKey="sleep" stroke="#f59e0b" strokeWidth={2} name="Sleep Issues" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Level Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Level Distribution</CardTitle>
                <CardDescription>Current risk assessment of student population</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {riskAssessment.map((risk, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <Badge className={risk.color}>{risk.level}</Badge>
                      <div>
                        <p className="text-sm font-medium">{risk.count} students</p>
                        <p className="text-xs text-muted-foreground">{risk.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{risk.percentage}%</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Early Warning Indicators */}
            <Card>
              <CardHeader>
                <CardTitle>Early Warning Indicators</CardTitle>
                <CardDescription>Patterns that may indicate increased risk</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium">Increased Crisis Keywords</span>
                    </div>
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">+15%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium">Late Night Usage Spike</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      +22%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium">Repeated High-Severity Sessions</span>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">+8%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interventions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>Crisis Interventions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-3xl font-bold">23</div>
                  <p className="text-sm text-muted-foreground">
                    High-risk situations identified and addressed this month
                  </p>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    <span>-5.1% from last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span>Referrals Made</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-3xl font-bold">156</div>
                  <p className="text-sm text-muted-foreground">Students referred to professional counseling services</p>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+12.3% from last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span>Follow-up Rate</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-3xl font-bold">87%</div>
                  <p className="text-sm text-muted-foreground">Students who attended their referred appointments</p>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+3.2% from last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Intervention Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Interventions Timeline</CardTitle>
              <CardDescription>Anonymous overview of recent high-priority interventions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 rounded-lg border">
                  <div className="bg-red-100 dark:bg-red-900/20 rounded-full p-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Crisis intervention initiated</p>
                    <p className="text-xs text-muted-foreground">
                      Student connected with emergency counselor - 2 hours ago
                    </p>
                  </div>
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">High Priority</Badge>
                </div>
                <div className="flex items-center space-x-4 p-3 rounded-lg border">
                  <div className="bg-yellow-100 dark:bg-yellow-900/20 rounded-full p-2">
                    <Users className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Counseling referral completed</p>
                    <p className="text-xs text-muted-foreground">Student scheduled for appointment - 5 hours ago</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    Medium Priority
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 p-3 rounded-lg border">
                  <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-2">
                    <Heart className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Follow-up successful</p>
                    <p className="text-xs text-muted-foreground">Student reported improved wellbeing - 1 day ago</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Resolved</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
