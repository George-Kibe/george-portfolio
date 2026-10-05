// Seeds the database: the admin account, starter blog posts (with covers),
// testimonial drafts and the old placeholder projects as hidden drafts.
//
//   bun run seed                 # safe to re-run; never overwrites edits
//   bun run seed -- --reset-admin   # also resets the admin password from ADMIN_PASSWORD
//
// The admin account is only created if it doesn't exist yet, so changing your
// password with "Forgot password?" is never undone by a later seed. Posts,
// testimonials and projects are inserted only if missing.
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { marked } from 'marked'
import { readFile } from 'node:fs/promises'
import User from '../src/models/User.js'
import Post from '../src/models/Post.js'
import Testimonial from '../src/models/Testimonial.js'
import Project from '../src/models/Project.js'
import { POSTS } from './seed-posts.mjs'
import { TESTIMONIALS, PROJECT_DRAFTS } from './seed-home.mjs'

const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env
const resetAdmin = process.argv.includes('--reset-admin')

if (!MONGODB_URI) throw new Error('MONGODB_URI is not set (see .env.example).')
await mongoose.connect(MONGODB_URI)
await Promise.all([User.init(), Post.init()]) // build unique indexes before inserting

// ---- Admin -----------------------------------------------------------------
const email = ADMIN_EMAIL?.trim().toLowerCase()
if (!email) {
  console.log('Admin: skipped (ADMIN_EMAIL not set).')
} else {
  const existing = await User.findOne({ email })
  if (existing && !resetAdmin) {
    if (existing.role !== 'admin') await User.updateOne({ _id: existing._id }, { role: 'admin' })
    console.log(`Admin: ${email} already exists (password unchanged).`)
  } else {
    if (!ADMIN_PASSWORD || ADMIN_PASSWORD.length < 12) {
      throw new Error('ADMIN_PASSWORD (12+ characters) is needed to create or reset the admin account.')
    }
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12)
    await User.updateOne(
      { email },
      { $set: { role: 'admin', passwordHash }, $setOnInsert: { name: 'George Kibe', email, emailVerifiedAt: new Date() } },
      { upsert: true }
    )
    console.log(`Admin: ${email} ${existing ? 'password reset' : 'created'}.`)
  }
}

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
