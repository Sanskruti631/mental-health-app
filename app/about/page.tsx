"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Heart,
  Shield,
  Users,
  BookOpen,
} from "lucide-react";

export default function AboutPage() {
  const router = useRouter();

  const values = [
    {
      icon: Heart,
      title: "Student Well-being",
      description:
        "Support students in maintaining positive mental health and emotional resilience.",
    },
    {
      icon: Shield,
      title: "Safe & Confidential",
      description:
        "Provide a secure and judgment-free environment for seeking support.",
    },
    {
      icon: Users,
      title: "Accessible Support",
      description:
        "Make mental health resources available to every student whenever needed.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-emerald-50 transition-colors"
          aria-label="Go Back"
        >
          <ArrowLeft className="h-6 w-6 text-emerald-700" />
        </button>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-6">
            Our Mission
          </h1>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            SoulSupport is dedicated to empowering higher education
            students through accessible mental health support,
            education, and guidance. We strive to create a safe
            environment where students can seek help, build resilience,
            and prioritize their well-being.
          </p>
        </div>

        {/* Core Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {values.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-emerald-100 p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <item.icon className="h-8 w-8 text-emerald-700" />
              </div>

              <h2 className="font-bold text-2xl text-emerald-800 mb-4">
                {item.title}
              </h2>

              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Why SoulSupport Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8">
          <div className="flex items-center mb-6">
            <BookOpen className="h-8 w-8 text-emerald-700 mr-3" />

            <h2 className="text-3xl font-bold text-emerald-800">
              Why SoulSupport?
            </h2>
          </div>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              • Mental health challenges among students are increasingly common,
              and early support can make a significant difference.
            </p>

            <p>
              • SoulSupport provides AI-powered assistance, counseling resources,
              self-help tools, and mental health assessments tailored for students.
            </p>

            <p>
              • We believe that seeking support should be simple, confidential,
              and accessible to everyone.
            </p>

            <p>
              • Our goal is to reduce stigma around mental health and encourage
              students to prioritize their emotional well-being.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}