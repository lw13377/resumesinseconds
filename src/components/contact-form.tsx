'use client'

import { useState } from 'react'
import { Loader2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export function ContactForm({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()

      if (data.success) {
        toast.success('Message sent! We\'ll get back to you soon.')
        form.reset()
        setOpen(false)
      } else {
        toast.error('Failed to send message. Please try again.')
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
          <DialogDescription>
            Have a question or feedback? Send us a message and we&apos;ll get back to you.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ''} />
          <input type="hidden" name="subject" value="New contact from ResumesInSeconds.com" />
          <input type="hidden" name="from_name" value="ResumesInSeconds Contact Form" />

          <div className="space-y-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              name="name"
              placeholder="Your name"
              required
              disabled={sending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              disabled={sending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              name="message"
              placeholder="How can we help?"
              rows={4}
              required
              disabled={sending}
            />
          </div>

          <Button type="submit" className="w-full" disabled={sending}>
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {sending ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
