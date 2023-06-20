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
        <div className="flex flex-col md:flex-row  w-full gap-2 md:gap-8 lg:gap-16">
            <div className="flex flex-col md:w-[40%] lg:w-[60%] items-start justify-start">
              <h2 className="mb-2 md:mb-4 text-lg font-bold uppercase">About Me</h2>
              <p className="font-medium text-justify my-2 md:my-4">
                Hola! <br />
                I'm George Kibe. I am a tech enthusiast. 
                I enjoy coming up with tech solutions and automation, especially the boring stuff. <br />
                I am a graduate of the University of Nairobi-Kenya. 
                Am also an expert in Mobile and website development, data engineering and data science. 
                I am passionate about innovatie startups. If you are interested in any of the solutions above, I got you. <br />
                I also enjoy creative reading and writing, playing chess and traveling, just in case you don't find me online.
                Thank you, George Kibe
              </p>
            </div>
            <div className="flex relative md:w-[40%] lg:w-[20%] rounded-2xl border-2 border-solid border-dark bg-light dark:border-light
              dark:bg-dark mx-0 sm:mx-16 md:m-0 p-4 xl:p-8 border-r-8 border-b-8" >
              <Image src={ProfilePic} alt='profile photo' className='w-full h-auto object-contain rounded-2xl'/>
            </div>
            <div className="flex flex-row md:flex-col md:w-[20%] items-start md:items-center justify-between ">
              <div className="flex flex-col items-start md:items-center justify-center">
                <span className="inline-block text-2xl md:text-5xl font-bold"><AnimatedNumbers value={25}/>+</span>
                <h2 className="sm:text-xl font-medium capitalize text-dark/75 dark:text-light">Satisfied Clients</h2>
              </div>
              <div className="flex flex-col items-start md:items-center justify-center">
                <span className="inline-block text-2xl md:text-5xl font-bold"><AnimatedNumbers value={30}/>+</span>
                <h2 className="sm:text-xl font-medium capitalize text-dark/75 dark:text-light">Completed Projects</h2>
              </div>
              <div className="flex flex-col items-start md:items-center justify-center">
                <span className="inline-block text-2xl md:text-5xl font-bold"><AnimatedNumbers value={4}/>+</span>
                <h2 className="sm:text-xl font-medium capitalize text-dark/75 dark:text-light">
                  Years of Experience
                </h2>
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