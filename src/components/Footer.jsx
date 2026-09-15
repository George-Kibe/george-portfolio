import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='mt-24 md:mt-32 border-t border-dark/10 dark:border-light/10'>
      <div className="flex py-6 flex-col md:flex-row gap-2 text-sm items-center justify-between">
        <div className=''>2020-{new Date().getFullYear()} &copy; All Rights Reserved</div>
        <div className="">
          Build with <span className='text-primary dark:text-primary-dark text-base leading-none px-1'>&#9825;</span> Nextjs
        </div>
        <Link href={"/"} className='underline underline-offset-2'>George Kibe</Link>
      </div>
    </footer>
  )
}

export default Footer