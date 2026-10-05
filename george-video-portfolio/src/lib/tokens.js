import { createHash, randomBytes } from 'node:crypto'

// Single-use tokens for email links. The raw token goes in the email; only its
// SHA-256 hash is stored, so a database leak doesn't expose usable links.
// (SHA-256 rather than bcrypt is right here: the token is 256 random bits, so
// there's nothing to brute-force, and it must be looked up by hash.)
export const hashToken = (token) => createHash('sha256').update(String(token)).digest('hex')

export function createToken() {
  const token = randomBytes(32).toString('base64url')
  return { token, hash: hashToken(token) }
}

export const HOUR = 60 * 60 * 1000
