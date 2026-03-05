import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import Stripe from 'stripe'

function getSubscriptionIdFromInvoice(
  invoice: Stripe.Invoice,
): string | null {
  const sub = invoice.parent?.subscription_details?.subscription
  if (!sub) return null
  return typeof sub === 'string' ? sub : sub.id
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.supabase_user_id
        if (!userId) break

        const subscriptionId =
          typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription?.id

        // Set expiration to 35 days from now (gives buffer beyond monthly billing)
        const expiresAt = new Date(
          Date.now() + 35 * 24 * 60 * 60 * 1000,
        ).toISOString()

        await getSupabaseAdmin()
          .from('profiles')
          .update({
            is_subscribed: true,
            stripe_subscription_id: subscriptionId || null,
            subscription_expires_at: expiresAt,
          })
          .eq('id', userId)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.supabase_user_id
        if (!userId) break

        await getSupabaseAdmin()
          .from('profiles')
          .update({
            is_subscribed: false,
            stripe_subscription_id: null,
          })
          .eq('id', userId)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const subscriptionId = getSubscriptionIdFromInvoice(invoice)
        if (!subscriptionId) break

        const sub = await getStripe().subscriptions.retrieve(subscriptionId)
        const userId = sub.metadata?.supabase_user_id
        if (!userId) break

        await getSupabaseAdmin()
          .from('profiles')
          .update({ is_subscribed: false })
          .eq('id', userId)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        const subscriptionId = getSubscriptionIdFromInvoice(invoice)
        if (!subscriptionId) break

        const sub = await getStripe().subscriptions.retrieve(subscriptionId)
        const userId = sub.metadata?.supabase_user_id
        if (!userId) break

        await getSupabaseAdmin()
          .from('profiles')
          .update({
            is_subscribed: true,
            subscription_expires_at: new Date(
              Date.now() + 35 * 24 * 60 * 60 * 1000,
            ).toISOString(),
          })
          .eq('id', userId)
        break
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 },
    )
  }

  return NextResponse.json({ received: true })
}
