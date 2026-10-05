// Makes an account an admin, creating it if needed. No password is set or
// stored anywhere: the person sets one with "Forgot password?" on /admin/login.
//
//   npm run make-admin -- you@example.com ["Your Name"]
//
// Reads MONGODB_URI from .env.local.
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { randomBytes } from 'node:crypto'
import User from '../src/models/User.js'

const email = process.argv[2]?.trim().toLowerCase()
const name = process.argv[3]?.trim() || 'George Kibe'
if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error('Usage: npm run make-admin -- you@example.com ["Your Name"]')
  process.exit(1)
}
if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not set (see .env.example).')

await mongoose.connect(process.env.MONGODB_URI)
await User.init()
const existing = await User.findOne({ email })
if (existing) {
  await User.updateOne({ _id: existing._id }, { role: 'admin' })
  console.log(`${email} is now an admin (password unchanged).`)
} else {
  // A random, never-revealed password: the account can only be used after a reset.
  const passwordHash = await bcrypt.hash(randomBytes(32).toString('base64url'), 12)
  await User.create({ name, email, role: 'admin', passwordHash })
  console.log(`Created admin ${email}. Set a password with "Forgot password?" on /admin/login.`)
}
await mongoose.disconnect()
