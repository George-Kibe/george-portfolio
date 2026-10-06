'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import { assertAdmin, getCurrentUser } from '@/lib/session'
import { slugify } from '@/lib/slug'
import { sanitizePostHtml, stripHtml } from '@/lib/html'
import { signImageUpload } from '@/lib/cloudinary'
import { isCloudinary } from '@/lib/cloudinaryUrl'
import Post from '@/models/Post'
import Comment from '@/models/Comment'
import Testimonial from '@/models/Testimonial'
import Brand from '@/models/Brand'
import Project from '@/models/Project'

const clean = (v, max) => String(v ?? '').trim().slice(0, max)

// Public pages that show this content and must refresh when it changes.
const refreshBlog = (slug) => {
  revalidatePath('/articles')
  if (slug) revalidatePath(`/articles/${slug}`)
  revalidatePath('/sitemap.xml')
  revalidatePath('/admin', 'layout')
}
// Home page (testimonials, brands) and the admin panel.
const refreshHome = () => {
  revalidatePath('/')
  revalidatePath('/admin', 'layout')
}

// ---- Blog posts (admin) ---------------------------------------------------

function readPost(formData) {
  const title = clean(formData.get('title'), 200)
  return {
    title,
    slug: slugify(clean(formData.get('slug'), 120) || title),
    excerpt: clean(formData.get('excerpt'), 400),
    content: sanitizePostHtml(formData.get('content')).trim(),
    coverImage: clean(formData.get('coverImage'), 500),
    tags: clean(formData.get('tags'), 300).split(',').map((t) => t.trim()).filter(Boolean).slice(0, 8),
    published: formData.get('published') === 'on',
  }
}

const validatePost = (data) => {
  if (!data.title) return 'Title is required.'
  if (!data.slug) return 'Slug is required.'
  if (!stripHtml(data.content).trim() && !data.content.includes('<img')) return 'Content is required.'
  if (data.coverImage && !/^(https:\/\/|\/)/.test(data.coverImage)) return 'Cover image must be an https:// URL or a /path.'
  return null
}

export async function createPost(_prev, formData) {
  await assertAdmin()
  const data = readPost(formData)
  const error = validatePost(data)
  if (error) return { ok: false, error }

  await connectDB()
  if (await Post.exists({ slug: data.slug })) return { ok: false, error: 'Another post already uses that slug.' }
  const post = await Post.create({ ...data, publishedAt: data.published ? new Date() : undefined })
  refreshBlog(post.slug)
  redirect(`/admin/blog/${post._id}?saved=1`)
}

export async function updatePost(id, _prev, formData) {
  await assertAdmin()
  const data = readPost(formData)
  const error = validatePost(data)
  if (error) return { ok: false, error }

  await connectDB()
  const existing = await Post.findById(id)
  if (!existing) return { ok: false, error: 'That post no longer exists.' }
  if (await Post.exists({ slug: data.slug, _id: { $ne: id } })) return { ok: false, error: 'Another post already uses that slug.' }

  const oldSlug = existing.slug
  Object.assign(existing, data)
  // First publish stamps the date; unpublishing keeps it for a later re-publish.
  if (data.published && !existing.publishedAt) existing.publishedAt = new Date()
  await existing.save()
  refreshBlog(oldSlug)
  refreshBlog(existing.slug)
  return { ok: true, message: 'Saved.' }
}

export async function deletePost(id) {
  await assertAdmin()
  await connectDB()
  const post = await Post.findByIdAndDelete(id)
  if (post) {
    await Comment.deleteMany({ post: post._id })
    refreshBlog(post.slug)
  }
}

// Signed parameters for uploading a blog image directly to Cloudinary.
export async function getUploadSignature(target = 'blog') {
  await assertAdmin()
  return signImageUpload(target)
}

// ---- Comments -------------------------------------------------------------

export async function addComment(postId, _prev, formData) {
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: 'Please sign in to comment.' }

  const body = clean(formData.get('body'), 2000)
  if (body.length < 2) return { ok: false, error: 'Write a comment first.' }

  await connectDB()
  const post = await Post.findOne({ _id: postId, published: true }).select('slug')
  if (!post) return { ok: false, error: 'This article is no longer available.' }

  // At most one comment every 20 seconds per person.
  const recent = await Comment.exists({ user: user.id, createdAt: { $gt: new Date(Date.now() - 20_000) } })
  if (recent) return { ok: false, error: 'You’re commenting quickly. Wait a few seconds and try again.' }

  await Comment.create({ post: post._id, user: user.id, body })
  revalidatePath(`/articles/${post.slug}`)
  revalidatePath('/admin', 'layout')
  return { ok: true }
}

// Authors can remove their own comments; admins can remove any.
export async function deleteComment(commentId) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Not authorised')

  await connectDB()
  const comment = await Comment.findById(commentId).populate('post', 'slug')
  if (!comment) return
  if (user.role !== 'admin' && String(comment.user) !== user.id) throw new Error('Not authorised')

  await comment.deleteOne()
  if (comment.post?.slug) revalidatePath(`/articles/${comment.post.slug}`)
  revalidatePath('/admin', 'layout')
}

