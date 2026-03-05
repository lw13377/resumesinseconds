'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { Check, Lock } from 'lucide-react'
import { TemplateRenderer } from '@/components/templates/template-renderer'
import { TEMPLATES, TEMPLATE_CATEGORIES, type TemplateInfo } from '@/components/templates/template-registry'
import { useResume } from '@/hooks/use-resume'
import { checkSubscription } from '@/lib/actions/subscription'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All',
  professional: 'Pro',
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
  locked,
}: {
  template: TemplateInfo
  isActive: boolean
  onClick: () => void
  content: ReturnType<typeof useResume>['content']
  themeColor: string
  fontFamily: string
  locked: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative w-full overflow-hidden rounded-lg border-2 transition-all hover:shadow-md',
        isActive
          ? 'border-primary ring-2 ring-primary/20'
          : 'border-border hover:border-primary/50',
        locked && 'opacity-75'
      )}
    >
      <div className="pointer-events-none relative w-full overflow-hidden bg-white" style={{ height: '300px' }}>
        <div
          style={{
            transform: 'scale(0.36)',
            transformOrigin: 'top left',
            width: '595px',
            height: '842px',
          }}
        >
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
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
        {locked && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60">
            <div className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <Lock className="h-3 w-3" />
              Pro
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between border-t bg-muted/30 px-2 py-1.5">
        <span className="truncate text-sm font-medium">{template.name}</span>
        <div className="flex items-center gap-1">
          {template.isNew && (
            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold text-primary">
              New
            </span>
          )}
          {isActive && (
            <span className="flex items-center gap-0.5 rounded-full bg-primary px-1 py-0.5 text-[9px] font-semibold text-primary-foreground">
              <Check className="h-2.5 w-2.5" />
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

export function TemplateSidebar() {
  const { content, templateId, themeColor, fontFamily, setTemplateId } = useResume()
  const [category, setCategory] = useState<string>('all')
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null)

  useEffect(() => {
    checkSubscription().then(setIsSubscribed)
  }, [])

  const filteredTemplates = useMemo(() => {
    const list = category === 'all' ? TEMPLATES : TEMPLATES.filter((t) => t.category === category)
    return list.toSorted((a, b) => (a.premium ? 1 : 0) - (b.premium ? 1 : 0))
  }, [category])

  function handleSelect(template: TemplateInfo) {
    if (template.premium && isSubscribed === false) {
      toast.error('Subscribe to unlock premium templates', {
        description: 'This template is available with a Pro subscription.',
      })
      return
    }
    setTemplateId(template.id)
  }

  return (
    <div className="flex h-full flex-col bg-muted/10">
      {/* Header + category pills */}
      <div className="flex-shrink-0 border-b px-3 py-2.5">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Templates
        </h3>
        <div className="flex flex-wrap gap-1">
          {['all', ...TEMPLATE_CATEGORIES].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                'rounded-full px-2 py-0.5 text-[11px] font-medium transition-colors',
                category === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable template list — native overflow */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-2 gap-3">
          {filteredTemplates.map((template) => (
            <MiniThumbnail
              key={template.id}
              template={template}
              isActive={templateId === template.id}
              onClick={() => handleSelect(template)}
              content={content}
              themeColor={themeColor}
              fontFamily={fontFamily}
              locked={!!template.premium && isSubscribed === false}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
