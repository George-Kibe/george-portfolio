// "use client"
import Image from 'next/image'
import ProfileArt from '../../public/images/profile/george-cropped-rb.png'
import AnimatedText from '@/components/AnimatedText';
import Link from 'next/link';
import {RiExternalLinkFill} from "react-icons/ri"
import HireMe from '@/components/HireMe';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from '@/lib/site';

export const metadata = {
  // `absolute` opts out of the layout's "%s | George Kibe" template, which
  // would otherwise repeat the name on the home page.
  title: { absolute: DEFAULT_TITLE },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: '/',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
}
export default function Home() {
  return (
    <>
      <main className="flex dark:bg-black flex-col md:flex-row items-center justify-between w-full">
        <div className="relative mt-10 md:mt-0 w-[70%] h-[40vh] md:mx-8 lg:mx-12 sm:h-[60vh] md:h-[75vh] xl:w-[40%] 
        rounded-3xl border-2 border-dark dark:border-light border-l-8 border-b-8"
        >
          {/* Served from /public rather than S3: that bucket takes 10-15s to
              return this file, which is well past the image optimizer's fetch
              timeout, so the optimizer 500'd and nothing rendered. A static
              import also gives build-time sizing and a blur placeholder. */}
          <Image
            src={ProfileArt}
            fill
            priority
            sizes="(max-width: 768px) 70vw, 40vw"
            placeholder="blur"
            alt='George Kibe, full-stack web and mobile developer'
            className='object-contain rounded-2xl'
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-2/3 lg:mx-16">
          <AnimatedText text={'Turning Vision Into Reality With Code'} 
            className="font-bold inline-block text-[25px] lg:text-[50px] mb-4" 
          />
          <p className="text-justify font-medium">
            As a skilled full-stack mobile and web developer, I am dedicated to turning ideas into innovative mobile and web applications. 
            <br />
            Explore my latest projects and articles, showcasing my expertise in mobile and web development.
          </p>
          <p className="text-justify font-medium">
          I’m looking to collaborate on data science and data engineering projects, full stack web development projects, web apps and mobile apps
          </p>
          <div className="flex items-center mt-12 self-start">
            <Link href={"/George-Kibe-Resume.pdf"} target='_blank' 
              className='flex items-center bg-dark text-light p-2 px-6 rounded-lg text-lg font-semibold
                hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark'
                download={true}
            >Resume <RiExternalLinkFill className='ml-1 w-6'/> </Link>
            <Link href={"/contacts"}
              className='ml-4 text-lg font-medium capitalize text-dark dark:text-light underline'
            >Contact</Link>
            {/* <Link href={"mailto:georgekibew@gmail.com"} target='_blank'>contact</Link> */}
          </div>
        </div>
      </main>
      <HireMe />
    </>

  )
}
