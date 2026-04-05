import { NextResponse } from "next/server"

const resources = [
  {
    id: 1,
    title: "Understanding Depression: A Guide for Students",
    category: "Mental Health",
    type: "Article",
    description: "Learn about the signs, symptoms, and ways to manage depression during college",
    url: "#",
    duration: "8 min read",
  },
  {
    id: 2,
    title: "Stress Management Techniques",
    category: "Stress",
    type: "Guide",
    description: "Practical techniques to reduce stress and anxiety in everyday life",
    url: "#",
    duration: "10 min read",
  },
  {
    id: 3,
    title: "Sleep Hygiene for Better Rest",
    category: "Sleep",
    type: "Article",
    description: "Tips and tricks to improve your sleep quality and establish healthy sleep habits",
    url: "#",
    duration: "6 min read",
  },
  {
    id: 4,
    title: "Building Healthy Relationships",
    category: "Relationships",
    type: "Guide",
    description: "How to maintain healthy boundaries and nurture meaningful connections",
    url: "#",
    duration: "12 min read",
  },
  {
    id: 5,
    title: "Nutrition and Mental Health",
    category: "Physical Health",
    type: "Article",
    description: "Explore the connection between diet and mental wellbeing",
    url: "#",
    duration: "7 min read",
  },
  {
    id: 6,
    title: "Exercise and Mental Wellness",
    category: "Physical Health",
    type: "Guide",
    description: "Simple exercises and physical activities that boost mental health",
    url: "#",
    duration: "9 min read",
  },
  {
    id: 7,
    title: "Mindfulness in Daily Life",
    category: "Mental Health",
    type: "Article",
    description: "Incorporate mindfulness practices into your daily routine",
    url: "#",
    duration: "11 min read",
  },
  {
    id: 8,
    title: "Time Management for Students",
    category: "Productivity",
    type: "Guide",
    description: "Organize your time effectively to reduce stress and improve productivity",
    url: "#",
    duration: "10 min read",
  },
  {
    id: 9,
    title: "Anxiety: When Worry Becomes Overwhelming",
    category: "Mental Health",
    type: "Article",
    description: "Understanding anxiety disorders and effective coping strategies",
    url: "#",
    duration: "9 min read",
  },
  {
    id: 10,
    title: "Self-Care: Making Time for Yourself",
    category: "Wellness",
    type: "Guide",
    description: "Learn to prioritize self-care in your busy student life",
    url: "#",
    duration: "8 min read",
  },
  {
    id: 11,
    title: "Dealing with Academic Pressure",
    category: "Stress",
    type: "Article",
    description: "Strategies to manage academic stress and maintain balance",
    url: "#",
    duration: "11 min read",
  },
  {
    id: 12,
    title: "Recognizing Burnout Signs",
    category: "Mental Health",
    type: "Guide",
    description: "Identify burnout symptoms and learn recovery strategies",
    url: "#",
    duration: "7 min read",
  },
]

export async function GET() {
  try {
    return NextResponse.json(resources)
  } catch (error) {
    console.error("Error fetching resources:", error)
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 })
  }
}
