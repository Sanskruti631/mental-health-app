"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function FAQPage() {
  const router = useRouter();

  const faqs = [
    {
      question: "What is SoulSupport?",
      answer:
        "SoulSupport is a mental health support platform designed specifically for higher education students. It provides AI-powered support, counseling appointment booking, self-help resources, and mental health assessments.",
    },
    {
      question: "Is SoulSupport a replacement for professional therapy?",
      answer:
        "No. SoulSupport is intended to provide support and guidance but does not replace professional mental health treatment or therapy.",
    },
    {
      question: "How can I book a counseling session?",
      answer:
        "You can book a counseling session by navigating to the 'Book Appointment' section and selecting an available counselor and time slot.",
    },
    {
      question: "Are my conversations with the AI chatbot private?",
      answer:
        "Yes. We prioritize user privacy and confidentiality. Your information is handled securely according to our Privacy Policy.",
    },
    {
      question: "What should I do during a mental health crisis?",
      answer:
        "If you are experiencing a mental health emergency or are in immediate danger, call the National Emergency Helpline (112) immediately or seek professional help.",
    },
    {
      question: "Who can use SoulSupport?",
      answer:
        "SoulSupport is designed primarily for higher education students seeking mental health support and resources.",
    },
    {
      question: "Are the self-help resources free to access?",
      answer:
        "Yes. Self-help resources and educational materials available on SoulSupport are free for users.",
    },
    {
      question: "Can I access SoulSupport on mobile devices?",
      answer:
        "Yes. SoulSupport is designed to work seamlessly across desktops, tablets, and mobile devices.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can reach our support team through the Contact Us page or email us at supportsoulsup2025@gmail.com.",
    },
    {
      question: "How can I delete my account?",
      answer:
        "You can request account deletion through your account settings or by contacting our support team.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{
          backgroundImage: "url('/image.png')",
          filter: "blur(5px)",
          transform: "scale(1.03)",
        }}
        aria-hidden="true"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 -z-10" />

      <div className="max-w-4xl w-full relative z-10">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-colors"
          aria-label="Go Back"
        >
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>

        {/* Main FAQ Card */}
        <Card className="backdrop-blur-md bg-white/95 shadow-2xl border border-white/20">

          <CardContent className="p-8">

            {/* Header */}
            <div className="text-center mb-10">

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h1>

              <p className="text-muted-foreground text-lg">
                Find answers to common questions about SoulSupport.
              </p>

            </div>

            {/* FAQ List */}
            <div className="space-y-4">

              {faqs.map((faq, index) => (
                <Card
                  key={index}
                  className="overflow-hidden shadow-sm"
                >
                  <button
                    className="w-full text-left p-6 flex justify-between items-center hover:bg-muted/50 transition-colors"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h2 className="font-semibold text-lg pr-4">
                      {faq.question}
                    </h2>

                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 flex-shrink-0 text-primary" />
                    ) : (
                      <ChevronDown className="h-5 w-5 flex-shrink-0 text-primary" />
                    )}
                  </button>

                  {openIndex === index && (
                    <CardContent className="px-6 pb-6 pt-0">

                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>

                    </CardContent>
                  )}

                </Card>
              ))}

            </div>

          </CardContent>

        </Card>

      </div>

    </div>
  );
}