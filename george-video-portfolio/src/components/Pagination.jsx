import Link from 'next/link'
import React from 'react'
import { ChevronLeft as TbChevronLeft, ChevronRight as TbChevronRight } from 'lucide-react'

// Page numbers with the current page, its neighbours, the first and the last;
// gaps become an ellipsis. e.g. 1 … 4 5 6 … 12
const pageList = (page, pages) => {
  const keep = new Set([1, pages, page - 1, page, page + 1].filter((n) => n >= 1 && n <= pages))
  const sorted = [...keep].sort((a, b) => a - b)
  const out = []
  sorted.forEach((n, i) => {
    if (i && n - sorted[i - 1] > 1) out.push('gap-' + n)
    out.push(n)
  })
  return out
}

const base = 'inline-flex h-11 min-w-11 items-center justify-center rounded-lg px-3 text-sm font-semibold transition-colors'
const idle = 'border border-line hover:border-foreground/20'

// Server-rendered links, so paging works without JavaScript. `href(n)` builds
// the URL for page n (keeping any search query).
const Pagination = ({ page, pages, href, label = 'Pagination' }) => {
  if (pages <= 1) return null
  return (
    <nav aria-label={label} className="flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={href(page - 1)} rel="prev" className={`${base} ${idle}`} aria-label="Previous page">
          <TbChevronLeft className="size-5" aria-hidden="true" />
        </Link>
      ) : (
        <span className={`${base} ${idle} opacity-40`} aria-hidden="true"><TbChevronLeft className="size-5" /></span>
      )}
      {pageList(page, pages).map((n) =>
        typeof n === 'string' ? (
          <span key={n} className="px-1 text-muted" aria-hidden="true">…</span>
        ) : n === page ? (
          <span key={n} aria-current="page" className={`${base} bg-accent text-white`}>{n}</span>
        ) : (
          <Link key={n} href={href(n)} className={`${base} ${idle}`} aria-label={`Page ${n}`}>{n}</Link>
        )
      )}
      {page < pages ? (
        <Link href={href(page + 1)} rel="next" className={`${base} ${idle}`} aria-label="Next page">
          <TbChevronRight className="size-5" aria-hidden="true" />
        </Link>
      ) : (
        <span className={`${base} ${idle} opacity-40`} aria-hidden="true"><TbChevronRight className="size-5" /></span>
      )}
    </nav>
  )
}

export default Pagination
