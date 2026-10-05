import React from 'react'
import { Field, inputClass } from './ui'
import CoverImageField from './CoverImageField'

const BrandFields = ({ brand = {} }) => (
  <>
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Name" htmlFor="b-name">
        <input id="b-name" name="name" required defaultValue={brand.name} className={inputClass} />
      </Field>
      <Field label="Website" htmlFor="b-website" hint="Optional. Makes the logo a link.">
        <input id="b-website" name="website" type="url" defaultValue={brand.website} placeholder="https://…" className={inputClass} />
      </Field>
    </div>
    <div>
      <p className="mb-1.5 text-sm font-semibold">Logo</p>
      <CoverImageField name="logo" target="brands" contain defaultValue={brand.logo}
 emptyText="No logo yet. The name is shown as a wordmark instead." />
      <p className="mt-1 text-xs text-muted">A transparent PNG or SVG works best. It&apos;s shown in greyscale until hovered.</p>
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Order" htmlFor="b-order" hint="Lower numbers show first.">
        <input id="b-order" name="order" type="number" defaultValue={brand.order ?? 0} className={inputClass} />
      </Field>
      <label className="flex items-center gap-2 self-center pt-5 font-semibold">
        <input type="checkbox" name="published" defaultChecked={brand.published ?? true} className="size-5" />
        Show on the site
      </label>
    </div>
  </>
)

export default BrandFields
