'use server'

import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import { createSession, deleteSession, getCurrentUser } from '@/lib/session'
import { reportError } from '@/lib/reportError'
import { createToken, hashToken, HOUR } from '@/lib/tokens'
import { resetEmail, sendSafely, siteOrigin, verificationEmail } from '@/lib/mailer'
import User from '@/models/User'

// Passwords are hashed with bcrypt (bcryptjs, cost 12).
const BCRYPT_COST = 12
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD = 8
const RESEND_AFTER_MS = 60 * 1000

// Only ever redirect to a path on this site.
const safeNext = (value, fallback) => {
  const next = String(value ?? '')
  return next.startsWith('/') && !next.startsWith('//') ? next : fallback
}

// Slows password guessing: after 5 misses an email is locked for 15 minutes.
// In memory, so it resets on deploy and isn't shared between instances, which
// is enough for a portfolio-sized site.
const attempts = globalThis.__loginAttempts ?? (globalThis.__loginAttempts = new Map())
const LOCK_AFTER = 5
const LOCK_MS = 15 * 60 * 1000

const isLocked = (email) => {
  const entry = attempts.get(email)
  return entry && entry.count >= LOCK_AFTER && Date.now() - entry.at < LOCK_MS
}
const recordFailure = (email) => {
  const entry = attempts.get(email)
  const fresh = !entry || Date.now() - entry.at > LOCK_MS
  attempts.set(email, { count: fresh ? 1 : entry.count + 1, at: Date.now() })
}

// Issues a fresh verification token and emails the link.
async function sendVerification(user) {
  const { token, hash } = createToken()
  const saved = await User.updateOne({ _id: user._id }, {
    verifyTokenHash: hash, verifyTokenExpires: new Date(Date.now() + 24 * HOUR), verifySentAt: new Date(),
  })
  // Never email a link whose token didn't make it into the database.
  if (!saved.modifiedCount) {
    reportError(new Error('Verification token was not saved'), { where: 'sendVerification' })
    return false
  }
  const link = `${await siteOrigin()}/verify-email?token=${token}`
  return sendSafely('sendVerification', verificationEmail(user, link))
}

// ---- Register -------------------------------------------------------------

export async function signup(_prev, formData) {
  const name = String(formData.get('name') ?? '').trim().slice(0, 80)
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')
  const next = safeNext(formData.get('next'), '/articles')

  const errors = {}
  if (name.length < 2) errors.name = 'Please enter your name.'
  if (!EMAIL.test(email)) errors.email = 'Please enter a valid email address.'
  if (password.length < MIN_PASSWORD) errors.password = `Use at least ${MIN_PASSWORD} characters.`
  if (Object.keys(errors).length) return { errors, values: { name, email } }

  try {
    await connectDB()
    if (await User.exists({ email })) {
      return { errors: { email: 'An account with this email already exists. Sign in instead.' }, values: { name, email } }
    }
    const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, BCRYPT_COST) })
    // Sent, not awaited for success: a mail hiccup mustn't block signing up.
    await sendVerification(user)
    await createSession(user)
  } catch (error) {
    reportError(error, { where: 'signup' })
    return { message: 'Something went wrong creating your account. Please try again.', values: { name, email } }
  }
  redirect(next)
}

// ---- Sign in / out --------------------------------------------------------

export async function login(_prev, formData) {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')
  const adminOnly = formData.get('admin') === '1'
  const next = safeNext(formData.get('next'), adminOnly ? '/admin' : '/articles')
  const invalid = { message: 'Incorrect email or password.', values: { email } }

  if (!EMAIL.test(email) || !password) return invalid
  if (isLocked(email)) return { message: 'Too many attempts. Please wait 15 minutes, or reset your password.', values: { email } }

  try {
    await connectDB()
    const user = await User.findOne({ email }).select('+passwordHash')
    const ok = user && (await bcrypt.compare(password, user.passwordHash))
    if (!ok) {
      recordFailure(email)
      return invalid
    }
    if (adminOnly && user.role !== 'admin') {
      return { message: 'This account doesn’t have admin access.', values: { email } }
    }
    attempts.delete(email)
    await createSession(user)
  } catch (error) {
    reportError(error, { where: 'login' })
    return { message: 'Something went wrong signing you in. Please try again.', values: { email } }
  }
  redirect(next)
}

