import AnimatedText from '@/components/AnimatedText'
import Link from 'next/link'
import React from 'react'
import PostCover from '@/components/PostCover'
import { TbSearch, TbX } from 'react-icons/tb'
import Pagination from '@/components/Pagination'
import { getPublishedPostsPage } from '@/lib/queries'

export const metadata = {
  title: 'Articles on Web Development',
  description:
    'Articles and technical write-ups by George Kibe on React, Next.js, mobile ' +
    'development, data engineering and automation.',
  alternates: { canonical: '/articles' },
  openGraph: {
    type: 'website',
    url: '/articles',
    title: 'Articles on Web Development by George Kibe',
    description:
      'Technical writing by George Kibe on React, Next.js, React Native and data engineering.',
  },
}

// Posts come from MongoDB. The page reads ?page and ?q, so it renders per
// request; nine posts a page.
const PER_PAGE = 9

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

const Meta = ({ post }) => (
  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-dark/70 dark:text-light/70">
    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
    {post.tags?.length > 0 && (
      <span className="text-primary dark:text-primary-dark">{post.tags.slice(0, 3).join(' · ')}</span>
    )}
  </p>
)

const FeaturedPost = ({ post }) => (
  <article className="group relative grid gap-6 rounded-2xl border border-dark border-r-8 border-b-8 bg-light p-4
    dark:border-light dark:bg-dark md:grid-cols-2 md:items-center md:p-6">
    <PostCover post={post} priority sizes="(min-width: 768px) 45vw, 100vw" />
    <div className="flex flex-col gap-3 md:pr-4">
      <Meta post={post} />
      <h2 className="text-2xl font-bold leading-tight md:text-3xl">
        <Link href={`/articles/${post.slug}`} className="after:absolute after:inset-0 group-hover:underline underline-offset-4">
          {post.title}
        </Link>
      </h2>
      <p className="leading-relaxed text-dark/80 dark:text-light/80">{post.excerpt}</p>
      <span className="font-semibold text-primary dark:text-primary-dark" aria-hidden="true">Read article →</span>
    </div>
  </article>
)

const PostCard = ({ post }) => (
  <li className="group relative flex flex-col gap-4 rounded-2xl border border-dark/20 bg-white p-4 transition-colors
    hover:border-dark dark:border-light/20 dark:bg-dark dark:hover:border-light">
    <PostCover post={post} />
    <div className="flex flex-col gap-2 px-1 pb-1">
      <Meta post={post} />
      <h3 className="text-xl font-bold leading-tight">
        <Link href={`/articles/${post.slug}`} className="after:absolute after:inset-0 group-hover:underline underline-offset-4">
          {post.title}
        </Link>
      </h3>
      <p className="line-clamp-3 leading-relaxed text-dark/80 dark:text-light/80">{post.excerpt}</p>
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
    <div className="flex flex-col items-center justify-center md:mx-8 lg:mx-32">
      <main className="w-full mb-16 flex flex-col">
        <AnimatedText text={"Words can Change the World!"}/>

        <form role="search" action="/articles" className="mx-auto mt-2 flex w-full max-w-xl items-center gap-2">
          <label htmlFor="article-search" className="sr-only">Search articles</label>
          <div className="relative flex-1">
            <TbSearch className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-dark/50 dark:text-light/50" aria-hidden="true" />
            <input id="article-search" name="q" type="search" defaultValue={q} placeholder="Search articles, e.g. React Native"
              className="h-12 w-full rounded-lg border border-dark/40 bg-white pl-11 pr-4 text-dark placeholder:text-dark/55
                dark:border-light/35 dark:bg-dark dark:text-light dark:placeholder:text-light/55" />
          </div>
          <button type="submit" className="h-12 rounded-lg bg-dark px-5 font-semibold text-light dark:bg-light dark:text-dark cursor-pointer">
            Search
          </button>
        </form>
        {q && (
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 text-sm text-dark/75 dark:text-light/75" aria-live="polite">
            {total} result{total === 1 ? '' : 's'} for “{q}”
            <Link href="/articles" className="inline-flex items-center gap-1 font-semibold underline underline-offset-4">
              <TbX className="size-4" aria-hidden="true" /> Clear search
            </Link>
          </p>
        )}

        {posts.length === 0 ? (
          <p className="mt-12 text-center text-dark/75 dark:text-light/75">
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
      </main>
    </div>
  )
}

export default ArticlesPage
