'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, Download, Loader2, CreditCard, Sparkles, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { useResume } from '@/hooks/use-resume'
import { checkSubscription, activateDevSubscription } from '@/lib/actions/subscription'

interface DownloadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DownloadModal({ open, onOpenChange }: DownloadModalProps) {
  const { id, title, hasUnsavedChanges, mode } = useResume()
  const [downloading, setDownloading] = useState(false)
  const [subscribing, setSubscribing] = useState(false)
  const [activating, setActivating] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null)

  // Check subscription status when modal opens (skip for guests)
  useEffect(() => {
    if (open && mode === 'authenticated') {
      setIsSubscribed(null)
      checkSubscription().then(setIsSubscribed)
    }
  }, [open, mode])

  async function downloadPdf() {
    setDownloading(true)
    try {
      const res = await fetch(`/api/resume/download?id=${id}`)
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Download failed')
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${title || 'resume'}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success('PDF downloaded successfully!')
      onOpenChange(false)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Download failed')
    } finally {
      setDownloading(false)
    }
  }

  async function handleSubscribe() {
    setSubscribing(true)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to start checkout')
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to start checkout')
      setSubscribing(false)
    }
  }

  async function handleDevBypass() {
    setActivating(true)
    try {
      const ok = await activateDevSubscription()
      if (ok) {
        toast.success('Dev subscription activated!')
        setIsSubscribed(true)
        await downloadPdf()
      } else {
        toast.error('Failed to activate dev subscription')
      }
    } catch {
      toast.error('Failed to activate subscription')
    } finally {
      setActivating(false)
    }
  }

  // Guest mode — prompt to create account
  if (mode === 'guest') {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Create an Account
            </DialogTitle>
            <DialogDescription>
              Create a free account to save your resume and download it as a PDF.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-sm text-muted-foreground">
                Your resume data will be saved. Sign up to unlock PDF downloads.
              </p>
            </div>
            <Button className="w-full" size="lg" asChild>
              <Link href="/login?redirect=/editor/new">
                <UserPlus className="h-4 w-4" />
                Create Free Account
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Loading state while checking subscription
  if (isSubscribed === null) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Subscribed — show direct download
  if (isSubscribed) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download PDF
            </DialogTitle>
            <DialogDescription>
              Download your resume as a professional PDF file.
            </DialogDescription>
          </DialogHeader>

          {hasUnsavedChanges && (
            <div className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              Save your resume first to include latest edits.
            </div>
          )}

          <Button
            className="w-full"
            size="lg"
            onClick={downloadPdf}
            disabled={downloading}
          >
            {downloading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {downloading ? 'Generating PDF...' : 'Download PDF'}
          </Button>
        </DialogContent>
      </Dialog>
    )
  }

  // Not subscribed — show paywall
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Download PDF
          </DialogTitle>
          <DialogDescription>
            Subscribe to download your resume as a professional PDF file.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {hasUnsavedChanges && (
            <div className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              Save your resume first to include latest edits.
            </div>
          )}

          {/* Pricing Card */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Pro Plan</h3>
                <p className="text-sm text-muted-foreground">Unlimited PDF downloads</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">$2</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Download unlimited PDFs
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Access all 50 templates
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Priority support
              </li>
            </ul>
          </div>

          {/* Subscribe Button */}
          <Button
            className="w-full"
            size="lg"
            onClick={handleSubscribe}
            disabled={subscribing}
          >
            {subscribing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CreditCard className="h-4 w-4" />
            )}
            {subscribing ? 'Redirecting to checkout...' : 'Subscribe — $2/mo'}
          </Button>

          {/* Dev bypass — only in development */}
          {process.env.NODE_ENV === 'development' && (
            <>
              <Separator />
              <div className="rounded border border-dashed border-yellow-500/50 bg-yellow-50/50 p-3 dark:bg-yellow-900/10">
                <p className="mb-2 text-xs font-medium text-yellow-700 dark:text-yellow-400">
                  DEV MODE — Bypass payment for testing
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-yellow-500/50 text-yellow-700 hover:bg-yellow-100 dark:text-yellow-400"
                  onClick={handleDevBypass}
                  disabled={activating || downloading}
                >
                  {activating ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="h-3.5 w-3.5" />
                  )}
                  {activating ? 'Activating...' : 'Activate Free & Download'}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
