"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, User, Mail, Phone, MapPin, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "Juan Dela Cruz",
    email: "2024123456@hau.edu.ph",
    phone: "+63 912 345 6789",
    address: "123 Main Street, Angeles City, Pampanga",
  })

  const handleSave = () => {
    setIsEditing(false)
    // Save logic here
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

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <Card className="p-8">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{formData.name}</h2>
              <p className="text-muted-foreground">Student Number: 2024-123456</p>
              <p className="text-sm text-muted-foreground">Bachelor of Science in Computer Science</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="pl-10"
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 mt-6 bg-muted/50">
          <h3 className="font-semibold text-foreground mb-3">Account Information</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Student Number</p>
              <p className="font-medium text-foreground">2024-123456</p>
            </div>
            <div>
              <p className="text-muted-foreground">Program</p>
              <p className="font-medium text-foreground">BS Computer Science</p>
            </div>
            <div>
              <p className="text-muted-foreground">Year Level</p>
              <p className="font-medium text-foreground">4th Year</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <p className="font-medium text-green-600">Active</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
