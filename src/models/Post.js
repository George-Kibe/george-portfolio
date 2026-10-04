import mongoose from 'mongoose'
import defineModel from './defineModel.js'

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, trim: true, maxlength: 400, default: '' },
    content: { type: String, required: true }, // Markdown
    coverImage: { type: String, trim: true, default: '' },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true }
)

PostSchema.index({ published: 1, publishedAt: -1 })

export default defineModel('Post', PostSchema)
