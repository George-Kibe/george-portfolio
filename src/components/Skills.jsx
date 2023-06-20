"use client"

import React from 'react'
import { motion } from 'framer-motion'

const Skill = ({name, x, y}) => {
  return (
    <motion.div className="flex items-center justify-center rounded-full overflow-wrap
     font-semibold bg-dark text-light md:py-2 px-1 md:px-4 dark:bg-light dark:text-dark
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
      <h2 className="font-bold text-4xl md:text-6xl w-full text-center sm:mb-16">Skills</h2>
      <div className="w-full relative flex items-center justify-center rounded-full
        sm:my-2 md:my-24 xl:my-48 h-[50vh] sm:h-[60vh] md:h-[70vh] lg:min-h-screen
        bg-circularLightSm dark:bg-circularDarkSm md:bg-circularLight md:dark:bg-circularDark">
        <Skill name="Web" />
        <Skill name="Python" x="-18vw" y="-5vw" />
        <Skill name="SQL" x="-35vw" y="0vw" />
        <Skill name="JavaScript" x="0vw" y="15vw" />
        <Skill name="AWS" x="20vw" y="6vw" />
        <Skill name="Firebase" x="0vw" y="-15vw" />
        <Skill name="MongoDB" x="-30vw" y="-15vw" />
        <Skill name="Nodejs" x="22vw" y="-15vw" />
        <Skill name="Express" x="18vw" y="-5vw" />
        <Skill name="Data Engineering" x="0vw" y="-32vw" />
        <Skill name="Data Scrapping" x="0vw" y="34vw" />
        <Skill name="Pyspark" x="-25vw" y="18vw" />
        <Skill name="React" x="25vw" y="18vw" />
        <Skill name="Nextjs" x="-20vw" y="26vw" />
        <Skill name="Django" x="-20vw" y="5vw" />
        <Skill name="React Native" x="22vw" y="-24vw" />
        <Skill name="GCP" x="20vw" y="26vw" />
        <Skill name="CSS" x="0vw" y="26vw" />
        <Skill name="Android" x="-24vw" y="-24vw" />
      </div>
      
    </div>
  )
}

export default Skills