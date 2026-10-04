import { describe, it, expect } from 'vitest'
import { readingMinutes, slugify } from './slug'

describe('slugify', () => {
  it('lowercases, strips punctuation and accents, and joins with hyphens', () => {
    expect(slugify('Why You Should Adopt Next.js!')).toBe('why-you-should-adopt-next-js')
    expect(slugify('  Café — déjà vu  ')).toBe('cafe-deja-vu')
  })
  it('returns an empty string for empty input', () => {
    expect(slugify('')).toBe('')
    expect(slugify(undefined)).toBe('')
  })
})

describe('readingMinutes', () => {
  it('never reports less than a minute', () => {
    expect(readingMinutes('short')).toBe(1)
    expect(readingMinutes('word '.repeat(660))).toBe(3)
  })
})
