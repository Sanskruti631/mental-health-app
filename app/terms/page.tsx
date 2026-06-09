"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
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
            Terms of Service
          </h1>

          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-6">

          {/* Acceptance of Terms */}
          <Card className="shadow-lg border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-800">
                Acceptance of Terms
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using SoulSupport, you agree to comply
                with these Terms of Service and all applicable laws and
                regulations. If you do not agree with these terms,
                please discontinue the use of this platform.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card className="shadow-lg border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-800">
                Service Description
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="mb-4 text-gray-700">
                SoulSupport provides:
              </p>

              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Mental health assessments and self-screening tools</li>
                <li>Appointment booking with counselors</li>
                <li>AI-powered emotional support and guidance</li>
                <li>Self-help resources and educational content</li>
                <li>Crisis support and emergency resources</li>
              </ul>

              <p className="mt-4 text-gray-700">
                Our services are designed to support students and do
                not replace professional mental healthcare.
              </p>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card className="shadow-lg border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-800">
                User Responsibilities
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="mb-4 text-gray-700">
                As a user, you agree to:
              </p>

              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide accurate and truthful information.</li>
                <li>Maintain the confidentiality of your account credentials.</li>
                <li>Use SoulSupport responsibly and respectfully.</li>
                <li>Not misuse the platform or attempt unauthorized access.</li>
                <li>Comply with all applicable laws and regulations.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Medical Disclaimer */}
          <Card className="shadow-lg border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-700">
                Medical Disclaimer
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-gray-700">
                <strong>Important:</strong> SoulSupport provides
                educational information, assessments, and support tools.
                It does not offer medical advice, diagnosis, or treatment.
              </p>

              <p className="mt-4 text-gray-700">
                Always seek advice from qualified healthcare professionals
                regarding mental health concerns.
              </p>

              <p className="mt-4 font-medium text-red-700">
                In case of an emergency, call 112 immediately or contact
                local emergency services.
              </p>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card className="shadow-lg border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-800">
                Privacy and Confidentiality
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                We are committed to protecting your privacy and handling
                your information responsibly. Please review our Privacy
                Policy to understand how we collect, use, and safeguard
                your information.
              </p>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="shadow-lg border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-800">
                Limitation of Liability
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                SoulSupport shall not be liable for indirect or
                consequential damages resulting from the use or inability
                to use the platform. Users are encouraged to seek
                professional assistance when needed.
              </p>
            </CardContent>
          </Card>

          {/* Modifications */}
          <Card className="shadow-lg border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-800">
                Modifications to Terms
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to update these Terms of Service at
                any time. Continued use of SoulSupport after modifications
                indicates acceptance of the revised terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-lg border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-800">
                Contact Information
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="mb-4 text-gray-700">
                If you have questions regarding these Terms of Service,
                please contact us:
              </p>

              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Email:</strong> supportsoulsup2025@gmail.com
                </p>

                <p>
                  <strong>Emergency Helpline:</strong> 112
                </p>

                <p>
                  <strong>Platform:</strong> SoulSupport – Mental Health
                  Support System for Higher Education Students
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}