"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ProfileCompletionModal from "@/components/profile-completion-modal"

export default function ProfileCompletionPage() {
  const router = useRouter()
  const [userRole] = useState<"student" | "admin" | "counsellor">("student") // This would come from auth context
  const [missingFields] = useState(["studentId", "department", "yearOfStudy"]) // This would come from API

  const handleComplete = () => {
    // Handle profile completion logic here
    // Redirect to appropriate dashboard based on role
    switch (userRole) {
      case "student":
       router.push("/quiz")

        break
      case "counsellor":
        router.push("/dashboard/counsellor")
        break
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
      <ProfileCompletionModal userRole={userRole} missingFields={missingFields} onComplete={handleComplete} />
    </div>
    
  )
}
