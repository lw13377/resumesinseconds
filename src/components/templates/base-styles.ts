import type { ResumeContent } from '@/types/resume'

export interface TemplateProps {
  content: ResumeContent
  themeColor: string
  fontFamily: string
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 }
}

export function lightenColor(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex)
  const lighten = (c: number) => Math.min(255, Math.round(c + (255 - c) * amount))
  return `rgb(${lighten(r)}, ${lighten(g)}, ${lighten(b)})`
}

export function darkenColor(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex)
  const darken = (c: number) => Math.max(0, Math.round(c * (1 - amount)))
  return `rgb(${darken(r)}, ${darken(g)}, ${darken(b)})`
}

/** Check if a section is hidden */
export function isSectionHidden(content: ResumeContent, section: string): boolean {
  return content.hiddenSections?.includes(section) ?? false
}

/** Page dimensions for A4-proportioned rendering (595 x 842 px) */
export const PAGE_WIDTH = 595
export const PAGE_HEIGHT = 842

export const pageContainerStyle: React.CSSProperties = {
  width: `${PAGE_WIDTH}px`,
  minHeight: `${PAGE_HEIGHT}px`,
  backgroundColor: '#ffffff',
  color: '#1a1a1a',
  overflow: 'hidden',
  boxSizing: 'border-box',
}
