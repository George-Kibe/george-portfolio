"use client"

import React, { useContext } from 'react'
import { ThemeContext } from '@/context/ThemeContext'

const DarkModeToggle = () => {
  const {toggle, mode} = useContext(ThemeContext)
  const isDark = mode === "dark"

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className='w-14 h-8 rounded-3xl items-center relative flex justify-between p-1 border-[#53c58b]
        border-2 border-solid cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-[#53c58b]'
    >
      <span className="text-[14px]" aria-hidden="true">🌙</span>
      <span className="text-[14px]" aria-hidden="true">🔆</span>
      <span className={`absolute bg-[#53c28b] rounded-full w-4 h-4
            ${isDark ? "right-1" : "left-1"}`}
        aria-hidden="true"
      />
    </button>
  )
}

export default DarkModeToggle
