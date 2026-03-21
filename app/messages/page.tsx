"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function MessagesPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200"
        >
          <ArrowLeft className="h-5 w-5 text-green-700" />
        </button>

        <h1 className="text-2xl font-bold">Messages</h1>
      </div>

      {/* Content */}
      <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
        <h2 className="text-lg font-semibold mb-2">No Messages Yet</h2>
        <p className="text-gray-500">
          Messaging feature will be implemented soon 🚀
        </p>
      </div>

    </div>
  )
}
