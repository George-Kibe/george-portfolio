import mongoose from 'mongoose'
import defineModel from './defineModel.js'

// A video in the portfolio. `videoUrl` is a YouTube or Vimeo link, played in
// a privacy-friendly embed; `thumbnail` is a Cloudinary image.
const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    category: { type: String, required: true, trim: true, maxlength: 60 },
    client: { type: String, trim: true, maxlength: 120, default: '' },
    description: { type: String, trim: true, maxlength: 600, default: '' },
    thumbnail: { type: String, trim: true, default: '' },
    videoUrl: { type: String, trim: true, default: '' },
    duration: { type: String, trim: true, maxlength: 12, default: '' }, // "3:45"
    year: { type: Number, min: 1990, max: 2100 },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

ProjectSchema.index({ published: 1, order: 1, year: -1 })

export default defineModel('Project', ProjectSchema)
