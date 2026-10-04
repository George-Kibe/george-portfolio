import React from 'react'
import { Field, inputClass } from './ui'

const TestimonialFields = ({ item = {} }) => (
  <>
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Name" htmlFor="t-name">
        <input id="t-name" name="name" required defaultValue={item.name} className={inputClass} />
      </Field>
      <Field label="Role and company" htmlFor="t-role" hint='e.g. "Managing Director, MyIcebreaker"'>
        <input id="t-role" name="role" defaultValue={item.role} className={inputClass} />
      </Field>
    </div>
    <Field label="Testimonial" htmlFor="t-quote" hint="Use the client's own words, with their permission.">
      <textarea id="t-quote" name="quote" rows={5} required defaultValue={item.quote} className={inputClass} />
    </Field>
    <div className="grid gap-4 sm:grid-cols-3">
      <Field label="Rating" htmlFor="t-rating">
        <select id="t-rating" name="rating" defaultValue={item.rating ?? 5} className={inputClass}>
          {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} star{n > 1 ? 's' : ''}</option>)}
        </select>
      </Field>
      <Field label="Order" htmlFor="t-order" hint="Lower numbers show first.">
        <input id="t-order" name="order" type="number" defaultValue={item.order ?? 0} className={inputClass} />
      </Field>
      <label className="flex items-center gap-2 self-center pt-5 font-semibold">
        <input type="checkbox" name="published" defaultChecked={item.published} className="size-5" />
        Show on the site
      </label>
    </div>
  </>
)

export default TestimonialFields
