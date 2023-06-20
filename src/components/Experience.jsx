"use client"

import React, { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import LiIcon from './LiIcon'
import AnimatedText from './AnimatedText'

const Details = ({position, company, companyLink, time, address, work}) => {
  const ref = useRef(null)
  return (
    <li ref={ref} className="my-4 md:my-8 first:mt-0 last:mb-0 w-[90%] md:w-[80%] mx-auto flex flex-col items-center justify-center">
      <LiIcon reference={ref}/>
      <motion.div
        initial={{y:50}}
        whileInView={{y:0}}
        transition={{duration:0.5, type:"spring"}}
        className="gap-1">
        <h3 className="capitalize font-bold text-2xl">{position}&nbsp; <a href={companyLink}>@{company}</a></h3>
        <span className="capitalize font-medium text-dark/75 dark:text-light/75"> {time} | {address}</span>
        <p className="text-justify font-medium w-full ">{work.one}</p>
        <p className="text-justify font-medium w-full ">{work.two}</p>
        <p className="text-justify font-medium w-full ">{work.three}</p>
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
    <div className='my-2 md:my-40'>
      <AnimatedText text={"Experience"}/>
      <div ref={ref} className="md:w-[75%] mx-auto relative">
        <motion.div style={{scaleY: scrollYProgress*1.0}}
            className='absolute left-4 md:left-6 top-0 w-[2px] md:w-[4px] h-full bg-dark dark:bg-light origin-top'/>
        <ul className="w-full flex flex-col items-start justify-between ml-2">
            <Details 
                position={"Mobile and Web Developer"}
                company={"Dowell Research PTE Limited, UK"}
                companyLink={""}
                time={"November 2021-Present"}
                address={"Level Six Battery Road"}
                work={{"one":"Worked on developing the company’s documentation and hiring system using React and django.",
                 "two":"Helped the company migrate to an online hiring system from using google forms",
                 "three":"Led team of mobile developers and designers to develop a license compatibility and policy generators mobile application using React Native and django"}}        
            />
            <Details 
                position={"Software Engineer | Valuer"}
                company={"BuidAfrique Consulting Group"}
                companyLink={""}
                time={"January 2021 to October"}
                address={"Off Kindaruma Road, Nairobi"}
                work={{"one":"Involved in preparation of cash flow projections and real estate financial modelling.",
                "two":"Involved in collection, analysis and presentation of data for valuation and feasibility studies. Preparation of valuation reports. Feasibility studies. Land appraisal and real estate market assessments. Cash flow projections and real estate financial modelling. Business development. Market research. Team member in preparation of the Company’s monthly publications on real estate and construction industry news and trends."}}    
            />
            <Details 
                position={"Relationship Offcier"}
                company={"Equity Bank Kenya Limited"}
                companyLink={"https://equitygroupholdings.com/ke/"}
                time={"June 2019- August 2020"}
                address={"Off Hospital Road, Nairobi"}
                work={{"one":"Involved in facilitating the basic activities in a bank including cash withdrawals and deposits, forex advisory to customers and customer service.",
                "two":"Team member of Nairobi West and Kimende branches which appeared some of the best performing branches."}}   
           />
        </ul>
      </div>
    </div>
  )
}

export default Experience