import AnimatedText from '@/components/AnimatedText'
import Link from 'next/link'
import { SocialIcon } from 'react-social-icons';
import React from 'react'
import CloudImage from '@/components/CloudImage'
import { preconnect } from 'react-dom'
import { getPublishedProjects } from '@/lib/queries'

export const metadata = {
  title: 'Projects — Web & Mobile Apps',
  description:
    'Web and mobile apps by George Kibe, from myIcebreaker on the App Store to e-commerce ' +
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

// Projects come from MongoDB (/admin/projects). ISR, and revalidated whenever
// a project is saved. `featured` projects take a full row; the rest pair up
// two to a row in order.
export const revalidate = 300

// Store links say where they go; everything else is a live site.
const linkLabel = (url) =>
  url.includes('apps.apple.com') ? 'App Store'
  : url.includes('play.google.com') ? 'Google Play'
  : 'Live Project'

const style={width:40, height:40}

// Images live on Cloudinary. CloudImage asks it for a 16:9 crop (smart
// gravity) at each srcset width, in AVIF/WebP at automatic quality, over a
// 40px blurred placeholder. The first card is preloaded since it's the
// largest thing above the fold; the rest load lazily as they scroll in.
const ProjectImage = ({image, title, sizes, priority}) => (
  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-dark/5 dark:bg-light/10">
    {image && (
      <div className="absolute inset-0 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)]
        group-hover:scale-105 motion-reduce:transition-none">
        <CloudImage src={image} alt={title} sizes={sizes} priority={priority} />
      </div>
    )}
  </div>
)

// The image links to the live project when there is one.
const ImageLink = ({link, children}) => link ? (
  <Link href={link} target='_blank' rel='noopener noreferrer' tabIndex={-1} aria-hidden="true"
    className='group block w-full cursor-pointer'>
    {children}
  </Link>
) : <div className="w-full">{children}</div>

const Title = ({link, className, children}) => link ? (
  <Link href={link} className='hover:underline underline-offset-2' target='_blank' rel='noopener noreferrer'>
    <h2 className={className}>{children}</h2>
  </Link>
) : <h2 className={className}>{children}</h2>

const Actions = ({title, link, github}) => (link || github) ? (
  <div className="mt-6 flex items-center gap-4">
    {github && (
      <div className="border dark:bg-white border-transparent dark:border-light rounded-full p-1">
        <SocialIcon url={github} style={style} target="_blank" rel="noopener noreferrer"
          label={`${title} source code on GitHub`} />
      </div>
    )}
    {link && (
      <Link href={link} target='_blank' rel='noopener noreferrer'
        className='rounded-lg bg-dark text-light py-3 px-6 text-base font-semibold border border-transparent transition-colors
          hover:bg-light hover:text-dark hover:border-dark dark:border-light dark:hover:bg-dark dark:hover:text-light'>
        {linkLabel(link)}<span className="sr-only">: {title}</span>
      </Link>
    )}
  </div>
) : null

const FeaturedProject = ({type, title, summary, image, link, github, priority}) => {
  return(
    <article className="w-full flex flex-col md:flex-row md:items-center justify-between relative
        rounded-2xl border border-solid border-dark dark:border-light border-r-8 border-b-8 bg-light dark:bg-dark p-6 md:p-10">
      <ImageLink link={link}>
        <ProjectImage title={title} image={image} sizes="(min-width: 768px) 45vw, calc(100vw - 64px)" priority={priority} />
      </ImageLink>
      <div className="w-full flex flex-col items-start justify-between mt-6 md:mt-0 md:pl-8">
        {type && <span className="text-primary dark:text-primary-dark font-medium">{type}</span>}
        <Title link={link} className="mt-2 w-full text-left text-3xl lg:text-4xl leading-tight font-bold">{title}</Title>
        <p className="mt-4 max-w-prose font-normal leading-relaxed">{summary}</p>
        <Actions title={title} link={link} github={github} />
      </div>
    </article>
  )
}

const Project = ({type, title, summary, image, link, github, priority}) => {
  return(
    <article className="w-full h-full flex flex-col gap-4 items-center justify-start
     rounded-2xl border border-solid border-dark dark:border-light bg-light dark:bg-dark p-6 md:p-10">
      <ImageLink link={link}>
        <ProjectImage title={title} image={image} sizes="(min-width: 768px) 40vw, calc(100vw - 64px)" priority={priority} />
      </ImageLink>
      <div className="w-full flex flex-1 flex-col items-start justify-between">
        <div>
          {type && <span className="text-primary font-medium dark:text-primary-dark">{type}</span>}
          <Title link={link} className="mt-2 w-full text-left text-2xl leading-tight font-bold">{title}</Title>
          <p className="mt-4 font-normal leading-relaxed">{summary}</p>
        </div>
        <Actions title={title} link={link} github={github} />
      </div>
    </article>
  )
}

// Featured projects stand alone; consecutive regular ones are paired.
const toRows = (projects) => projects.reduce((acc, project) => {
  const last = acc[acc.length - 1]
  if (!project.featured && Array.isArray(last) && last.length < 2) last.push(project)
  else acc.push(project.featured ? project : [project])
  return acc
}, [])

const page = async () => {
  // Open the connection to Cloudinary while the HTML is still arriving.
  preconnect('https://res.cloudinary.com')
  const projects = await getPublishedProjects()
  const rows = toRows(projects.map((p, i) => ({ ...p, priority: i === 0 })))
  return (
    <div className="flex flex-col items-center justify-center md:mx-8 lg:mx-32">
      <main className='w-full items-center'>
        <AnimatedText text={"A demo is worth a thousand words"}/>
        {rows.length === 0 ? (
          <p className="mt-4 text-center text-dark/75 dark:text-light/75">
            Projects are on their way. In the meantime, <Link href="/contacts" prefetch className="font-semibold underline underline-offset-4">get in touch</Link>.
          </p>
        ) : (
          <div className="mt-4 flex flex-col gap-8">
            {rows.map((row) => Array.isArray(row)
              ? (
                <div key={row.map((p) => p._id).join('+')} className="grid gap-8 md:grid-cols-2">
                  {row.map((project) => <Project key={project._id} {...project} />)}
                </div>
              )
              : <FeaturedProject key={row._id} {...row} />
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default page
