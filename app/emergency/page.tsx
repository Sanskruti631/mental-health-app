"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  Ambulance,
  Shield,
  Users,
  Heart,
  AlertTriangle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EmergencyPage() {
  const router = useRouter();

  const emergencyContacts = [
    {
      title: "National Emergency Helpline",
      number: "112",
      description: "24×7 emergency assistance for immediate help.",
      icon: Phone,
      color: "text-red-600",
    },
    {
      title: "Ambulance Service",
      number: "108",
      description: "Medical emergency and ambulance support.",
      icon: Ambulance,
      color: "text-blue-600",
    },
    {
      title: "Women Helpline",
      number: "181",
      description: "Support and emergency assistance for women.",
      icon: Shield,
      color: "text-pink-600",
    },
    {
      title: "Child Helpline",
      number: "1098",
      description: "24×7 emergency support for children in need.",
      icon: Users,
      color: "text-green-600",
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
        <div className="text-center mb-12">
          <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-4" />

          <h1 className="text-4xl font-bold text-emerald-800 mb-4">
            Emergency Resources
          </h1>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            If you or someone you know is experiencing a mental health
            crisis or any emergency, immediate support is available.
            Please use the resources below to get help.
          </p>
        </div>

        {/* Emergency Contacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {emergencyContacts.map((contact) => (
            <Card
              key={contact.number}
              className="hover:shadow-xl transition-all duration-300 border-emerald-100"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">

                  <div className="bg-emerald-50 rounded-full p-3">
                    <contact.icon
                      className={`h-8 w-8 ${contact.color}`}
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">
                      {contact.title}
                    </h2>

                    <p className="text-muted-foreground mb-4">
                      {contact.description}
                    </p>

                    <Button
                      asChild
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      <a href={`tel:${contact.number}`}>
                        Call {contact.number}
                      </a>
                    </Button>
                  </div>

                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Support */}
        <Card className="shadow-lg border-emerald-100">
          <CardContent className="p-8">

            <div className="flex items-center mb-6">
              <Heart className="h-8 w-8 text-emerald-600 mr-3" />

              <h2 className="text-2xl font-bold text-emerald-800">
                Additional Support Options
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground">
              <p>
                • Reach out to a trusted friend, family member,
                teacher, or guardian.
              </p>

              <p>
                • If you are a SoulSupport user, book an appointment
                with a counselor for professional guidance.
              </p>

              <p>
                • If you feel unsafe or are at immediate risk,
                contact emergency services immediately.
              </p>

              <p>
                • Remember that seeking help is a sign of strength,
                and support is always available.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Link href="/appointments">
                  Book Counselor Appointment
                </Link>
              </Button>

              <Button
                variant="outline"
                asChild
                className="border-emerald-600 text-emerald-700 hover:bg-emerald-50"
              >
                <Link href="/chat">
                  Talk to AI Support
                </Link>
              </Button>
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  );
}