"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  BookOpen,
  Headphones,
  Video,
  FileText,
  Clock,
  Star,
  Play,
  Download,
  Globe,
  Heart,
  Brain,
  Zap,
  Shield,
} from "lucide-react"

interface Resource {
  id: string
  title: string
  description: string
  type: "article" | "audio" | "video" | "assessment" | "guide"
  category: "anxiety" | "depression" | "stress" | "sleep" | "mindfulness" | "relationships" | "academic" | "crisis"
  duration?: string
  rating: number
  language: string
  difficulty: "beginner" | "intermediate" | "advanced"
  tags: string[]
  thumbnail?: string
  url?: string
}

export function ResourceHub() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("all")

  const resources: Resource[] = [
    {
      id: "1",
      title: "Understanding Anxiety: A Student's Guide",
      description:
        "Comprehensive guide to recognizing anxiety symptoms, understanding triggers, and learning effective coping strategies specifically for college students.",
      type: "article",
      category: "anxiety",
      duration: "15 min read",
      rating: 4.8,
      language: "English",
      difficulty: "beginner",
      tags: ["anxiety", "coping", "college life", "symptoms"],
      thumbnail: "/anxiety-guide-thumbnail.jpg",
    },
    {
      id: "2",
      title: "Progressive Muscle Relaxation",
      description:
        "Guided audio session to help you release physical tension and achieve deep relaxation. Perfect for stress relief between classes.",
      type: "audio",
      category: "stress",
      duration: "20 min",
      rating: 4.9,
      language: "English",
      difficulty: "beginner",
      tags: ["relaxation", "stress relief", "guided meditation"],
      thumbnail: "/relaxation-audio-thumbnail.jpg",
    },
    {
      id: "3",
      title: "Mindful Breathing Techniques",
      description:
        "Learn various breathing exercises to manage anxiety, improve focus, and enhance overall well-being. Includes visual guides and practice sessions.",
      type: "video",
      category: "mindfulness",
      duration: "12 min",
      rating: 4.7,
      language: "English",
      difficulty: "beginner",
      tags: ["breathing", "mindfulness", "anxiety relief"],
      thumbnail: "/breathing-video-thumbnail.jpg",
    },
    {
      id: "4",
      title: "PHQ-9 Depression Screening",
      description:
        "Standardized self-assessment tool to evaluate depression symptoms. Results can help guide conversations with mental health professionals.",
      type: "assessment",
      category: "depression",
      duration: "5 min",
      rating: 4.6,
      language: "English",
      difficulty: "beginner",
      tags: ["depression", "screening", "self-assessment"],
    },
    {
      id: "5",
      title: "Sleep Hygiene for Students",
      description:
        "Evidence-based strategies to improve sleep quality, manage irregular schedules, and create healthy bedtime routines in dorm life.",
      type: "guide",
      category: "sleep",
      duration: "10 min read",
      rating: 4.8,
      language: "English",
      difficulty: "intermediate",
      tags: ["sleep", "health", "routine", "dorm life"],
      thumbnail: "/sleep-guide-thumbnail.jpg",
    },
    {
      id: "6",
      title: "Manejo del Estrés Académico",
      description:
        "Guía completa para manejar el estrés relacionado con los estudios, exámenes y presión académica. Incluye técnicas culturalmente apropiadas.",
      type: "article",
      category: "academic",
      duration: "18 min lectura",
      rating: 4.7,
      language: "Spanish",
      difficulty: "intermediate",
      tags: ["estrés", "académico", "exámenes", "técnicas"],
      thumbnail: "/stress-spanish-thumbnail.jpg",
    },
    {
      id: "7",
      title: "Building Healthy Relationships",
      description:
        "Navigate friendships, romantic relationships, and family dynamics while maintaining your mental health and personal boundaries.",
      type: "video",
      category: "relationships",
      duration: "25 min",
      rating: 4.5,
      language: "English",
      difficulty: "intermediate",
      tags: ["relationships", "boundaries", "communication"],
      thumbnail: "/relationships-video-thumbnail.jpg",
    },
    {
      id: "8",
      title: "Crisis Support Resources",
      description:
        "Immediate help resources, crisis hotlines, and emergency protocols. Know when and how to seek urgent mental health support.",
      type: "guide",
      category: "crisis",
      duration: "8 min read",
      rating: 4.9,
      language: "English",
      difficulty: "beginner",
      tags: ["crisis", "emergency", "hotlines", "support"],
      thumbnail: "/crisis-guide-thumbnail.jpg",
    },
  ]

  const categories = [
    { id: "all", name: "All Resources", icon: BookOpen },
    { id: "anxiety", name: "Anxiety", icon: Heart },
    { id: "depression", name: "Depression", icon: Brain },
    { id: "stress", name: "Stress", icon: Zap },
    { id: "sleep", name: "Sleep", icon: Clock },
    { id: "mindfulness", name: "Mindfulness", icon: Star },
    { id: "relationships", name: "Relationships", icon: Heart },
    { id: "academic", name: "Academic", icon: BookOpen },
    { id: "crisis", name: "Crisis Support", icon: Shield },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="h-4 w-4" />
      case "audio":
        return <Headphones className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "assessment":
        return <Brain className="h-4 w-4" />
      case "guide":
        return <BookOpen className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "article":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "audio":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "video":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "assessment":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "guide":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    const matchesLanguage = selectedLanguage === "all" || resource.language === selectedLanguage
    const matchesTab = activeTab === "all" || resource.type === activeTab

    return matchesSearch && matchesCategory && matchesLanguage && matchesTab
  })

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4 lg:space-y-0 lg:flex lg:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources, topics, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-base sm:text-sm" // Prevent zoom on iOS
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Español</SelectItem>
                  <SelectItem value="French">Français</SelectItem>
                  <SelectItem value="Mandarin">中文</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resource Type Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 min-w-max lg:min-w-0">
            <TabsTrigger value="all" className="text-xs sm:text-sm">
              All
            </TabsTrigger>
            <TabsTrigger value="article" className="text-xs sm:text-sm">
              Articles
            </TabsTrigger>
            <TabsTrigger value="video" className="text-xs sm:text-sm">
              Videos
            </TabsTrigger>
            <TabsTrigger value="audio" className="text-xs sm:text-sm">
              Audio
            </TabsTrigger>
            <TabsTrigger value="guide" className="text-xs sm:text-sm">
              Guides
            </TabsTrigger>
            <TabsTrigger value="assessment" className="text-xs sm:text-sm">
              Assessments
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="mt-4 sm:mt-6">
          {/* Results Count */}
          <div className="mb-4 sm:mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredResources.length} resource{filteredResources.length !== 1 ? "s" : ""}
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          {/* Resource Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                        {getTypeIcon(resource.type)}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Globe className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{resource.language}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs sm:text-sm font-medium">{resource.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-base sm:text-lg leading-tight">{resource.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{resource.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 sm:space-y-4">
                  {/* Resource Info */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs sm:text-sm">{resource.duration}</span>
                    </div>
                    <Badge variant="outline" className={`text-xs ${getDifficultyColor(resource.difficulty)}`}>
                      {resource.difficulty}
                    </Badge>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {resource.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{resource.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
                    <Button size="sm" className="flex-1 text-xs sm:text-sm">
                      {resource.type === "audio" && <Play className="h-3 w-3 mr-1" />}
                      {resource.type === "video" && <Play className="h-3 w-3 mr-1" />}
                      {resource.type === "assessment" && <Brain className="h-3 w-3 mr-1" />}
                      {(resource.type === "article" || resource.type === "guide") && (
                        <BookOpen className="h-3 w-3 mr-1" />
                      )}
                      {resource.type === "audio" || resource.type === "video" ? "Play" : "Read"}
                    </Button>
                    <Button size="sm" variant="outline" className="sm:w-auto bg-transparent">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No resources found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSelectedLanguage("all")
                  setActiveTab("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Featured Collections */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Featured Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-blue-600" />
                <span>Anxiety Toolkit</span>
              </CardTitle>
              <CardDescription>Complete guide to understanding and managing anxiety</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                8 resources including breathing exercises, coping strategies, and professional guidance.
              </p>
              <Button size="sm" className="w-full">
                Explore Collection
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-green-600" />
                <span>Mindfulness Essentials</span>
              </CardTitle>
              <CardDescription>Build a sustainable mindfulness practice</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                6 guided meditations, breathing exercises, and mindful living tips for students.
              </p>
              <Button size="sm" className="w-full">
                Start Practice
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                <span>Academic Success</span>
              </CardTitle>
              <CardDescription>Manage stress while achieving your goals</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Study strategies, time management, and stress reduction techniques for academic excellence.
              </p>
              <Button size="sm" className="w-full">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
