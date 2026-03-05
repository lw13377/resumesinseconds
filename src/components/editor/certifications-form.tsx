'use client'

import { useCallback } from 'react'
import { Award, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useResume } from '@/hooks/use-resume'
import type { Certification } from '@/types/resume'
import { CollapsibleSection } from './collapsible-section'

export function CertificationsForm() {
  const { content, updateContent, toggleSection } = useResume()
  const certifications = content.certifications
  const hidden = content.hiddenSections?.includes('certifications') ?? false

  const addCertification = useCallback(() => {
    const newEntry: Certification = {
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      date: '',
    }
    updateContent('certifications', [...certifications, newEntry])
  }, [certifications, updateContent])

  const removeCertification = useCallback(
    (id: string) => {
      updateContent(
        'certifications',
        certifications.filter((c) => c.id !== id)
      )
    },
    [certifications, updateContent]
  )

  const updateCertification = useCallback(
    (id: string, field: keyof Certification, value: string) => {
      updateContent(
        'certifications',
        certifications.map((c) =>
          c.id === id ? { ...c, [field]: value } : c
        )
      )
    },
    [certifications, updateContent]
  )

  return (
    <CollapsibleSection
      title="Certifications"
      icon={<Award className="h-4 w-4" />}
      sectionKey="certifications"
      hidden={hidden}
      onToggleVisibility={() => toggleSection('certifications')}
    >
      {certifications.length === 0 ? (
        <div className="flex flex-col items-center rounded-lg border border-dashed py-8">
          <p className="mb-3 text-sm text-muted-foreground">
            No certifications yet
          </p>
          <Button variant="outline" size="sm" onClick={addCertification}>
            <Plus className="h-4 w-4" />
            Add Certification
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="relative rounded-lg border bg-background p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  Certification {index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => removeCertification(cert.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label>Certification Name</Label>
                  <Input
                    value={cert.name}
                    onChange={(e) =>
                      updateCertification(cert.id, 'name', e.target.value)
                    }
                    placeholder="AWS Solutions Architect"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Issuer</Label>
                  <Input
                    value={cert.issuer}
                    onChange={(e) =>
                      updateCertification(cert.id, 'issuer', e.target.value)
                    }
                    placeholder="Amazon Web Services"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Date</Label>
                  <Input
                    value={cert.date}
                    onChange={(e) =>
                      updateCertification(cert.id, 'date', e.target.value)
                    }
                    placeholder="Mar 2024"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" size="sm" onClick={addCertification}>
            <Plus className="h-4 w-4" />
            Add Certification
          </Button>
        </div>
      )}
    </CollapsibleSection>
  )
}
