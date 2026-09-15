"use client"
import Link from 'next/link'
import React, {useState} from 'react'
import Logo from './Logo'
import { usePathname, useRouter } from 'next/navigation'
import { SocialIcon } from 'react-social-icons';
import DarkModeToggle from './DarkModeToggle'
import {FaBars} from "react-icons/fa"
import {GiTireIronCross} from "react-icons/gi"
import { AnimatePresence, motion } from 'framer-motion'

// The underline scales rather than animating `width`, so hovering doesn't
// trigger layout, and it stays short because people hover nav links constantly.
const underline = (active) =>
  `pointer-events-none absolute left-0 -bottom-1 h-px w-full origin-left transition-transform duration-200 ease-out
  group-hover:scale-x-100 ${active ? 'scale-x-100' : 'scale-x-0'}`

const CustomLink = ({href, title, className=""}) => {
  const pathname = usePathname();
  return(
    <Link href={href} className={`${className} relative group py-2`}>
      {title}
      <span aria-hidden="true" className={`${underline(pathname === href)} bg-dark dark:bg-light`} />
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
    <button className={`${className} relative group py-2 font-bold text-2xl text-light dark:text-black`} onClick={handleClick}>
      <span className="relative">
        {title}
        <span aria-hidden="true" className={`${underline(pathname === href)} bg-light dark:bg-dark`} />
      </span>
    </button>
  )
}
// Desktop is pointer-driven, so 32px is plenty; the mobile menu is touch, so
// its icons meet the 44px tap-target guideline.
const style={width:32, height:32}
const smallStyle={width:44, height:44}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => {
    setIsOpen(!isOpen)
  }
  return (
    <header className="w-full lg:px-8 py-8 font-normal flex items-center justify-between relative">
      <button
        type="button"
        className="flex absolute -left-3 p-3 md:hidden"
        onClick={handleClick}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {
          isOpen? <GiTireIronCross className='text-xl' aria-hidden="true" />
          :<FaBars className='text-xl' aria-hidden="true" />
        }
      </button>
      {/* Tighter spacing at md: at 768px the links, toggle and six icons don't
          fit on one row with desktop gaps. */}
      <div className="w-full justify-between items-center gap-4 hidden md:flex">
        <nav className='flex items-center gap-5 lg:gap-8'>
          <CustomLink href={"/"} title={"Home"}/>
          <CustomLink href={"/about"} title={"About"}/>
          <CustomLink href={"/projects"} title={"Projects"}/>
          <CustomLink href={"/contacts"} title={"Contact"}/>
          <CustomLink href={"/articles"} title={"Articles"}/>
        </nav>
        <nav className="flex items-center justify-center gap-2 lg:gap-3">
          <DarkModeToggle />
          <div className="border-1 dark:bg-white border-transparent dark:border-light ml-1 lg:ml-2 rounded-full p-1">
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
      <AnimatePresence>
      {
        isOpen ?
        <motion.div
          key="mobile-menu"
          initial={{scale:0.96, opacity:0, x:"-50%", y:"-50%"}}
          animate={{scale:1, opacity:1, x:"-50%", y:"-50%"}}
          exit={{scale:0.96, opacity:0, x:"-50%", y:"-50%", transition:{duration:0.15, ease:"easeIn"}}}
          transition={{duration:0.2, ease:[0.2, 0, 0, 1]}}
          className="min-w-[80vw] flex py-8 flex-col justify-between items-center fixed z-50 top-1/3 left-1/2
          bg-dark/90 dark:bg-light/90 rounded-2xl backdrop-blur-md md:hidden gap-6
        ">
          <nav className='flex items-center justify-center flex-col gap-2'>
            <CustomMobileLink href={"/"} title={"Home"}  toggle={handleClick} className=''/>
            <CustomMobileLink href={"/about"} title={"About"}  toggle={handleClick} className=''/>
            <CustomMobileLink href={"/projects"} title={"Projects"}  toggle={handleClick} className=''/>
            <CustomMobileLink href={"/contacts"} title={"Contact"} toggle={handleClick} className=''/>
            <CustomMobileLink href={"/articles"} title={"Articles"} toggle={handleClick} className=''/>
          </nav>
          <DarkModeToggle />
          <nav className="flex items-center justify-center flex-wrap gap-3 px-6">
            <div className="border-1 bg-light border-transparent dark:border-light rounded-full p-1">
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
      </AnimatePresence>
      <div className="absolute right-1 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
        <Logo />
      </div>
    </header>
  )
}

export default Navbar

























