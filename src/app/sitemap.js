import { ROUTES, SITE_URL } from '@/lib/site'

export default function sitemap() {
  const lastModified = new Date()

  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
