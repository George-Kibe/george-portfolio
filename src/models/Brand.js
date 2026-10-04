import mongoose from 'mongoose'
import defineModel from './defineModel.js'

// Companies George has worked with, shown in the home page marquee.
const BrandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    logo: { type: String, trim: true, default: '' }, // Cloudinary URL; without one the name is shown as a wordmark
    website: { type: String, trim: true, default: '' },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default defineModel('Brand', BrandSchema)
