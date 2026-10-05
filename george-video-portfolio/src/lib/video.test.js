import { describe, it, expect } from 'vitest'
import { embedUrl, youtubeThumbnail } from './video'

describe('embedUrl', () => {
  it('handles the usual YouTube forms', () => {
    const expected = 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0'
    expect(embedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(expected)
    expect(embedUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(expected)
    expect(embedUrl('https://youtube.com/shorts/dQw4w9WgXcQ')).toBe(expected)
  })
  it('handles Vimeo', () => {
    expect(embedUrl('https://vimeo.com/76979871')).toBe('https://player.vimeo.com/video/76979871?autoplay=1&dnt=1')
  })
  it('rejects anything else', () => {
    expect(embedUrl('https://example.com/video.mp4')).toBeNull()
    expect(embedUrl('not a url')).toBeNull()
    expect(embedUrl('javascript:alert(1)')).toBeNull()
  })
  it('derives a YouTube thumbnail', () => {
    expect(youtubeThumbnail('https://youtu.be/dQw4w9WgXcQ')).toBe('https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg')
    expect(youtubeThumbnail('https://vimeo.com/76979871')).toBeNull()
  })
})
