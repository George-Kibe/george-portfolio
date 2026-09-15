"use client"

import React, { useContext } from 'react'
import { ThemeContext } from '@/context/ThemeContext'

const DarkModeToggle = () => {
  const {toggle, mode} = useContext(ThemeContext)
  const isDark = mode === "dark"

  // 56x44 below md, where this renders inside the touch-driven mobile menu and
  // has to meet the 44px tap-target guideline; 48x36 from md up, where it sits
  // beside the 36px social icons and only ever takes a pointer.
  //
  // The green is dark enough to hold 3:1 against both page backgrounds
  // (3.76 light, 5.13 dark); the old #53c58b fell to 1.98 on light.

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className='w-14 h-11 md:w-12 md:h-9 rounded-full items-center relative flex justify-between px-1.5 border-[#1d8f5a]
        border-2 border-solid cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-[#1d8f5a]'
    >
      <span className="text-xs md:text-[10px]" aria-hidden="true">🌙</span>
      <span className="text-xs md:text-[10px]" aria-hidden="true">🔆</span>
      {/* Knob travel = track width - 2px border - 4px inset on each side - knob. */}
      <span className={`absolute left-1 bg-[#1d8f5a] rounded-full size-6 md:size-5 transition-transform duration-200 ease-out
            ${isDark ? "translate-x-5 md:translate-x-4" : "translate-x-0"}`}
        aria-hidden="true"
      />
    </button>
  )
}

export default DarkModeToggle
