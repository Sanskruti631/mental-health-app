import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Calendar, BookOpen, Users, BarChart3, Brain, Heart, Headphones } from "lucide-react"
import Link from "next/link"

export function FeaturesSection() {
  
  const features: Array<{
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    href: string;
  }> = [
    // Add your custom features here
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4 leading-relaxed">{feature.description}</CardDescription>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                >
                  <Link href={feature.href}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Support Banner */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200 dark:from-red-950/20 dark:to-orange-950/20 dark:border-red-800">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-red-600 mr-2" />
                <h3 className="text-2xl font-bold text-red-800 dark:text-red-200">Crisis Support Available 24/7</h3>
              </div>
              <p className="text-red-700 dark:text-red-300 mb-6 text-lg">
                If you're experiencing a mental health emergency, immediate help is available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  <Headphones className="h-5 w-5 mr-2" />
                  Crisis Helpline : 18008914413
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                >
                  Emergency Resources
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
