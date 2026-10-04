import Image from 'next/image'
import ProfileArt from '../../../public/images/profile/george-cropped-rb.png'
import AnimatedText from '@/components/AnimatedText';
import Link from 'next/link';
import {RiArrowRightLine, RiDownload2Line} from "react-icons/ri"
import HireMe from '@/components/HireMe';
import ProjectCta from '@/components/ProjectCta';
import Testimonials from '@/components/Testimonials';
import BrandMarquee from '@/components/BrandMarquee';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, RESUME_PATH } from '@/lib/site';

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
// Brands and testimonials come from MongoDB: cached, refreshed every five
// minutes and immediately when one is saved in the admin panel.
export const revalidate = 300

export default function Home() {
  return (
    <>
      <main className="flex dark:bg-black flex-col md:flex-row items-center justify-between w-full lg:px-32">
        {/* Narrower and capped on phones so the headline makes the first screen
            instead of sitting below a full-height portrait. */}
        <div className="relative mt-6 md:mt-0 w-[58%] sm:w-[48%] md:w-1/2 xl:w-[45%] aspect-417/598 max-h-[52vh] md:max-h-[75vh] md:mx-8 lg:mx-12
        overflow-hidden rounded-2xl border-2 border-dark dark:border-light border-r-8 border-b-8"
        >
          {/* Served from /public rather than S3: that bucket takes 10-15s to
              return this file, which is well past the image optimizer's fetch
              timeout, so the optimizer 500'd and nothing rendered. A static
              import also gives build-time sizing and a blur placeholder. */}
          <Image
            src={ProfileArt}
            fill
            priority
            sizes="(max-width: 768px) 58vw, 40vw"
            placeholder="blur"
            alt='George Kibe, full-stack web and mobile developer'
            className='object-cover object-top'
          />
        </div>
        <div className="w-full mt-6 md:mt-0 md:w-1/2 lg:w-2/3 lg:mx-16">
          <AnimatedText text={'Turning Vision Into Reality With Code'}
            className="mb-2 md:mb-4"
          />
          <p className="max-w-prose text-left font-normal leading-relaxed">
            I&apos;m George Kibe, a full-stack web and mobile developer in Nairobi. I turn ideas into
            innovative web and mobile applications, and build the data pipelines and automations behind them.
          </p>
          <p className="mt-4 max-w-prose text-left font-normal leading-relaxed text-dark/80 dark:text-light/80">
            I&apos;m looking to collaborate on data science and data engineering projects, full-stack web
            development, and web and mobile apps.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8 md:mt-12 self-start">
            <Link href={RESUME_PATH} target='_blank'
              className='flex items-center h-12 bg-dark text-light px-6 rounded-lg text-base font-semibold transition-colors
                hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                dark:bg-light dark:text-dark dark:hover:bg-dark dark:hover:text-light dark:hover:border-light'
                download={true}
            >Resume <RiDownload2Line className='ml-2 size-5' aria-hidden='true'/> </Link>
            <Link href={"/contacts"}
              className='group flex items-center h-12 px-6 rounded-lg border-2 border-dark dark:border-light text-base font-semibold
                transition-colors hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark'
            >Contact <RiArrowRightLine className='ml-2 size-5 transition-transform duration-200 group-hover:translate-x-0.5' aria-hidden='true'/></Link>
          </div>
        </div>
      </main>
      <BrandMarquee />
      <Testimonials />
      <div className="mt-16 w-full md:mt-24 lg:px-32">
        <ProjectCta />
      </div>
      <HireMe />
    </>

  )
}
