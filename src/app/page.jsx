// "use client"
import Image from 'next/image'
import AnimatedText from '@/components/AnimatedText';
import Link from 'next/link';
import {RiExternalLinkFill} from "react-icons/ri"
import HireMe from '@/components/HireMe';

export const metadata = {
  title: 'George\'s Portfolio | Home',
  description: 'Powered by Nextjs',
}
export default function Home() {
  return (
    <>
      <main className="flex dark:bg-black flex-col md:flex-row items-center justify-between w-full">
        <div className="relative mt-10 md:mt-0 w-[70%] h-[40vh] md:mx-8 lg:mx-12 sm:h-[60vh] md:h-[75vh] xl:w-[40%] 
        rounded-3xl border-2 border-dark dark:border-light border-l-8 border-b-8"
        >
          <Image src="https://buenas-portfolio-bucket.s3.eu-west-1.amazonaws.com/george-cropped-rb.png" 
            fill alt='ProfileArt' className='object-contain rounded-2xl'
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
            <Link href={"/George-Resume.pdf"} target='_blank' 
              className='flex items-center bg-dark text-light p-2 px-6 rounded-lg text-lg font-semibold
                hover:bg-light hover:text-dark border-2 dark:bg-white dark:text-dark border-solid border-transparent hover:border-dark'
                download={true}
            >Resume <RiExternalLinkFill className='ml-1 w-6'/> </Link>
            <Link href={"/contacts"}
              className='ml-4 text-lg font-medium capitalize teaxt-dark underline'
            >Contact</Link>
            {/* <Link href={"mailto:georgekibew@gmail.com"} target='_blank'>contact</Link> */}
          </div>
        </div>
      </main>
      <HireMe />
    </>

  )
}
