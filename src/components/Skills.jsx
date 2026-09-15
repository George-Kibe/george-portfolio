"use client"

import React from 'react'
import { motion } from 'framer-motion'

const Skill = ({name, x, y}) => {
  return (
    <motion.div className="flex items-center justify-center rounded-full overflow-wrap
     font-semibold bg-dark text-light text-xs md:text-base px-2 py-0.5 md:py-2 md:px-4 dark:bg-light dark:text-dark
    cursor-pointer absolute"
      whileHover={{scale:1.05}}
      initial={{x:0, y:0}}
      whileInView={{x:x, y:y, transition:{duration:0.3, ease:[0.2, 0, 0, 1]}}}
      viewport={{once: true}}
      >
        {name}
    </motion.div>
  )
}

const Skills = () => {
  return (
    <div className='mt-24 md:mt-32'>
      <h2 className="font-bold text-3xl md:text-5xl leading-tight w-full text-center mb-8 md:mb-12">Skills</h2>
      {/* Chips are offset up to ±34vw from the centre, so the height tracks the
          viewport width rather than its height. */}
      <div className="w-full relative flex items-center justify-center rounded-full
        h-[80vw]
        bg-circularLightSm dark:bg-circularDarkSm md:bg-circularLight md:dark:bg-circularDark">
        <Skill name="Web Development" />
        <Skill name="Python" x="-18vw" y="-5vw" />
        <Skill name="SQL & NoSQL" x="-35vw" y="0vw" />
        <Skill name="JavaScript" x="0vw" y="15vw" />
        <Skill name="AWS" x="20vw" y="6vw" />
        <Skill name="GCP & Firebase" x="0vw" y="-15vw" />
        <Skill name="MongoDB" x="-30vw" y="-15vw" />
        <Skill name="Nodejs" x="22vw" y="-15vw" />
        <Skill name="Express" x="18vw" y="-5vw" />
        <Skill name="Data Engineering" x="0vw" y="-32vw" />
        <Skill name="Data Scrapping" x="0vw" y="34vw" />
        <Skill name="X-code" x="-25vw" y="18vw" />
        <Skill name="React" x="25vw" y="18vw" />
        <Skill name="Nextjs" x="-20vw" y="26vw" />
        <Skill name="Django" x="-20vw" y="5vw" />
        <Skill name="React Native" x="22vw" y="-24vw" />
        <Skill name="Celery & Redis" x="20vw" y="26vw" />
        <Skill name="Spring Boot" x="0vw" y="26vw" />
        <Skill name="n8n & AI Automations" x="-24vw" y="-24vw" />
      </div>
      
    </div>
  )
}

export default Skills