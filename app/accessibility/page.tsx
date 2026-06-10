"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle,
  Accessibility,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default function AccessibilityPage() {
  const router = useRouter();

  const features = [
    "Responsive design optimized for mobile, tablet, and desktop devices.",
    "Keyboard navigation support for users who cannot use a mouse.",
    "Compatibility with screen readers and assistive technologies.",
    "Clear, simple, and easy-to-understand language throughout the platform.",
    "Support for browser zoom and text resizing without loss of functionality.",
    "High-contrast visual elements to improve readability.",
    "Accessible form labels and descriptive error messages.",
    "Consistent navigation structure across all pages.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-emerald-50 transition-colors"
          aria-label="Go Back"
        >
          <ArrowLeft className="h-6 w-6 text-emerald-700" />
        </button>

        {/* Main Content */}
        <Card className="shadow-xl border-emerald-100">
          <CardContent className="p-8">

            {/* Header */}
            <div className="text-center mb-10">
              <div className="bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Accessibility className="h-10 w-10 text-emerald-700" />
              </div>

              <h1 className="text-4xl font-bold text-emerald-800 mb-4">
                Accessibility
              </h1>

              <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                SoulSupport is committed to ensuring that mental health
                support is accessible and inclusive for every student.
                We continuously work to improve usability and remove
                barriers that may prevent individuals from accessing
                our services.
              </p>
            </div>

            {/* Accessibility Features */}
            <div className="space-y-5">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors"
                >
                  <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />

                  <span className="text-gray-700 leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Commitment Section */}
            <div className="mt-10 bg-white border border-emerald-100 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-emerald-800 mb-4">
                Our Commitment
              </h2>

              <p className="text-gray-700 leading-relaxed">
                We strive to follow accessibility best practices and
                continuously improve our platform to ensure equal access
                to mental health resources. If you experience any
                accessibility issues or have suggestions for improvement,
                please contact us at:
              </p>

              <div className="mt-4 text-gray-700">
                <p>
                  <strong>Email:</strong> supportsoulsup2025@gmail.com
                </p>

                <p>
                  <strong>Platform:</strong> SoulSupport – Mental Health
                  Support System for Higher Education Students
                </p>
              </div>
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  );
}