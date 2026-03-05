import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/landing/footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Resumes in Seconds',
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight">About</h1>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            <strong className="text-foreground">Resumes in Seconds</strong> is a resume building app that lets you choose from 50+ professionally designed templates to create a standout resume in no time. Customize fonts, colors, and content — then download a polished PDF ready to send to employers.
          </p>

          <p>
            Built by{' '}
            <Link
              href="https://resumesinseconds.com"
              className="font-medium text-primary hover:underline"
            >
              NextGen Lab Studio
            </Link>
            , a company focused on building fast, modern web tools that help people get ahead in their careers.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
