'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { PersonalInfoForm } from './personal-info-form'
import { SummaryForm } from './summary-form'
import { ExperienceForm } from './experience-form'
import { EducationForm } from './education-form'
import { SkillsForm } from './skills-form'
import { ProjectsForm } from './projects-form'
import { CertificationsForm } from './certifications-form'
import { LanguagesForm } from './languages-form'

export function FormPanel() {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-3 p-4">
        <PersonalInfoForm />
        <SummaryForm />
        <ExperienceForm />
        <EducationForm />
        <SkillsForm />
        <ProjectsForm />
        <CertificationsForm />
        <LanguagesForm />
      </div>
    </ScrollArea>
  )
}
