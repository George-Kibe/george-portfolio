"use client"
import React from 'react'
import { motion } from 'framer-motion'

const quote = {
    initial:{
        opacity:1
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 0.5,
            staggerChildren: 0.08,
        }
    }
}

const singleWord = {
    initial: {
        opacity: 0,
        y:50,
    },
    animate: {
        opacity: 1,
        y:0,
        transition: {
            duration:1
        }
    }
}

// `as` keeps this reusable for section headings without minting extra <h1>s.
const AnimatedText = ({text, className="", as="h1"}) => {
  const MotionHeading = motion[as]
  return (
    <div className='flex-wrap mx-auto py-2 flex items-center justify-center text-justify overflow-hidden m-4'>
      <MotionHeading className={`${className} inline-block text-dark dark:text-light font-bold capitalize text-[40px] lg:text-[60px] self-center`}
        variants={quote}
        initial="initial"
        animate="animate"
      >
        {
            text.split(" ").map((word, index) => 
            <motion.span key={word+"-"+index} className='inline-block '
                variants={singleWord}
                initial="initial"
                animate="animate"
            >
                {word}&nbsp;
            </motion.span>
            )
        }

      </MotionHeading>
    </div>
  )
}

export default AnimatedText