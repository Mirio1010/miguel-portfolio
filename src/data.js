import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import backlogTracker from "./assets/backlogTracker.jpg";
import CandogramImage from './assets/CandogramImage.png'
import SpotyImage from './assets/SpotyImage.jpg'
export const links = [
  {
    label: "GitHub",
    href: "https://github.com/Mirio1010",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/miguel-ortega77/",
    icon: FaLinkedin,
  },
  {
    label: "Resume",
    href: "/Miguel_Software_Developer_Resume.pdf",
    icon: HiOutlineDocumentText,
  },
];



// data/projects.js

export const projects = [
  {
    title: "Game Backlog Tracker",
    description:
      "A full-stack game backlog manager that lets users track, organize, and import their game library from Steam.",
    technologies: ["React", "Node.js", "Express", "Supabase"],
    image: backlogTracker,
    github: "https://github.com/Mirio1010/game-backlog-tracker",
    live: "https://game-backlog-tracker.netlify.app/",
  },
  {
    title: "Candogram",
    type: "Team Project / Product Contribution",

    description:
      "I’m currently contributing to Candogram as a volunteer developer, working in an existing production codebase to help build and improve a resume generation and preview system. The feature supports customizable templates and lets users preview generated documents before downloading them.",

    contribution:
      "Built the template selection, preview generation, and document customization flow.",

    image: CandogramImage,

    technologies: ["Vue", "Node.js", "Puppeteer"],
    siteUrl: "https://www.candogram.com/",
  },
  {
    title: "Spoty",
    type: "Team Project",
    description:
      "Built with a team through CUNY Tech Prep, Spoty is a social map for sharing places through tagged pins. We rebuilt the project in React as it grew, adding authentication, persistent user data, custom map interactions, and social features around discovering places shared by others.",
    contribution:
      "Worked on core map features, pin persistence, authentication, UI interactions, and integration across the application.",
    technologies: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Leaflet",
      "Supabase",
      "SQL",
    ],
    image: SpotyImage,
    github: "https://github.com/Mirio1010/spoty",
    live: "https://spotymap.netlify.app",
  },
];