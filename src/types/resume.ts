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
]

export const COLOR_PRESETS = [
  '#2563eb', '#dc2626', '#059669', '#7c3aed', '#ea580c', '#0891b2',
  '#4f46e5', '#be185d', '#15803d', '#b45309', '#6366f1', '#334155',
]
