"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Search, CheckCircle2, Clock, Package, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function TrackPage() {
  const searchParams = useSearchParams()
  const refNumber = searchParams.get("ref")
  const isNew = searchParams.get("new")
  const [searchRef, setSearchRef] = useState("")

  const mockRequests = [
    {
      ref: "TOR-2024-001234",
      name: "Transcript of Records (Official)",
      status: "processing",
      date: "Jan 5, 2025",
      timeline: [
        { step: "Submitted", completed: true, date: "Jan 5, 2025 10:30 AM" },
        { step: "Payment Verified", completed: true, date: "Jan 5, 2025 11:00 AM" },
        { step: "Processing", completed: false, date: "In Progress" },
        { step: "Ready for Pickup", completed: false, date: "Pending" },
      ],
    },
    {
      ref: "COE-2024-001233",
      name: "Certificate of Enrollment",
      status: "ready",
      date: "Jan 3, 2025",
      timeline: [
        { step: "Submitted", completed: true, date: "Jan 3, 2025 2:15 PM" },
        { step: "Payment Verified", completed: true, date: "Jan 3, 2025 2:30 PM" },
        { step: "Processing", completed: true, date: "Jan 4, 2025 9:00 AM" },
        { step: "Ready for Download", completed: true, date: "Jan 5, 2025 3:00 PM" },
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "ready":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-500" />
      default:
        return <Package className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-500/10 text-yellow-700"
      case "ready":
        return "bg-green-500/10 text-green-700"
      case "shipped":
        return "bg-blue-500/10 text-blue-700"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Track Requests</h1>

        {isNew && refNumber && (
          <Card className="p-6 mb-8 bg-green-500/10 border-green-500/20">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Request Submitted Successfully!</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Your reference number is: <strong className="text-foreground">{refNumber}</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  You'll receive email and SMS notifications as your request progresses.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Search by Reference */}
        <Card className="p-6 mb-8">
          <h2 className="font-semibold text-foreground mb-4">Search by Reference Number</h2>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">
                Reference Number
              </Label>
              <Input
                id="search"
                placeholder="Enter reference number (e.g., TOR-2024-001234)"
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
              />
            </div>
            <Button>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </Card>

        {/* All Requests */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-foreground">All Requests</h2>
          {mockRequests.map((request) => (
            <Card key={request.ref} className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(request.status)}
                    <h3 className="font-bold text-foreground text-lg">{request.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Reference: {request.ref}</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{request.date}</p>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                {request.timeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          item.completed ? "bg-green-500" : "bg-muted"
                        }`}
                      >
                        {item.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                        )}
                      </div>
                      {index < request.timeline.length - 1 && (
                        <div className={`w-0.5 h-12 ${item.completed ? "bg-green-500" : "bg-muted"}`} />
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className={`font-medium ${item.completed ? "text-foreground" : "text-muted-foreground"}`}>
                        {item.step}
                      </p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
