"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Clock, User, Shield, CheckCircle, Phone, Video, MapPin } from "lucide-react"

interface Counselor {
  id: string
  name: string
  title: string
  specialties: string[]
  availability: string[]
  image: string
  rating: number
  experience: string
}

interface TimeSlot {
  time: string
  available: boolean
}

export function AppointmentBooking() {
  const [step, setStep] = useState(1)
  const [selectedCounselor, setSelectedCounselor] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [appointmentType, setAppointmentType] = useState<string>("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    studentId: "",
    concerns: "",
    urgency: "",
    previousCounseling: "",
  })

  const counselors: Counselor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      title: "Licensed Clinical Psychologist",
      specialties: ["Anxiety", "Depression", "Academic Stress", "Trauma"],
      availability: ["Monday", "Tuesday", "Wednesday", "Friday"],
      image: "/professional-woman-counselor.png",
      rating: 4.9,
      experience: "12 years",
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      title: "Licensed Professional Counselor",
      specialties: ["ADHD", "Social Anxiety", "Relationship Issues", "Career Counseling"],
      availability: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      image: "/professional-man-counselor.png",
      rating: 4.8,
      experience: "8 years",
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      title: "Licensed Marriage & Family Therapist",
      specialties: ["Family Issues", "Cultural Identity", "Eating Disorders", "Self-Esteem"],
      availability: ["Monday", "Wednesday", "Thursday", "Saturday"],
      image: "/professional-latina-counselor.jpg",
      rating: 4.9,
      experience: "10 years",
    },
  ]

  const timeSlots: TimeSlot[] = [
    { time: "9:00 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: false },
    { time: "1:00 PM", available: true },
    { time: "2:00 PM", available: true },
    { time: "3:00 PM", available: true },
    { time: "4:00 PM", available: false },
    { time: "5:00 PM", available: true },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    setStep(5)
  }

  const getNextAvailableDate = () => {
    const today = new Date()
    const dates = []
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date.toISOString().split("T")[0])
    }
    return dates
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
  }

  if (step === 5) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="bg-green-100 dark:bg-green-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Appointment Confirmed!</h2>
          <p className="text-muted-foreground mb-6">
            Your appointment has been successfully scheduled. You will receive a confirmation email with all the details
            and instructions for your session.
          </p>
          <div className="bg-muted rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Appointment Details:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{counselors.find((c) => c.id === selectedCounselor)?.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(selectedDate)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{selectedTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                {appointmentType === "video" && <Video className="h-4 w-4" />}
                {appointmentType === "phone" && <Phone className="h-4 w-4" />}
                {appointmentType === "in-person" && <MapPin className="h-4 w-4" />}
                <span className="capitalize">{appointmentType} Session</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => setStep(1)}>Book Another Appointment</Button>
            <Button variant="outline">View My Appointments</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-2 sm:space-x-4 overflow-x-auto pb-2">
        {[1, 2, 3, 4].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center flex-shrink-0">
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                step >= stepNumber ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {stepNumber}
            </div>
            {stepNumber < 4 && <div className={`w-8 sm:w-12 h-0.5 ${step > stepNumber ? "bg-primary" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Select Counselor */}
      {step === 1 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Choose Your Counselor</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {counselors.map((counselor) => (
              <Card
                key={counselor.id}
                className={`cursor-pointer transition-all hover:shadow-lg active:scale-95 ${
                  selectedCounselor === counselor.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedCounselor(counselor.id)}
              >
                <CardHeader className="text-center pb-3 sm:pb-4">
                  <img
                    src={counselor.image || "/placeholder.svg"}
                    alt={counselor.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 sm:mb-4 object-cover"
                  />
                  <CardTitle className="text-base sm:text-lg">{counselor.name}</CardTitle>
                  <CardDescription className="text-sm">{counselor.title}</CardDescription>
                  <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                    <span>⭐ {counselor.rating}</span>
                    <span>•</span>
                    <span>{counselor.experience}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-xs sm:text-sm mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-1">
                        {counselor.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-xs sm:text-sm mb-2">Available:</h4>
                      <p className="text-xs text-muted-foreground">{counselor.availability.join(", ")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-6 sm:mt-8">
            <Button onClick={() => setStep(2)} disabled={!selectedCounselor} className="w-full sm:w-auto">
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Select Date & Time */}
      {step === 2 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Select Date & Time</h2>
          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Choose Date</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                  {getNextAvailableDate()
                    .slice(0, 10)
                    .map((date) => (
                      <Button
                        key={date}
                        variant={selectedDate === date ? "default" : "outline"}
                        className="h-auto p-2 sm:p-3 text-left bg-transparent"
                        onClick={() => setSelectedDate(date)}
                      >
                        <div className="w-full">
                          <div className="font-medium text-xs sm:text-sm">
                            {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
                          </div>
                        </div>
                      </Button>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Choose Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      className="bg-transparent text-sm"
                      onClick={() => setSelectedTime(slot.time)}
                      disabled={!slot.available}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Session Type */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Session Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <Button
                  variant={appointmentType === "video" ? "default" : "outline"}
                  className="h-auto p-3 sm:p-4 bg-transparent"
                  onClick={() => setAppointmentType("video")}
                >
                  <div className="text-center">
                    <Video className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2" />
                    <div className="font-medium text-sm">Video Call</div>
                    <div className="text-xs text-muted-foreground">Secure video session</div>
                  </div>
                </Button>
                <Button
                  variant={appointmentType === "phone" ? "default" : "outline"}
                  className="h-auto p-3 sm:p-4 bg-transparent"
                  onClick={() => setAppointmentType("phone")}
                >
                  <div className="text-center">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2" />
                    <div className="font-medium text-sm">Phone Call</div>
                    <div className="text-xs text-muted-foreground">Audio-only session</div>
                  </div>
                </Button>
                <Button
                  variant={appointmentType === "in-person" ? "default" : "outline"}
                  className="h-auto p-3 sm:p-4 bg-transparent sm:col-span-1 col-span-1"
                  onClick={() => setAppointmentType("in-person")}
                >
                  <div className="text-center">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2" />
                    <div className="font-medium text-sm">In-Person</div>
                    <div className="text-xs text-muted-foreground">Campus office visit</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
            <Button variant="outline" onClick={() => setStep(1)} className="w-full sm:w-auto">
              Back
            </Button>
            <Button
              onClick={() => setStep(3)}
              disabled={!selectedDate || !selectedTime || !appointmentType}
              className="w-full sm:w-auto"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Personal Information */}
      {step === 3 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Your Information</h2>
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6" />
                <span>Confidential Information</span>
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                All information is kept strictly confidential and secure. This helps us provide you with the best
                possible care.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@university.edu"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="studentId">Student ID *</Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  onChange={(e) => handleInputChange("studentId", e.target.value)}
                  placeholder="Enter your student ID"
                />
              </div>

              <div>
                <Label htmlFor="urgency">How urgent is your need for support?</Label>
                <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - General support and guidance</SelectItem>
                    <SelectItem value="medium">Medium - Noticeable impact on daily life</SelectItem>
                    <SelectItem value="high">High - Significant distress or impairment</SelectItem>
                    <SelectItem value="crisis">Crisis - Immediate help needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="previousCounseling">Have you received counseling before?</Label>
                <Select
                  value={formData.previousCounseling}
                  onValueChange={(value) => handleInputChange("previousCounseling", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No, this is my first time</SelectItem>
                    <SelectItem value="yes-helpful">Yes, and it was helpful</SelectItem>
                    <SelectItem value="yes-mixed">Yes, with mixed results</SelectItem>
                    <SelectItem value="yes-unhelpful">Yes, but it wasn't helpful</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="concerns">What would you like to discuss? (Optional)</Label>
                <Textarea
                  id="concerns"
                  value={formData.concerns}
                  onChange={(e) => handleInputChange("concerns", e.target.value)}
                  placeholder="Briefly describe what you'd like to work on or discuss..."
                  rows={4}
                />
              </div>

              {formData.urgency === "crisis" && (
                <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
                  <AlertDescription className="text-red-800 dark:text-red-200">
                    <div className="font-semibold mb-2">Crisis Support Available Now</div>
                    <p className="text-sm mb-2">
                      If you're in immediate danger or having thoughts of self-harm, please contact:
                    </p>
                    <div className="text-sm space-y-1">
                      <div>• Emergency Services: 911</div>
                      <div>• Crisis Text Line: Text HOME to 741741</div>
                      <div>• National Suicide Prevention Lifeline: 988</div>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
            <Button variant="outline" onClick={() => setStep(2)} className="w-full sm:w-auto">
              Back
            </Button>
            <Button
              onClick={() => setStep(4)}
              disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.studentId}
              className="w-full sm:w-auto"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Review & Confirm */}
      {step === 4 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Review Your Appointment</h2>
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Appointment Summary</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Please review your appointment details before confirming.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h3 className="font-semibold mb-3">Counselor</h3>
                  <div className="flex items-center space-x-3">
                    <img
                      src={counselors.find((c) => c.id === selectedCounselor)?.image || "/placeholder.svg"}
                      alt="Counselor"
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-sm sm:text-base">
                        {counselors.find((c) => c.id === selectedCounselor)?.name}
                      </div>
                      <div className="text-sm sm:text-base text-muted-foreground">
                        {counselors.find((c) => c.id === selectedCounselor)?.title}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Date & Time</h3>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="text-sm sm:text-base">{formatDate(selectedDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="text-sm sm:text-base">{selectedTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Session Details</h3>
                <div className="flex items-center space-x-2">
                  {appointmentType === "video" && <Video className="h-4 w-4 sm:h-5 sm:w-5" />}
                  {appointmentType === "phone" && <Phone className="h-4 w-4 sm:h-5 sm:w-5" />}
                  {appointmentType === "in-person" && <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />}
                  <span className="capitalize text-sm sm:text-base">{appointmentType} Session</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Contact Information</h3>
                <div className="space-y-1 text-sm sm:text-base">
                  <div>
                    {formData.firstName} {formData.lastName}
                  </div>
                  <div>{formData.email}</div>
                  {formData.phone && <div>{formData.phone}</div>}
                  <div>Student ID: {formData.studentId}</div>
                </div>
              </div>

              {formData.concerns && (
                <div>
                  <h3 className="font-semibold mb-3">Discussion Topics</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{formData.concerns}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
            <Button variant="outline" onClick={() => setStep(3)} className="w-full sm:w-auto">
              Back
            </Button>
            <Button onClick={handleSubmit} className="w-full sm:w-auto">
              Confirm Appointment
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
