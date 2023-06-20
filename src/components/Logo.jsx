"use client"

import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

const MotionLink = motion(Link)

const Logo = () => {
  return (
    <div className='flex items-center justify-center mt-2'>
      <MotionLink href={"/"} className='w-16 h-16 bg-dark text-white flex items-center justify-center rounded-full
       text-2xl font-bold border border-transparent dark:border-light'
        whileHover={{
          scale:1.2,
          backgroundColor:["#121212", "rgba(131,58,180,1)","rgba(253,29,29,1)","#0000ff","rgba(131,58,180,1)", "#121212"],
          transition: {duration:1, repeat: Infinity}
        }}
      >
        GK
    </MotionLink>
    </div>
  )
}

export default Logo