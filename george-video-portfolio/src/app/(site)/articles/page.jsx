import Link from 'next/link'
import React from 'react'
import PostCover from '@/components/PostCover'
import { Search as TbSearch, X as TbX } from 'lucide-react'
import Pagination from '@/components/Pagination'
import { getPublishedPostsPage } from '@/lib/queries'

export const metadata = {
  title: 'Blog — Video Editing Tips & Workflow',
  description:
    'Articles by GeorgeEditPro on video editing, colour grading, sound design, motion ' +
    'graphics and editing for social media.',
  alternates: { canonical: '/articles' },
  openGraph: {
    type: 'website',
    url: '/articles',
    title: 'The GeorgeEditPro Blog',
    description: 'Video editing tips, workflow and behind-the-scenes from GeorgeEditPro.',
  },
}

// Posts come from MongoDB. The page reads ?page and ?q, so it renders per
// request; nine posts a page.
const PER_PAGE = 9

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

const Meta = ({ post }) => (
  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-muted">
    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
    {post.tags?.length > 0 && (
      <span className="text-accent-text">{post.tags.slice(0, 3).join(' · ')}</span>
    )}
  </p>
)

const FeaturedPost = ({ post }) => (
  <article className="group relative grid gap-6 rounded-2xl border border-line shadow-[0_12px_32px_-12px_rgb(37_99_235/0.35)] bg-card p-4 md:grid-cols-2 md:items-center md:p-6">
    <PostCover post={post} priority sizes="(min-width: 768px) 45vw, 100vw" />
    <div className="flex flex-col gap-3 md:pr-4">
      <Meta post={post} />
      <h2 className="text-2xl font-bold leading-tight md:text-3xl">
        <Link href={`/articles/${post.slug}`} className="after:absolute after:inset-0 group-hover:underline underline-offset-4">
          {post.title}
        </Link>
      </h2>
      <p className="leading-relaxed text-muted">{post.excerpt}</p>
      <span className="font-semibold text-accent-text" aria-hidden="true">Read article →</span>
    </div>
  </article>
)

const PostCard = ({ post }) => (
  <li className="group relative flex flex-col gap-4 rounded-2xl border border-line bg-card p-4 transition-colors
    hover:border-foreground/20">
    <PostCover post={post} />
    <div className="flex flex-col gap-2 px-1 pb-1">
      <Meta post={post} />
      <h3 className="text-xl font-bold leading-tight">
        <Link href={`/articles/${post.slug}`} className="after:absolute after:inset-0 group-hover:underline underline-offset-4">
          {post.title}
        </Link>
      </h3>
      <p className="line-clamp-3 leading-relaxed text-muted">{post.excerpt}</p>
    </div>
  </li>
)

const ArticlesPage = async ({ searchParams }) => {
  const params = await searchParams
  const q = String(params.q ?? '').trim().slice(0, 100)
  const requested = Number.parseInt(params.page, 10) || 1
  const { posts, total, page, pages } = await getPublishedPostsPage({ page: requested, perPage: PER_PAGE, q })

  // The newest post is featured only on the unfiltered first page.
  const showFeatured = page === 1 && !q && posts.length > 0
  const [featured, ...rest] = showFeatured ? posts : [null, ...posts]
  const href = (n) => {
    const sp = new URLSearchParams()
    if (q) sp.set('q', q)
    if (n > 1) sp.set('page', String(n))
    const qs = sp.toString()
    return qs ? `/articles?${qs}` : '/articles'
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 pt-32 sm:px-6 lg:px-8">
      <div className="w-full mb-16 flex flex-col">
        <h1 className="text-center text-4xl sm:text-5xl font-bold text-foreground">The <span className="text-accent-text">Blog</span></h1>
        <p className="mx-auto mt-4 mb-6 max-w-2xl text-center text-lg text-muted">Editing tips, workflow and stories from behind the timeline.</p>

        <form role="search" action="/articles" className="mx-auto mt-2 flex w-full max-w-xl items-center gap-2">
          <label htmlFor="article-search" className="sr-only">Search articles</label>
          <div className="relative flex-1">
            <TbSearch className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input id="article-search" name="q" type="search" defaultValue={q} placeholder="Search articles, e.g. colour grading"
              className="h-12 w-full rounded-lg border border-line bg-card pl-11 pr-4 text-foreground placeholder:text-muted" />
          </div>
          <button type="submit" className="h-12 rounded-lg bg-accent px-5 font-semibold text-white cursor-pointer">
            Search
          </button>
        </form>
        {q && (
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 text-sm text-muted" aria-live="polite">
            {total} result{total === 1 ? '' : 's'} for “{q}”
            <Link href="/articles" className="inline-flex items-center gap-1 font-semibold underline underline-offset-4">
              <TbX className="size-4" aria-hidden="true" /> Clear search
            </Link>
          </p>
        )}

        {posts.length === 0 ? (
          <p className="mt-12 text-center text-muted">
            {q ? 'No articles match that search. Try another word.' : 'New articles are on the way. Check back soon.'}
          </p>
        ) : (
          <>
            {featured && <div className="mt-8"><FeaturedPost post={featured} /></div>}
            {rest.length > 0 && (
              <>
                {featured && <h2 className="mt-16 mb-8 text-center text-3xl font-bold leading-tight md:mt-20">All Articles</h2>}
                <ul className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ${featured ? '' : 'mt-10'}`}>
                  {rest.map((post) => <PostCard key={post._id} post={post} />)}
                </ul>
              </>
            )}
            <div className="mt-12">
              <Pagination page={page} pages={pages} href={href} label="Article pages" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ArticlesPage
