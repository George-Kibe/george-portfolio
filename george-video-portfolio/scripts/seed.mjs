// Seeds content: starter blog posts (with covers), testimonial drafts and the
// old placeholder projects as hidden drafts. Admin accounts are not seeded;
// use `bun run make-admin -- <email>`.
//
//   bun run seed
//
// Safe to re-run: everything is inserted only if missing, so edits made in the
// admin panel are never overwritten.
import mongoose from 'mongoose'
import { marked } from 'marked'
import { readFile } from 'node:fs/promises'
import Post from '../src/models/Post.js'
import Testimonial from '../src/models/Testimonial.js'
import Project from '../src/models/Project.js'
import { POSTS } from './seed-posts.mjs'
import { TESTIMONIALS, PROJECT_DRAFTS } from './seed-home.mjs'

const { MONGODB_URI } = process.env
if (!MONGODB_URI) throw new Error('MONGODB_URI is not set (see .env.example).')
await mongoose.connect(MONGODB_URI)
await Post.init() // build unique indexes before inserting

// ---- Content -----------------------------------------------------------------
// Cover images already uploaded to Cloudinary (gk-video/blog/cover-<slug>).
const COVERS = JSON.parse(await readFile(new URL('./blog-covers.json', import.meta.url), 'utf8').catch(() => '{}'))

const insertMissing = async (Model, key, items, extra = {}) => {
  let n = 0
  for (const item of items) {
    const r = await Model.updateOne({ [key]: item[key] }, { $setOnInsert: { ...item, ...extra(item) } }, { upsert: true })
    if (r.upsertedCount) n++
  }
  return n
}

const posts = await insertMissing(Post, 'slug', POSTS, (post) => ({
  content: marked.parse(post.content),
  coverImage: COVERS[post.slug] ?? '',
  published: true,
  publishedAt: new Date(post.publishedAt),
}))
console.log(`Posts: ${posts} added, ${POSTS.length - posts} already present.`)

const testimonials = await insertMissing(Testimonial, 'name', TESTIMONIALS, () => ({ published: false }))
console.log(`Testimonials: ${testimonials} added as hidden drafts.`)

const projects = await insertMissing(Project, 'title', PROJECT_DRAFTS, () => ({ published: false, featured: false }))
console.log(`Projects: ${projects} placeholder drafts added (hidden).`)

await mongoose.disconnect()
