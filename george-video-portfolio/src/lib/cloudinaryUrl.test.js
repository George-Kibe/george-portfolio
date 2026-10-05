import { describe, it, expect } from 'vitest'
import { cld, isCloudinary } from './cloudinaryUrl'

const SRC = 'https://res.cloudinary.com/demo/image/upload/v1712/gk-portfolio/blog/cover.jpg'

describe('cld', () => {
  it('inserts transformations after /image/upload/', () => {
    expect(cld(SRC, { width: 800 })).toBe(
      'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_limit,w_800/v1712/gk-portfolio/blog/cover.jpg'
    )
  })
  it('supports fill crops with gravity', () => {
    expect(cld(SRC, { width: 1200, height: 675, crop: 'fill', gravity: 'auto' })).toContain('c_fill,w_1200,h_675,g_auto')
  })
  it('leaves non-Cloudinary URLs alone', () => {
    expect(cld('https://example.com/a.jpg', { width: 800 })).toBe('https://example.com/a.jpg')
    expect(cld('/images/local.png', { width: 800 })).toBe('/images/local.png')
    expect(isCloudinary(undefined)).toBe(false)
  })
})
