// "use client"
import Image from 'next/image'
import ProfileArt from "../../public/images/profile/developer1.png";
import AnimatedText from '@/components/AnimatedText';
import Link from 'next/link';
import {RiExternalLinkFill} from "react-icons/ri"
import HireMe from '@/components/HireMe';

export const metadata = {
  title: 'Portfolio | Home',
  description: 'Powered by Nextjs',
}
export default function Home() {
  return (
    <>
      <main className="flex dark:bg-black flex-col md:flex-row items-center justify-between w-full">
        <div className="w-full md:w-1/2">
          <Image src={ProfileArt} alt='ProfileArt' className='w-full h-auto'/>
        </div>
        <div className="w-full md:w-1/2">
          <AnimatedText text={'Turning Vision Into Reality With Code And Design'} className="font-bold inline-block text-[30px] md:text-[50px] mb-4" />
          <p className="text-justify font-medium">
            As a skilled full-stack developer, I am dedicated to turning ideas into innovative web applications. 
            Explore my latest projects and articles, showcasing my expertise in React.js and web development.
          </p>
          <div className="flex items-center mt-12 self-start">
            <Link href={"/dummy.pdf"} target='_blank' 
              className='flex items-center bg-dark text-light p-2 px-6 rounded-lg text-lg font-semibold
                hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark'
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
