"use client";

import Link from "next/link";
import { Heart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CrisisSupport() {
  return (
    <section className="bg-red-50 border border-red-200 rounded-2xl p-8 my-10">
      <div className="max-w-4xl mx-auto text-center">

        {/* Heading */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="h-12 w-12 text-red-600" />

          <h2 className="text-4xl font-bold text-red-700">
            Crisis Support Available 24/7
          </h2>
        </div>

        {/* Description */}
        <p className="text-xl text-red-600 mb-8">
          If you're experiencing a mental health emergency,
          immediate help is available.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">

          {/* Direct Call */}
          <Button
            asChild
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg"
          >
            <a href="tel:112">
              <Phone className="mr-2 h-5 w-5" />
              Crisis Helpline : 112 (24x7 Emergency)
            </a>
          </Button>

          {/* Emergency Resources */}
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-red-500 text-red-600 hover:bg-red-100 px-8 py-6 text-lg"
          >
            <Link href="/emergency">
              Emergency Resources
            </Link>
          </Button>

        </div>

      </div>
    </section>
  );
}