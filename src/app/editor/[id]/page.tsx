import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ResumeProvider } from '@/context/resume-context'
import { EditorLayout } from '@/components/editor/editor-layout'
import type { ResumeRow } from '@/types/database'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editor | ResumeForge',
  description: 'Edit your resume',
}

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: resume, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !resume) {
    redirect('/dashboard')
  }

  const row = resume as ResumeRow

  return (
    <ResumeProvider
      initialData={{
        id: row.id,
        title: row.title,
        templateId: row.template_id,
        themeColor: row.theme_color,
        fontFamily: row.font_family,
        content: row.content,
      }}
    >
      <EditorLayout />
    </ResumeProvider>
  )
}
