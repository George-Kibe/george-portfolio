"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// A career trajectory: each main role is a plateau that steps up from the one
// before, and a break between roles dips toward the baseline. Roles flagged
// `alongside` (held at the same time as a main one) get their own lane under
// the chart rather than bending the line. It sits above the Experience list as
// a summary, so it's decorative to assistive tech and the list stays the
// readable source.

const MONTH = 30.44 * 24 * 60 * 60 * 1000

// Rounded to the start of the month so the server render and hydration agree
// on every coordinate.
const today = new Date()
const NOW = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1)

const parse = (ym) => {
  const [y, m] = ym.split('-').map(Number)
  return Date.UTC(y, m - 1, 1)
}

const duration = (from, to) => {
  const months = Math.max(1, Math.round((to - from) / MONTH) + 1)
  const years = Math.floor(months / 12)
  const rest = months % 12
  const parts = []
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`)
  if (rest) parts.push(`${rest} mo${rest > 1 ? 's' : ''}`)
  return parts.join(' ')
}

// Level 1..n maps to a height; GAP sits just above the baseline.
const GAP_LEVEL = 0.3
const levelY = (level, count) => 0.88 - (level / count) * 0.66

const buildModel = (roles) => {
  const byStart = (a, b) => parse(a.start) - parse(b.start)
  const ordered = roles.filter((r) => !r.alongside).sort(byStart)
  const earliest = Math.min(...roles.map((r) => parse(r.start)))
  const t0 = Date.UTC(new Date(earliest).getUTCFullYear(), 0, 1)
  const t1 = NOW + 3 * MONTH
  const nx = (t) => (t - t0) / (t1 - t0)

  const lanes = roles.filter((r) => r.alongside).sort(byStart).map((role) => {
    const from = parse(role.start)
    const to = role.end ? parse(role.end) : NOW
    return { ...role, from, to, x0: nx(from), x1: nx(to) }
  })

  const nodes = ordered.map((role, i) => {
    const from = parse(role.start)
    const to = role.end ? parse(role.end) : NOW
    return { ...role, from, to, x0: nx(from), x1: nx(to), y: levelY(i + 1, ordered.length), current: !role.end }
  })

  // Plateaus include a dip wherever there's more than ~6 weeks between roles.
  const plateaus = []
  nodes.forEach((node, i) => {
    const prev = nodes[i - 1]
    if (prev && node.from - prev.to > 1.5 * MONTH) {
      plateaus.push({ x0: prev.x1, x1: node.x0, y: levelY(GAP_LEVEL, nodes.length) })
    }
    plateaus.push(node)
  })

  const years = []
  for (let y = new Date(t0).getUTCFullYear(); y <= new Date(NOW).getUTCFullYear(); y++) {
    years.push({ year: y, x: nx(Date.UTC(y, 0, 1)) })
  }

  return { nodes, plateaus, lanes, years, end: nx(NOW) }
}

// Smooth S-curves between plateaus. Built in real pixels from the measured box
// so the stroke never stretches.
const buildPaths = ({ plateaus, end }, w, h) => {
  const tw = Math.min(28, w * 0.04)
  const X = (n) => n * w
  const Y = (n) => n * h
  const first = plateaus[0]
  let d = `M ${X(first.x0) - tw / 2} ${h} C ${X(first.x0)} ${h} ${X(first.x0)} ${Y(first.y)} ${X(first.x0) + tw / 2} ${Y(first.y)}`
  for (let i = 1; i < plateaus.length; i++) {
    const a = plateaus[i - 1]
    const b = plateaus[i]
    const xb = (X(a.x1) + X(b.x0)) / 2
    d += ` L ${xb - tw / 2} ${Y(a.y)} C ${xb} ${Y(a.y)} ${xb} ${Y(b.y)} ${xb + tw / 2} ${Y(b.y)}`
  }
  const last = plateaus[plateaus.length - 1]
  d += ` L ${X(end)} ${Y(last.y)}`
  const area = `${d} L ${X(end)} ${h} L ${X(first.x0) - tw / 2} ${h} Z`
  return { line: d, area }
}

const ease = [0.2, 0, 0, 1]

const CareerGraph = ({ roles }) => {
  const model = buildModel(roles)
  const boxRef = useRef(null)
  // Server default; replaced by the measured size on the first observer tick.
  const [size, setSize] = useState({ w: 1000, h: 288 })
  const reduce = useReducedMotion()

  useEffect(() => {
    const box = boxRef.current
    if (!box) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ w: Math.round(width), h: Math.round(height) })
    })
    observer.observe(box)
    return () => observer.disconnect()
  }, [])

  const { line, area } = buildPaths(model, size.w, size.h)
  const draw = reduce
    ? {}
    : {
        initial: { pathLength: 0 },
        whileInView: { pathLength: 1 },
        viewport: { once: true, margin: '-15% 0px' },
        transition: { duration: 1.1, ease },
      }

  return (
    <figure className="mx-auto mt-4 w-full md:w-[90%] lg:w-[80%]">
      <figcaption className="sr-only">
        Career timeline: {model.nodes.map((n) => `${n.position} at ${n.short}`).join(', then ')}
        {model.lanes.map((n) => `; alongside, ${n.position} at ${n.short}`).join('')}.
      </figcaption>
      <div aria-hidden="true">
        <div ref={boxRef} className="relative h-56 md:h-72 text-primary dark:text-primary-dark">
          {/* Year gridlines */}
          {model.years.map(({ year, x }) => (
            <span key={year} className="absolute inset-y-0 border-l border-dashed border-dark/10 dark:border-light/10"
              style={{ left: `${x * 100}%` }} />
          ))}

          <svg className="absolute inset-0 size-full overflow-visible" viewBox={`0 0 ${size.w} ${size.h}`}
            preserveAspectRatio="none">
            <defs>
              <linearGradient id="career-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path d={area} fill="url(#career-fill)"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.6, delay: reduce ? 0 : 0.6, ease }} />
            <motion.path d={line} fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" {...draw} />
          </svg>

          {model.nodes.map((node) => {
            const mid = (node.x0 + node.x1) / 2
            // Keep edge labels inside the box instead of centring them off-screen.
            const align = mid < 0.15 ? 'left-0' : mid > 0.85 ? 'right-0' : 'left-1/2 -translate-x-1/2'
            return (
              <div key={node.position} className="absolute" style={{ left: `${mid * 100}%`, top: `${node.y * 100}%` }}>
                <span className={`absolute -translate-x-1/2 -translate-y-1/2 block rounded-full border-2 border-current
                  ${node.current ? 'size-3.5 bg-current' : 'size-3 bg-light dark:bg-black'}`} />
                <div className={`absolute bottom-3 ${align} w-max max-w-44 md:max-w-56 rounded-lg border px-2.5 py-1.5
                  text-left leading-tight shadow-[0_4px_12px_rgb(0_0_0/0.08)]
                  ${node.current
                    ? 'border-primary/60 bg-white dark:border-primary-dark/60 dark:bg-dark'
                    : 'border-dark/15 bg-white dark:border-light/15 dark:bg-dark'}`}>
                  <span className="hidden md:block text-sm font-semibold text-dark dark:text-light">{node.position}</span>
                  <span className="block text-xs font-semibold md:font-normal text-dark dark:text-light md:text-dark/70 md:dark:text-light/70">
                    {node.short}
                    <span className="hidden md:inline"> · {node.current ? 'Now, ' : ''}{duration(node.from, node.to)}</span>
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Roles held alongside a main one */}
        {model.lanes.length > 0 && (
          <div className="relative border-t border-dark/30 dark:border-light/30 pt-2">
            {model.lanes.map((lane) => (
              <div key={lane.position} className="relative h-7">
                {model.years.map(({ year, x }) => (
                  <span key={year} className="absolute inset-y-0 border-l border-dashed border-dark/10 dark:border-light/10"
                    style={{ left: `${x * 100}%` }} />
                ))}
                <span className="absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full border border-primary/70 bg-primary/20
                  dark:border-primary-dark/70 dark:bg-primary-dark/25"
                  style={{ left: `${lane.x0 * 100}%`, width: `${(lane.x1 - lane.x0) * 100}%` }} />
                <span className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pl-2 text-xs leading-none text-dark/80 dark:text-light/80"
                  style={{ left: `${lane.x1 * 100}%` }}>
                  <span className="font-semibold text-dark dark:text-light">{lane.short}</span>
                  <span className="hidden sm:inline"> · {lane.position}, {duration(lane.from, lane.to)}</span>
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Axis (the lane above already draws the baseline when there is one) */}
        <div className={`relative h-7 ${model.lanes.length ? '' : 'border-t border-dark/30 dark:border-light/30'}`}>
          {model.years.map(({ year, x }) => (
            <span key={year} className="absolute top-2 -translate-x-1/2 text-[11px] md:text-xs tabular-nums text-dark/70 dark:text-light/70"
              style={{ left: `${x * 100}%` }}>
              <span className="md:hidden">&apos;{String(year).slice(2)}</span>
              <span className="hidden md:inline">{year}</span>
            </span>
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-dark/75 dark:text-light/75">
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-5 rounded-full bg-primary dark:bg-primary-dark" />Main role
        </span>
        {model.lanes.length > 0 && (
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-5 rounded-full border border-primary/70 bg-primary/20 dark:border-primary-dark/70 dark:bg-primary-dark/25" />
            Alongside (internship)
          </span>
        )}
      </div>
    </figure>
  )
}

export default CareerGraph
