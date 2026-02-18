import { ChatInterface } from "@/components/chat-interface"
import { Navigation } from "@/components/navigation"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <Navigation />

      {/* Main Chatbot Section */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto flex flex-col h-full">
          
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">
              🤖 AI Chatbot
            </h1>
            <p className="text-muted-foreground mt-2">
              Chat with our AI assistant for guidance, support, and answers.
            </p>
          </div>

          {/* Chat Interface */}
          <div className="flex-1 border rounded-xl shadow-sm bg-card p-4">
            <ChatInterface />
          </div>

        </div>
      </main>
    </div>
  )
}
