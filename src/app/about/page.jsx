import AnimatedText from '@/components/AnimatedText'
import React from 'react'
import ProfilePic from "../../../public/images/profile/gk.png"
import Image from 'next/image'
import { AnimatedNumbers } from '@/utils/AnimatedNumbers'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Education from '@/components/Education'


export const metadata = {
    title: 'Portfolio | About',
    description: 'Powered by Nextjs',
  }

const AboutPage = () => {
  return (
    <div>
      <main className="items-center">
        <AnimatedText text={"Passion Fuels Purpose! Why Fuels How!"} />
        <div className="flex flex-col md:grid w-full grid-cols-8 gap-16">
            <div className="col-span-3 flex flex-col items-start justify-start">
              <h2 className="mb-2 md:mb-4 text-lg font-bold uppercase">About Me</h2>
              <p className="font-medium text-justify my-2 md:my-4">
                - Hi, I'm CodeBucks, a web developer and UI/UX designer with a passion for creating beautiful, functional, 
                and user-centered digital experiences. With 4 years of experience in the field. I am always looking for 
                new and innovative ways to bring my clients' visions to life.
              </p>
              <p className="font-medium text-justify my-2 md:my-4">
                - I believe that design is about more than just making things look pretty – it's about solving problems and 
                creating intuitive, enjoyable experiences for users. 
              </p>
              <p className="font-medium text-justify my-2 md:my-4">
                - Whether I'm working on a website, mobile app, or 
                other digital product, I bring my commitment to design excellence and user-centered thinking to 
                every project I work on. I look forward to the opportunity to bring my skills and passion to your next project.
              </p>
            </div>
            <div className="col-span-3 relative h-max  rounded-2xl border-2 border-solid border-dark bg-light p-8 border-r-8 border-b-8" >
                <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark" />
              <Image src={ProfilePic} alt='profile photo' className='w-full h-auto rounded-2xl'/>
            </div>
            <div className="flex flex-col col-span-2 items-center justify-between ">
              <div className="flex flex-col items-center justify-center">
                <span className="inline-block text-5xl font-bold"><AnimatedNumbers value={25}/>+</span>
                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light">Satisfied Clients</h2>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="inline-block text-5xl font-bold"><AnimatedNumbers value={30}/>+</span>
                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light">Completed Projects</h2>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="inline-block text-5xl font-bold"><AnimatedNumbers value={4}/>+</span>
                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light">Years of Experience Clients</h2>
              </div>
            </div>
        </div>
        <Skills />
        <Experience />
        <Education />
      </main>
    </div>
  )
}

export default AboutPage