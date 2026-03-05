'use client'

import { useState, type ReactNode } from 'react'
import { ChevronDown, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CollapsibleSectionProps {
  title: string
  icon: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  sectionKey?: string
  hidden?: boolean
  onToggleVisibility?: () => void
}

export function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = false,
  sectionKey,
  hidden,
  onToggleVisibility,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={cn('rounded-lg border bg-card', hidden && 'opacity-60')}>
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-1 items-center gap-2.5 px-5 py-3.5 text-left transition-colors hover:bg-accent/50"
        >
          <span className="text-muted-foreground">{icon}</span>
          <span className="text-base font-medium">{title}</span>
          {hidden && (
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              Hidden
            </span>
          )}
          <ChevronDown
            className={cn(
              'ml-auto h-4 w-4 text-muted-foreground transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>
        {sectionKey && onToggleVisibility && (
          <button
            type="button"
            onClick={onToggleVisibility}
            className="flex items-center justify-center px-3 py-3.5 text-muted-foreground transition-colors hover:text-foreground"
            title={hidden ? 'Show in resume' : 'Hide from resume'}
          >
            {hidden ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      {isOpen && (
        <div className="border-t px-5 py-5">
          {children}
        </div>
      )}
    </div>
  )
}
