"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { cld, cldPlaceholder, isCloudinary } from '@/lib/cloudinaryUrl'

// next/image with Cloudinary doing the resizing: the loader asks Cloudinary
// for each srcset width (cropped to the box with smart gravity), so Next's own
// optimiser isn't involved. A 40px blurred copy shows instantly and the full
// image fades in over it once loaded.
const CloudImage = ({ src, alt = '', aspect = 16 / 9, sizes, priority = false, className = '' }) => {
  const [loaded, setLoaded] = useState(false)

  if (!isCloudinary(src)) {
    return <Image src={src} alt={alt} fill unoptimized priority={priority} sizes={sizes} className={`object-cover ${className}`} />
  }

  const loader = ({ width }) => cld(src, { width, height: Math.round(width / aspect), crop: 'fill', gravity: 'auto' })

  return (
    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${cldPlaceholder(src, aspect)}")` }}>
      <Image src={src} alt={alt} fill loader={loader} sizes={sizes} priority={priority} onLoad={() => setLoaded(true)}
        className={`object-cover transition-opacity duration-500 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none
          ${loaded || priority ? 'opacity-100' : 'opacity-0'} ${className}`} />
    </div>
  )
}

export default CloudImage
