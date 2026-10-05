import React from 'react'
import CloudImage from './CloudImage'

// A post's cover: its image when it has one (delivered through Cloudinary
// transformations), otherwise a typographic card so every post still gets a
// consistent visual.
const PostCover = ({ post, priority = false, sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw', className = '' }) => (
  <div className={`relative aspect-video w-full overflow-hidden rounded-xl bg-foreground/5 ${className}`}>
    {post.coverImage ? (
      <CloudImage src={post.coverImage} alt="" priority={priority} sizes={sizes} />
    ) : (
      <div aria-hidden="true"
 className="flex size-full flex-col justify-between bg-[linear-gradient(135deg,#1d4ed8,#0b1a3a)] p-5 text-white md:p-6">
        <span className="self-start rounded-full bg-card/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
          {post.tags?.[0] ?? 'Article'}
        </span>
        <span className="line-clamp-3 text-xl font-bold leading-tight md:text-2xl">{post.title}</span>
      </div>
    )}
  </div>
)

export default PostCover
