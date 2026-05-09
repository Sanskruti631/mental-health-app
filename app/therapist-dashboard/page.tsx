import { Suspense } from "react"
import TherapistDashboardContent from "./therapist-dashboard-content"

export default function TherapistDashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TherapistDashboardContent />
    </Suspense>
  )
}
