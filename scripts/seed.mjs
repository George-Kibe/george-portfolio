// Seeds content: starter blog posts (with covers), brands, projects and
// testimonial drafts. Admin accounts are not seeded; use `npm run make-admin -- <email>`.
//
//   npm run seed
//
// Reads MONGODB_URI from .env.local. Safe to re-run: everything is inserted
// only if missing, so edits made in the admin panel are never overwritten.
import mongoose from 'mongoose'
import { marked } from 'marked'
import Post from '../src/models/Post.js'
import Brand from '../src/models/Brand.js'
import Testimonial from '../src/models/Testimonial.js'
import Project from '../src/models/Project.js'
import { POSTS } from './seed-posts.mjs'
import { BRANDS, PROJECTS, TESTIMONIALS } from './seed-home.mjs'
import { readFile } from 'node:fs/promises'

const { MONGODB_URI } = process.env
if (!MONGODB_URI) throw new Error('MONGODB_URI is not set (see .env.example).')

await mongoose.connect(MONGODB_URI)
await Post.init() // build unique indexes before inserting

// Cover images already uploaded to Cloudinary (gk-portfolio/blog/cover-<slug>).
const COVERS = JSON.parse(await readFile(new URL('./blog-covers.json', import.meta.url), 'utf8'))

let added = 0
for (const post of POSTS) {
  const result = await Post.updateOne(
    { slug: post.slug },
    // Starter posts are written in Markdown and stored as HTML, the same
    // format the admin panel's Tiptap editor produces.
    { $setOnInsert: { ...post, content: marked.parse(post.content), coverImage: COVERS[post.slug] ?? '', published: true, publishedAt: new Date(post.publishedAt) } },
    { upsert: true }
  )
  if (result.upsertedCount) added++
}
console.log(`Posts: ${added} added, ${POSTS.length - added} already present.`)

// Brands (published) and testimonial drafts (hidden), keyed by name so a
// re-run never duplicates or overwrites edits.
const upsertByName = async (Model, items, extra) => {
  let n = 0
  for (const item of items) {
    const r = await Model.updateOne({ name: item.name }, { $setOnInsert: { ...item, ...extra } }, { upsert: true })
    if (r.upsertedCount) n++
  }
  return n
}
console.log(`Brands: ${await upsertByName(Brand, BRANDS, { published: true })} added.`)
// Project images already uploaded to Cloudinary (gk-portfolio/projects/<key>).
const PROJECT_IMAGES = JSON.parse(await readFile(new URL('./project-images.json', import.meta.url), 'utf8'))
let projects = 0
for (const { imageKey, ...project } of PROJECTS) {
  const doc = { ...project, image: PROJECT_IMAGES[imageKey] ?? '', published: true }
  const r = await Project.updateOne({ title: project.title }, { $setOnInsert: doc }, { upsert: true })
  if (r.upsertedCount) projects++
}
console.log(`Projects: ${projects} added.`)
console.log(`Testimonials: ${await upsertByName(Testimonial, TESTIMONIALS, { published: false })} added as hidden drafts.`)

await mongoose.disconnect()