export async function logout(formData) {
  await deleteSession()
  redirect(safeNext(formData?.get?.('next'), '/'))
}

// ---- Email verification ---------------------------------------------------

export async function resendVerification() {
  const current = await getCurrentUser()
  if (!current) return { ok: false, error: 'Please sign in first.' }
  if (current.verified) return { ok: true, message: 'Your email is already confirmed.' }

  await connectDB()
  const user = await User.findById(current.id).select('+verifySentAt')
  if (user.verifySentAt && Date.now() - user.verifySentAt.getTime() < RESEND_AFTER_MS) {
    return { ok: false, error: 'We just sent one. Give it a minute, and check your spam folder.' }
  }
  const sent = await sendVerification(user)
  return sent
    ? { ok: true, message: `Sent! Check ${user.email} for the link.` }
    : { ok: false, error: 'We couldn’t send the email just now. Please try again later.' }
}

// ---- Password reset -------------------------------------------------------

export async function requestPasswordReset(_prev, formData) {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  if (!EMAIL.test(email)) return { errors: { email: 'Please enter a valid email address.' }, values: { email } }

  // Same answer whether or not the account exists, so this can't be used to
  // discover who has signed up.
  const done = { ok: true, message: `If an account exists for ${email}, a reset link is on its way. It expires in 1 hour.` }
  try {
    await connectDB()
    const user = await User.findOne({ email }).select('+resetSentAt')
    if (!user) return done
    if (user.resetSentAt && Date.now() - user.resetSentAt.getTime() < RESEND_AFTER_MS) return done

    const { token, hash } = createToken()
    const saved = await User.updateOne({ _id: user._id }, {
      resetTokenHash: hash, resetTokenExpires: new Date(Date.now() + HOUR), resetSentAt: new Date(),
    })
    // Never email a link whose token didn't make it into the database.
    if (!saved.modifiedCount) throw new Error('Reset token was not saved')
    await sendSafely('requestPasswordReset', resetEmail(user, `${await siteOrigin()}/reset-password?token=${token}`))
  } catch (error) {
    reportError(error, { where: 'requestPasswordReset' })
  }
  return done
}

export async function resetPassword(_prev, formData) {
  const token = String(formData.get('token') ?? '')
  const password = String(formData.get('password') ?? '')
  const confirm = String(formData.get('confirm') ?? '')

  const errors = {}
  if (password.length < MIN_PASSWORD) errors.password = `Use at least ${MIN_PASSWORD} characters.`
  else if (password !== confirm) errors.confirm = 'The passwords don’t match.'
  if (Object.keys(errors).length) return { errors }

  let user
  try {
    await connectDB()
    user = await User.findOne({ resetTokenHash: hashToken(token), resetTokenExpires: { $gt: new Date() } })
    if (!user) return { message: 'This reset link is invalid or has expired. Request a new one.', expired: true }

    user.passwordHash = await bcrypt.hash(password, BCRYPT_COST)
    user.resetTokenHash = undefined
    user.resetTokenExpires = undefined
    // Opening the emailed link proves they own the address.
    user.emailVerifiedAt ??= new Date()
    await user.save()
    attempts.delete(user.email)
  } catch (error) {
    reportError(error, { where: 'resetPassword' })
    return { message: 'Something went wrong. Please try again.' }
  }

  // The new password is saved at this point. If signing in automatically
  // fails (e.g. a misconfigured SESSION_SECRET), say so honestly and send
  // them to sign in, rather than reporting the reset itself as failed.
  try {
    await createSession(user)
  } catch (error) {
    reportError(error, { where: 'resetPassword.createSession' })
    redirect(user.role === 'admin' ? '/admin/login?reset=1' : '/login?reset=1')
  }
  redirect(user.role === 'admin' ? '/admin' : '/articles?reset=1')
}
