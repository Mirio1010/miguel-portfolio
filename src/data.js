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
      "A full-stack game tracking app with Steam import, RAWG integration, authentication, and personal backlog management.",
    technologies: ["React", "Node.js", "Express", "Supabase"],
    image: backlogTracker,
    github: "https://github.com/Mirio1010/game-backlog-tracker",
    live: "https://game-backlog-tracker.netlify.app/",
  },
  {
    title: "Candogram",
    type: "Team Project / Product Contribution",

    description:
      "Worked on Candogram in a real startup environment, contributing to an existing production codebase by building a document generation and preview workflow with customizable templates and Puppeteer-based rendering.",

    contribution:
      "Built the template selection, preview generation, and document customization flow.",

    image: CandogramImage,

    technologies: ["Vue", "Node.js", "Puppeteer"],
  },
  {
    title: "Spoty",
    type: "Team Project",
    description:
      "A full-stack social map application for discovering, creating, tagging, and sharing location-based pins with other users.",
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