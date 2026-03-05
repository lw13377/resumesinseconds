'use server'

import { createClient } from '@/lib/supabase/server'

export async function checkSubscription(): Promise<boolean> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return false

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_subscribed, subscription_expires_at')
    .eq('id', user.id)
    .single()

  if (!profile) return false
  if (!profile.is_subscribed) return false
  if (
    profile.subscription_expires_at &&
    new Date(profile.subscription_expires_at) < new Date()
  )
    return false
  return true
}

// DEV ONLY: Bypass payment for testing — blocked in production
export async function activateDevSubscription(): Promise<boolean> {
  if (process.env.NODE_ENV !== 'development') return false

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return false

  const { error } = await supabase
    .from('profiles')
    .update({
      is_subscribed: true,
      subscription_expires_at: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
    })
    .eq('id', user.id)

  return !error
}
