"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react'

const FramerImageView = motion.create(Image);

// Static imports give Next the intrinsic size and a blur placeholder; `sizes`
// keeps the served variant close to the rendered width instead of the source's.
export const FramerImage = ({image, title, sizes = '100vw'}) => {
  return (
    <FramerImageView src={image} alt={title} sizes={sizes} placeholder='blur'
        className='w-full h-auto'
        whileHover={{scale:1.05}}
        transition={{duration:0.2}}
    />
  )
}
