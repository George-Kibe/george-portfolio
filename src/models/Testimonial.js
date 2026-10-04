import mongoose from 'mongoose'
import defineModel from './defineModel.js'

const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    role: { type: String, trim: true, maxlength: 160, default: '' }, // e.g. "CEO, Acme"
    quote: { type: String, required: true, trim: true, maxlength: 1500 },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    published: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default defineModel('Testimonial', TestimonialSchema)
