'use client'

import { useState } from 'react'
import { FileText, PenLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Toolbar } from './toolbar'
import { TemplateStrip } from './template-strip'
import { FormPanel } from './form-panel'
import { PreviewPanel } from './preview-panel'

export function EditorLayout() {
  const [mobileView, setMobileView] = useState<'form' | 'preview'>('form')

  return (
    <div className="flex h-screen flex-col">
      {/* Toolbar */}
      <Toolbar />

      {/* Template Strip */}
      <TemplateStrip />

      {/* Mobile toggle */}
      <div className="flex border-b bg-muted/30 md:hidden">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'flex-1 rounded-none',
            mobileView === 'form' && 'bg-background shadow-sm'
          )}
          onClick={() => setMobileView('form')}
        >
          <PenLine className="h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'flex-1 rounded-none',
            mobileView === 'preview' && 'bg-background shadow-sm'
          )}
          onClick={() => setMobileView('preview')}
        >
          <FileText className="h-4 w-4" />
          Preview
        </Button>
      </div>

      {/* Split view */}
      <div className="flex flex-1 overflow-hidden">
        {/* Form Panel (left) */}
        <div
          className={cn(
            'w-full flex-shrink-0 overflow-hidden border-r md:w-[45%]',
            mobileView === 'preview' && 'hidden md:block'
          )}
        >
          <FormPanel />
        </div>

        {/* Preview Panel (right) */}
        <div
          className={cn(
            'w-full flex-1 overflow-hidden',
            mobileView === 'form' && 'hidden md:block'
          )}
        >
          <PreviewPanel />
        </div>
      </div>
    </div>
  )
}
