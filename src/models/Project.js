import mongoose from 'mongoose'
import defineModel from './defineModel.js'

// Portfolio projects on /projects. `featured` projects take a full row; the
// rest pair up two to a row in `order`.
const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    type: { type: String, trim: true, default: '' }, // e.g. "Web Application", "Mobile Application"
    summary: { type: String, trim: true, default: '', maxlength: 1000 },
    image: { type: String, trim: true, default: '' }, // Cloudinary URL (gk-portfolio/projects)
    link: { type: String, trim: true, default: '' },
    github: { type: String, trim: true, default: '' },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default defineModel('Project', ProjectSchema)
