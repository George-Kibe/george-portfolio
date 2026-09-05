import { SITE_URL } from '@/lib/site'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Next's internal endpoints have no business in an index.
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
