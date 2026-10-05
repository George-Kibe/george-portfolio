// Delivery-time transformations for Cloudinary images. Safe in server and
// client code: it only rewrites URLs.
//
//   https://res.cloudinary.com/<cloud>/image/upload/v123/folder/pic.jpg
//   -> https://res.cloudinary.com/<cloud>/image/upload/f_auto,q_auto,w_800/v123/folder/pic.jpg
//
// f_auto serves AVIF/WebP where supported, q_auto picks the lightest quality
// that still looks right, and the width keeps phones from downloading desktop
// images. URLs from anywhere else pass through untouched.

const MARKER = '/image/upload/'

export const isCloudinary = (url) =>
  typeof url === 'string' && url.startsWith('https://res.cloudinary.com/') && url.includes(MARKER)

export function cld(url, { width, height, crop = 'limit', gravity, quality = 'auto', blur } = {}) {
  if (!isCloudinary(url)) return url
  const parts = ['f_auto', `q_${quality}`, `c_${crop}`]
  if (width) parts.push(`w_${Math.round(width)}`)
  if (height) parts.push(`h_${Math.round(height)}`)
  if (gravity) parts.push(`g_${gravity}`)
  if (blur) parts.push(`e_blur:${blur}`)
  const [head, tail] = url.split(MARKER)
  return `${head}${MARKER}${parts.join(',')}/${tail}`
}

// Tiny, heavily blurred version used as an instant placeholder.
export const cldPlaceholder = (url, aspect = 16 / 9) =>
  cld(url, { width: 40, height: Math.round(40 / aspect), crop: 'fill', gravity: 'auto', quality: 'auto:low', blur: 1000 })
