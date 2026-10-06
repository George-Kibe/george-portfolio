// Tech roles from the CV (public/George-Kibe-Resume.pdf), newest first. The
// earlier banking and property-valuation roles are left out on purpose.
// Experience.jsx renders the list and CareerGraph plots it, so the two can't
// disagree.
//
// `start` / `end` are "YYYY-MM"; a null `end` means the role is current.
// `alongside` marks a role held at the same time as a main one (the Explore
// internship ran during the Dowell years). The graph draws those on a separate lane instead
// of the main trajectory line.
export const EXPERIENCE = [
  {
    position: "Mobile Developer",
    company: "MyIcebreaker PTY Limited",
    short: "MyIcebreaker",
    companyLink: "",
    location: "Australia",
    start: "2024-09",
    end: null,
    work: [
      "Build full-stack mobile apps end to end: React Native for Android and iOS, Spring Boot for the APIs and AWS for the cloud.",
      "Shipped two mobile applications to the App Store and Google Play, owning the release process for both stores.",
      "Advise the company on industry best practices for building and deploying mobile products.",
      "Build sales and marketing automation workflows in n8n.",
    ],
    links: [
      { label: "myIcebreaker on the App Store", url: "https://apps.apple.com/us/app/myicebreaker/" },
    ],
  },
  {
    position: "Software Developer",
    company: "E&M Technology Limited (Equity Bank)",
    short: "E&M Technology",
    companyLink: "",
    location: "Kenya",
    start: "2024-01",
    end: "2024-08",
    work: [
      "Member of the Treasury System team: improved, developed and documented the Treasury backend system and its APIs in Java (Spring Boot).",
    ],
  },
  {
    position: "Web and Mobile Developer",
    company: "Dowell Research PTE",
    short: "Dowell Research",
    companyLink: "",
    location: "United Kingdom",
    start: "2021-06",
    end: "2023-12",
    work: [
      "Helped build the company’s documentation and hiring system in React and Django, moving hiring off Google Forms onto an online platform.",
      "Created a machine learning model in Python that automatically checks the compatibility of software licences.",
      "Led a team of mobile developers and designers to build Legalzard, a licence-compatibility and policy-generator app in React Native and Django, powered by the model’s APIs.",
    ],
  },
  {
    position: "Data Engineering Intern",
    company: "Explore Data Science Academy",
    short: "Explore DSA",
    companyLink: "https://admissions.explore.ai/",
    location: "South Africa",
    start: "2022-07",
    end: "2022-12",
    alongside: true,
    work: [
      "Designed, built and maintained data infrastructure: ETL pipelines, databases and integrations between data sources.",
      "Deployed machine learning models to the cloud on AWS, GCP and Streamlit.",
      "Worked on data modelling, big data technologies and data warehousing, keeping data quality, security and compliance in check while automating processes.",
    ],
  },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// "2024-09" -> "September 2024"
export const formatMonth = (ym) => {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
};

export const formatRange = ({ start, end }) =>
  `${formatMonth(start)} – ${end ? formatMonth(end) : "Present"}`;
