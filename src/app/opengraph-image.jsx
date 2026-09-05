import { ImageResponse } from 'next/og'
import { AUTHOR, SITE_NAME } from '@/lib/site'

export const alt = `${SITE_NAME} — ${AUTHOR.jobTitle}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Rendered once at build time, so there is no static asset to keep in sync.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#1b1b1b',
          backgroundImage:
            'radial-gradient(circle at 25% 20%, rgba(88,230,217,0.18), transparent 55%)',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, color: '#58e6d9', letterSpacing: 2 }}>
          {AUTHOR.locality.toUpperCase()}, {AUTHOR.country.toUpperCase()}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 82,
            fontWeight: 700,
            color: '#f5f5f5',
            marginTop: 24,
            lineHeight: 1.1,
          }}
        >
          {SITE_NAME}
        </div>
        <div style={{ display: 'flex', fontSize: 42, color: '#cfcfcf', marginTop: 18 }}>
          {AUTHOR.jobTitle}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 48,
            height: 8,
            width: 220,
            backgroundColor: '#58e6d9',
          }}
        />
      </div>
    ),
    size
  )
}
