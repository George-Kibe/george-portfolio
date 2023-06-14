"use client"

import { motion, useMotionValue } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

const FramerImage = motion(Image);

const MovingImage = ({title, image, link})=> {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const imageRef = useRef(null);

    const handleMouse = (event) => {
      imageRef.current.style.display = "inline-block";
      x.set(event.pageX);
      y.set(-10)
    }
    const handleMouseLeave = (event) => {
        imageRef.current.style.display = "none";
        x.set(0);
        y.set(0);
    }
    return(
        <Link href={link} onMouseMove={handleMouse} onMouseLeave={handleMouseLeave}>
          <h2 className="capitalize text-xl font-semibold hover:underline">{title}</h2>
          <FramerImage style={{x:x, y:y}}
            initial={{opacity:0}}
            whileInView={{opacity:1, transition:{duration:0.2}}}
           ref={imageRef} src={image} alt={title} className="z-10 w-96 h-auto hidden absolute rounded-lg" />
        </Link>
    )
}

export const Article = ({image, title, date, link}) => {
    return(
      <motion.li
        initial={{y:200}}
        whileInView={{y:0, transition:{duration: 0.5, ease:"easeInOut"}}}   
        viewport={{once:true}}   
        className="relative w-full p-4 py-6 my-4 rounded-xl flex items-center justify-between bg-light
      text-dark first:mt-0 border border-solid border-dark border-r-4 border-b-4">
        <MovingImage title={title} image={image} link={link}/>
        <span className="text-primary font-semibold pl-4">{date}</span>
      </motion.li>
    )
  }