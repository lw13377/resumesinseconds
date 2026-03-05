'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function SubscriptionToast() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const status = searchParams.get('subscription')
    if (!status) return

    if (status === 'success') {
      toast.success('Subscription activated! You can now download PDFs.')
    } else if (status === 'cancelled') {
      toast.info('Subscription checkout was cancelled.')
    }

    // Clean the URL
    const url = new URL(window.location.href)
    url.searchParams.delete('subscription')
    router.replace(url.pathname, { scroll: false })
  }, [searchParams, router])

  return null
}
