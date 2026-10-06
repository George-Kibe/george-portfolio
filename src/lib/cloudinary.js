import 'server-only'
import { v2 as cloudinary } from 'cloudinary'

// Reads CLOUDINARY_URL (cloudinary://<key>:<secret>@<cloud>) explicitly rather
// than relying on the SDK picking it up at import time.
let configured = false
function configure() {
  if (configured) return cloudinary
  const raw = process.env.CLOUDINARY_URL
  if (!raw) throw new Error('CLOUDINARY_URL is not set (see .env.example).')
  const url = new URL(raw)
  cloudinary.config({
    cloud_name: url.hostname,
    api_key: decodeURIComponent(url.username),
    api_secret: decodeURIComponent(url.password),
    secure: true,
  })
  configured = true
  return cloudinary
}

// Folders an admin upload may target. The client picks one by key; anything
// else falls back to the blog folder.
export const UPLOAD_FOLDERS = { blog: 'gk-portfolio/blog', brands: 'gk-portfolio/brands', projects: 'gk-portfolio/projects' }

// Parameters for a signed upload straight from the browser to Cloudinary, so
// large images never pass through a server action (and its body size limit).
// The signature only covers this folder and expires after an hour.
export function signImageUpload(target = 'blog') {
  const cld = configure()
  const { cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret } = cld.config()
  const timestamp = Math.round(Date.now() / 1000)
  const params = { folder: UPLOAD_FOLDERS[target] ?? UPLOAD_FOLDERS.blog, timestamp }
  const signature = cld.utils.api_sign_request(params, apiSecret)
  return { cloudName, apiKey, signature, ...params }
}
