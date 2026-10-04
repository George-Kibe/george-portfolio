"use client"

import React from 'react'
import { motion } from 'framer-motion'

// Chips fly out from the centre to a spot given as a percentage of the orbit
// box, so the layout scales with the box instead of the viewport. The box keeps
// the original 5:4 proportions but stops growing at max-w-3xl; sized in vw, it
// reached ~1150px tall on a wide desktop. Phones get a square box: at 5:4 the
// rows sat too close together for the chips to clear each other.
//
// x/y are offsets from the centre: x in % of the box width, y in % of its
// height.
const SKILLS = [
  { name: 'Web Development', x: 0, y: 0 },
  { name: 'Python', x: -18, y: -8 },
  { name: 'SQL & NoSQL', x: -35, y: 0 },
  { name: 'JavaScript', x: 0, y: 19 },
  { name: 'AWS', x: 20, y: 9 },
  { name: 'GCP & Firebase', x: 0, y: -19 },
  { name: 'MongoDB', x: -30, y: -19 },
  { name: 'Nodejs', x: 22, y: -19 },
  { name: 'Express', x: 18, y: -8 },
  { name: 'Data Engineering', x: 0, y: -40 },
  { name: 'Data Scrapping', x: 0, y: 42 },
  { name: 'X-code', x: -25, y: 22.5 },
  { name: 'React', x: 25, y: 22.5 },
  { name: 'Nextjs', x: -20, y: 32.5 },
  { name: 'Django', x: -20, y: 8 },
  { name: 'React Native', x: 22, y: -30 },
  { name: 'Celery & Redis', x: 24, y: 32.5 },
  { name: 'Spring Boot', x: 0, y: 32.5 },
  { name: 'n8n & AI Automations', x: -24, y: -30 },
]

const Skill = ({name, x, y}) => {
  return (
    <motion.div className="absolute flex items-center justify-center whitespace-nowrap rounded-full font-semibold
      bg-dark text-light dark:bg-light dark:text-dark cursor-pointer
      text-[10px] px-1.5 py-0.5 min-[360px]:text-[11px] min-[360px]:px-2 sm:text-xs sm:px-3 sm:py-1 md:text-sm md:px-4 md:py-1.5"
      style={{ x: '-50%', y: '-50%' }}
      whileHover={{scale:1.05}}
      initial={{left: '50%', top: '50%'}}
      whileInView={{left: `${50 + x}%`, top: `${50 + y}%`, transition:{duration:0.3, ease:[0.2, 0, 0, 1]}}}
      viewport={{once: true}}
      >
        {name}
    </motion.div>
  )
}

const Skills = () => {
  return (
    <section className='mt-24 md:mt-32'>
      <h2 className="font-bold text-3xl md:text-5xl leading-tight w-full text-center mb-8 md:mb-12">Skills</h2>
      <div className="relative mx-auto w-full max-w-3xl aspect-square sm:aspect-5/4 rounded-full
        bg-circularLightSm dark:bg-circularDarkSm md:bg-circularLightMd md:dark:bg-circularDarkMd">
        {SKILLS.map((skill) => <Skill key={skill.name} {...skill} />)}
      </div>
    </section>
  )
}

export default Skills
