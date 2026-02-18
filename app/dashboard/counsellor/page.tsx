import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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

export default function CounsellorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary rounded-lg p-2">
                <Stethoscope className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dr. Emily Johnson</h1>
                <p className="text-muted-foreground">Clinical Psychologist • License #PSY12345</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500">Available</Badge>
              <Button variant="outline" size="sm">
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
                  <p className="text-3xl font-bold">47</p>
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
                  <p className="text-3xl font-bold">6</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <CheckCircle className="h-3 w-3 mr-1" />2 completed
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
                  <p className="text-3xl font-bold">2</p>
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
                  <div className="p-4 bg-red-50 dark:bg-red-950/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Sarah M. (Student ID: CS2021-0847)</p>
                        <p className="text-sm text-muted-foreground">Computer Science • 3rd Year</p>
                        <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                          PHQ-9: 19 (Severe Depression) • Last session: 3 days ago
                        </p>
                      </div>
                      <div className="space-x-2">
                        <Button size="sm" variant="destructive">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline">
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 dark:bg-orange-950/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Michael R. (Student ID: ENG2020-0234)</p>
                        <p className="text-sm text-muted-foreground">Engineering • 4th Year</p>
                        <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                          GAD-7: 16 (Severe Anxiety) • Last session: 1 week ago
                        </p>
                      </div>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
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
                  <div className="flex items-center space-x-4 p-3 bg-green-50 dark:bg-green-950/50 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm font-medium">10:00</p>
                      <p className="text-xs text-muted-foreground">AM</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Jessica L.</p>
                      <p className="text-sm text-muted-foreground">Individual Therapy • Anxiety Management</p>
                    </div>
                    <Badge className="bg-green-500">Completed</Badge>
                  </div>

                  <div className="flex items-center space-x-4 p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm font-medium">2:00</p>
                      <p className="text-xs text-muted-foreground">PM</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">David K.</p>
                      <p className="text-sm text-muted-foreground">Follow-up Session • Depression Treatment</p>
                    </div>
                    <Badge variant="outline">Upcoming</Badge>
                  </div>

                  <div className="flex items-center space-x-4 p-3 bg-purple-50 dark:bg-purple-950/50 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm font-medium">4:00</p>
                      <p className="text-xs text-muted-foreground">PM</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Emma S.</p>
                      <p className="text-sm text-muted-foreground">Initial Assessment • Academic Stress</p>
                    </div>
                    <Badge variant="secondary">New Client</Badge>
                  </div>
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
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Alex T. - Session #8</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Continued CBT for social anxiety. Client reported improvement in social situations. Homework:
                      Practice exposure exercises in low-stakes social settings.
                    </p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Maria G. - Session #3</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Discussed coping strategies for academic pressure. Introduced mindfulness techniques. Client
                      expressed willingness to try meditation apps.
                    </p>
                  </div>
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
                <Button className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Add Session Notes
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  View All Clients
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
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
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sessions Completed</span>
                    <Badge variant="outline">24</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New Clients</span>
                    <Badge variant="outline">3</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Follow-ups Scheduled</span>
                    <Badge variant="outline">18</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Notes Written</span>
                    <Badge variant="outline">24</Badge>
                  </div>
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
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Status</span>
                    <Badge className="bg-green-500">Available</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Next Available</span>
                    <span className="text-sm text-muted-foreground">Tomorrow 9:00 AM</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Clock className="h-4 w-4 mr-2" />
                    Update Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
