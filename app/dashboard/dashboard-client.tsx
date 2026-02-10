'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FileText, Clock, Download, User, LogOut, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type CurrentUser = {
  studentNumber: string
  fullName: string
  email: string
} | null

export default function DashboardClient() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get user from sessionStorage
    const userString = sessionStorage.getItem('currentUser')
    if (userString) {
      const user = JSON.parse(userString)
      setCurrentUser(user)
    }
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser')
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">Please log in to access the dashboard</p>
          <Button asChild>
            <Link href="/auth">Go to Login</Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold">HAU</span>
              </div>
              <div>
                <h1 className="font-bold text-foreground">Holy Angel University</h1>
                <p className="text-xs text-muted-foreground">Registrar Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/profile">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, {currentUser.fullName}</h2>
          <p className="text-muted-foreground">Student Number: {currentUser.studentNumber}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Requests</p>
                <p className="text-3xl font-bold text-foreground">2</p>
              </div>
              <Clock className="w-10 h-10 text-primary" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Ready to Download</p>
                <p className="text-3xl font-bold text-foreground">1</p>
              </div>
              <Download className="w-10 h-10 text-green-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Requests</p>
                <p className="text-3xl font-bold text-foreground">5</p>
              </div>
              <FileText className="w-10 h-10 text-blue-500" />
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button asChild className="h-auto py-6 flex-col gap-2 bg-transparent" variant="outline">
              <Link href="/dashboard/request">
                <Plus className="w-6 h-6" />
                <span>Request New Document</span>
              </Link>
            </Button>
            <Button asChild className="h-auto py-6 flex-col gap-2 bg-transparent" variant="outline">
              <Link href="/dashboard/track">
                <Search className="w-6 h-6" />
                <span>Track Requests</span>
              </Link>
            </Button>
            <Button asChild className="h-auto py-6 flex-col gap-2 bg-transparent" variant="outline">
              <Link href="/dashboard/downloads">
                <Download className="w-6 h-6" />
                <span>Download Documents</span>
              </Link>
            </Button>
            <Button asChild className="h-auto py-6 flex-col gap-2 bg-transparent" variant="outline">
              <Link href="/dashboard/profile">
                <User className="w-6 h-6" />
                <span>Update Information</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Recent Requests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-foreground">Recent Requests</h3>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/track">View All</Link>
            </Button>
          </div>
          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-foreground">Transcript of Records (Official)</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Reference: TOR-2024-001234</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">Requested: Jan 5, 2025</span>
                    <span className="px-3 py-1 bg-yellow-500/10 text-yellow-700 rounded-full text-xs font-medium">
                      Processing
                    </span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Track
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-foreground">Certificate of Enrollment</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Reference: COE-2024-001233</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">Requested: Jan 3, 2025</span>
                    <span className="px-3 py-1 bg-green-500/10 text-green-700 rounded-full text-xs font-medium">
                      Ready
                    </span>
                  </div>
                </div>
                <Button size="sm">Download</Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-foreground">Certificate of Good Moral Character</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Reference: GMC-2024-001232</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">Requested: Dec 28, 2024</span>
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-700 rounded-full text-xs font-medium">
                      Submitted
                    </span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Track
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
