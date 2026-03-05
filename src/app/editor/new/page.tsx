'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ResumeProvider } from '@/context/resume-context'
import { EditorLayout } from '@/components/editor/editor-layout'
import { SAMPLE_RESUME } from '@/lib/sample-data'
import type { ResumeContent } from '@/types/resume'

const GUEST_STORAGE_KEY = 'guest-resume'

interface GuestResumeState {
  id: string
  title: string
  templateId: string
  themeColor: string
  fontFamily: string
  content: ResumeContent
}

const DEFAULT_TEMPLATE = 'classic-professional'

export default function GuestEditorPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    }>
      <GuestEditorInner />
    </Suspense>
  )
}

function GuestEditorInner() {
  const searchParams = useSearchParams()
  const templateParam = searchParams.get('template')
  const [initialData, setInitialData] = useState<GuestResumeState | null>(null)

  useEffect(() => {
    const defaultState: GuestResumeState = {
      id: 'guest',
      title: 'My Resume',
      templateId: templateParam || DEFAULT_TEMPLATE,
      themeColor: '#1e3a5f',
      fontFamily: 'Inter',
      content: SAMPLE_RESUME,
    }

    // If a template was specified in the URL, use it directly (skip localStorage)
    if (templateParam) {
      setInitialData(defaultState)
      return
    }

    try {
      const saved = localStorage.getItem(GUEST_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as GuestResumeState
        if (!parsed.content?.personal?.name) {
          localStorage.removeItem(GUEST_STORAGE_KEY)
          setInitialData(defaultState)
        } else {
          setInitialData({ ...parsed, id: 'guest' })
        }
      } else {
        setInitialData(defaultState)
      }
    } catch {
      setInitialData(defaultState)
    }
  }, [templateParam])

  if (!initialData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <ResumeProvider initialData={initialData} mode="guest">
      <EditorLayout />
    </ResumeProvider>
  )
}
