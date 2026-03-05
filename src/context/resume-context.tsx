'use client'

import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createClient } from '@/lib/supabase/client'
import type { ResumeContent } from '@/types/resume'

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

interface ResumeState {
  id: string
  title: string
  templateId: string
  themeColor: string
  fontFamily: string
  content: ResumeContent
}

interface ResumeContextValue extends ResumeState {
  saveStatus: SaveStatus
  updateContent: <K extends keyof ResumeContent>(
    section: K,
    data: ResumeContent[K]
  ) => void
  setTemplateId: (templateId: string) => void
  setThemeColor: (themeColor: string) => void
  setFontFamily: (fontFamily: string) => void
  setTitle: (title: string) => void
  toggleSection: (sectionKey: string) => void
}

export const ResumeContext = createContext<ResumeContextValue | null>(null)

interface ResumeProviderProps {
  children: ReactNode
  initialData: ResumeState
}

export function ResumeProvider({ children, initialData }: ResumeProviderProps) {
  const [state, setState] = useState<ResumeState>(initialData)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const supabaseRef = useRef(createClient())

  // Persist to Supabase with debounce
  const saveToSupabase = useCallback(
    (newState: ResumeState) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }

      setSaveStatus('saving')

      debounceRef.current = setTimeout(async () => {
        try {
          const { error } = await supabaseRef.current
            .from('resumes')
            .update({
              title: newState.title,
              template_id: newState.templateId,
              theme_color: newState.themeColor,
              font_family: newState.fontFamily,
              content: newState.content,
              updated_at: new Date().toISOString(),
            })
            .eq('id', newState.id)

          if (error) {
            console.error('Auto-save error:', error)
            setSaveStatus('error')
          } else {
            setSaveStatus('saved')
          }
        } catch (err) {
          console.error('Auto-save error:', err)
          setSaveStatus('error')
        }
      }, 500)
    },
    []
  )

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])

  const updateContent = useCallback(
    <K extends keyof ResumeContent>(section: K, data: ResumeContent[K]) => {
      setState((prev) => {
        const next = {
          ...prev,
          content: { ...prev.content, [section]: data },
        }
        saveToSupabase(next)
        return next
      })
    },
    [saveToSupabase]
  )

  const setTemplateId = useCallback(
    (templateId: string) => {
      setState((prev) => {
        const next = { ...prev, templateId }
        saveToSupabase(next)
        return next
      })
    },
    [saveToSupabase]
  )

  const setThemeColor = useCallback(
    (themeColor: string) => {
      setState((prev) => {
        const next = { ...prev, themeColor }
        saveToSupabase(next)
        return next
      })
    },
    [saveToSupabase]
  )

  const setFontFamily = useCallback(
    (fontFamily: string) => {
      setState((prev) => {
        const next = { ...prev, fontFamily }
        saveToSupabase(next)
        return next
      })
    },
    [saveToSupabase]
  )

  const setTitle = useCallback(
    (title: string) => {
      setState((prev) => {
        const next = { ...prev, title }
        saveToSupabase(next)
        return next
      })
    },
    [saveToSupabase]
  )

  const toggleSection = useCallback(
    (sectionKey: string) => {
      setState((prev) => {
        const hidden = prev.content.hiddenSections ?? []
        const nextHidden = hidden.includes(sectionKey)
          ? hidden.filter((k) => k !== sectionKey)
          : [...hidden, sectionKey]
        const next = {
          ...prev,
          content: { ...prev.content, hiddenSections: nextHidden },
        }
        saveToSupabase(next)
        return next
      })
    },
    [saveToSupabase]
  )

  return (
    <ResumeContext.Provider
      value={{
        ...state,
        saveStatus,
        updateContent,
        setTemplateId,
        setThemeColor,
        setFontFamily,
        setTitle,
        toggleSection,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}
