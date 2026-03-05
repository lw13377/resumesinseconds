import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/landing/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Resumes in Seconds',
}

export default function TermsPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: March 5, 2025</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By accessing or using Resumes in Seconds ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. Description of Service</h2>
            <p className="mt-2">
              Resumes in Seconds is a web-based resume builder that allows you to create, edit, and download resumes as PDF files. The Service offers both free and paid features.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Accounts</h2>
            <p className="mt-2">
              You are responsible for maintaining the security of your account credentials. You must provide accurate information when creating an account. You are responsible for all activity under your account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Subscriptions and Payments</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>The Pro plan costs $1.99 for the first month, then $6.99/month, billed monthly</li>
              <li>Payments are processed securely by Stripe</li>
              <li>You can cancel your subscription at any time from your dashboard</li>
              <li>Cancellation takes effect at the end of your current billing period</li>
              <li>We do not offer refunds for partial billing periods</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Your Content</h2>
            <p className="mt-2">
              You retain ownership of all resume content you create. We do not claim any rights to your content. You are responsible for ensuring your content is accurate and does not violate any laws.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">6. Acceptable Use</h2>
            <p className="mt-2">You agree not to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Use the Service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to the Service</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Resell or redistribute the Service without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">7. Availability</h2>
            <p className="mt-2">
              We strive to keep the Service available at all times but do not guarantee uninterrupted access. We may modify or discontinue features with reasonable notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">8. Limitation of Liability</h2>
            <p className="mt-2">
              The Service is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the Service, including but not limited to lost data, lost profits, or any indirect damages.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">9. Termination</h2>
            <p className="mt-2">
              We reserve the right to suspend or terminate your account if you violate these terms. You may delete your account at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">10. Changes to Terms</h2>
            <p className="mt-2">
              We may update these terms from time to time. Continued use of the Service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">11. Contact</h2>
            <p className="mt-2">
              If you have questions about these terms, contact us at support@resumesinseconds.com.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
