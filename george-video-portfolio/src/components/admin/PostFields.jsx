import React from 'react'
import { Field, inputClass } from './ui'
import CoverImageField from './CoverImageField'
import RichTextEditor from './RichTextEditor'

const PostFields = ({ post = {} }) => (
  <>
    <Field label="Title" htmlFor="p-title">
      <input id="p-title" name="title" required defaultValue={post.title} className={inputClass} />
    </Field>
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Slug" htmlFor="p-slug" hint="The URL: /articles/your-slug. Leave blank to build it from the title.">
        <input id="p-slug" name="slug" defaultValue={post.slug} className={inputClass} />
      </Field>
      <Field label="Tags" htmlFor="p-tags" hint="Comma separated, e.g. Colour grading, DaVinci Resolve">
        <input id="p-tags" name="tags" defaultValue={post.tags?.join(', ')} className={inputClass} />
      </Field>
    </div>
    <Field label="Excerpt" htmlFor="p-excerpt" hint="One or two sentences for the article list and search results.">
      <textarea id="p-excerpt" name="excerpt" rows={2} maxLength={400} defaultValue={post.excerpt} className={inputClass} />
    </Field>
    <div>
      <p className="mb-1.5 text-sm font-semibold">Cover image</p>
      <CoverImageField name="coverImage" defaultValue={post.coverImage} />
    </div>
    <div>
      <p id="p-content-label" className="mb-1.5 text-sm font-semibold">Content</p>
      <RichTextEditor name="content" defaultValue={post.content} labelledBy="p-content-label" />
    </div>
    <label className="flex items-center gap-2 font-semibold">
      <input type="checkbox" name="published" defaultChecked={post.published} className="size-5" />
      Published
    </label>
  </>
)

export default PostFields
