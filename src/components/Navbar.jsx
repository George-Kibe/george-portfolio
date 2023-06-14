"use client"
import Link from 'next/link'
import React, {useState} from 'react'
import Logo from './Logo'
import { usePathname, useRouter } from 'next/navigation'
import { SocialIcon } from 'react-social-icons';
import DarkModeToggle from './DarkModeToggle'
import {FaBars} from "react-icons/fa"
import {GiTireIronCross} from "react-icons/gi"
import { motion } from 'framer-motion'

const CustomLink = ({href, title, className=""}) => {
  const pathname = usePathname();
  return(
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span className={`h-[1px] inline-block w-0 bg-dark absolute left-0 -bottom-0.5
        group-hover:w-full transition-[width] ease duration-300
        ${pathname === href? 'w-full': 'w-0'} dark:bg-light
        `}
        >
        &nbsp;
      </span>  
    </Link>
  )
}

const CustomMobileLink = ({href, title, className="", toggle}) => {
  const router = useRouter()
  const pathname = usePathname();
  const handleClick = () => {
    toggle()
    router.push(href)
  }

  return(
    <button className={`${className} relative group font-bold text-[25px] text-light dark:text-black`} onClick={handleClick}>
      {title}
      <span className={`h-[1px] inline-block w-0 bg-light absolute left-0 -bottom-0.5
        group-hover:w-full transition-[width] ease duration-300 dark:bg-dark
        ${pathname === href? 'w-full': 'w-0'}
        `}
        >
        &nbsp;
      </span>  
    </button>
  )
}
const style={width:30, height:30}
const smallStyle={width:25, height:25}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => {
    setIsOpen(!isOpen)
  }
  return (
    <header className="w-full md:px-8 py-8 font-normal flex items-center justify-between relative">
      <button className="flex absolute md:hidden" onClick={handleClick}>
        {
          isOpen? <GiTireIronCross className='text-[20px]' />  
          :<FaBars className='text-[20px]' />
        }       
      </button>
      <div className="w-full justify-between items-center hidden md:flex">
        <nav className=''>
          <CustomLink href={"/"} title={"Home"} className='mr-4'/>
          <CustomLink href={"/about"} title={"About"} className='mx-4'/>
          <CustomLink href={"/projects"} title={"Projects"} className='mx-4'/>
          <CustomLink href={"/contacts"} title={"Contact"}className='mx-4'/>
          <CustomLink href={"/articles"} title={"Articles"}className='ml-4'/>
        </nav>
        <nav className="flex items-center justify-center flex-wrap gap-2">
          <DarkModeToggle />
          <div className="border-1 dark:bg-white border-transparent dark:border-light ml-2 rounded-full p-1">
            <SocialIcon  url="https://github.com/George-Kibe" style={style} target={"_blank"} />
          </div> 
          <SocialIcon url="https://stackoverflow.com/users/17756485/george-kibe-w" style={style} target={"_blank"}/>
          <SocialIcon url="https://dribbble.com/GeorgeKibe" style={style} target={"_blank"}/>
          <SocialIcon url="https://www.linkedin.com/in/george-kibe-17b431110" style={style} target={"_blank"}/>
          <SocialIcon url="https://twitter.com/kibegeorge_" style={style} target={"_blank"}/>        
          <SocialIcon url="https://web.whatsapp.com/send?phone=+254795288155" style={style} target={"_blank"} />
        </nav>
      </div>
      {/* mobile menu */}
      {
        isOpen ?
        <motion.div
          initial={{scale:0, opacity:0, x:"-50%", y:"-50%"}}
          animate={{scale:1, opacity:1}}
          className="min-w-[80vw] flex pb-12 flex-col justify-between items-center fixed z-50 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
          bg-dark/90 dark:bg-light/90 rounded-lg backdrop-blur-md pt-8 md:hidden gap-4
        ">
          <nav className='flex items-center justify-center flex-col gap-1'>
            <CustomMobileLink href={"/"} title={"Home"}  toggle={handleClick} className=''/>
            <CustomMobileLink href={"/about"} title={"About"}  toggle={handleClick} className=''/>
            <CustomMobileLink href={"/projects"} title={"Projects"}  toggle={handleClick} className=''/>
            <CustomMobileLink href={"/contacts"} title={"Contact"} toggle={handleClick} className=''/>
            <CustomMobileLink href={"/articles"} title={"Articles"} toggle={handleClick} className=''/>
          </nav>
          <DarkModeToggle />
          <nav className="flex items-center justify-center flex-wrap gap-2">
           
            <div className="border-1 bg-light border-transparent dark:border-light ml-2 rounded-full p-1">
              <SocialIcon  url="https://github.com/George-Kibe" style={smallStyle} target={"_blank"} />
            </div> 
            <SocialIcon url="https://stackoverflow.com/users/17756485/george-kibe-w" style={smallStyle} target={"_blank"}/>
            <SocialIcon url="https://dribbble.com/GeorgeKibe" style={smallStyle} target={"_blank"}/>
            <SocialIcon url="https://www.linkedin.com/in/george-kibe-17b431110" style={smallStyle} target={"_blank"}/>
            <SocialIcon url="https://twitter.com/kibegeorge_" style={smallStyle} target={"_blank"}/>        
            <SocialIcon url="https://web.whatsapp.com/send?phone=+254795288155" style={smallStyle} target={"_blank"} />
          </nav>
        </motion.div>

        :null
      }
      <div className="absolute right-1 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
        <Logo />
      </div>
    </header>
  )
}

export default Navbar

























