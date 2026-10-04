import AnimatedText from '@/components/AnimatedText'
import Link from 'next/link'
import { SocialIcon } from 'react-social-icons';
import React from 'react'
import PearlMarilynImage from "../../../public/images/projects/pearlmarilyn.jpg"
import EcommerceImage from "../../../public/images/projects/ecommerce1.png"
import RealHiveImage from "../../../public/images/projects/realhive.jpg"
import CompanyImage from "../../../public/images/projects/company.png"
import HauteCornerImage from "../../../public/images/projects/haute-corner.jpg"
import MernBnbImage from "../../../public/images/projects/mernbnb.png"
import { FramerImage } from '@/utils/FramerImage';

export const metadata = {
  title: 'Projects — Web & Mobile Apps',
  description:
    'Web and mobile apps by George Kibe, from PearlMarilyn on the App Store to e-commerce ' +
    'stores and property apps, built with React, Next.js, React Native, Django and Node.js.',
  alternates: { canonical: '/projects' },
  openGraph: {
    type: 'website',
    url: '/projects',
    title: 'Projects — Web & Mobile Apps by George Kibe',
    description:
      'Live apps, demos and source code for web and mobile applications built by George Kibe.',
  },
}

// Same projects and copy as the RealHive Consultants portfolio
// (realhive-consultants.vercel.app/portfolio), plus PearlMarilyn. `featured`
// projects take a full row; the rest pair up two to a row in order.
const PROJECTS = [
  
  {
    type: "Web Application",
    title: "Buenas Electronics Store",
    summary: "An online store for an electronics shop with the full shopping flow: product catalogue, latest arrivals, browsing by category, a cart and Stripe checkout.",
    image: EcommerceImage,
    link: "https://buenas-ecommerce.vercel.app",
    github: "https://github.com/George-Kibe/Ecommerce-next",
    featured: true,
  },
  {
    type: "Mobile Application",
    title: "RealHive",
    summary: "Inspired by Airbnb, a React Native app that matches property seekers with property owners, and tenants with landlords.",
    image: RealHiveImage,
    link: "https://play.google.com/store/apps/details?id=com.realhive.app",
    github: "https://github.com/George-Kibe",
  },
  {
    type: "Website",
    title: "Buenas Consultants",
    summary: "A company website for an IT consultancy, presenting its services and projects, with a blog on trends in the industry.",
    image: CompanyImage,
    link: "https://buenas-portfolio.vercel.app/",
    github: "https://github.com/George-Kibe/Nextjs",
  },
  {
    type: "Mobile Application",
    title: "Haute Corner",
    summary: "An e-commerce mobile app built with React Native and AWS Amplify: product catalogue, latest arrivals, browsing by category, a cart and Stripe checkout.",
    image: HauteCornerImage,
    link: "https://play.google.com/store/apps/details?id=com.hautecorner.app",
    github: "https://github.com/George-Kibe/Haute-corner",
    featured: true,
  },
  {
    type: "Web Application",
    title: "Mernbnb",
    summary: "Inspired by Airbnb, a web app for booking holiday homes, where guests book stays and view their accommodation. Built on the MERN stack (MongoDB, Express, React, Node.js) with AWS for cloud storage.",
    image: MernBnbImage,
    link: "https://mernbnb.vercel.app/",
    github: "https://github.com/George-Kibe/Mernbnbclone",
    featured: true,
  },
  {
    type: "Mobile Application",
    title: "PearlMarilyn",
    summary: "An entertainment and event marketplace: tell it what your party, wedding or work event needs and it sources vetted bartenders, caterers, DJs, bands, photographers and more, with Stripe payments and in-app messaging. Built for MyIcebreaker in React Native, with a Django API, Celery jobs and a Node.js chat service on AWS.",
    image: PearlMarilynImage,
    link: "https://apps.apple.com/us/app/pearlmarilyn/id6747705508",
    featured: true,
  },
]

// Store links say where they go; everything else is a live site.
const linkLabel = (url) =>
  url.includes('apps.apple.com') ? 'App Store'
  : url.includes('play.google.com') ? 'Google Play'
  : 'Live Project'

