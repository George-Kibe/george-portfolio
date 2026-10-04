import 'server-only'
import { connectDB, serialize } from '@/lib/db'
import { reportError } from '@/lib/reportError'
import Post from '@/models/Post'
import Comment from '@/models/Comment'
import Testimonial from '@/models/Testimonial'
import Brand from '@/models/Brand'
import '@/models/User' // registers the model for populate()

// Public reads. They return empty results instead of throwing, so a database
// outage (or a build with no MONGODB_URI) degrades to an empty section rather
// than a broken page.
const safely = async (where, fallback, fn) => {
  try {
    await connectDB()
    return serialize(await fn())
  } catch (error) {
    reportError(error, { where })
    return fallback
  }
}

export const getPublishedPosts = () =>
  safely('getPublishedPosts', [], () =>
    Post.find({ published: true }).sort({ publishedAt: -1 }).select('-content').lean())

export const getPublishedPost = (slug) =>
  safely('getPublishedPost', null, () => Post.findOne({ slug, published: true }).lean())

export const getComments = (postId) =>
  safely('getComments', [], () =>
    Comment.find({ post: postId }).sort({ createdAt: 1 }).populate('user', 'name').lean())

export const getPublishedTestimonials = () =>
  safely('getPublishedTestimonials', [], () =>
    Testimonial.find({ published: true }).sort({ order: 1, createdAt: -1 }).lean())

export const getPublishedBrands = () =>
  safely('getPublishedBrands', [], () =>
    Brand.find({ published: true }).sort({ order: 1, name: 1 }).lean())

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// Search filter over title, excerpt and tags. Plain case-insensitive matching
// is plenty for a personal blog and needs no extra index.
export const postSearchFilter = (q) => {
  const term = String(q ?? '').trim().slice(0, 100)
  if (!term) return {}
  const rx = new RegExp(escapeRegex(term), 'i')
  return { $or: [{ title: rx }, { excerpt: rx }, { tags: rx }] }
}

// One page of published posts, newest first.
export const getPublishedPostsPage = ({ page = 1, perPage = 9, q = '' } = {}) =>
  safely('getPublishedPostsPage', { posts: [], total: 0, page: 1, pages: 1 }, async () => {
    const filter = { published: true, ...postSearchFilter(q) }
    const total = await Post.countDocuments(filter)
    const pages = Math.max(1, Math.ceil(total / perPage))
    const current = Math.min(Math.max(1, page), pages)
    const posts = await Post.find(filter).sort({ publishedAt: -1, _id: -1 }).skip((current - 1) * perPage).limit(perPage).select('-content').lean()
    return { posts, total, page: current, pages }
  })
