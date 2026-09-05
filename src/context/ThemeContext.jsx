"use client"

import { createContext, useCallback, useSyncExternalStore } from "react"

export const ThemeContext = createContext({ mode: "dark", toggle: () => {} })

// The theme lives on <html>, written before first paint by the inline script in
// the root layout. That makes it external state rather than React state, so it
// is read through useSyncExternalStore instead of being mirrored with an effect.
const listeners = new Set()

const subscribe = (onChange) => {
  listeners.add(onChange)
  return () => listeners.delete(onChange)
}

const getSnapshot = () =>
  document.documentElement.classList.contains("light") ? "light" : "dark"

// Matches the inline script's fallback, so hydration starts from the same value.
const getServerSnapshot = () => "dark"

export const ThemeProvider = ({ children }) => {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggle = useCallback(() => {
    const next = getSnapshot() === "dark" ? "light" : "dark"
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(next)
    try {
      window.localStorage.setItem("theme", next)
    } catch {
      // Private mode or blocked storage: the theme still applies for this visit.
    }
    listeners.forEach((notify) => notify())
  }, [])

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      {children}
    </ThemeContext.Provider>
  )
}
