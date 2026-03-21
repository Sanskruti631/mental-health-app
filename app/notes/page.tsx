"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function NotesPage() {
  const router = useRouter()

  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)

    await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({
        appointment_id: "demo-id", // replace later with real
        therapist_id: "demo-id",
        session_notes: note,
      }),
    })

    setLoading(false)
    alert("Note saved successfully ✅")
    setNote("")
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100"
        >
          <ArrowLeft className="h-5 w-5 text-green-700" />
        </button>
        <h1 className="text-2xl font-bold">Add Session Notes</h1>
      </div>

      {/* Form */}
      <textarea
        className="w-full border p-3 rounded-lg h-40"
        placeholder="Write session notes..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button
        onClick={handleSave}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg"
      >
        {loading ? "Saving..." : "Save Notes"}
      </button>

    </div>
  )
}
