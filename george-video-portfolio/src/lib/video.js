// Turns a YouTube or Vimeo link into a privacy-friendly embed URL, or null if
// the link isn't one we can embed. Safe in server and client code.
//
//   https://youtu.be/abc123            -> https://www.youtube-nocookie.com/embed/abc123
//   https://www.youtube.com/watch?v=X  -> https://www.youtube-nocookie.com/embed/X
//   https://vimeo.com/123456           -> https://player.vimeo.com/video/123456
export function embedUrl(link) {
  let url
  try {
    url = new URL(String(link ?? ''))
  } catch {
    return null
  }
  const host = url.hostname.replace(/^www\.|^m\./, '')
  let id = null
  if (host === 'youtu.be') id = url.pathname.slice(1)
  else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    id = url.searchParams.get('v') ?? url.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]+)/)?.[1]
  }
  if (id && /^[\w-]{6,20}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`

  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const vid = url.pathname.match(/(\d{6,12})/)?.[1]
    if (vid) return `https://player.vimeo.com/video/${vid}?autoplay=1&dnt=1`
  }
  return null
}

// YouTube serves a thumbnail for every video; used when no image is uploaded.
export function youtubeThumbnail(link) {
  const embed = embedUrl(link)
  const id = embed?.match(/youtube-nocookie\.com\/embed\/([\w-]+)/)?.[1]
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null
}

export const PROJECT_CATEGORIES = ['Commercial', 'Music Video', 'Documentary', 'Corporate', 'Social Media', 'Wedding & Events', 'YouTube']
