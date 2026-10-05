import { describe, it, expect } from 'vitest'
import { createToken, hashToken } from './tokens'

describe('createToken', () => {
  it('returns a URL-safe token and its matching hash', () => {
    const { token, hash } = createToken()
    expect(token).toMatch(/^[A-Za-z0-9_-]{43}$/)
    expect(hash).toBe(hashToken(token))
    expect(hash).not.toContain(token)
  })
  it('never repeats', () => {
    expect(createToken().token).not.toBe(createToken().token)
  })
})
