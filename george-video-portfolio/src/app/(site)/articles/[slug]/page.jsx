import Link from 'next/link'
import { notFound } from 'next/navigation'
import PostCover from '@/components/PostCover'
import Comments from '@/components/Comments'
import { getComments, getPublishedPost } from '@/lib/queries'
import { getCurrentUser } from '@/lib/session'
import { readingMinutes } from '@/lib/slug'
import { renderPostHtml } from '@/lib/html'
import { cld } from '@/lib/cloudinaryUrl'
import { AUTHOR, SITE_URL } from '@/lib/site'

// Rendered per request: the comment form depends on who is signed in.
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
 const { slug } = await params
 const post = await getPublishedPost(slug)
 if (!post) return { title: 'Article not found', robots: { index: false } }
 return {
 title: post.title,
 description: post.excerpt,
 alternates: { canonical: `/articles/${post.slug}` },
 openGraph: {
 type: 'article',
 url: `/articles/${post.slug}`,
 title: post.title,
 description: post.excerpt,
 publishedTime: post.publishedAt,
 modifiedTime: post.updatedAt,
 authors: [AUTHOR.name],
 tags: post.tags,
      ...(post.coverImage ? { images: [cld(post.coverImage, { width: 1200, height: 630, crop: 'fill', gravity: 'auto' })] } : {}),
    },
  }
}

const formatDate = (iso) =>
 new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export default async function ArticlePage({ params }) {
 const { slug } = await params
 const post = await getPublishedPost(slug)
 if (!post) notFound()

 const [comments, user] = await Promise.all([getComments(post._id), getCurrentUser()])

 const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
 headline: post.title,
 description: post.excerpt,
 datePublished: post.publishedAt,
 dateModified: post.updatedAt,
 author: { '@id': `${SITE_URL}/#person` },
 mainEntityOfPage: `${SITE_URL}/articles/${post.slug}`,
 keywords: post.tags?.join(', '),
  }

 return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-32 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <Link href="/articles" className="inline-flex h-11 items-center text-sm font-semibold text-accent-text underline-offset-4 hover:underline">
        ← All articles
      </Link>
      <article>
        <header className="mt-4">
          <p className="flex flex-wrap gap-x-3 text-sm font-medium text-muted">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span>{readingMinutes(post.content)} min read</span>
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-balance md:text-5xl">{post.title}</h1>
          {post.excerpt && <p className="mt-4 text-lg leading-relaxed text-muted">{post.excerpt}</p>}
          {post.tags?.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-foreground/5 px-3 py-1 text-sm font-medium ">{tag}</li>
              ))}
            </ul>
          )}
        </header>
        {/* Without a real image the generated title card would just repeat the
 heading above, so it's only used in the article lists. */}
        {post.coverImage && <PostCover post={post} priority sizes="(min-width: 768px) 768px, 100vw" className="mt-8" />}
        {/* Sanitised on save and again here (see lib/html.js). */}
        <div className="article-body mt-10" dangerouslySetInnerHTML={{ __html: renderPostHtml(post.content) }} />
      </article>
      <Comments postId={post._id} slug={post.slug} comments={comments} user={user} />
    </div>
  )
}