const style={width:40, height:40}

const Actions = ({title, link, github}) => (
  <div className="mt-6 flex items-center gap-4">
    {github && (
      <div className="border dark:bg-white border-transparent dark:border-light rounded-full p-1">
        <SocialIcon url={github} style={style} target="_blank" rel="noopener noreferrer"
          label={`${title} source code on GitHub`} />
      </div>
    )}
    <Link href={link} target='_blank' rel='noopener noreferrer'
      className='rounded-lg bg-dark text-light py-3 px-6 text-base font-semibold border border-transparent transition-colors
        hover:bg-light hover:text-dark hover:border-dark dark:border-light dark:hover:bg-dark dark:hover:text-light'>
      {linkLabel(link)}<span className="sr-only">: {title}</span>
    </Link>
  </div>
)

const FeaturedProject = ({type, title, summary, image, link, github}) => {
  return(
    <article className="w-full flex flex-col md:flex-row md:items-center justify-between relative
        rounded-2xl border border-solid border-dark dark:border-light border-r-8 border-b-8 bg-light dark:bg-dark p-6 md:p-10">
      <Link href={link} target='_blank' rel='noopener noreferrer' tabIndex={-1} aria-hidden="true"
        className='w-full cursor-pointer overflow-hidden rounded-lg'>
        <FramerImage title={title} image={image} sizes="(min-width: 768px) 45vw, calc(100vw - 64px)" />
      </Link>
      <div className="w-full flex flex-col items-start justify-between mt-6 md:mt-0 md:pl-8">
        <span className="text-primary dark:text-primary-dark font-medium">{type}</span>
        <Link href={link} className='hover:underline underline-offset-2' target='_blank' rel='noopener noreferrer'>
          <h2 className="mt-2 w-full text-left text-3xl lg:text-4xl leading-tight font-bold">{title}</h2>
        </Link>
        <p className="mt-4 max-w-prose font-normal leading-relaxed">{summary}</p>
        <Actions title={title} link={link} github={github} />
      </div>
    </article>
  )
}

const Project = ({type, title, summary, image, link, github}) => {
  return(
    <article className="w-full h-full flex flex-col gap-4 items-center justify-start
     rounded-2xl border border-solid border-dark dark:border-light bg-light dark:bg-dark p-6 md:p-10">
      <Link href={link} target='_blank' rel='noopener noreferrer' tabIndex={-1} aria-hidden="true"
        className='w-full cursor-pointer overflow-hidden rounded-lg'>
        <FramerImage title={title} image={image} sizes="(min-width: 768px) 40vw, calc(100vw - 64px)" />
      </Link>
      <div className="w-full flex flex-1 flex-col items-start justify-between">
        <div>
          <span className="text-primary font-medium dark:text-primary-dark">{type}</span>
          <Link href={link} className='hover:underline underline-offset-2' target='_blank' rel='noopener noreferrer'>
            <h2 className="mt-2 w-full text-left text-2xl leading-tight font-bold">{title}</h2>
          </Link>
          <p className="mt-4 font-normal leading-relaxed">{summary}</p>
        </div>
        <Actions title={title} link={link} github={github} />
      </div>
    </article>
  )
}

// Featured projects stand alone; consecutive regular ones are paired.
const rows = PROJECTS.reduce((acc, project) => {
  const last = acc[acc.length - 1]
  if (!project.featured && Array.isArray(last) && last.length < 2) last.push(project)
  else acc.push(project.featured ? project : [project])
  return acc
}, [])

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center md:mx-8 lg:mx-32">
      <main className='w-full items-center'>
        <AnimatedText text={"A demo is worth a thousand words"}/>
        <div className="mt-4 flex flex-col gap-8">
          {rows.map((row) => Array.isArray(row)
            ? (
              <div key={row.map((p) => p.title).join('+')} className="grid gap-8 md:grid-cols-2">
                {row.map((project) => <Project key={project.title} {...project} />)}
              </div>
            )
            : <FeaturedProject key={row.title} {...row} />
          )}
        </div>
      </main>
    </div>
  )
}

export default page
