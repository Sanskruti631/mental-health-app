"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PrivacyPage() {
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

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-emerald-800 mb-3">
            Privacy Policy
          </h1>

          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-6">

          {/* Information Collection */}
          <Card className="shadow-lg border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-800">
                Information We Collect
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="mb-4 text-gray-700">
                We collect information you provide directly to us, such as:
              </p>

              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Personal information (name and email address)</li>
                <li>Mental health assessment responses and results</li>
                <li>Counseling appointment details</li>
                <li>Communication preferences</li>
                <li>Platform usage information to improve services</li>
              </ul>
            </CardContent>
          </Card>

          {/* Use of Information */}
          <Card className="shadow-lg border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-800">
                How We Use Your Information
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="mb-4 text-gray-700">
                We use the collected information to:
              </p>

              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide mental health support services</li>
                <li>Facilitate counseling appointments</li>
                <li>Deliver personalized resources and assessments</li>
                <li>Send important updates and notifications</li>
                <li>Enhance platform functionality and user experience</li>
              </ul>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card className="shadow-lg border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-800">
                Information Sharing and Disclosure
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="mb-4 text-gray-700">
                We may share information only in the following situations:
              </p>

              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>With your consent</li>
                <li>When required by applicable laws</li>
                <li>During emergency situations to prevent harm</li>
                <li>With authorized mental health professionals involved in your care</li>
              </ul>

              <p className="mt-4 text-gray-700">
                <strong>
                  We do not sell or share your personal information for marketing purposes.
                </strong>
              </p>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="shadow-lg border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-800">
                Data Security
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="mb-4 text-gray-700">
                We implement appropriate measures to safeguard your data:
              </p>

              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Secure authentication and access controls</li>
                <li>Encrypted data storage and transmission</li>
                <li>Regular security monitoring and updates</li>
                <li>Privacy awareness practices for administrators</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Rights */}
          <Card className="shadow-lg border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-800">
                Your Rights
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="mb-4 text-gray-700">
                You have the right to:
              </p>

              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Access your personal information</li>
                <li>Request corrections to inaccurate data</li>
                <li>Request deletion of your account information</li>
                <li>Withdraw consent for optional communications</li>
                <li>Raise concerns regarding privacy practices</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-lg border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-800">
                Contact Us
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="mb-4 text-gray-700">
                If you have questions regarding this Privacy Policy, contact us:
              </p>

              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Email:</strong> supportsoulsup2025@gmail.com
                </p>

                <p>
                  <strong>Emergency Helpline:</strong> 112
                </p>

                <p>
                  <strong>Platform:</strong> SoulSupport – Mental Health Support System for Higher Education Students
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}