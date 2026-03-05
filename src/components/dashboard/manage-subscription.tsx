'use client'

import { useState } from 'react'
import { CreditCard, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function ManageSubscription({ isSubscribed }: { isSubscribed: boolean }) {
  const [loading, setLoading] = useState(false)

  async function handleManage() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to open billing portal')
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to open billing portal')
      setLoading(false)
    }
  }

  if (!isSubscribed) return null

  return (
    <Button variant="outline" size="sm" onClick={handleManage} disabled={loading}>
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <CreditCard className="h-4 w-4" />
      )}
      Manage Subscription
    </Button>
  )
}
