'use client'

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createClient } from '@/lib/supabase/client'
import type { ResumeContent } from '@/types/resume'

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'
type EditorMode = 'guest' | 'authenticated'

interface ResumeState {
  id: string
  title: string
  templateId: string
  themeColor: string
  fontFamily: string
  content: ResumeContent
}

interface ResumeContextValue extends ResumeState {
  mode: EditorMode
  saveStatus: SaveStatus
  hasUnsavedChanges: boolean
  updateContent: <K extends keyof ResumeContent>(
    section: K,
    data: ResumeContent[K]
  ) => void
  setTemplateId: (templateId: string) => void
  setThemeColor: (themeColor: string) => void
  setFontFamily: (fontFamily: string) => void
  setTitle: (title: string) => void
  toggleSection: (sectionKey: string) => void
  saveResume: () => Promise<void>
  discardChanges: () => void
}

export const ResumeContext = createContext<ResumeContextValue | null>(null)

const GUEST_STORAGE_KEY = 'guest-resume'

interface ResumeProviderProps {
  children: ReactNode
  initialData: ResumeState
  mode?: EditorMode
}

export function ResumeProvider({ children, initialData, mode = 'authenticated' }: ResumeProviderProps) {
  const [state, setState] = useState<ResumeState>(initialData)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const savedStateRef = useRef<ResumeState>(initialData)
  const supabaseRef = useRef(createClient())

  const hasUnsavedChanges = useMemo(
    () => JSON.stringify(state) !== JSON.stringify(savedStateRef.current),
    [state]
  )

  // Warn before leaving with unsaved changes
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (JSON.stringify(state) !== JSON.stringify(savedStateRef.current)) {
        e.preventDefault()
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [state])

  const saveResume = useCallback(async () => {
    setSaveStatus('saving')
    try {
      if (mode === 'guest') {
        localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(state))
        savedStateRef.current = state
        setSaveStatus('saved')
        return
      }

      const { error } = await supabaseRef.current
        .from('resumes')
        .update({
          title: state.title,
          template_id: state.templateId,
          theme_color: state.themeColor,
          font_family: state.fontFamily,
          content: state.content,
          updated_at: new Date().toISOString(),
        })
        .eq('id', state.id)

      if (error) {
        console.error('Save error:', error)
        setSaveStatus('error')
      } else {
        savedStateRef.current = state
        setSaveStatus('saved')
      }
    } catch (err) {
      console.error('Save error:', err)
      setSaveStatus('error')
    }
  }, [state, mode])

  const discardChanges = useCallback(() => {
    setState(savedStateRef.current)
    setSaveStatus('idle')
  }, [])

  const updateContent = useCallback(
    <K extends keyof ResumeContent>(section: K, data: ResumeContent[K]) => {
      setState((prev) => ({
        ...prev,
        content: { ...prev.content, [section]: data },
      }))
    },
    []
  )

  const setTemplateId = useCallback((templateId: string) => {
    setState((prev) => ({ ...prev, templateId }))
  }, [])

  const setThemeColor = useCallback((themeColor: string) => {
    setState((prev) => ({ ...prev, themeColor }))
  }, [])

  const setFontFamily = useCallback((fontFamily: string) => {
    setState((prev) => ({ ...prev, fontFamily }))
  }, [])

  const setTitle = useCallback((title: string) => {
    setState((prev) => ({ ...prev, title }))
  }, [])

  const toggleSection = useCallback((sectionKey: string) => {
    setState((prev) => {
      const hidden = prev.content.hiddenSections ?? []
      const nextHidden = hidden.includes(sectionKey)
        ? hidden.filter((k) => k !== sectionKey)
        : [...hidden, sectionKey]
      return {
        ...prev,
        content: { ...prev.content, hiddenSections: nextHidden },
      }
    })
  }, [])

  return (
    <ResumeContext.Provider
      value={{
        ...state,
        mode,
        saveStatus,
        hasUnsavedChanges,
        updateContent,
        setTemplateId,
        setThemeColor,
        setFontFamily,
        setTitle,
        toggleSection,
        saveResume,
        discardChanges,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}
