import { SITE_URL } from '@/lib/site'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Next's internals, the admin panel and account pages have no business
      // in an index (those pages also send noindex).
      disallow: ['/api/', '/_next/', '/admin', '/login', '/signup', '/forgot-password', '/reset-password', '/verify-email'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
