"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedCounter } from "./animated-counter"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as any,
    },
  },
}

export function StatsSection() {
  const stats = [
    {
      number: 75,
      suffix: "%",
      label: "of students report high stress levels",
      description:
        "Academic pressure and social challenges affect majority of students",
    },
    {
      number: 24,
      suffix: "/7",
      label: "availability of AI support",
      description:
        "Round-the-clock access to mental health guidance and resources",
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Making a Real Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our evidence-based approach is helping students across institutions
            build resilience and maintain better mental health.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="flex justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl items-stretch">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                className="h-full"
              >
                <Card className="h-full text-center border-border/50 hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                        <AnimatedCounter
                          end={stat.number}
                          suffix={stat.suffix}
                          duration={2.5}
                        />
                      </div>
                      <div className="text-lg font-semibold mb-2">
                        {stat.label}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {stat.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
