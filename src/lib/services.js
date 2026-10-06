import {
  TbBrowser, TbChartDots3, TbCloud, TbDeviceMobile, TbSettingsAutomation,
} from 'react-icons/tb'

// The services on /services and in the footer. Tools are drawn from the
// About page's Toolbox, so only list what's actually used.
export const SERVICES = [
  {
    id: 'web-development',
    name: 'Web development',
    icon: TbBrowser,
    summary:
      'Fast, search-friendly websites and full web applications, from a company site to a dashboard with accounts, payments and data behind a login.',
    includes: [
      'Marketing sites, landing pages and portfolios',
      'Web apps with sign-in, roles and admin panels',
      'Payments (Stripe) and third-party API integrations',
      'SEO, performance and accessibility built in',
    ],
    tools: ['React', 'Next.js', 'Node.js', 'Express', 'Django', 'MongoDB'],
  },
  {
    id: 'mobile-development',
    name: 'Mobile development',
    icon: TbDeviceMobile,
    summary:
      'One React Native codebase for iOS and Android, taken from first screens to the App Store and Google Play.',
    includes: [
      'Cross-platform apps for iOS and Android',
      'Authentication, push notifications and offline-friendly data',
      'In-app payments and backend APIs',
      'Store listings, release builds and updates',
    ],
    tools: ['React Native', 'Android', 'Kotlin', 'Xcode', 'Firebase'],
  },
  {
    id: 'data-engineering',
    name: 'Data engineering',
    icon: TbChartDots3,
    summary:
      'Pipelines that collect, clean and move your data reliably, so reports and dashboards are built on numbers you can trust.',
    includes: [
      'ETL pipelines and scheduled jobs',
      'Data scraping and collection',
      'Warehousing and reporting',
      'Exploratory analysis and machine learning',
    ],
    tools: ['Python', 'SQL', 'Data pipelines', 'Big data processing', 'Celery', 'Redis'],
  },
  {
    id: 'cloud-computing',
    name: 'Cloud computing',
    icon: TbCloud,
    summary:
      'Hosting, storage and deployment set up so your app stays online, scales with traffic and doesn’t surprise you on the bill.',
    includes: [
      'Deployments and hosting for web apps and APIs',
      'File storage, databases and backups',
      'Serverless backends with Firebase or AWS Amplify',
      'Moving an existing app to the cloud',
    ],
    tools: ['AWS', 'Google Cloud (GCP)', 'Firebase'],
  },
  {
    id: 'ai-automations',
    name: 'AI automations',
    icon: TbSettingsAutomation,
    summary:
      'Workflows and AI agents that take repetitive work off your team: leads into the CRM, documents summarised, reports sent on time.',
    includes: [
      'n8n workflows connecting the tools you already use',
      'AI agents and assistants for support or internal tasks',
      'Automated reports and notifications',
      'Background jobs and scheduled tasks',
    ],
    tools: ['n8n', 'AI automations', 'Python', 'Celery'],
  },
]
