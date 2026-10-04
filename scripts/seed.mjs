// Seeds the database: the admin account, starter blog posts, brands and
// testimonial drafts.
//
//   npm run seed
//
// Reads MONGODB_URI, ADMIN_EMAIL and ADMIN_PASSWORD from .env.local. Safe to
// re-run: the admin account is created or has its password reset, and posts
// are inserted only if their slug doesn't exist yet, so edits made in the
// admin panel are never overwritten.
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { marked } from 'marked'
import User from '../src/models/User.js'
import Post from '../src/models/Post.js'
import Brand from '../src/models/Brand.js'
import Testimonial from '../src/models/Testimonial.js'
import { POSTS } from './seed-posts.mjs'
import { BRANDS, TESTIMONIALS } from './seed-home.mjs'
import { readFile } from 'node:fs/promises'

const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env

if (!MONGODB_URI) throw new Error('MONGODB_URI is not set (see .env.example).')
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set.')
if (ADMIN_PASSWORD.length < 12) throw new Error('ADMIN_PASSWORD must be at least 12 characters.')

await mongoose.connect(MONGODB_URI)
await Promise.all([User.init(), Post.init()]) // build unique indexes before inserting

const email = ADMIN_EMAIL.trim().toLowerCase()
const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12)
const admin = await User.findOneAndUpdate(
  { email },
  { $set: { role: 'admin', passwordHash }, $setOnInsert: { name: 'George Kibe', email, emailVerifiedAt: new Date() } },
  { upsert: true, returnDocument: 'after' }
)
console.log(`Admin ready: ${admin.email}`)

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
console.log(`Testimonials: ${await upsertByName(Testimonial, TESTIMONIALS, { published: false })} added as hidden drafts.`)

await mongoose.disconnect()
