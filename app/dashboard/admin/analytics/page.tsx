"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Users,
  MessageSquare,
  Brain,
  TrendingUp,
  Download,
  Activity,
} from "lucide-react";

import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* ---------------------- Sample Data ---------------------- */

const monthlyGrowthData = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 150 },
  { month: "Mar", users: 180 },
  { month: "Apr", users: 220 },
  { month: "May", users: 260 },
  { month: "Jun", users: 310 },
];

const featureUsageData = [
  { name: "AI Chat", value: 35, color: "#10B981" },
  { name: "Assessments", value: 25, color: "#3B82F6" },
  { name: "Wellness Games", value: 20, color: "#8B5CF6" },
  { name: "Resources", value: 20, color: "#F59E0B" },
];

const weeklyActivityData = [
  { day: "Mon", users: 120 },
  { day: "Tue", users: 145 },
  { day: "Wed", users: 180 },
  { day: "Thu", users: 170 },
  { day: "Fri", users: 210 },
  { day: "Sat", users: 160 },
  { day: "Sun", users: 130 },
];

const riskDistributionData = [
  { name: "Low Risk", value: 70, color: "#22C55E" },
  { name: "Moderate Risk", value: 20, color: "#F59E0B" },
  { name: "High Risk", value: 10, color: "#EF4444" },
];

/* ---------------------- Component ---------------------- */

export default function AnalyticsPage() {
  const router = useRouter();

  const generateReport = () => {
    const csvContent = `
Metric,Value
Total Users,2847
AI Chat Sessions,1247
Assessments Completed,892
Wellness Games Played,2134
Average Session Duration,18 mins
`;

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "Analytics_Report.csv";

    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div>
              <h1 className="text-4xl font-bold">
                Analytics Dashboard
              </h1>

              <p className="text-muted-foreground">
                Insights into platform engagement and mental health support.
              </p>
            </div>
          </div>

          <Button onClick={generateReport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </motion.div>

        {/* Overview Cards */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Users",
              value: "2,847",
              icon: Users,
            },
            {
              title: "AI Chat Sessions",
              value: "1,247",
              icon: MessageSquare,
            },
            {
              title: "Assessments",
              value: "892",
              icon: Brain,
            },
            {
              title: "Growth Rate",
              value: "+18%",
              icon: TrendingUp,
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {item.title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                      {item.value}
                    </h2>
                  </div>

                  <item.icon className="h-8 w-8 text-emerald-600" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}

        <div className="grid lg:grid-cols-2 gap-6">

          {/* User Growth */}

          <Card>
            <CardHeader>
              <CardTitle>Monthly User Growth</CardTitle>
            </CardHeader>

            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="month" />

                  <YAxis />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Feature Usage */}

          <Card>
            <CardHeader>
              <CardTitle>Feature Usage</CardTitle>
            </CardHeader>

            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={featureUsageData}
                    dataKey="value"
                    outerRadius={100}
                    label
                  >
                    {featureUsageData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Activity */}

        <Card>
          <CardHeader>
            <CardTitle>
              Weekly Platform Activity
            </CardTitle>
          </CardHeader>

          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={weeklyActivityData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="users"
                  fill="#10B981"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bottom Cards */}

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Risk Distribution */}

          <Card>
            <CardHeader>
              <CardTitle>
                Mental Health Risk Distribution
              </CardTitle>
            </CardHeader>

            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={riskDistributionData}
                    dataKey="value"
                    outerRadius={100}
                    label
                  >
                    {riskDistributionData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Counselor Metrics */}

          <Card>
            <CardHeader>
              <CardTitle>
                Counselor Performance
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">

              <div className="flex justify-between">
                <span>Active Counselors</span>

                <span className="font-semibold">
                  24
                </span>
              </div>

              <div className="flex justify-between">
                <span>Sessions Completed</span>

                <span className="font-semibold">
                  156
                </span>
              </div>

              <div className="flex justify-between">
                <span>Average Session Duration</span>

                <span className="font-semibold">
                  42 mins
                </span>
              </div>

              <div className="flex justify-between">
                <span>Satisfaction Score</span>

                <span className="font-semibold text-green-600">
                  4.8 / 5
                </span>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-emerald-600">
                  <Activity className="h-4 w-4" />

                  <span className="font-medium">
                    Excellent Performance
                  </span>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}