"use client"

import React, { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import LiIcon from './LiIcon'
import AnimatedText from './AnimatedText'

const Details = ({course, school, schoolLink, time, address, skills}) => {
  const ref = useRef(null)
  return (
    <li ref={ref} className="my-4 md:my-8 first:mt-0 last:mb-0 w-[90%] md:w-[80%] mx-auto flex flex-col items-start justify-center">
      <LiIcon reference={ref}/>
      <motion.div
        initial={{y:50}}
        whileInView={{y:0}}
        transition={{duration:0.5, type:"spring"}}
        className="">
        <h3 className="capitalize font-bold text-2xl">{course}&nbsp; <a href={schoolLink}>@{school}</a></h3>
        <span className="capitalize font-medium text-dark/75 dark:text-light/75"> {time} | {address}</span>
        <p className="text-start font-medium w-full ">{skills}</p>
      </motion.div>
    </li>
  )
}

const Education = () => {
  const ref =useRef(null);
  const {scrollYProgress} = useScroll(
    {
      target:ref,
      offset: ["start end", "center start"]
    }
  );
  return (
    <div className='my-2 md:my-40'>
      <AnimatedText text={"Education"}/>
      <div ref={ref} className="md:w-[75%] mx-auto relative">
        <motion.div style={{scaleY: scrollYProgress*1.0}}
            className='absolute left-4 md:left-6 top-0 w-[2px] md:w-[4px] h-full bg-dark dark:bg-light origin-top'/>
        <ul className="w-full flex flex-col items-start justify-between ml-2">
            <Details 
                course={"Data Engineering"}
                school={"Explore Data Science Academy"}
                schoolLink={"https://admissions.explore.ai/"}
                time={"January 2022 to December 2022"}
                address={"South Africa"}
                skills={"Cloud computing, Storing big Data, Machine Learning, Exploratory Data Analysis, Moving big Data, processing Big data, "}         
            />
            <Details 
                course={"Software Engineering"}
                school={"IAT(Institute of Advanced Technology)"}
                schoolLink={""}
                time={"January 2020 to December 2020"}
                address={"Nairobi, Kenya"}
                skills={"Programmatic thinking, SQL, Python, C, C++, Data Structures and Algorithms, Java, Android, Kotlin"}         
            />
            <Details 
                course={"Software Engineering"}
                school={"ALX Africa"}
                schoolLink={"https://www.google.com"}
                time={"2022-Present"}
                address={"Africa"}
                skills={"SQL, Python, C, C++, Data Structures and Algorithms, Java"}         
            />
            <Details 
                course={"Bsc. Real Estate"}
                school={"University of Nairobi"}
                schoolLink={"https://uonbi.ac.ke"}
                time={"2015-2018"}
                address={"Off University Way, Nairobi Kenya"}
                skills={"Valuation, Real estate Financial Modelling, Agency, Property Management"}         
            />
        </ul>
      </div>
    </div>
  )
}

export default Education