import { createClient } from '@/lib/supabase/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { NextResponse } from 'next/server'
import { PdfResumeDocument } from '@/components/pdf/pdf-template'
import React from 'react'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const resumeId = searchParams.get('id')

  if (!resumeId) {
    return NextResponse.json({ error: 'Missing resume ID' }, { status: 400 })
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check subscription
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_subscribed, subscription_expires_at')
    .eq('id', user.id)
    .single()

  if (!profile?.is_subscribed) {
    return NextResponse.json({ error: 'Subscription required' }, { status: 403 })
  }

  if (
    profile.subscription_expires_at &&
    new Date(profile.subscription_expires_at) < new Date()
  ) {
    return NextResponse.json({ error: 'Subscription expired' }, { status: 403 })
  }

  const { data: resume } = await supabase
    .from('resumes')
    .select('*')
    .eq('id', resumeId)
    .eq('user_id', user.id)
    .single()

  if (!resume) {
    return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
  }

  try {
    const element = React.createElement(PdfResumeDocument, {
      content: resume.content,
      themeColor: resume.theme_color || '#2563eb',
      fontFamily: resume.font_family || 'Inter',
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buffer = await renderToBuffer(element as any)

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${(resume.title || 'resume').replace(/"/g, '')}.pdf"`,
      },
    })
  } catch (err) {
    console.error('PDF generation error:', err)
    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 })
  }
}