// ---- Testimonials (admin) -------------------------------------------------

function readTestimonial(formData) {
  const rating = Number(formData.get('rating'))
  return {
    name: clean(formData.get('name'), 120),
    role: clean(formData.get('role'), 160),
    quote: clean(formData.get('quote'), 1500),
    rating: Number.isInteger(rating) && rating >= 1 && rating <= 5 ? rating : 5,
    order: Number(formData.get('order')) || 0,
    published: formData.get('published') === 'on',
  }
}

const validateTestimonial = (data) =>
  !data.name ? 'Name is required.' : !data.quote ? 'The testimonial text is required.' : null

export async function createTestimonial(_prev, formData) {
  await assertAdmin()
  const data = readTestimonial(formData)
  const error = validateTestimonial(data)
  if (error) return { ok: false, error }

  await connectDB()
  await Testimonial.create(data)
  refreshHome()
  redirect('/admin/testimonials?saved=1')
}

export async function updateTestimonial(id, _prev, formData) {
  await assertAdmin()
  const data = readTestimonial(formData)
  const error = validateTestimonial(data)
  if (error) return { ok: false, error }

  await connectDB()
  await Testimonial.findByIdAndUpdate(id, data)
  refreshHome()
  return { ok: true, message: 'Saved.' }
}

export async function deleteTestimonial(id) {
  await assertAdmin()
  await connectDB()
  await Testimonial.findByIdAndDelete(id)
  refreshHome()
}

// ---- Brands (admin) -------------------------------------------------------

function readBrand(formData) {
  return {
    name: clean(formData.get('name'), 120),
    logo: clean(formData.get('logo'), 500),
    website: clean(formData.get('website'), 300),
    order: Number(formData.get('order')) || 0,
    published: formData.get('published') === 'on',
  }
}

const validateBrand = (data) => {
  if (!data.name) return 'Name is required.'
  if (data.website && !/^https?:\/\//.test(data.website)) return 'Website must start with https:// (or http://).'
  if (data.logo && !/^https:\/\//.test(data.logo)) return 'Logo must be an https:// URL.'
  return null
}

export async function createBrand(_prev, formData) {
  await assertAdmin()
  const data = readBrand(formData)
  const error = validateBrand(data)
  if (error) return { ok: false, error }

  await connectDB()
  await Brand.create(data)
  refreshHome()
  redirect('/admin/brands?saved=1')
}

export async function updateBrand(id, _prev, formData) {
  await assertAdmin()
  const data = readBrand(formData)
  const error = validateBrand(data)
  if (error) return { ok: false, error }

  await connectDB()
  await Brand.findByIdAndUpdate(id, data)
  refreshHome()
  return { ok: true, message: 'Saved.' }
}

export async function deleteBrand(id) {
  await assertAdmin()
  await connectDB()
  await Brand.findByIdAndDelete(id)
  refreshHome()
}

// ---- Projects (admin) -----------------------------------------------------

const refreshProjects = () => {
  revalidatePath('/projects')
  revalidatePath('/admin', 'layout')
}

function readProject(formData) {
  return {
    title: clean(formData.get('title'), 160),
    type: clean(formData.get('type'), 80),
    summary: clean(formData.get('summary'), 1000),
    image: clean(formData.get('image'), 500),
    link: clean(formData.get('link'), 300),
    github: clean(formData.get('github'), 300),
    order: Number(formData.get('order')) || 0,
    featured: formData.get('featured') === 'on',
    published: formData.get('published') === 'on',
  }
}

const validateProject = (data) => {
  if (!data.title) return 'Title is required.'
  if (!data.summary) return 'Summary is required.'
  if (data.link && !/^https?:\/\//.test(data.link)) return 'Live link must start with https:// (or http://).'
  if (data.github && !/^https?:\/\//.test(data.github)) return 'GitHub link must start with https:// (or http://).'
  // Uploads only: Cloudinary does the resizing, format and blur placeholder.
  if (data.image && !isCloudinary(data.image)) return 'Upload the image here so it is served from Cloudinary.'
  return null
}

export async function createProject(_prev, formData) {
  await assertAdmin()
  const data = readProject(formData)
  const error = validateProject(data)
  if (error) return { ok: false, error }

  await connectDB()
  await Project.create(data)
  refreshProjects()
  redirect('/admin/projects?saved=1')
}

export async function updateProject(id, _prev, formData) {
  await assertAdmin()
  const data = readProject(formData)
  const error = validateProject(data)
  if (error) return { ok: false, error }

  await connectDB()
  await Project.findByIdAndUpdate(id, data)
  refreshProjects()
  return { ok: true, message: 'Saved.' }
}

export async function deleteProject(id) {
  await assertAdmin()
  await connectDB()
  await Project.findByIdAndDelete(id)
  refreshProjects()
}
