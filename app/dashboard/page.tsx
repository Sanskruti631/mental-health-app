import { AuthGuard } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">Mental Health Analytics Dashboard</h1>
              <p className="text-muted-foreground text-balance max-w-3xl">
                Anonymous insights and trends to help institutional administrators understand student mental health
                needs and plan effective interventions. All data is aggregated and privacy-protected.
              </p>
            </div>
            <AdminDashboard />
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
