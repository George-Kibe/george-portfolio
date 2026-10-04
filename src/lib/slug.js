// "Why You Should Adopt Next.js!" -> "why-you-should-adopt-next-js"
export const slugify = (text) =>
  String(text ?? '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100)

// Rough reading time at ~220 words a minute, rounded up. Accepts HTML; tags
// are ignored.
export const readingMinutes = (text) =>
  Math.max(1, Math.ceil(String(text ?? '').replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length / 220))
