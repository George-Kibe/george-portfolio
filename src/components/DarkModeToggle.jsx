"use client"

import React, { useContext } from 'react'
import { ThemeContext } from '@/context/ThemeContext'

const DarkModeToggle = () => {
  const {toggle, mode} = useContext(ThemeContext)
  const isDark = mode === "dark"

  // 44px tall to meet the tap-target guideline. The green is dark enough to
  // hold 3:1 against both page backgrounds (3.76 light, 5.13 dark); the old
  // #53c58b fell to 1.98 on light.

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className='w-16 h-11 rounded-full items-center relative flex justify-between px-2 border-[#1d8f5a]
        border-2 border-solid cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-[#1d8f5a]'
    >
      <span className="text-sm" aria-hidden="true">🌙</span>
      <span className="text-sm" aria-hidden="true">🔆</span>
      <span className={`absolute left-1 bg-[#1d8f5a] rounded-full size-6 transition-transform duration-200 ease-out
            ${isDark ? "translate-x-7" : "translate-x-0"}`}
        aria-hidden="true"
      />
    </button>
  )
}

export default DarkModeToggle
