'use client'

import { AlignLeft } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useResume } from '@/hooks/use-resume'
import { CollapsibleSection } from './collapsible-section'

const MAX_CHARS = 2000

export function SummaryForm() {
  const { content, updateContent } = useResume()
  const summary = content.summary

  return (
    <CollapsibleSection
      title="Professional Summary"
      icon={<AlignLeft className="h-4 w-4" />}
      defaultOpen
    >
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="summary">Summary</Label>
          <span className="text-xs text-muted-foreground">
            {summary.length} / {MAX_CHARS}
          </span>
        </div>
        <Textarea
          id="summary"
          value={summary}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS) {
              updateContent('summary', e.target.value)
            }
          }}
          placeholder="A brief summary of your professional background, key skills, and career goals..."
          className="min-h-[120px] resize-y"
        />
      </div>
    </CollapsibleSection>
  )
}
