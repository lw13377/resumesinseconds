import Link from 'next/link'
import { PartyPopper, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'Subscription Confirmed | Resumes in Seconds',
}

export default function SubscriptionSuccessPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-12 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-900/20" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-900/20" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Card className="border-0 shadow-xl shadow-black/5 dark:shadow-black/20">
          <CardContent className="flex flex-col items-center gap-6 pt-10 pb-10 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <PartyPopper className="h-10 w-10 text-primary" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Congratulations!</h1>
              <p className="text-base text-muted-foreground">
                You successfully subscribed to Pro. You now have access to all templates and unlimited PDF downloads.
              </p>
            </div>

            <Button asChild size="lg" className="w-full h-12 font-semibold shadow-lg shadow-primary/25">
              <Link href="/templates?select=true">
                Start Creating Resumes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
