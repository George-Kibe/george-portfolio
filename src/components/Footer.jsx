import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='mt-4'>
      <hr className='border-2 mt-4 w-full'/>
      <div className="flex p-2 flex-col md:flex-row gap-2 text-{14px] items-center justify-between mt-4 mb-1">
        <div className=''>2020-{new Date().getFullYear()} &copy; All Rights Reserved</div>
        <div className="">
          Build with <span className='text-primary text-2xl px-1'>&#9825;</span> Nextjs
        </div>
        <Link href={"/"} className='underline underline-offset-2'>George Kibe</Link>
      </div>
    </footer>
  )
}

export default Footer