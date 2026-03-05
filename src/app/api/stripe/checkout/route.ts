import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getStripe } from '@/lib/stripe'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

export async function POST() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get profile to check for existing Stripe customer
    const { data: profile } = await getSupabaseAdmin()
      .from('profiles')
      .select('stripe_customer_id, is_subscribed, subscription_expires_at')
      .eq('id', user.id)
      .single()

    // Already subscribed — redirect to billing portal instead
    if (
      profile?.is_subscribed &&
      profile?.stripe_customer_id &&
      (!profile.subscription_expires_at ||
        new Date(profile.subscription_expires_at) > new Date())
    ) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      const portalSession = await getStripe().billingPortal.sessions.create({
        customer: profile.stripe_customer_id,
        return_url: `${appUrl}/dashboard`,
      })
      return NextResponse.json({ url: portalSession.url })
    }

    let customerId = profile?.stripe_customer_id

    // Create Stripe customer if needed
    if (!customerId) {
      const customer = await getStripe().customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      })
      customerId = customer.id

      await getSupabaseAdmin()
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Create Checkout Session
    const session = await getStripe().checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      ...(process.env.STRIPE_INTRO_COUPON_ID && {
        discounts: [{ coupon: process.env.STRIPE_INTRO_COUPON_ID }],
      }),
      success_url: `${appUrl}/dashboard?subscription=success`,
      cancel_url: `${appUrl}/dashboard?subscription=cancelled`,
      metadata: { supabase_user_id: user.id },
      subscription_data: {
        metadata: { supabase_user_id: user.id },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Checkout error:', message, 'PRICE_ID:', process.env.STRIPE_PRICE_ID, 'COUPON_ID:', process.env.STRIPE_INTRO_COUPON_ID)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 },
    )
  }
}
