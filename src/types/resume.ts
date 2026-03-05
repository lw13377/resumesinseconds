export interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export interface Education {
  id: string
  degree: string
  school: string
  location: string
  startDate: string
  endDate: string
  gpa: string
}

export interface SkillCategory {
  id: string
  category: string
  items: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  url: string
  technologies: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
}

export interface Language {
  id: string
  language: string
  proficiency: string
}

export interface ResumeContent {
  personal: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  skills: SkillCategory[]
  projects: Project[]
  certifications: Certification[]
  languages: Language[]
  hiddenSections?: string[]
}

export interface ResumeData {
  id: string
  title: string
  templateId: string
  themeColor: string
  fontFamily: string
  content: ResumeContent
}

export const DEFAULT_RESUME_CONTENT: ResumeContent = {
  personal: { name: '', email: '', phone: '', location: '', website: '', linkedin: '' },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
}

export const FONT_OPTIONS = [
  'Inter', 'Roboto', 'Lato', 'Playfair Display', 'Merriweather',
  'Poppins', 'Open Sans', 'Raleway', 'Montserrat', 'Source Serif Pro',
  'Nunito', 'Cabin', 'PT Sans', 'PT Serif', 'Libre Baskerville',
  'Josefin Sans', 'Work Sans', 'DM Sans', 'Rubik', 'Bitter',
  'Crimson Text', 'Cormorant Garamond', 'EB Garamond', 'Mukta', 'Karla',
]

export const COLOR_PRESETS = [
  // Blues
  '#1e3a5f', // Navy
  '#1e40af', // Royal Blue
  '#2563eb', // Blue
  '#3b82f6', // Light Blue
  '#0ea5e9', // Sky Blue
  '#06b6d4', // Cyan
  // Greens
  '#166534', // Forest Green
  '#15803d', // Green
  '#059669', // Emerald
  '#0d9488', // Teal
  '#10b981', // Mint
  '#84cc16', // Lime
  // Reds & Pinks
  '#7f1d1d', // Burgundy
  '#991b1b', // Dark Red
  '#dc2626', // Red
  '#e11d48', // Rose
  '#f43f5e', // Pink
  '#ec4899', // Hot Pink
  '#db2777', // Magenta
  // Oranges & Yellows
  '#ea580c', // Orange
  '#f97316', // Coral
  '#d97706', // Amber
  '#ca8a04', // Gold
  '#eab308', // Yellow
  // Purples
  '#7c3aed', // Violet
  '#8b5cf6', // Purple
  '#a855f7', // Orchid
  '#4f46e5', // Indigo
  '#6366f1', // Periwinkle
  '#c026d3', // Fuchsia
  // Neutrals
  '#0f172a', // Near Black
  '#1e293b', // Dark Slate
  '#334155', // Charcoal
  '#475569', // Slate
  '#64748b', // Steel Blue
  '#78716c', // Warm Gray
  '#a8a29e', // Stone
  '#92400e', // Brown
  '#78350f', // Dark Brown
  '#44403c', // Espresso
  '#57534e', // Taupe
  '#737373', // Gray
]
