'use client'

import { useCallback } from 'react'
import { Globe, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useResume } from '@/hooks/use-resume'
import type { Language } from '@/types/resume'
import { CollapsibleSection } from './collapsible-section'

const PROFICIENCY_LEVELS = [
  'Native',
  'Fluent',
  'Advanced',
  'Intermediate',
  'Basic',
]

export function LanguagesForm() {
  const { content, updateContent } = useResume()
  const languages = content.languages

  const addLanguage = useCallback(() => {
    const newEntry: Language = {
      id: crypto.randomUUID(),
      language: '',
      proficiency: 'Intermediate',
    }
    updateContent('languages', [...languages, newEntry])
  }, [languages, updateContent])

  const removeLanguage = useCallback(
    (id: string) => {
      updateContent(
        'languages',
        languages.filter((l) => l.id !== id)
      )
    },
    [languages, updateContent]
  )

  const updateLanguage = useCallback(
    (id: string, field: keyof Language, value: string) => {
      updateContent(
        'languages',
        languages.map((l) => (l.id === id ? { ...l, [field]: value } : l))
      )
    },
    [languages, updateContent]
  )

  return (
    <CollapsibleSection
      title="Languages"
      icon={<Globe className="h-4 w-4" />}
    >
      {languages.length === 0 ? (
        <div className="flex flex-col items-center rounded-lg border border-dashed py-8">
          <p className="mb-3 text-sm text-muted-foreground">
            No languages yet
          </p>
          <Button variant="outline" size="sm" onClick={addLanguage}>
            <Plus className="h-4 w-4" />
            Add Language
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {languages.map((lang, index) => (
            <div
              key={lang.id}
              className="relative rounded-lg border bg-background p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  Language {index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => removeLanguage(lang.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Language</Label>
                  <Input
                    value={lang.language}
                    onChange={(e) =>
                      updateLanguage(lang.id, 'language', e.target.value)
                    }
                    placeholder="English"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Proficiency</Label>
                  <Select
                    value={lang.proficiency}
                    onValueChange={(val) =>
                      updateLanguage(lang.id, 'proficiency', val)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROFICIENCY_LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" size="sm" onClick={addLanguage}>
            <Plus className="h-4 w-4" />
            Add Language
          </Button>
        </div>
      )}
    </CollapsibleSection>
  )
}
