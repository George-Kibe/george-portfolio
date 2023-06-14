"use client"

import React from 'react'
import { motion } from 'framer-motion'

const Skill = ({name, x, y}) => {
  return (
    <motion.div className="flex items-center justify-center rounded-full 
     font-semibold bg-dark text-light py-2 px-4 dark:bg-light dark:text-dark
    shadow-dark cursor-pointer absolute"
      whileHover={{scale:1.2}}
      initial={{x:0, y:0}}
      whileInView={{x:x, y:y, transition:{duration:1.5}}}
      viewport={{once: true}}
      >
        {name}
    </motion.div>
  )
}

const Skills = () => {
  return (
    <div className='mt-8 md:mt-24'>
      <h2 className="font-bold text-4xl md:text-6xl w-full text-center mb-16">Skills</h2>
      <div className="w-full h-screen relative flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark">
        <Skill name="Web" />
        <Skill name="Python" x="-17vw" y="-5vw" />
        <Skill name="SQL" x="-17vw" y="7vw" />
        <Skill name="JavaScript" x="0vw" y="15vw" />
        <Skill name="AWS" x="20vw" y="6vw" />
        <Skill name="Firebase" x="0vw" y="-12vw" />
        <Skill name="MongoDB" x="-20vw" y="-15vw" />
        <Skill name="Nodejs" x="18vw" y="-12vw" />
        <Skill name="Express" x="32vw" y="-5vw" />
        <Skill name="Data Engineering" x="0vw" y="-24vw" />
        <Skill name="Data Scrapping" x="32vw" y="10vw" />
        <Skill name="Pyspark" x="-25vw" y="18vw" />
        <Skill name="React" x="18vw" y="18vw" />
        <Skill name="Nextjs" x="0vw" y="25vw" />
        <Skill name="Django" x="-32vw" y="0vw" />
        <Skill name="React Native" x="22vw" y="-24vw" />
        <Skill name="React" x="18vw" y="18vw" />
        <Skill name="Android" x="-24vw" y="-24vw" />
      </div>
      
    </div>
  )
}

export default Skills