import React from 'react'
import { Field, inputClass } from './ui'
import CoverImageField from './CoverImageField'
import { PROJECT_CATEGORIES } from '@/lib/video'

const ProjectFields = ({ project = {} }) => (
  <>
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Title" htmlFor="pr-title">
        <input id="pr-title" name="title" required defaultValue={project.title} className={inputClass} />
      </Field>
      <Field label="Category" htmlFor="pr-category" hint="Pick one or type your own. Filters on the Projects page are built from these.">
        <input id="pr-category" name="category" required list="pr-categories" defaultValue={project.category} className={inputClass} />
        <datalist id="pr-categories">
          {PROJECT_CATEGORIES.map((c) => <option key={c} value={c} />)}
        </datalist>
      </Field>
      <Field label="Client" htmlFor="pr-client" hint="Optional.">
        <input id="pr-client" name="client" defaultValue={project.client} className={inputClass} />
      </Field>
      <Field label="Video link" htmlFor="pr-video" hint="YouTube or Vimeo. Plays in a pop-up on the site.">
        <input id="pr-video" name="videoUrl" type="url" defaultValue={project.videoUrl} placeholder="https://youtu.be/…" className={inputClass} />
      </Field>
    </div>
    <Field label="Description" htmlFor="pr-desc" hint="One or two sentences.">
      <textarea id="pr-desc" name="description" rows={3} maxLength={600} defaultValue={project.description} className={inputClass} />
    </Field>
    <div>
      <p className="mb-1.5 text-sm font-semibold">Thumbnail</p>
      <CoverImageField name="thumbnail" target="projects" defaultValue={project.thumbnail}
        emptyText="No thumbnail. YouTube videos use their own thumbnail." />
    </div>
    <div className="grid gap-4 sm:grid-cols-3">
      <Field label="Duration" htmlFor="pr-duration" hint="e.g. 3:45">
        <input id="pr-duration" name="duration" defaultValue={project.duration} placeholder="3:45" className={inputClass} />
      </Field>
      <Field label="Year" htmlFor="pr-year">
        <input id="pr-year" name="year" type="number" min="1990" max="2100" defaultValue={project.year} className={inputClass} />
      </Field>
      <Field label="Order" htmlFor="pr-order" hint="Lower numbers show first.">
        <input id="pr-order" name="order" type="number" defaultValue={project.order ?? 0} className={inputClass} />
      </Field>
    </div>
    <div className="flex flex-wrap gap-6">
      <label className="flex items-center gap-2 font-semibold">
        <input type="checkbox" name="published" defaultChecked={project.published} className="size-5" />
        Show on the site
      </label>
      <label className="flex items-center gap-2 font-semibold">
        <input type="checkbox" name="featured" defaultChecked={project.featured} className="size-5" />
        Feature on the home page
      </label>
    </div>
  </>
)

export default ProjectFields
