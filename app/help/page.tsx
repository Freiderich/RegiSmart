import Link from "next/link"
import { ArrowLeft, MessageCircle, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-4">Help & Support</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Find answers to common questions or contact our support team.
        </p>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is the difference between Voice and Touch mode?</AccordionTrigger>
              <AccordionContent>
                Voice Mode allows you to interact with the system using voice commands and speech recognition, perfect
                for hands-free operation. Touch Mode provides a traditional web interface with forms and buttons that
                you can navigate at your own pace.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I authenticate my identity?</AccordionTrigger>
              <AccordionContent>
                We offer three authentication methods: School Email Login, Student Number with Facial Recognition, or a
                Combined Method using all three. Choose the method that works best for you during the login process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How long does it take to process document requests?</AccordionTrigger>
              <AccordionContent>
                Processing times vary by document type. Typically, certificates take 3-5 business days, while
                Transcripts of Records may take 5-7 business days. You'll receive email notifications when your
                documents are ready.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Is facial recognition data stored?</AccordionTrigger>
              <AccordionContent>
                No. Facial recognition is processed in real-time for authentication purposes only. We do not store any
                biometric data. Your privacy and security are our top priorities.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Can I track my document request?</AccordionTrigger>
              <AccordionContent>
                Yes! After submitting a request, you'll receive a reference number. You can use this to track your
                request status in real-time through the dashboard. You'll also receive email and SMS notifications at
                each stage.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Contact Support</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6 text-center">
              <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Phone</h3>
              <p className="text-sm text-muted-foreground">(045) 888-8888</p>
              <p className="text-xs text-muted-foreground mt-1">Mon-Fri, 8AM-5PM</p>
            </Card>
            <Card className="p-6 text-center">
              <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">registrar@hau.edu.ph</p>
              <p className="text-xs text-muted-foreground mt-1">24-48 hour response</p>
            </Card>
            <Card className="p-6 text-center">
              <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Available in-app</p>
              <p className="text-xs text-muted-foreground mt-1">Instant support</p>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
