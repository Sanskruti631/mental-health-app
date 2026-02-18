import Link from "next/link"

export default function CommunityTopicPage({ params }: { params: { topic: string } }) {
  const topic = decodeURIComponent(params.topic)
  return (
    <main className="container mx-auto px-4 py-6">
      <nav className="text-sm mb-4 text-muted-foreground">
        <Link href="/community" className="hover:text-foreground transition-colors">
          Community
        </Link>{" "}
        / <span className="text-foreground">{topic}</span>
      </nav>

      <section className="max-w-3xl">
        <h1 className="text-2xl font-bold mb-2 text-pretty">{topic}</h1>
        <p className="text-muted-foreground mb-4">
          Join the discussion, share strategies, and learn from peers on {topic}.
        </p>

        {/* Example interactive prompt to start a thread */}
        <div className="rounded-lg border border-border p-4 bg-muted/40">
          <h2 className="font-semibold mb-2">Start a new thread</h2>
          <form
            action={(formData) => {
              // In a real app this would be a server action posting to an API.
              console.log("[v0] new thread:", formData.get("title"))
            }}
          >
            <input
              name="title"
              placeholder="What's on your mind?"
              className="w-full rounded-md border border-border bg-background px-3 py-2 mb-3"
              aria-label="New thread title"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm"
            >
              Post
            </button>
          </form>
        </div>

        <div className="mt-6 text-sm">
          Looking for professional help?{" "}
          <Link href="/appointments" className="underline underline-offset-4">
            Book counseling
          </Link>
        </div>
      </section>
    </main>
  )
}
