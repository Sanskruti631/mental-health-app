"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { WellnessSidebar } from "@/components/wellness-sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ExternalLink, Loader, Search } from "lucide-react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"

interface Resource {
  id: number
  title: string
  category: string
  type: string
  description: string
  url: string
  duration: string
}

export default function ResourcesPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch("/api/wellness/resources")
        if (res.ok) {
          const data = await res.json()
          setResources(data)
        }
      } catch (error) {
        console.error("Error fetching resources:", error)
      } finally {
        setLoading(false)
      }
    }
    
    if (isAuthenticated) {
      fetchResources()
    }
  }, [isAuthenticated])

  const categories = ["All", ...new Set(resources.map((r) => r.category))]
  const filteredResources = resources.filter((resource) => {
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory
    const matchesSearch = searchQuery === "" || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (isLoading || !user) {
    return <div className="p-6 text-foreground">Loading...</div>
  }

  return (
    <div className="min-h-screen flex bg-emerald-50 dark:bg-emerald-950/10">
      <WellnessSidebar />
      <div className="flex-1 max-w-6xl mx-auto px-4 py-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-primary rounded-lg p-3">
              <BookOpen className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Learning Resources</h1>
              <p className="text-muted-foreground mt-1">Helpful articles and guides for your mental health journey</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all"
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Resources Grid */}
          {loading ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Loader className="h-8 w-8 animate-spin mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Loading resources...</p>
              </CardContent>
            </Card>
          ) : filteredResources.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-border">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary">{resource.type}</Badge>
                        <Badge variant="outline">{resource.duration}</Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                      <CardDescription className="text-sm">{resource.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-foreground line-clamp-3">{resource.description}</p>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          className="w-full" 
                          variant="default"
                          onClick={() => {
                            // For now, show an alert. In a real app, this would navigate to the resource
                            alert(`Opening: ${resource.title}\n\nThis would navigate to the full article/guide in a real implementation.`)
                          }}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Read More
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No resources found in this category</p>
              </CardContent>
            </Card>
          )}
      </div>
    </div>
  )
}
