import { Navigation } from "@/components/navigation"
import { AppointmentBooking } from "@/components/appointment-booking"
import { Footer } from "@/components/footer"

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-6 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-3">Book a Counseling Appointment</h1>
            <p className="text-muted-foreground text-balance max-w-2xl mx-auto">
              Schedule a confidential session with our licensed mental health professionals. All appointments are
              private and secure, with flexible scheduling options to fit your academic schedule.
            </p>
          </div>
          <AppointmentBooking />
        </div>
      </main>
      <Footer />
    </div>
  )
}
