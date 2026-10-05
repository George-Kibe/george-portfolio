import mongoose from 'mongoose'
import defineModel from './defineModel.js'

const LineItemSchema = new mongoose.Schema(
  { label: String, low: Number, high: Number },
  { _id: false }
)

const QuoteSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, lowercase: true, trim: true, maxlength: 200 },
    details: { type: String, trim: true, maxlength: 5000, default: '' },
    projectType: { type: String, required: true },
    features: { type: [String], default: [] },
    timeline: { type: String, required: true },
    items: { type: [LineItemSchema], default: [] },
    estimateLow: { type: Number, required: true },
    estimateHigh: { type: Number, required: true },
    weeksLow: Number,
    weeksHigh: Number,
    status: { type: String, enum: ['new', 'contacted', 'quoted', 'won', 'lost'], default: 'new' },
    adminNotes: { type: String, trim: true, maxlength: 5000, default: '' },
    source: { type: String, enum: ['website', 'admin'], default: 'website' },
  },
  { timestamps: true }
)

QuoteSchema.index({ createdAt: -1 })

export default defineModel('Quote', QuoteSchema)
