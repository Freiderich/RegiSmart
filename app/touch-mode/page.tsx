import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TouchModePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/voice-mode">Switch to Voice Mode</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Touch Mode</h1>
          <p className="text-lg text-muted-foreground mb-8">Please authenticate to access the registrar services</p>
          <Button size="lg" asChild>
            <Link href="/auth">Continue to Login</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
