'use client'

import dynamic from 'next/dynamic'
import type { TemplateProps } from './base-styles'

// Dynamic imports for all 20 templates
const templates: Record<string, React.ComponentType<TemplateProps>> = {}

// We use a lookup + lazy approach
const templateImports: Record<string, () => Promise<{ default: React.ComponentType<TemplateProps> }>> = {
  'professional-classic': () => import('./professional/classic'),
  'professional-executive': () => import('./professional/executive'),
  'professional-corporate': () => import('./professional/corporate'),
  'professional-formal': () => import('./professional/formal'),
  'professional-traditional': () => import('./professional/traditional'),
  'modern-sleek': () => import('./modern/sleek'),
  'modern-gradient': () => import('./modern/gradient'),
  'modern-sidebar': () => import('./modern/sidebar'),
  'modern-timeline': () => import('./modern/timeline'),
  'modern-grid': () => import('./modern/grid'),
  'creative-vibrant': () => import('./creative/vibrant'),
  'creative-artistic': () => import('./creative/artistic'),
  'creative-bold': () => import('./creative/bold'),
  'creative-asymmetric': () => import('./creative/asymmetric'),
  'creative-portfolio': () => import('./creative/portfolio'),
  'minimal-clean': () => import('./minimal/clean'),
  'minimal-whitespace': () => import('./minimal/whitespace'),
  'minimal-simple': () => import('./minimal/simple'),
  'minimal-elegant': () => import('./minimal/elegant'),
  'minimal-refined': () => import('./minimal/refined'),
}

// Create dynamic components for each template
for (const [id, importFn] of Object.entries(templateImports)) {
  templates[id] = dynamic(importFn, { ssr: false })
}

interface TemplateRendererProps extends TemplateProps {
  templateId: string
}

export function TemplateRenderer({ templateId, content, themeColor, fontFamily }: TemplateRendererProps) {
  const Template = templates[templateId] || templates['professional-classic']

  return <Template content={content} themeColor={themeColor} fontFamily={fontFamily} />
}
