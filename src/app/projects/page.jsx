import AnimatedText from '@/components/AnimatedText'
import Image from 'next/image'
import Link from 'next/link'
import { SocialIcon } from 'react-social-icons';
import React from 'react'
import Project1 from "../../../public/images/projects/image.jpg"
import { FramerImage } from '@/utils/FramerImage';
export const metadata = {
    title: 'Portfolio | Projects',
    description: 'Powered by Nextjs',
  }

const style={width:40, height:40}

const FeaturedProject = ({type, title, summary, image, link, github}) => {
  return(
    <article className="w-full flex items-center justify-between relative rounded-br-2xl
        rounded-3xl border border-solid border-dark bg-light dark:bg-black shadow-2xl p-4 md:p-10">
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark" />
      <Link href={link} target='_blank' className='w-full md:w-1/2 cursor-pointer overflow-hidden rounded-lg'>
        <FramerImage title={title} image={image}
        />
      </Link>
      <div className="w-1/2 flex flex-col items-start justify-between pl-6 ">
        <span className="text-primary font-medium text-xl">{type}</span>
        <Link href={link} className='hover:underline underline-offset-2' target='_blank'>
          <h2 className="my-2 w-full text-left text-4xl font-bold">{title}</h2>
        </Link>
        <p className="my-2 font-medium">{summary}</p>
        <div className="mt-2 flex items-center">
          <div className="border-1 dark:bg-white border-transparent dark:border-light rounded-full p-1"><SocialIcon url={github} style={style} target={"_blank"} /></div>          
          <Link href={link} target='_blank' className='ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg 
          font-semibold border border-1 border-transparent dark:border-light' >Live Project</Link>
        </div>
      </div>
    </article>
  )
}
const Project = ({type, title, summary, image, link, github}) => {
  return(
    <article className="w-full flex flex-col gap-4 items-center justify-center
     rounded-3xl border border-solid border-dark bg-light dark:bg-dark shadow-2xl p-4 md:p-10">
      <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[102%] rounded-[2rem] bg-dark" />
      <Link href={link} target='_blank' className='w-full cursor-pointer overflow-hidden rounded-lg'>
        <FramerImage title={title} image={image}
        />
      </Link>
      <div className="w-full flex flex-col items-start justify-between pl-6 ">
        <span className="text-primary font-medium text-xl">{type}</span>
        <Link href={link} className='hover:underline underline-offset-2' target='_blank'>
          <h2 className="my-2 w-full text-left text-4xl font-bold">{title}</h2>
        </Link>
        <p className="my-2 font-medium">{summary}</p>
        <div className="mt-2 flex items-center">
          <div className="border-1 dark:bg-white border-transparent dark:border-light rounded-full p-1">
            <SocialIcon url={github} style={style} target={"_blank"} />
          </div>          
          <Link href={link} target='_blank' className='ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg 
          font-semibold border border-1 border-transparent dark:border-light' >Live Project</Link>
        </div>
      </div>
    </article>
  )
}

const page = () => {
  return (
    <div className='w-full flex flex-col'>
      <main className='items-center'>
        <AnimatedText text={"Imagination Triumphs Knowledge!"}/> 
        <div className="grid grid-cols-12 gap-24 gap-y-32">
          <div className="col-span-12">
            <FeaturedProject 
              type={"Application"}
              title={"RealHive"}
              summary={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam velit quod odio dolorem "}
              image={Project1}
              link={"https://github.com/George-Kibe/Buenas-real-estate"}
              github={"https://github.com/George-Kibe/Buenas-real-estate"}
            />
          </div>
          <div className="col-span-6">
          <Project 
              type={"Application"}
              title={"RealHive"}
              summary={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam velit quod odio dolorem "}
              image={Project1}
              link={"https://github.com/George-Kibe/Buenas-real-estate"}
              github={"https://github.com/George-Kibe/Buenas-real-estate"}
            />
          </div>
          <div className="col-span-6">
            <Project 
              type={"Application"}
              title={"RealHive"}
              summary={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam velit quod odio dolorem "}
              image={Project1}
              link={"https://github.com/George-Kibe/Buenas-real-estate"}
              github={"https://github.com/George-Kibe/Buenas-real-estate"}
            />
          </div>
          <div className="col-span-12">
            <FeaturedProject 
              type={"Application"}
              title={"RealHive"}
              summary={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam velit quod odio dolorem "}
              image={Project1}
              link={"https://github.com/George-Kibe/Buenas-real-estate"}
              github={"https://github.com/George-Kibe/Buenas-real-estate"}
            />
          </div>
          <div className="col-span-6">
            <Project 
              type={"Application"}
              title={"RealHive"}
              summary={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam velit quod odio dolorem "}
              image={Project1}
              link={"https://github.com/George-Kibe/Buenas-real-estate"}
              github={"https://github.com/George-Kibe/Buenas-real-estate"}
            />
          </div>
          <div className="col-span-6">
            <Project 
              type={"Application"}
              title={"RealHive"}
              summary={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam velit quod odio dolorem "}
              image={Project1}
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