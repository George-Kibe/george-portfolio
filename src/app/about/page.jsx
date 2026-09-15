import AnimatedText from '@/components/AnimatedText'
import React from 'react'
import ProfilePic from "../../../public/images/profile/gk.png"
import Image from 'next/image'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Education from '@/components/Education'


export const metadata = {
  title: 'About — Developer & Data Engineer in Nairobi',
  description:
    'George Kibe is a University of Nairobi graduate and full-stack developer ' +
    'specialising in mobile and web development, data engineering and data science. ' +
    'Read about his skills, work experience and education.',
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    url: '/about',
    title: 'About George Kibe — Developer & Data Engineer in Nairobi',
    description:
      'Skills, experience and education of George Kibe, a full-stack web and ' +
      'mobile developer based in Nairobi, Kenya.',
  },
}

const STATS = [
  { value: 25, label: 'Satisfied Clients' },
  { value: 30, label: 'Completed Projects' },
  { value: 4, label: 'Years of Experience' },
]

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center md:px-8 lg:px-32">
      <main className="items-center">
        <AnimatedText text={"Passion Fuels Purpose! Why Fuels How!"} />
        <div className="grid w-full items-start gap-8 md:grid-cols-2 lg:grid-cols-[3fr_2fr] lg:gap-16">
            <div className="flex flex-col items-start justify-start">
              <h2 className="mb-4 text-xl font-bold uppercase">About Me</h2>
              <p className="max-w-prose font-normal text-left leading-relaxed">
                Hola! <br />
                I&apos;m George Kibe. I am a tech enthusiast. 
                I enjoy coming up with tech solutions and automation, especially the boring stuff. <br />
                I am a graduate of the University of Nairobi-Kenya. 
                Am also an expert in Mobile and website development, data engineering and data science. 
                I am passionate about innovatie startups. If you are interested in any of the solutions above, I got you. <br />
                I also enjoy creative reading and writing, playing chess and traveling, just in case you don&apos;t find me online.
                Thank you, George Kibe
              </p>
            </div>
            {/* Capped width: the column is up to ~560px wide, and the near-square
                photo filling it towered over the bio beside it. */}
            <div className="flex relative w-full max-w-xs md:max-w-sm justify-self-center md:justify-self-end
              rounded-2xl border-2 border-solid border-dark bg-light dark:border-light
              dark:bg-dark p-3 md:p-4 border-r-8 border-b-8" >
              <Image src={ProfilePic} alt='Portrait of George Kibe' placeholder='blur' sizes='(max-width: 768px) 320px, 384px' className='w-full h-auto object-contain rounded-lg'/>
            </div>
        </div>
        {/* Plain numbers: the old count-up rendered a bare "+" until JS ran. */}
        <dl className="mt-12 grid w-full grid-cols-3 gap-8 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col-reverse items-center">
              <dt className="text-base md:text-xl font-medium capitalize text-dark/75 dark:text-light/75">{label}</dt>
              <dd className="text-2xl md:text-4xl font-bold">{value}+</dd>
            </div>
          ))}
        </dl>
        <Skills />
        <Experience />
        <Education />
      </main>
    </div>
  )
}

export default AboutPage