import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                By accessing and using SoulSupport's digital mental health platform, you agree to be bound by these Terms
                of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are
                prohibited from using this service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Description</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>SoulSupport provides:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Mental health screening and assessment tools</li>
                <li>Connection to licensed mental health professionals</li>
                <li>Progress tracking and wellness resources</li>
                <li>Crisis support and emergency resources</li>
              </ul>
              <p className="mt-4">
                Our services are designed to supplement, not replace, professional mental health care.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>As a user, you agree to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Use the service only for its intended purposes</li>
                <li>Respect the privacy and rights of other users</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medical Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                <strong>Important:</strong> This platform provides educational information and screening tools but does
                not provide medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare
                providers with questions about your mental health.
              </p>
              <p className="mt-4">
                In case of a mental health emergency, contact emergency services (911) or the National Suicide
                Prevention Lifeline (988) immediately.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy and Confidentiality</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                We are committed to protecting your privacy and maintaining the confidentiality of your mental health
                information in accordance with HIPAA regulations and applicable privacy laws. Please review our Privacy
                Policy for detailed information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                SoulSupport and its affiliates shall not be liable for any indirect, incidental, special, consequential, or
                punitive damages resulting from your use of the service. Our total liability shall not exceed the amount
                paid by you for the service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modifications to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                posting. Your continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>For questions about these Terms of Service, please contact us at:</p>
              <div className="mt-4">
                <p>
                  <strong>Email:</strong> legal@SoulSupport.edu
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p>
                  <strong>Address:</strong> 123 University Ave, Student Health Center, Campus, State 12345
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
