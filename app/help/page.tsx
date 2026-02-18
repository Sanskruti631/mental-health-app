import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MessageCircle, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Help Center</h1>
          <p className="text-muted-foreground">Find answers to common questions and get support</p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search for help topics..." className="pl-10" />
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-4">Chat with our support team</p>
              <Button size="sm">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Call Support</h3>
              <p className="text-sm text-muted-foreground mb-4">Speak with a counselor</p>
              <Button size="sm" variant="outline">
                Call Now
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground mb-4">Send us your questions</p>
              <Button size="sm" variant="outline" asChild>
                <Link href="/contact">Contact</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I access my mental health screening results?</AccordionTrigger>
                <AccordionContent>
                  After completing your screening assessments (PHQ-9, GAD-7, or GHQ-12), your results will be available
                  on your dashboard. You can view your current scores, track progress over time, and receive
                  personalized recommendations based on your results.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How do I schedule a therapy session?</AccordionTrigger>
                <AccordionContent>
                  You can schedule therapy sessions through your dashboard by clicking "Book Therapy Session." Choose
                  from available counselors, select your preferred time slot, and receive confirmation via email. You
                  can also reschedule or cancel appointments as needed.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Is my information confidential?</AccordionTrigger>
                <AccordionContent>
                  Yes, all your mental health information is strictly confidential and protected by HIPAA regulations.
                  Only authorized healthcare professionals involved in your care can access your records. We use
                  industry-standard encryption to protect your data.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How often should I take the screening assessments?</AccordionTrigger>
                <AccordionContent>
                  We recommend taking the screening assessments monthly to track your mental health progress. However,
                  you can take them more frequently if you're experiencing changes in your mood or mental state. Your
                  counselor may also recommend specific intervals based on your individual needs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>What should I do in a mental health emergency?</AccordionTrigger>
                <AccordionContent>
                  If you're experiencing a mental health emergency or having thoughts of self-harm, please contact
                  emergency services immediately (911) or call the National Suicide Prevention Lifeline at 988. Our
                  platform also has a crisis support button available 24/7 on your dashboard.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>How do I update my profile information?</AccordionTrigger>
                <AccordionContent>
                  You can update your profile information by going to your dashboard and clicking on your profile
                  settings. Make sure to keep your contact information current so we can reach you with important
                  updates about your care.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
