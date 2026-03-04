export interface TemplateInfo {
  id: string
  name: string
  category: 'professional' | 'modern' | 'creative' | 'minimal'
  description: string
}

export const TEMPLATES: TemplateInfo[] = [
  { id: 'professional-classic', name: 'Classic', category: 'professional', description: 'Clean and traditional layout' },
  { id: 'professional-executive', name: 'Executive', category: 'professional', description: 'Polished executive style' },
  { id: 'professional-corporate', name: 'Corporate', category: 'professional', description: 'Corporate business format' },
  { id: 'professional-formal', name: 'Formal', category: 'professional', description: 'Formal document style' },
  { id: 'professional-traditional', name: 'Traditional', category: 'professional', description: 'Time-tested traditional layout' },
  { id: 'modern-sleek', name: 'Sleek', category: 'modern', description: 'Sleek contemporary design' },
  { id: 'modern-gradient', name: 'Gradient', category: 'modern', description: 'Gradient accent header' },
  { id: 'modern-sidebar', name: 'Sidebar', category: 'modern', description: 'Sidebar layout with photo' },
  { id: 'modern-timeline', name: 'Timeline', category: 'modern', description: 'Timeline-based experience' },
  { id: 'modern-grid', name: 'Grid', category: 'modern', description: 'Grid-based modern layout' },
  { id: 'creative-vibrant', name: 'Vibrant', category: 'creative', description: 'Bold colors and shapes' },
  { id: 'creative-artistic', name: 'Artistic', category: 'creative', description: 'Artistic freeform layout' },
  { id: 'creative-bold', name: 'Bold', category: 'creative', description: 'Bold typography focus' },
  { id: 'creative-asymmetric', name: 'Asymmetric', category: 'creative', description: 'Asymmetric column layout' },
  { id: 'creative-portfolio', name: 'Portfolio', category: 'creative', description: 'Portfolio-style showcase' },
  { id: 'minimal-clean', name: 'Clean', category: 'minimal', description: 'Ultra-clean minimal' },
  { id: 'minimal-whitespace', name: 'Whitespace', category: 'minimal', description: 'Generous whitespace' },
  { id: 'minimal-simple', name: 'Simple', category: 'minimal', description: 'Simply elegant' },
  { id: 'minimal-elegant', name: 'Elegant', category: 'minimal', description: 'Refined elegance' },
  { id: 'minimal-refined', name: 'Refined', category: 'minimal', description: 'Sophisticated and refined' },
]

export const TEMPLATE_CATEGORIES = ['professional', 'modern', 'creative', 'minimal'] as const
