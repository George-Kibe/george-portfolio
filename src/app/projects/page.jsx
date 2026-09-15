import AnimatedText from '@/components/AnimatedText'
import Image from 'next/image'
import Link from 'next/link'
import { SocialIcon } from 'react-social-icons';
import React from 'react'
import MernBnbImage from "../../../public/images/projects/mernbnb.png"
import { FramerImage } from '@/utils/FramerImage';
export const metadata = {
  title: 'Projects — Web & Mobile Apps',
  description:
    'Selected web and mobile projects by George Kibe, built with React, Next.js, ' +
    'React Native, Node.js and Django — with live demos and source code on GitHub.',
  alternates: { canonical: '/projects' },
  openGraph: {
    type: 'website',
    url: '/projects',
    title: 'Projects — Web & Mobile Apps by George Kibe',
    description:
      'Live demos and source code for web and mobile applications built by George Kibe.',
  },
}

const style={width:40, height:40}

const FeaturedProject = ({type, title, summary, image, link, github}) => {
  return(
    <article className="w-full flex flex-col md:flex-row md:items-center justify-between relative
        rounded-2xl border border-solid border-dark dark:border-light border-r-8 border-b-8 bg-light dark:bg-dark p-6 md:p-10">
      <Link href={link} target='_blank' className='w-full cursor-pointer overflow-hidden rounded-lg'>
        <FramerImage title={title} image={image}
        />
      </Link>
      <div className="w-full flex flex-col items-start justify-between mt-6 md:mt-0 md:pl-8">
        <span className="text-primary dark:text-primary-dark font-medium">{type}</span>
        <Link href={link} className='hover:underline underline-offset-2' target='_blank'>
          <h2 className="mt-2 w-full text-left text-3xl lg:text-4xl leading-tight font-bold">{title}</h2>
        </Link>
        <p className="mt-4 max-w-prose font-normal leading-relaxed">{summary}</p>
        <div className="mt-6 flex items-center">
          <div className="border-1 dark:bg-white border-transparent dark:border-light rounded-full p-1">
            <SocialIcon url={github} style={style} target={"_blank"} />
          </div>
          <Link href={link} target='_blank' className='ml-4 rounded-lg bg-dark text-light py-3 px-6 text-base
          font-semibold border border-transparent dark:border-light' >Live Project</Link>
        </div>
      </div>
    </article>
  )
}
const Project = ({type, title, summary, image, link, github}) => {
  return(
    <article className="w-full flex flex-col gap-4 items-center justify-center
     rounded-2xl border border-solid border-dark dark:border-light bg-light dark:bg-dark p-6 md:p-10">
      <Link href={link} target='_blank' className='w-full cursor-pointer overflow-hidden rounded-lg'>
        <FramerImage title={title} image={image}
        />
      </Link>
      <div className="w-full flex flex-col items-start justify-between">
        <span className="text-primary font-medium dark:text-primary-dark">{type}</span>
        <Link href={link} className='hover:underline underline-offset-2' target='_blank'>
          <h2 className="mt-2 w-full text-left text-2xl leading-tight font-bold">{title}</h2>
        </Link>
        <p className="mt-4 font-normal leading-relaxed">{summary}</p>
        <div className="mt-6 flex items-center">
          <div className="border-1 dark:bg-white border-transparent dark:border-light rounded-full p-1">
            <SocialIcon url={github} style={style} target={"_blank"} />
          </div>
          <Link href={link} target='_blank' className='ml-4 rounded-lg bg-dark text-light py-3 px-6 text-base
          font-semibold border border-transparent dark:border-light' >Live Project</Link>
        </div>
      </div>
    </article>
  )
}

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center md:mx-8 lg:mx-16">
      <main className='items-center'>
        <AnimatedText text={"A demo is worth a thousand words"}/> 
        <div className="mb-8">
          <FeaturedProject 
            type={"Web Application"}
            title={"Mernbnb"}
            summary={"Inspired by Airbnb, this is a web application where users can be able to book for holiday homes. People can book and view their accommodations. The projects leverages the MERN stack technologies(MongoDb, Express, React and Nodejs). It also uses AWS for cloud storage"}
            image={MernBnbImage}
            link={"https://mernbnb.vercel.app/"}
            github={"https://github.com/George-Kibe/Mernbnbclone"}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="">
            <Project 
                type={"Application"}
                title={"RealHive"}
                summary={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam velit quod odio dolorem "}
                image={MernBnbImage}
                link={"https://github.com/George-Kibe/Buenas-real-estate"}
                github={"https://github.com/George-Kibe/Buenas-real-estate"}
              />
          </div>
          <div className="">
            <Project 
              type={"Application"}
              title={"RealHive"}
              summary={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam velit quod odio dolorem "}
              image={MernBnbImage}
              link={"https://github.com/George-Kibe/Buenas-real-estate"}
              github={"https://github.com/George-Kibe/Buenas-real-estate"}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default page