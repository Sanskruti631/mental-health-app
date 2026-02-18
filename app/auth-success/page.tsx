"use client"

import { useSearchParams } from "next/navigation"
import AuthRedirect from "@/components/auth-redirect"

export default function AuthSuccessPage() {
  const searchParams = useSearchParams()
  const role = (searchParams.get("role") as "student" | "admin" | "counsellor") || "student"
  const profileComplete = searchParams.get("complete") === "true"

  return <AuthRedirect userRole={role} profileComplete={profileComplete} />
}
