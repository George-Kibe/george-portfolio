import { ROUTES, SITE_URL } from '@/lib/site'
import { getPublishedPosts } from '@/lib/queries'

// Static routes plus every published article. Refreshed hourly, and whenever a
// post is saved in the admin panel. If the database can't be reached the
// article entries are simply left out.
export const revalidate = 3600

export default async function sitemap() {
  const lastModified = new Date()
  const posts = await getPublishedPosts()

  return [
    ...ROUTES.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/articles/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
  ]
}
