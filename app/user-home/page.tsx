import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Heart,
  MessageCircle,
  UserCheck,
  BookOpen,
  Phone,
  Activity,
  Users,
} from "lucide-react"
import Link from "next/link"

export default function UserHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Your Mental Health Dashboard</h1>
          <p className="text-lg text-gray-600">Track your wellbeing with standardized screening tools</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/chat">
            <Button className="w-full h-20 flex flex-col items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700">
              <MessageCircle className="h-6 w-6" />
              <span className="text-sm font-medium">AI Chatbot</span>
            </Button>
          </Link>

          <Link href="/therapy-booking">
            <Button className="w-full h-20 flex flex-col items-center justify-center gap-2 bg-green-600 hover:bg-green-700">
              <UserCheck className="h-6 w-6" />
              <span className="text-sm font-medium">Book Therapy</span>
            </Button>
          </Link>

          

          <Link href="/crisis-support">
            <Button className="w-full h-20 flex flex-col items-center justify-center gap-2 bg-red-600 hover:bg-red-700">
              <Phone className="h-6 w-6" />
              <span className="text-sm font-medium">Crisis Support</span>
            </Button>
          </Link>
        </div>

        {/* Current Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                Overall Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-2">Good</div>
              <p className="text-sm text-gray-600">Based on your recent assessments</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Calendar className="h-5 w-5" />
                Last Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 mb-2">3 days ago</div>
              <p className="text-sm text-gray-600">Next recommended: In 4 days</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <TrendingUp className="h-5 w-5" />
                Progress Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600 mb-2">Improving</div>
              <p className="text-sm text-gray-600">15% better than last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">7</div>
              <p className="text-sm text-gray-600">Days Streak</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">85%</div>
              <p className="text-sm text-gray-600">Wellness Score</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">12</div>
              <p className="text-sm text-gray-600">Support Sessions</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">3/3</div>
              <p className="text-sm text-gray-600">Goals Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Screening Tools Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PHQ-9 Depression Screening */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>PHQ-9 Depression Scale</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Low Risk
                </Badge>
              </CardTitle>
              <p className="text-sm text-gray-600">Patient Health Questionnaire</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Score</span>
                  <span className="font-medium">4/27</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Risk Level:</span>
                  <span className="text-green-600 font-medium">Minimal</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Assessment:</span>
                  <span>March 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span>Trend:</span>
                  <span className="text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Stable
                  </span>
                </div>
              </div>

              <Link href="/screening/phq9">
                <Button variant="outline" className="w-full bg-transparent">
                  <Clock className="h-4 w-4 mr-2" />
                  Take PHQ-9 Assessment
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* GAD-7 Anxiety Screening */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>GAD-7 Anxiety Scale</span>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Mild
                </Badge>
              </CardTitle>
              <p className="text-sm text-gray-600">Generalized Anxiety Disorder Scale</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Score</span>
                  <span className="font-medium">7/21</span>
                </div>
                <Progress value={33} className="h-2" />
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Risk Level:</span>
                  <span className="text-yellow-600 font-medium">Mild Anxiety</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Assessment:</span>
                  <span>March 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span>Trend:</span>
                  <span className="text-blue-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Improving
                  </span>
                </div>
              </div>

              <Link href="/screening/gad7">
                <Button variant="outline" className="w-full bg-transparent">
                  <Clock className="h-4 w-4 mr-2" />
                  Take GAD-7 Assessment
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* GHQ General Health */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>GHQ-12 General Health</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Good
                </Badge>
              </CardTitle>
              <p className="text-sm text-gray-600">General Health Questionnaire</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Score</span>
                  <span className="font-medium">2/12</span>
                </div>
                <Progress value={17} className="h-2" />
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Risk Level:</span>
                  <span className="text-green-600 font-medium">Low Risk</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Assessment:</span>
                  <span>March 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span>Trend:</span>
                  <span className="text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Stable
                  </span>
                </div>
              </div>

              <Link href="/screening/ghq12">
                <Button variant="outline" className="w-full bg-transparent">
                  <Clock className="h-4 w-4 mr-2" />
                  Take GHQ-12 Assessment
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">Continue Daily Mindfulness</p>
                    <p className="text-sm text-blue-700">Your anxiety scores are improving with regular practice</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900">Maintain Sleep Schedule</p>
                    <p className="text-sm text-green-700">Good sleep hygiene is supporting your mental health</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-900">Consider Stress Management</p>
                    <p className="text-sm text-yellow-700">Mild anxiety detected - try breathing exercises</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Check-in Assessment
              </Button>

              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Heart className="h-4 w-4 mr-2" />
                Access Wellness Tools
              </Button>

              <Button className="w-full justify-start bg-transparent" variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Progress History
              </Button>

              <Button className="w-full justify-start bg-transparent" variant="outline">
                <AlertCircle className="h-4 w-4 mr-2" />
                Crisis Support Resources
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Assessment History Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Assessment History</CardTitle>
            <p className="text-sm text-gray-600">Track your mental health scores over time</p>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto" />
                <p className="text-gray-500">Assessment history chart would appear here</p>
                <p className="text-sm text-gray-400">Showing trends for PHQ-9, GAD-7, and GHQ-12 scores</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
