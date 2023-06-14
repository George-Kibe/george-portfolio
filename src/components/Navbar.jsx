"use client"
import Link from 'next/link'
import React from 'react'
import Logo from './Logo'
import { usePathname } from 'next/navigation'
import { SocialIcon } from 'react-social-icons';
import DarkModeToggle from './DarkModeToggle'
import {FaBars} from "react-icons/fa"

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
const style={width:30, height:30}

const Navbar = () => {
  return (
    <header className="w-full px-32 py-8 font-normal flex items-center justify-between relative">
      <button className="">
        <FaBars className='text-[20px]' />
      </button>
      <nav >
        <CustomLink href={"/"} title={"Home"} className='mr-4'/>
        <CustomLink href={"/about"} title={"About"} className='mx-4'/>
        <CustomLink href={"/projects"} title={"Projects"} className='mx-4'/>
        <CustomLink href={"/contacts"} title={"Contact"}className='mx-4'/>
        <CustomLink href={"/articles"} title={"Articles"}className='ml-4'/>
      </nav>
      <nav className="flex items-center justify-center flex-wrap gap-2">
        <div className="border-1 dark:bg-white border-transparent dark:border-light rounded-full p-1">
          <SocialIcon  url="https://github.com/George-Kibe" style={style} target={"_blank"} />
        </div> 
        <SocialIcon url="https://stackoverflow.com/users/17756485/george-kibe-w" style={style} target={"_blank"}/>
        <SocialIcon url="https://dribbble.com/GeorgeKibe" style={style} target={"_blank"}/>
        <SocialIcon url="https://www.linkedin.com/in/george-kibe-17b431110" style={style} target={"_blank"}/>
        <SocialIcon url="https://twitter.com/kibegeorge_" style={style} target={"_blank"}/>        
        <SocialIcon url="https://web.whatsapp.com/send?phone=+254795288155" style={style} target={"_blank"} />
      </nav>
      <div className="absolute left-[50%] top-2 translate-x-[-50%]">
        <Logo />
        <DarkModeToggle />
      </div>
    </header>
  )
}

export default Navbar