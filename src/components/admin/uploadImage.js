import { getUploadSignature } from '@/app/actions/content'

const MAX_BYTES = 10 * 1024 * 1024

// Uploads an image straight from the browser to Cloudinary using a signature
// from the server. `target` picks the Cloudinary folder ('blog' | 'brands' | 'projects').
// Resolves to { url, width, height }.
export async function uploadImage(file, target = 'blog') {
  if (!file?.type?.startsWith('image/')) throw new Error('Please choose an image file.')
  if (file.size > MAX_BYTES) throw new Error('Images must be 10 MB or smaller.')

  const { cloudName, apiKey, signature, timestamp, folder } = await getUploadSignature(target)
  const body = new FormData()
  body.append('file', file)
  body.append('api_key', apiKey)
  body.append('timestamp', String(timestamp))
  body.append('signature', signature)
  body.append('folder', folder)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.error?.message ?? 'Upload failed. Please try again.')
  return { url: data.secure_url, width: data.width, height: data.height }
}
