"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 p-4">
      <div className="max-w-5xl mx-auto">

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
            Contact Us
          </h1>

          <p className="text-gray-600 text-lg">
            Get in touch with our mental health support team
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Contact Form */}
          <Card className="shadow-lg border-emerald-100">
            <CardHeader>
              <CardTitle className="text-emerald-800">
                Send us a Message
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>

                <Input
                  id="name"
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>

                <Input
                  id="subject"
                  placeholder="How can we help?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>

                <Textarea
                  id="message"
                  placeholder="Tell us more about your inquiry..."
                  rows={5}
                />
              </div>

              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Send Message
              </Button>

            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">

            <Card className="shadow-lg border-emerald-100">
              <CardHeader>
                <CardTitle className="text-emerald-800">
                  Get in Touch
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">

                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-emerald-600" />

                  <div>
                    <p className="font-medium">Email</p>

                    <p className="text-sm text-muted-foreground">
                      supportsoulsup2025@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-emerald-600" />

                  <div>
                    <p className="font-medium">Phone</p>

                    <p className="text-sm text-muted-foreground">
                      +91 XXXXX XXXXX
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-emerald-600" />

                  <div>
                    <p className="font-medium">Location</p>

                    <p className="text-sm text-muted-foreground">
                      Higher Education Student Support Center
                      <br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-emerald-600" />

                  <div>
                    <p className="font-medium">Support Hours</p>

                    <p className="text-sm text-muted-foreground">
                      Monday – Friday: 9:00 AM – 6:00 PM
                      <br />
                      Emergency Support: 24/7
                    </p>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Crisis Support */}
            <Card className="bg-red-50 border-red-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-red-700">
                  Crisis Support
                </CardTitle>
              </CardHeader>

              <CardContent>

                <p className="text-sm mb-4 text-gray-700">
                  If you're experiencing a mental health emergency,
                  please contact:
                </p>

                <div className="space-y-3">

                  <div>
                    <p className="font-semibold text-red-700">
                      Emergency Services
                    </p>

                    <a
                      href="tel:112"
                      className="text-red-600 hover:underline"
                    >
                      112 (24×7 Emergency)
                    </a>
                  </div>

                  <div>
                    <p className="font-semibold text-red-700">
                      Mental Health Helpline
                    </p>

                    <p>1800-599-0019</p>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Available 24/7 for immediate support.
                  </p>

                </div>

              </CardContent>
            </Card>

          </div>

        </div>

      </div>
    </div>
  );
}