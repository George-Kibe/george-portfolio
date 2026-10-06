import React from 'react'
import { Field, inputClass } from './ui'
import CoverImageField from './CoverImageField'

const ProjectFields = ({ project = {} }) => (
  <>
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Title" htmlFor="pr-title">
        <input id="pr-title" name="title" required defaultValue={project.title} className={inputClass} />
      </Field>
      <Field label="Type" htmlFor="pr-type" hint="Shown above the title, e.g. Web Application.">
        <input id="pr-type" name="type" list="pr-types" defaultValue={project.type} className={inputClass} />
        <datalist id="pr-types">
          <option value="Web Application" />
          <option value="Mobile Application" />
          <option value="Website" />
          <option value="Data Engineering" />
          <option value="Automation" />
        </datalist>
      </Field>
    </div>
    <Field label="Summary" htmlFor="pr-summary" hint="Two or three sentences on what it does and how it was built.">
      <textarea id="pr-summary" name="summary" rows={4} required maxLength={1000} defaultValue={project.summary} className={inputClass} />
    </Field>
    <div>
      <p className="mb-1.5 text-sm font-semibold">Image</p>
      <CoverImageField name="image" target="projects" defaultValue={project.image}
        emptyText="No image yet. A screenshot (16:9) works best." />
      <p className="mt-1 text-xs text-dark/65 dark:text-light/65">
        Uploaded to Cloudinary at full quality; each visitor gets a resized WebP/AVIF copy, cropped to 16:9.
      </p>
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Live link" htmlFor="pr-link" hint="Website, App Store or Google Play URL.">
        <input id="pr-link" name="link" type="url" defaultValue={project.link} placeholder="https://…" className={inputClass} />
      </Field>
      <Field label="GitHub" htmlFor="pr-github" hint="Optional. Source code link.">
        <input id="pr-github" name="github" type="url" defaultValue={project.github} placeholder="https://github.com/…" className={inputClass} />
      </Field>
    </div>
    <div className="grid gap-4 sm:grid-cols-3">
      <Field label="Order" htmlFor="pr-order" hint="Lower numbers show first.">
        <input id="pr-order" name="order" type="number" defaultValue={project.order ?? 0} className={inputClass} />
      </Field>
      <label className="flex items-center gap-2 self-center pt-5 font-semibold">
        <input type="checkbox" name="featured" defaultChecked={project.featured} className="size-5" />
        Featured (full row)
      </label>
      <label className="flex items-center gap-2 self-center pt-5 font-semibold">
        <input type="checkbox" name="published" defaultChecked={project.published ?? true} className="size-5" />
        Show on the site
      </label>
    </div>
  </>
)

export default ProjectFields
