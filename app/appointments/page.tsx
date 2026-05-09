import { Navigation } from "@/components/navigation"
import { AppointmentBooking } from "@/components/appointment-booking"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-6 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-3">Book a Counseling Appointment</h1>
              <p className="text-muted-foreground text-balance max-w-2xl mx-auto">
                Schedule a confidential session with our licensed mental health professionals. All appointments are
                private and secure, with flexible scheduling options to fit your academic schedule.
              </p>
            </div>
          </div>
          <AppointmentBooking />
        </div>
      </main>
      <Footer />
    </div>
  )
}
