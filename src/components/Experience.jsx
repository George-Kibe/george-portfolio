"use client"

import React, { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import LiIcon from './LiIcon'
import AnimatedText from './AnimatedText'
import CareerGraph from './CareerGraph'
import { EXPERIENCE, formatRange } from '@/lib/experience'

const Details = ({position, company, companyLink, location, start, end, work, links = []}) => {
  const ref = useRef(null)
  return (
    <li ref={ref} className="my-4 md:my-8 first:mt-0 last:mb-0 w-[90%] md:w-[80%] mx-auto flex flex-col items-center justify-center">
      <LiIcon reference={ref}/>
      <motion.div
        initial={{y:16}}
        whileInView={{y:0}}
        viewport={{once:true}}
        transition={{duration:0.3, ease:[0.2, 0, 0, 1]}}
        className="flex w-full flex-col gap-2">
        <h3 className="font-bold text-2xl leading-tight">
          {position}&nbsp;{companyLink
            ? <a href={companyLink} target="_blank" rel="noopener noreferrer"
                className="text-primary dark:text-primary-dark underline-offset-4 hover:underline">@{company}</a>
            : <span className="text-primary dark:text-primary-dark">@{company}</span>}
        </h3>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-medium text-dark/75 dark:text-light/75">
          <span>{formatRange({start, end})} | {location}</span>
          {!end && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-semibold
              text-primary dark:bg-primary-dark/15 dark:text-primary-dark">
              <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />Current
            </span>
          )}
        </p>
        <ul className="mt-1 flex list-disc flex-col gap-2 pl-5 marker:text-primary dark:marker:text-primary-dark">
          {work.map((line) => (
            <li key={line} className="text-left font-normal leading-relaxed">{line}</li>
          ))}
        </ul>
        {links.map(({label, url}) => (
          <a key={url} href={url} target="_blank" rel="noopener noreferrer"
            className="self-start font-semibold text-primary underline underline-offset-4 dark:text-primary-dark">
            {label}
          </a>
        ))}
      </motion.div>
    </li>
  )
}

const Experience = () => {
  const ref =useRef(null);
  const {scrollYProgress} = useScroll(
    {
      target:ref,
      offset: ["start end", "center start"]
    }
  );
  return (
    <section className='mt-24 md:mt-32'>
      <AnimatedText text={"Experience"} as="h2"/>
      <CareerGraph roles={EXPERIENCE} />
      <div ref={ref} className="mt-16 md:mt-20 md:w-[75%] mx-auto relative">
        <motion.div style={{scaleY: scrollYProgress*1.0}}
            className='absolute left-4 md:left-6 top-0 w-0.5 md:w-1 h-full bg-dark dark:bg-light origin-top'/>
        <ul className="w-full flex flex-col items-start justify-between ml-2">
          {EXPERIENCE.map((role) => (
            <Details key={role.position} {...role} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Experience
