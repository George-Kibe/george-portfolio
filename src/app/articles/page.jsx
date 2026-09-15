
import AnimatedText from '@/components/AnimatedText'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Artcile1 from "../../../public/images/articles/image2.png"
import Artcile2 from "../../../public/images/articles/image3.png"
import Artcile3 from "../../../public/images/articles/image5.png"
import Artcile4 from "../../../public/images/articles/image6.png"
import { Article } from '@/utils/Article'
import { FramerImage } from '@/utils/FramerImage'

export const metadata = {
  title: 'Articles on Web Development',
  description:
    'Articles and technical write-ups by George Kibe on React, Next.js, mobile ' +
    'development and data engineering.',
  alternates: { canonical: '/articles' },
  openGraph: {
    type: 'website',
    url: '/articles',
    title: 'Articles on Web Development by George Kibe',
    description:
      'Technical writing by George Kibe on React, Next.js and data engineering.',
  },
}


const FeaturedArticle = ({image, title, time, summary, link}) => {
  return(
    <li className="flex flex-col md:flex-row p-4 bg-light dark:bg-dark border border-solid border-dark dark:border-light rounded-2xl border-r-8 border-b-8">
      <Link href={link} target='_blank' className='w-full md:w-[33%] cursor-pointer inline-block overflow-hidden rounded-lg'>
        <FramerImage title={title} image={image}
        />
      </Link>
      <div className="flex flex-col md:w-[67%] md:px-6 py-6 md:py-0 gap-2">
        <Link href={link} target='_blank'>
          <h2 className="capitalize text-2xl leading-tight font-bold hover:underline">{title}</h2>
        </Link>
        <p className="text-base leading-relaxed">{summary}</p>
        <span className="text-primary dark:text-primary-dark font-semibold">{time}</span>
      </div>
      
    </li>
  )
}


const ArticlesPage = () => {
  return (
    <div className="flex flex-col items-center justify-center md:mx-8 lg:mx-16">
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden">
        <AnimatedText text={"Words can Change the World!"}/>
        <ul className="flex flex-col gap-8">
          <FeaturedArticle
            image={Artcile1}
            title={"Creating Stunning Loading Screens In React: Build 3 Types Of Loading Screens"}
            time={"6 minutes read"}
            summary={"Learn how to create stunning loading screens in React with 3 different methods.Discover how to use React-Loading, React-Lottie & build a custom loading screen.Improve the user experience."}
            link={""}
          />
          <FeaturedArticle
            image={Artcile2}
            title={"Creating Stunning Loading Screens In React: Build 3 Types Of Loading Screens"}
            time={"6 minutes read"}
            summary={"Learn how to create stunning loading screens in React with 3 different methods.Discover how to use React-Loading, React-Lottie & build a custom loading screen.Improve the user experience."}
            link={""}
          />
        </ul>
        <h2 className='font-bold text-3xl leading-tight w-full text-center mt-24 md:mt-32 mb-8 md:mb-12'>
          All Articles
        </h2>
        <ul className="w-full">
          <Article 
            image={Artcile3}
            title={"Why you should adopt Nextjs for your Projects"}
            date={"June 14, 2023"}
            link={"/"}
          />
          <Article 
            image={Artcile4}
            title={"Why you should adopt Nextjs for your Projects"}
            date={"June 14, 2023"}
            link={"/"}
          />
          <Article 
            image={Artcile4}
            title={"Why you should adopt Nextjs for your Projects"}
            date={"June 14, 2023"}
            link={"/"}
          />
        </ul>
      </main>
    </div>
  )
}

export default ArticlesPage