"use client"

import React, { useContext } from 'react'
import { flushSync } from 'react-dom'
import { Moon as TbMoon, Sun as TbSun } from 'lucide-react'
import { ThemeContext } from '@/context/ThemeContext'

// A round icon button: the sun shows in dark mode, the moon in light, each
// naming the theme a click will switch to. The label stays fixed and
// aria-pressed carries the state, which is how screen readers expect a toggle.
//
// Where the View Transitions API exists, the new theme spreads out from the
// button as a circle (the clip-path keyframes live in globals.css). Everywhere
// else, and under Reduce Motion, the switch is instant apart from the usual
// colour fade.
//
// 44px below md, where it sits in the touch-driven mobile menu; 36px from md,
// next to the 32px social icons.

const iconClass = (visible) =>
  `absolute size-5 md:size-[18px] transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.2,0,0,1)]
  ${visible ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'}`

const DarkModeToggle = () => {
  const {toggle, mode} = useContext(ThemeContext)
  const isDark = mode === "dark"

  const handleClick = (event) => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) {
      toggle()
      return
    }

    const root = document.documentElement
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    root.style.setProperty('--theme-x', `${x}px`)
    root.style.setProperty('--theme-y', `${y}px`)
    root.style.setProperty('--theme-r', `${radius}px`)

    // Colour transitions would otherwise be captured half-finished in the new
    // snapshot; the reveal is the transition.
    root.classList.add('theme-switching')
    const transition = document.startViewTransition(() => flushSync(toggle))
    transition.finished.finally(() => root.classList.remove('theme-switching'))
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isDark}
      aria-label="Dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className='relative flex size-11 md:size-9 shrink-0 items-center justify-center rounded-full cursor-pointer
        border border-line-strong text-foreground
        hover:bg-foreground/5 active:scale-95 transition-transform
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text'
    >
      <TbSun className={iconClass(isDark)} aria-hidden="true" />
      <TbMoon className={iconClass(!isDark)} aria-hidden="true" />
    </button>
  )
}

export default DarkModeToggle
