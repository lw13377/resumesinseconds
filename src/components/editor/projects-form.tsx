'use client'

import { useCallback, useMemo } from 'react'
import { FolderOpen, Lightbulb, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useResume } from '@/hooks/use-resume'
import { getTechSuggestionsFromSkills } from '@/lib/suggestion-data'
import type { Project } from '@/types/resume'
import { CollapsibleSection } from './collapsible-section'

export function ProjectsForm() {
  const { content, updateContent, toggleSection } = useResume()
  const projects = content.projects
  const hidden = content.hiddenSections?.includes('projects') ?? false

  const addProject = useCallback(() => {
    const newEntry: Project = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      url: '',
      technologies: [],
    }
    updateContent('projects', [...projects, newEntry])
  }, [projects, updateContent])

  const removeProject = useCallback(
    (id: string) => {
      updateContent(
        'projects',
        projects.filter((p) => p.id !== id)
      )
    },
    [projects, updateContent]
  )

  const updateProject = useCallback(
    (id: string, field: keyof Project, value: string | string[]) => {
      updateContent(
        'projects',
        projects.map((p) => (p.id === id ? { ...p, [field]: value } : p))
      )
    },
    [projects, updateContent]
  )

  const updateTechnologies = useCallback(
    (id: string, techStr: string) => {
      const technologies = techStr
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
      updateProject(id, 'technologies', technologies)
    },
    [updateProject]
  )

  // Get tech suggestions based on skills already entered
  const allSkills = useMemo(
    () => content.skills.flatMap((s) => s.items),
    [content.skills]
  )
  const techSuggestions = useMemo(
    () => getTechSuggestionsFromSkills(allSkills),
    [allSkills]
  )

  return (
    <CollapsibleSection
      title="Projects"
      icon={<FolderOpen className="h-4 w-4" />}
      sectionKey="projects"
      hidden={hidden}
      onToggleVisibility={() => toggleSection('projects')}
    >
      {projects.length === 0 ? (
        <div className="flex flex-col items-center rounded-lg border border-dashed py-8">
          <p className="mb-3 text-sm text-muted-foreground">
            No projects yet
          </p>
          <Button variant="outline" size="sm" onClick={addProject}>
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="relative rounded-lg border bg-background p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  Project {index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => removeProject(project.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>

              {/* Row 1: Name, URL */}
              <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Project Name</Label>
                  <Input
                    value={project.name}
                    onChange={(e) =>
                      updateProject(project.id, 'name', e.target.value)
                    }
                    placeholder="My Awesome Project"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>URL</Label>
                  <Input
                    value={project.url}
                    onChange={(e) =>
                      updateProject(project.id, 'url', e.target.value)
                    }
                    placeholder="https://github.com/user/project"
                  />
                </div>
              </div>

              {/* Row 2: Description */}
              <div className="mb-3 space-y-1.5">
                <Label>Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) =>
                    updateProject(project.id, 'description', e.target.value)
                  }
                  placeholder="Describe the project, its purpose, and your contributions..."
                  className="min-h-[70px] resize-y"
                />
              </div>

              {/* Row 3: Technologies */}
              <div className="space-y-1.5">
                <Label>Technologies (comma-separated)</Label>
                <Input
                  value={project.technologies.join(', ')}
                  onChange={(e) =>
                    updateTechnologies(project.id, e.target.value)
                  }
                  placeholder="React, TypeScript, Node.js"
                />
                {techSuggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {techSuggestions
                      .filter((t) => !project.technologies.some((pt) => pt.toLowerCase() === t.toLowerCase()))
                      .slice(0, 8)
                      .map((tech) => (
                        <button
                          key={tech}
                          type="button"
                          onClick={() =>
                            updateProject(project.id, 'technologies', [...project.technologies, tech])
                          }
                          className="inline-flex items-center gap-0.5 rounded-full border bg-background px-2 py-0.5 text-[10px] font-medium transition-colors hover:bg-accent"
                        >
                          <Plus className="h-2.5 w-2.5" />
                          {tech}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          <Button variant="outline" size="sm" onClick={addProject}>
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </div>
      )}
    </CollapsibleSection>
  )
}
