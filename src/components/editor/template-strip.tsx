'use client'

import { Suspense, useMemo, useRef, useState } from 'react'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TemplateRenderer } from '@/components/templates/template-renderer'
import { TEMPLATES, TEMPLATE_CATEGORIES, type TemplateInfo } from '@/components/templates/template-registry'
import { useResume } from '@/hooks/use-resume'
import { cn } from '@/lib/utils'

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All',
  professional: 'Professional',
  modern: 'Modern',
  creative: 'Creative',
  minimal: 'Minimal',
}

function MiniThumbnail({
  template,
  isActive,
  onClick,
  content,
  themeColor,
  fontFamily,
}: {
  template: TemplateInfo
  isActive: boolean
  onClick: () => void
  content: ReturnType<typeof useResume>['content']
  themeColor: string
  fontFamily: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative flex-shrink-0 overflow-hidden rounded-md border-2 transition-all hover:shadow-md',
        isActive
          ? 'border-primary ring-2 ring-primary/20'
          : 'border-border hover:border-primary/50'
      )}
      style={{ width: '100px' }}
    >
      <div className="pointer-events-none relative h-[120px] w-full overflow-hidden bg-white">
        <div
          style={{
            transform: 'scale(0.168)',
            transformOrigin: 'top left',
            width: '595px',
            height: '842px',
          }}
        >
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-[8px] text-muted-foreground">
                ...
              </div>
            }
          >
            <TemplateRenderer
              templateId={template.id}
              content={content}
              themeColor={themeColor}
              fontFamily={fontFamily}
            />
          </Suspense>
        </div>
      </div>
      <div className="flex items-center justify-between border-t bg-muted/30 px-1.5 py-1">
        <span className="truncate text-[10px] font-medium">{template.name}</span>
        <div className="flex items-center gap-1">
          {template.isNew && (
            <span className="rounded-full bg-primary/10 px-1 py-0.5 text-[8px] font-semibold text-primary">
              New
            </span>
          )}
          {isActive && (
            <span className="flex items-center gap-0.5 rounded-full bg-primary px-1 py-0.5 text-[8px] font-semibold text-primary-foreground">
              <Check className="h-2 w-2" />
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

export function TemplateStrip() {
  const { content, templateId, themeColor, fontFamily, setTemplateId } = useResume()
  const [category, setCategory] = useState<string>('all')
  const scrollRef = useRef<HTMLDivElement>(null)

  const filteredTemplates = useMemo(() => {
    if (category === 'all') return TEMPLATES
    return TEMPLATES.filter((t) => t.category === category)
  }, [category])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 320
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <div className="border-b bg-muted/20">
      {/* Category pills + scroll arrows */}
      <div className="flex items-center gap-2 px-3 pt-2 pb-1.5">
        <div className="flex items-center gap-1">
          {['all', ...TEMPLATE_CATEGORIES].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                'rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors',
                category === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => scroll('left')}
            className="h-6 w-6"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => scroll('right')}
            className="h-6 w-6"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Scrollable template row */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto px-3 pb-2 scrollbar-thin"
        style={{ scrollbarWidth: 'thin' }}
      >
        {filteredTemplates.map((template) => (
          <MiniThumbnail
            key={template.id}
            template={template}
            isActive={templateId === template.id}
            onClick={() => setTemplateId(template.id)}
            content={content}
            themeColor={themeColor}
            fontFamily={fontFamily}
          />
        ))}
      </div>
    </div>
  )
}
