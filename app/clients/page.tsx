"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function ClientsPage() {
  const router = useRouter()
  const [clients, setClients] = useState([])

  useEffect(() => {
    fetch("/api/clients")
      .then(res => res.json())
      .then(data => setClients(data))
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100"
        >
          <ArrowLeft className="h-5 w-5 text-green-700" />
        </button>
        <h1 className="text-2xl font-bold">All Clients</h1>
      </div>

      {/* Clients List */}
      <div className="space-y-4">
        {clients.map((client: any) => (
          <div
            key={client.id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <h2 className="font-semibold">{client.name}</h2>
            <p className="text-sm text-gray-500">{client.email}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
