"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      // In a real app, check for valid session/token
      const hasSession = typeof window !== "undefined" && sessionStorage.getItem("authenticated")

      if (!hasSession) {
        router.push("/auth")
      } else {
        setIsAuthenticated(true)
      }
    }

    checkAuth()
  }, [router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
