"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Phone, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CrisisPage() {
  const router = useRouter();

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

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 text-center">

          {/* Warning Icon */}
          <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-4" />

          {/* Heading */}
          <h1 className="text-4xl font-bold text-emerald-800 mb-4">
            Crisis Support Available 24/7
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            If you or someone you know is experiencing a mental health emergency,
            immediate help is available. Please seek support right away.
          </p>

          {/* Emergency Helpline Section */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mb-8">

            <h2 className="text-2xl font-semibold text-red-700 mb-3">
              National Emergency Helpline
            </h2>

            <p className="text-5xl font-bold text-red-600 mb-6">
              112
            </p>

            <Button
              asChild
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <a href="tel:112">
                <Phone className="mr-2 h-5 w-5" />
                Call 112 Now
              </a>
            </Button>

            <p className="text-sm text-gray-500 mt-4">
              Available 24 hours a day, 7 days a week.
            </p>

          </div>

          {/* Guidance Section */}
          <div className="text-left bg-emerald-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">
              What You Can Do Right Now
            </h3>

            <ul className="space-y-3 text-gray-700">
              <li>
                • Call <strong>112</strong> immediately if you or someone else is in immediate danger.
              </li>

              <li>
                • Reach out to a trusted family member, friend, teacher, or counselor.
              </li>

              <li>
                • Seek professional mental health support as soon as possible.
              </li>

              <li>
                • Stay with the person if they are at risk and it is safe to do so.
              </li>

              <li>
                • Remember that asking for help is a sign of strength, and support is available.
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}