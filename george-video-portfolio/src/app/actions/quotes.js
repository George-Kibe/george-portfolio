'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import { assertAdmin } from '@/lib/session'
import { reportError } from '@/lib/reportError'
import { estimateQuote, makeReference, PROJECT_TYPES, TIMELINES, featuresFor } from '@/lib/quote'
import Quote from '@/models/Quote'
import { quoteConfirmation, quoteNotification, sendSafely, siteOrigin } from '@/lib/mailer'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const STATUSES = ['new', 'contacted', 'quoted', 'won', 'lost']
const MAX_PER_HOUR = 5

const clean = (v, max) => String(v ?? '').trim().slice(0, max)

// Normalises a selection so only known ids reach the estimate and the database.
function readSelection(input) {
  const type = PROJECT_TYPES.some((t) => t.id === input.type) ? input.type : null
  const timeline = TIMELINES.some((t) => t.id === input.timeline) ? input.timeline : null
  const allowed = type ? featuresFor(type).map((f) => f.id) : []
  const features = Array.isArray(input.features) ? input.features.filter((f) => allowed.includes(f)) : []
  return { type, timeline, features }
}

function toDoc(estimate, selection) {
  return {
    projectType: selection.type,
    features: selection.features,
    timeline: selection.timeline,
    items: estimate.items,
    estimateLow: estimate.low,
    estimateHigh: estimate.high,
    weeksLow: estimate.weeks[0],
    weeksHigh: estimate.weeks[1],
  }
}

// Public: called by the quote builder. The estimate is recomputed here from
// the raw selection, so a tampered request can't store made-up prices.
export async function submitQuote(input) {
  const name = clean(input?.name, 120)
  const email = clean(input?.email, 200).toLowerCase()
  const details = clean(input?.details, 5000)
  const selection = readSelection(input ?? {})

  if (!name) return { ok: false, error: 'Please enter your name.' }
  if (!EMAIL.test(email)) return { ok: false, error: 'Please enter a valid email address.' }
  if (!selection.type || !selection.timeline) return { ok: false, error: 'Please answer every question.' }

  try {
    await connectDB()
    const recent = await Quote.countDocuments({ email, createdAt: { $gt: new Date(Date.now() - 3600_000) } })
    if (recent >= MAX_PER_HOUR) {
      return { ok: false, error: 'You’ve sent several requests already. Please try again later, or book a consultation.' }
    }

    const estimate = estimateQuote(selection)
    const reference = makeReference()
    const quote = await Quote.create({ reference, name, email, details, ...toDoc(estimate, selection) })
    revalidatePath('/admin', 'layout')

    // The quote is already saved, so a mail failure doesn't fail the request.
    const adminUrl = `${await siteOrigin()}/admin/quotes/${quote._id}`
    await Promise.all([
      sendSafely('quoteNotification', quoteNotification(quote, adminUrl)),
      sendSafely('quoteConfirmation', quoteConfirmation(quote)),
    ])
    return { ok: true, reference }
  } catch (error) {
    reportError(error, { where: 'submitQuote' })
    return { ok: false, error: 'We couldn’t save your request just now. Please try again, or book a consultation.' }
  }
}

// ---- Admin ----------------------------------------------------------------

function readAdminForm(formData) {
  const selection = readSelection({
    type: formData.get('projectType'),
    timeline: formData.get('timeline'),
    features: formData.getAll('features'),
  })
  const status = formData.get('status')
  return {
    name: clean(formData.get('name'), 120),
    email: clean(formData.get('email'), 200).toLowerCase(),
    details: clean(formData.get('details'), 5000),
    adminNotes: clean(formData.get('adminNotes'), 5000),
    status: STATUSES.includes(status) ? status : 'new',
    selection,
  }
}

function validateAdmin(data) {
  if (!data.name) return 'Name is required.'
  if (!EMAIL.test(data.email)) return 'A valid email is required.'
  if (!data.selection.type || !data.selection.timeline) return 'Project type and timeline are required.'
  return null
}

export async function createQuote(_prev, formData) {
  await assertAdmin()
  const data = readAdminForm(formData)
  const error = validateAdmin(data)
  if (error) return { ok: false, error }

  await connectDB()
  const estimate = estimateQuote(data.selection)
  const doc = await Quote.create({
    reference: makeReference(),
    name: data.name, email: data.email, details: data.details,
    adminNotes: data.adminNotes, status: data.status, source: 'admin',
    ...toDoc(estimate, data.selection),
  })
  revalidatePath('/admin', 'layout')
  redirect(`/admin/quotes/${doc._id}?saved=1`)
}

export async function updateQuote(id, _prev, formData) {
  await assertAdmin()
  const data = readAdminForm(formData)
  const error = validateAdmin(data)
  if (error) return { ok: false, error }

  await connectDB()
  const estimate = estimateQuote(data.selection)
  await Quote.findByIdAndUpdate(id, {
    name: data.name, email: data.email, details: data.details,
    adminNotes: data.adminNotes, status: data.status,
    ...toDoc(estimate, data.selection),
  })
  revalidatePath('/admin', 'layout')
  return { ok: true, message: 'Saved.' }
}

export async function deleteQuote(id) {
  await assertAdmin()
  await connectDB()
  await Quote.findByIdAndDelete(id)
  revalidatePath('/admin', 'layout')
}
