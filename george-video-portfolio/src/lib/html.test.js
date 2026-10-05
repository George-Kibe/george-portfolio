import { describe, it, expect } from 'vitest'
import { renderPostHtml, sanitizePostHtml } from './html'

describe('sanitizePostHtml', () => {
  it('keeps editor formatting', () => {
    const html = '<h2>Title</h2><p><strong>Bold</strong> and <a href="https://x.dev">a link</a></p><ul><li>One</li></ul>'
    expect(sanitizePostHtml(html)).toBe(html)
  })
  it('strips scripts, event handlers and javascript: links', () => {
    const dirty = '<p onclick="steal()">Hi</p><script>alert(1)</script><a href="javascript:alert(1)">x</a><img src="http://insecure/a.png">'
    const clean = sanitizePostHtml(dirty)
    expect(clean).not.toMatch(/script|onclick|javascript:/)
    expect(clean).not.toContain('http://insecure') // images must be https
  })
})

describe('renderPostHtml', () => {
  it('turns Cloudinary images into responsive, lazy images', () => {
    const out = renderPostHtml('<img src="https://res.cloudinary.com/demo/image/upload/v1/a.jpg" alt="A">')
    expect(out).toContain('loading="lazy"')
    expect(out).toContain('f_auto,q_auto,c_limit,w_1400')
    expect(out).toContain('640w')
  })
  it('opens external links in a new tab safely', () => {
    expect(renderPostHtml('<a href="https://example.com">x</a>')).toContain('rel="noopener noreferrer"')
  })
})
