import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignJWT, jwtVerify } from 'jose'
import { connectDB } from '@/lib/db'
import User from '@/models/User'

// Stateless sessions: a signed JWT in an httpOnly cookie, following the Next
// authentication guide. The token only says who you are; anything that grants
// power (admin) is re-checked against the database on every use, so demoting
// or deleting an account takes effect immediately.

// Distinct per app: both run on localhost in development, where cookies are
// shared across ports, so a shared name made each app sign the other out.
const COOKIE = 'gkv_session'
const MAX_AGE_DAYS = 7

const key = () => {
  const secret = process.env.SESSION_SECRET
  if (!secret || secret.length < 32) {
    throw new Error('SESSION_SECRET must be set to a random string of at least 32 characters.')
  }
  return new TextEncoder().encode(secret)
}

export async function createSession(user) {
  const expires = new Date(Date.now() + MAX_AGE_DAYS * 24 * 60 * 60 * 1000)
  const token = await new SignJWT({ userId: String(user._id), name: user.name })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expires)
    .sign(key())

  const store = await cookies()
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires,
  })
}

export async function deleteSession() {
  const store = await cookies()
  store.delete(COOKIE)
}

// The signed-in user (id, name, email, role) or null. Cached per request.
export const getCurrentUser = cache(async () => {
  const token = (await cookies()).get(COOKIE)?.value
  if (!token) return null
  let payload
  try {
    ;({ payload } = await jwtVerify(token, key(), { algorithms: ['HS256'] }))
  } catch {
    return null
  }
  await connectDB()
  const user = await User.findById(payload.userId).select('name email role emailVerifiedAt').lean()
  if (!user) return null
  return { id: String(user._id), name: user.name, email: user.email, role: user.role, verified: Boolean(user.emailVerifiedAt) }
})

// For pages: send visitors who aren't admins to the admin sign-in.
export async function requireAdminPage() {
  const user = await getCurrentUser()
  if (user?.role !== 'admin') redirect('/admin/login')
  return user
}

// For server actions, which are public endpoints whatever page renders them.
export async function assertAdmin() {
  const user = await getCurrentUser()
  if (user?.role !== 'admin') throw new Error('Not authorised')
  return user
}
