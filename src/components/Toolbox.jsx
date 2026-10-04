import React from 'react'
import {
  TbBrowser, TbDeviceMobile, TbServer2, TbDatabase, TbChartDots3, TbCloud,
  TbSettingsAutomation, TbCode,
} from 'react-icons/tb'
import AnimatedText from './AnimatedText'

// Grouped from the Skills orbit, the courses under Education and the services
// in the footer. Add a tool here only if it's something actually used.
const TOOLBOX = [
  { name: 'Frontend', icon: TbBrowser, tools: ['React', 'Next.js', 'JavaScript'] },
  { name: 'Mobile', icon: TbDeviceMobile, tools: ['React Native', 'Android', 'Kotlin', 'Xcode'] },
  { name: 'Backend & APIs', icon: TbServer2, tools: ['Python', 'Django', 'Node.js', 'Express', 'Java', 'Spring Boot'] },
  { name: 'Databases', icon: TbDatabase, tools: ['SQL', 'NoSQL', 'MongoDB', 'Firebase'] },
  { name: 'Data engineering & science', icon: TbChartDots3, tools: ['Data pipelines', 'Big data processing', 'Data scraping', 'Exploratory data analysis', 'Machine learning'] },
  { name: 'Cloud', icon: TbCloud, tools: ['AWS', 'Google Cloud (GCP)', 'Firebase', 'Cloud computing'] },
  { name: 'Automation', icon: TbSettingsAutomation, tools: ['n8n', 'AI automations', 'Celery', 'Redis'] },
  { name: 'Foundations', icon: TbCode, tools: ['Data structures & algorithms', 'C', 'C++'] },
]

const Toolbox = () => (
  <section className="mt-24 md:mt-32">
    <AnimatedText text="My Toolbox" as="h2" />
    <p className="mx-auto max-w-prose text-center leading-relaxed text-dark/75 dark:text-light/75">
      What I reach for at each layer of a project, from the screen someone taps to the pipeline behind it.
    </p>
    <ul className="mt-12 grid gap-x-12 md:grid-cols-2">
      {TOOLBOX.map(({ name, icon: Icon, tools }) => (
        <li key={name} className="flex gap-4 border-t border-dark/15 py-6 dark:border-light/15">
          <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-xl
            border border-dark/15 text-primary dark:border-light/15 dark:text-primary-dark">
            <Icon className="size-6" />
          </span>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold leading-tight">{name}</h3>
            <div className="mt-3">
              <ul aria-label={name} className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <li key={tool} className="rounded-full bg-dark/5 px-3 py-1 text-sm font-medium
                    text-dark/85 dark:bg-light/10 dark:text-light/85">{tool}</li>
                ))}
              </ul>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </section>
)

export default Toolbox
