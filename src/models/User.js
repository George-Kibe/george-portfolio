import mongoose from 'mongoose'
import defineModel from './defineModel.js'

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    // Verification is optional: unverified members can sign in and comment.
    emailVerifiedAt: { type: Date, default: null },
    // Only SHA-256 hashes of emailed tokens are stored, never the tokens.
    verifyTokenHash: { type: String, select: false, index: true, sparse: true },
    verifyTokenExpires: { type: Date, select: false },
    verifySentAt: { type: Date, select: false },
    resetTokenHash: { type: String, select: false, index: true, sparse: true },
    resetTokenExpires: { type: Date, select: false },
    resetSentAt: { type: Date, select: false },
  },
  { timestamps: true }
)

export default defineModel('User', UserSchema)
