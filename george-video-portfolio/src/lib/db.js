import 'server-only'
import mongoose from 'mongoose'

// One connection per server process. In development, hot reloads re-evaluate
// this module, so the promise is parked on globalThis instead of a module
// variable to avoid opening a new pool on every edit.
const cached = globalThis.__mongoose ?? (globalThis.__mongoose = { conn: null, promise: null })

export async function connectDB() {
  if (cached.conn) return cached.conn
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not set. Add it to .env.local (see .env.example).')

  cached.promise ??= mongoose.connect(uri, { bufferCommands: false, serverSelectionTimeoutMS: 8000 })
  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null // let the next request retry instead of caching the failure
    throw error
  }
  return cached.conn
}

// Mongoose documents aren't plain objects, so they can't cross into client
// components. This turns ids and dates into strings.
export const serialize = (doc) => JSON.parse(JSON.stringify(doc))
