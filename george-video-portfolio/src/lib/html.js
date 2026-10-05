import sanitizeHtml from 'sanitize-html'
import { cld, isCloudinary } from './cloudinaryUrl'

// Post bodies are HTML from the Tiptap editor. They're sanitised when saved
// and again when rendered, so nothing outside this allowlist (scripts, event
// handlers, iframes, inline styles) can reach a reader's browser.

const ALLOWED = {
  allowedTags: [
    'p', 'br', 'hr', 'h2', 'h3', 'h4', 'strong', 'b', 'em', 'i', 'u', 's',
    'a', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'img',
  ],
  allowedAttributes: {
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    code: ['class'],
  },
  allowedClasses: { code: [/^language-[\w-]+$/] },
  allowedSchemes: ['https', 'http', 'mailto'],
  allowedSchemesByTag: { img: ['https'] },
  allowProtocolRelative: false,
}

export const sanitizePostHtml = (html) => sanitizeHtml(String(html ?? ''), ALLOWED)

const WIDTHS = [640, 960, 1400]

// For display: images become responsive Cloudinary deliveries that load
// lazily, and links that leave the site open in a new tab.
export const renderPostHtml = (html) =>
  sanitizeHtml(String(html ?? ''), {
    ...ALLOWED,
    allowedAttributes: {
      ...ALLOWED.allowedAttributes,
      img: [...ALLOWED.allowedAttributes.img, 'srcset', 'sizes', 'loading', 'decoding'],
    },
    transformTags: {
      img: (tagName, attribs) => {
        const out = { ...attribs, loading: 'lazy', decoding: 'async', alt: attribs.alt ?? '' }
        if (isCloudinary(attribs.src)) {
          out.src = cld(attribs.src, { width: 1400 })
          out.srcset = WIDTHS.map((w) => `${cld(attribs.src, { width: w })} ${w}w`).join(', ')
          out.sizes = '(min-width: 768px) 720px, 100vw'
        }
        return { tagName, attribs: out }
      },
      a: (tagName, attribs) => {
        const external = /^https?:\/\//.test(attribs.href ?? '')
        return {
          tagName,
          attribs: external ? { ...attribs, target: '_blank', rel: 'noopener noreferrer' } : attribs,
        }
      },
    },
  })

export const stripHtml = (html) => String(html ?? '').replace(/<[^>]*>/g, ' ')
