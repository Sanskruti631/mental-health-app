"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Send,
  Bot,
  User,
  AlertTriangle,
  Heart,
  Phone,
  MessageCircle,
  Activity,
  Clock,
  TrendingUp,
  Brain,
  Calendar,
} from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  severity?: "low" | "medium" | "high" | "crisis"
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI mental health support assistant. I'm here to listen, provide coping strategies, and help you navigate any challenges you're facing. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [showBookingPopup, setShowBookingPopup] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Crisis keywords for detection
  const crisisKeywords = [
    "suicide",
    "kill myself",
    "end it all",
    "hurt myself",
    "self harm",
    "want to die",
    "no point living",
    "better off dead",
  ]

  // Mental health responses database
  const responses = {
    greeting: [
      "I'm glad you reached out today. Sharing how you feel takes courage. What's on your mind?",
      "Thank you for being here. I'm listening and ready to support you. What would you like to talk about?",
      "It's good to see you. Taking care of your mental health is important. How can I help you today?",
    ],
    anxiety: [
      "Anxiety can feel overwhelming, but you're not alone. Try the 5-4-3-2-1 grounding technique: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste.",
      "When anxiety strikes, remember to breathe deeply. Inhale for 4 counts, hold for 4, exhale for 6. This activates your body's relaxation response.",
      "Anxiety is your mind trying to protect you, but sometimes it overreacts. What specific situation is making you feel anxious right now?",
    ],
    depression: [
      "Depression can make everything feel heavy and difficult. Your feelings are valid, and seeking help shows strength, not weakness.",
      "When depression clouds your thoughts, remember that this feeling is temporary. Small steps like getting sunlight, gentle movement, or connecting with others can help.",
      "Depression affects how you see yourself and the world. Have you been able to do any activities that usually bring you comfort or joy?",
    ],
    stress: [
      "Academic stress is very common among students. Let's break down what's causing you stress and find manageable ways to address it.",
      "Stress can feel overwhelming, but there are effective ways to manage it. Have you tried time-blocking your schedule or the Pomodoro technique?",
      "Chronic stress affects both your mind and body. Are you getting enough sleep, nutrition, and physical activity?",
    ],
    crisis: [
      "I'm very concerned about what you've shared. Your life has value and meaning. Please reach out to a crisis counselor immediately at 988 (Suicide & Crisis Lifeline) or text 'HELLO' to 741741.",
      "You're going through something incredibly difficult right now, but you don't have to face this alone. Please contact emergency services (911) or the National Suicide Prevention Lifeline at 988 immediately.",
      "What you're feeling right now is temporary, even though it doesn't feel that way. Please reach out for immediate help: Call 988, text 741741, or go to your nearest emergency room. Your life matters.",
    ],
    support: [
      "Remember that seeking help is a sign of strength. You deserve support and care.",
      "You're taking an important step by talking about your feelings. That takes real courage.",
      "Your mental health matters, and you matter. There are people who want to help you through this.",
    ],
  }

  const detectSeverity = (message: string): "low" | "medium" | "high" | "crisis" => {
    const lowerMessage = message.toLowerCase()

    // Crisis detection
    if (crisisKeywords.some((keyword) => lowerMessage.includes(keyword))) {
      return "crisis"
    }

    // High severity indicators
    const highSeverityWords = ["panic", "can't cope", "overwhelming", "hopeless", "desperate"]
    if (highSeverityWords.some((word) => lowerMessage.includes(word))) {
      return "high"
    }

    // Medium severity indicators
    const mediumSeverityWords = ["anxious", "depressed", "stressed", "worried", "sad", "angry"]
    if (mediumSeverityWords.some((word) => lowerMessage.includes(word))) {
      return "medium"
    }

    return "low"
  }

  const generateResponse = (userMessage: string, severity: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (severity === "crisis") {
      return responses.crisis[Math.floor(Math.random() * responses.crisis.length)]
    }

    if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety") || lowerMessage.includes("panic")) {
      return responses.anxiety[Math.floor(Math.random() * responses.anxiety.length)]
    }

    if (lowerMessage.includes("depressed") || lowerMessage.includes("depression") || lowerMessage.includes("sad")) {
      return responses.depression[Math.floor(Math.random() * responses.depression.length)]
    }

    if (lowerMessage.includes("stress") || lowerMessage.includes("overwhelmed") || lowerMessage.includes("pressure")) {
      return responses.stress[Math.floor(Math.random() * responses.stress.length)]
    }

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)]
    }

    return responses.support[Math.floor(Math.random() * responses.support.length)]
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    const severity = detectSeverity(inputValue)
    userMessage.severity = severity

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    if (severity === "high" || severity === "crisis") {
      setTimeout(() => setShowBookingPopup(true), 2000)
    }

    setTimeout(
      () => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: generateResponse(inputValue, severity),
          sender: "ai",
          timestamp: new Date(),
          severity,
        }

        setMessages((prev) => [...prev, aiResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 2000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case "crisis":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      default:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    }
  }

  const hasCrisisMessage = messages.some((msg) => msg.severity === "crisis")

  const chatStats = [
    {
      title: "Session Duration",
      value: "12 min",
      icon: Clock,
      color: "text-blue-600",
    },
    {
      title: "Messages Sent",
      value: messages.filter((m) => m.sender === "user").length.toString(),
      icon: MessageCircle,
      color: "text-green-600",
    },
    {
      title: "Support Level",
      value: hasCrisisMessage ? "Crisis" : "Active",
      icon: Activity,
      color: hasCrisisMessage ? "text-red-600" : "text-emerald-600",
    },
    {
      title: "Mood Trend",
      value: "Improving",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">AI Mental Health Dashboard</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Your personalized support session with real-time insights
          </p>
        </div>

        {hasCrisisMessage && (
          <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              <div className="font-semibold mb-2">Immediate Help Available</div>
              <div className="space-y-2 text-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>Crisis Helpline: 988 (24/7)</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>Text Crisis Line: Text HOME to 741741</span>
                  </div>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {chatStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="bg-emerald-100 rounded-lg p-2 sm:p-3">
                    <stat.icon className={`h-4 w-4 sm:h-6 sm:w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat" className="text-xs sm:text-sm">
              AI Chat Support
            </TabsTrigger>
            <TabsTrigger value="insights" className="text-xs sm:text-sm">
              Session Insights
            </TabsTrigger>
            <TabsTrigger value="resources" className="text-xs sm:text-sm">
              Quick Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-6">
            <Card className="h-[400px] sm:h-[600px] flex flex-col">
              <CardHeader className="border-b border-border px-4 py-3 sm:p-6 flex-shrink-0">
                <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                  <div className="bg-emerald-100 rounded-full p-2">
                    <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
                  </div>
                  <span className="truncate">AI Mental Health Support</span>
                  <Badge variant="secondary" className="ml-auto text-xs bg-green-100 text-green-800">
                    Online
                  </Badge>
                </CardTitle>
              </CardHeader>

              <div className="flex-1 flex flex-col min-h-0">
                <ScrollArea className="flex-1 p-3 sm:p-4" ref={scrollAreaRef}>
                  <div className="space-y-3 sm:space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-3 sm:p-4 ${
                            message.sender === "user"
                              ? "bg-emerald-600 text-white"
                              : "bg-white text-gray-900 border border-gray-200"
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {message.sender === "ai" && (
                              <Bot className="h-3 w-3 sm:h-4 sm:w-4 mt-1 flex-shrink-0 text-emerald-600" />
                            )}
                            {message.sender === "user" && <User className="h-3 w-3 sm:h-4 sm:w-4 mt-1 flex-shrink-0" />}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm leading-relaxed break-words">{message.content}</p>
                              <div className="flex items-center justify-between mt-2 gap-2">
                                <span className="text-xs opacity-70 flex-shrink-0">
                                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </span>
                                {message.severity && message.sender === "user" && (
                                  <Badge variant="outline" className={`text-xs ${getSeverityColor(message.severity)}`}>
                                    {message.severity}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white text-gray-900 border border-gray-200 rounded-lg p-3 sm:p-4 max-w-[85%] sm:max-w-[80%]">
                          <div className="flex items-center space-x-2">
                            <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" />
                              <div
                                className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              />
                              <div
                                className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="border-t border-gray-200 p-3 sm:p-4 bg-white flex-shrink-0">
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Share what's on your mind..."
                      className="flex-1 text-sm border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      size="sm"
                      className="px-3 sm:px-4 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    This AI provides support but is not a replacement for professional mental health care.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Session Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Emotional State</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Moderate Concern</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Engagement Level</span>
                      <Badge className="bg-green-100 text-green-800">High</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Support Needed</span>
                      <Badge className="bg-blue-100 text-blue-800">Active Listening</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-emerald-50">
                    <Brain className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="text-sm font-medium">Practice Mindfulness</p>
                      <p className="text-xs text-gray-600">Try 5-minute breathing exercises</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Schedule Follow-up</p>
                      <p className="text-xs text-gray-600">Book counselor appointment</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <Card className="p-4 text-center cursor-pointer hover:bg-emerald-50 transition-colors active:scale-95">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1 text-sm sm:text-base">Feeling Anxious?</h3>
                <p className="text-xs sm:text-sm text-gray-600">Get immediate coping strategies</p>
              </Card>

              <Card className="p-4 text-center cursor-pointer hover:bg-emerald-50 transition-colors active:scale-95">
                <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1 text-sm sm:text-base">Need to Talk?</h3>
                <p className="text-xs sm:text-sm text-gray-600">Connect with peer support</p>
              </Card>

              <Card className="p-4 text-center cursor-pointer hover:bg-emerald-50 transition-colors active:scale-95">
                <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1 text-sm sm:text-base">Crisis Support</h3>
                <p className="text-xs sm:text-sm text-gray-600">24/7 professional help</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={showBookingPopup} onOpenChange={setShowBookingPopup}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-emerald-600" />
                <span>Professional Support Recommended</span>
              </DialogTitle>
              <DialogDescription>
                Based on our conversation, it would be beneficial to speak with a professional counselor who can provide
                personalized support and guidance.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <h4 className="font-semibold text-emerald-800 mb-2">Why book counselling?</h4>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>• Get personalized coping strategies</li>
                  <li>• Professional assessment and support</li>
                  <li>• Confidential and safe environment</li>
                  <li>• Available appointments within 24-48 hours</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Counselling
                </Button>
                <Button variant="outline" onClick={() => setShowBookingPopup(false)} className="flex-1">
                  Maybe Later
                </Button>
              </div>
              <p className="text-xs text-gray-500 text-center">Emergency? Call 988 for immediate crisis support</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
