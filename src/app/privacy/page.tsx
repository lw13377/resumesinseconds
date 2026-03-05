import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/landing/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Resumes in Seconds',
}

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: March 5, 2025</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
            <p className="mt-2">
              When you create an account, we collect your name, email address, and password. When you use our service, we store the resume content you create. If you subscribe to our paid plan, payment is processed by Stripe — we do not store your credit card details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. How We Use Your Information</h2>
            <p className="mt-2">We use your information to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Provide and maintain the service</li>
              <li>Save and sync your resumes across devices</li>
              <li>Process subscription payments via Stripe</li>
              <li>Send important account-related emails</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Data Storage</h2>
            <p className="mt-2">
              Your data is stored securely using Supabase (hosted on AWS). Resume content is associated with your account and is not shared with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Third-Party Services</h2>
            <p className="mt-2">We use the following third-party services:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li><strong>Supabase</strong> — authentication and database</li>
              <li><strong>Stripe</strong> — payment processing</li>
              <li><strong>Vercel</strong> — hosting</li>
            </ul>
            <p className="mt-2">Each service has its own privacy policy governing their handling of your data.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Cookies</h2>
            <p className="mt-2">
              We use essential cookies to keep you logged in and maintain your session. We do not use tracking or advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">6. Your Rights</h2>
            <p className="mt-2">You can:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Access, update, or delete your resume data at any time</li>
              <li>Delete your account by contacting us</li>
              <li>Cancel your subscription at any time through the dashboard</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">7. Data Retention</h2>
            <p className="mt-2">
              We retain your data for as long as your account is active. If you delete your account, your data will be permanently removed within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">8. Changes to This Policy</h2>
            <p className="mt-2">
              We may update this policy from time to time. We will notify you of significant changes via email or a notice on our website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">9. Contact</h2>
            <p className="mt-2">
              If you have questions about this privacy policy, contact us at support@resumesinseconds.com.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
