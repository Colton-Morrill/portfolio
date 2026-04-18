import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faAws,
  faCss3,
  faFigma,
  faGithub,
  faHtml5,
  faJira,
  faJs,
  faMicrosoft,
  faReact,
  faWordpress,
} from "@fortawesome/free-brands-svg-icons";

export type ProjectImage = {
  image: string;
  code: string;
};

export type ProjectCardData = {
  UrlPath: string;
  className: string;
  ImagePath: ProjectImage[];
  ProjectTitle: string;
  ProjectSoftware: string;
  ImageAlt?: string;
  anim?: string;
  Spacer?: string;
};

export type SmallProjectData = {
  ProjectUrl?: string;
  ImagePath: string;
  ImageAlt: string;
  ProjectName: string;
  ProjectSoftware: string;
};

export type ProjectCaseStudy = {
  title: string;
  href: string;
  category: string;
  year: string;
  role: string;
  summary: string;
  impact: string[];
  stack: string[];
  backgroundArt: string;
  gallery: ProjectImage[];
  imageAlt: string;
  accent: string;
};

export type ProjectArchiveEntry = {
  title: string;
  href?: string;
  category: string;
  note: string;
  stack: string[];
  icon?: string;
  iconAlt?: string;
};

export type ExperienceData = {
  ImagePath?: string;
  ImageAlt?: string;
  JobPosition: string;
  Company: string;
  Duration: string;
  location?: string;
};

export const heroGradientStyles = {
  purple: {
    "--from": "#a855f7",
    "--to": "#643bf6ff",
  },
  green: {
    "--from": "#1fb857ff",
    "--to": "#07b69eff",
  },
  gold: {
    "--from": "#facc15",
    "--to": "#fba23cff",
  },
} as const;

export const featuredProjectRows: ProjectCardData[][] = [
  [
    {
      UrlPath: "https://profile.presssportsapp.com/media/PressSportsOfficial",
      className: "bg-gradient-to-r from-cyan-800 to-sky-300",
      ImagePath: [
        { image: "/backdrop-01.png", code: "press" },
        { image: "/press-1-01.png", code: "press" },
        { image: "/press-2-01.png", code: "press" },
        { image: "/press-3-01.png", code: "press" },
      ],
      ProjectTitle: "Press Sports",
      ProjectSoftware: "Next.js, Figma",
    },
    {
      UrlPath: "https://sicoustics.com/",
      className: "bg-gradient-to-r from-blue-500 to-blue-900",
      ImagePath: [
        { image: "/backdrop-flipped-01.png", code: "press" },
        { image: "/sic-1-01.png", code: "sic" },
        { image: "/sic-3-01.png", code: "sic" },
        { image: "/sic-2-01.png", code: "sic" },
      ],
      ProjectTitle: "SiCoustics",
      ProjectSoftware: "WordPress, Adobe CC",
      anim: "si-move",
      Spacer: "ml-0 mt-16 lg:ml-8 lg:mt-0",
    },
  ],
  [
    {
      UrlPath: "https://shop.aptogenix.com",
      className: "bg-gradient-to-r from-teal-900 to-teal-200",
      ImagePath: [
        { image: "/backdrop-flipped-01.png", code: "press" },
        { image: "/apto-1-01.png", code: "apto" },
        { image: "/apto-2-01.png", code: "apto" },
      ],
      ProjectTitle: "AptoGenix",
      ProjectSoftware: ".NET, Figma, Adobe CC",
      anim: "apto-move",
    },
    {
      UrlPath: "#",
      className: "bg-gradient-to-r from-green-300 to-lime-100",
      ImagePath: [
        { image: "/backdrop-01.png", code: "press" },
        { image: "/mwc-1-01.png", code: "mwc" },
        { image: "/mwc-2-01.png", code: "mwc" },
        { image: "/mwc-3-01.png", code: "mwc" },
        { image: "/mwc-4-01.png", code: "mwc" },
      ],
      ImageAlt: "Promotional image of the My Wellness Curriculum mobile application",
      ProjectTitle: "My Wellness Curriculum",
      ProjectSoftware: "React Native, Adobe CC",
      Spacer: "ml-0 mt-16 lg:ml-8 lg:mt-0",
    },
  ],
  [
    {
      UrlPath: "https://vibility.com/",
      className: "bg-gradient-to-r from-indigo-600 to-violet-800",
      ImagePath: [
        { image: "/backdrop-flipped-01.png", code: "press" },
        { image: "/vib-1-01.png", code: "vibility" },
        { image: "/vib-2-01.png", code: "vibility" },
        { image: "/vib-3-01.png", code: "vibility" },
      ],
      ProjectTitle: "Vibility LMS",
      ProjectSoftware: ".NET, Figma, Adobe CC",
      ImageAlt: "Screenshot of the Vibility website homepage",
    },
    {
      UrlPath: "https://cleanrcans.com/",
      className: "bg-gradient-to-r from-cyan-200 to-blue-500",
      ImagePath: [
        { image: "/backdrop-01.png", code: "press" },
        { image: "/clean-1-01.png", code: "clean" },
        { image: "/clean-2-01.png", code: "clean" },
        { image: "/clean-3-01.png", code: "clean" },
      ],
      ProjectTitle: "CleanRCans",
      ProjectSoftware: "WordPress, Adobe CC",
      anim: "clean-move",
      Spacer: "ml-0 mt-16 lg:ml-8 lg:mt-0",
    },
  ],
];

export const smallProjects: SmallProjectData[] = [
  {
    ProjectUrl: "https://my.wellnesscurriculum.com/mwc/login",
    ImagePath: "/icon.png",
    ImageAlt: "Icon of the Vibility logo",
    ProjectName: "Vibility Member Portal",
    ProjectSoftware: "Next.js",
  },
  {
    ImagePath: "/tackicon.png",
    ImageAlt: "Icon of the Tack Systems logo",
    ProjectName: "Tackify",
    ProjectSoftware: ".NET",
  },
  {
    ProjectUrl:
      "https://play.google.com/store/apps/details?id=com.tacksystems.littlepatriots&hl=en_US&gl=US",
    ImagePath: "/little-pat.png",
    ImageAlt: "Icon of the Little Patriots logo",
    ProjectName: "Little Patriots",
    ProjectSoftware: "Google Flutter",
  },
  {
    ProjectUrl:
      "https://play.google.com/store/apps/details?id=com.ctay.robal&hl=en_US&gl=US",
    ImagePath: "/robal.png",
    ImageAlt: "Icon of the Robal logo",
    ProjectName: "Robal",
    ProjectSoftware: ".NET",
  },
  {
    ImagePath: "/docs-logo.png",
    ImageAlt: "Icon of the DOCS logo",
    ProjectName: "Document Imaging System",
    ProjectSoftware: "XAML",
  },
  {
    ProjectUrl: "https://vaporwave.coltonmorrill.com/",
    ImagePath: "/vaporwave-01.svg",
    ImageAlt: "Icon of the Vaporwave logo",
    ProjectName: "Vaporwave 3D",
    ProjectSoftware: "Three.js",
  },
];

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    title: "Fund Launch AI",
    href: "https://fundlaunch.com/",
    category: "Agentic fund creation platform",
    year: "2026",
    role: "Leading frontend product direction for a platform that helps operators structure, validate, and launch investment funds with far less manual friction.",
    summary:
      "Built a fully agentic workflow for fund creation, combining scrolldecks, legal template generation, and a guided fund builder into one product experience.",
    impact: [
      "Turns fragmented legal, strategy, and setup work into a single operator-friendly system.",
      "Scores fund-builder inputs against real data and experience so users get sharper guidance while building.",
      "Packages decks, templates, and structured fund logic into one platform instead of disconnected services.",
    ],
    stack: ["Next.js", "TypeScript", "AI Workflows", "Product Design"],
    backgroundArt: "/fl/image.png",
    gallery: [
      { image: "/fl/image.png", code: "fundlaunch" },
      { image: "/fl/Screenshot 2026-03-31 094434 1@1x.png", code: "fundlaunch" },
      { image: "/fl/Screenshot 2026-03-31 094522 1@1x.png", code: "fundlaunch" },
      { image: "/fl/Screenshot 2026-03-31 094549 1@1x.png", code: "fundlaunch" },
      { image: "/fl/Screenshot 2026-03-31 094620 1@1x.png", code: "fundlaunch" },
    ],
    imageAlt: "Fund Launch AI platform screens showing scrolldecks, legal templates, and fund builder workflows",
    accent: "from-[#88b7ff] via-[#b89dff] to-[#f0f4ff]",
  },
  {
    title: "AptoGenix",
    href: "https://shop.aptogenix.com",
    category: "Ecommerce + operations",
    year: "2024",
    role: "Owned customer-facing storefront quality while aligning admin workflows and merchandising needs.",
    summary:
      "Modernized a supplement commerce experience with cleaner conversion paths, tighter visual trust cues, and practical interfaces for teams managing catalog complexity.",
    impact: [
      "Reduced friction between brand marketing and operational realities.",
      "Built interfaces that supported both purchase confidence and internal maintainability.",
      "Used product judgment to keep the system useful beyond launch-day visuals.",
    ],
    stack: [".NET", "Figma", "Adobe CC", "Responsive UI"],
    backgroundArt: "/project-bg-apto.svg",
    gallery: [
      { image: "/backdrop-flipped-01.png", code: "press" },
      { image: "/apto-1-01.png", code: "apto" },
      { image: "/apto-2-01.png", code: "apto" },
    ],
    imageAlt: "AptoGenix storefront dashboard and product views",
    accent: "from-[#7af0c2] via-[#4fe0c0] to-[#d8fff0]",
  },
  {
    title: "My Wellness Curriculum",
    href: "https://my.wellnesscurriculum.com/mwc/login",
    category: "Mobile health education",
    year: "2024",
    role: "Shaped the UX and visual language for a mobile product that needed to feel supportive, simple, and credible.",
    summary:
      "Created a calmer mobile experience with clearer pathways, stronger content hierarchy, and a more intentional relationship between education, motivation, and daily use.",
    impact: [
      "Made a content-heavy product easier to scan and return to.",
      "Kept the UI approachable without flattening the brand into generic wellness tropes.",
      "Framed product decisions around adoption, clarity, and trust.",
    ],
    stack: ["React Native", "Product Design", "Adobe CC"],
    backgroundArt: "/mwc.png",
    gallery: [
      { image: "/backdrop-01.png", code: "press" },
      { image: "/mwc-1-01.png", code: "mwc" },
      { image: "/mwc-2-01.png", code: "mwc" },
      { image: "/mwc-3-01.png", code: "mwc" },
      { image: "/mwc-4-01.png", code: "mwc" },
    ],
    imageAlt: "My Wellness Curriculum mobile application screens",
    accent: "from-[#c8f36a] via-[#88de5a] to-[#efffd1]",
  },
  {
    title: "Vibility LMS",
    href: "https://vibility.com/",
    category: "Learning platform",
    year: "2023",
    role: "Bridged product requirements, stakeholder expectations, and frontend execution for a B2B learning experience.",
    summary:
      "Reworked the platform presentation and supporting interfaces to feel more premium, organized, and scalable as the product matured.",
    impact: [
      "Improved information hierarchy across a complex feature set.",
      "Gave stakeholders a clearer system for discussing roadmap and UX priorities.",
      "Focused on practical consistency instead of one-off page treatments.",
    ],
    stack: [".NET", "Figma", "Design Systems"],
    backgroundArt: "/project-bg-vibility.svg",
    gallery: [
      { image: "/backdrop-flipped-01.png", code: "press" },
      { image: "/vib-1-01.png", code: "vibility" },
      { image: "/vib-2-01.png", code: "vibility" },
      { image: "/vib-3-01.png", code: "vibility" },
    ],
    imageAlt: "Vibility LMS interface previews",
    accent: "from-[#97a2ff] via-[#7f7cff] to-[#dddfff]",
  },
  {
    title: "Press Sports",
    href: "https://profile.presssportsapp.com/media/PressSportsOfficial",
    category: "Social sports platform",
    year: "2025",
    role: "Led UI direction, responsive system work, and shipping velocity across growth-facing experiences.",
    summary:
      "Designed and built a more editorial, creator-first web experience that made the product feel like a sports media brand instead of a generic app shell.",
    impact: [
      "Turned brand intent into a frontend system that felt fast, current, and differentiated.",
      "Balanced visual ambition with reusable patterns so launch pressure did not create design debt.",
      "Focused on polish in the moments users actually judge: feed presentation, profile clarity, and motion.",
    ],
    stack: ["Next.js", "TypeScript", "Figma", "GSAP"],
    backgroundArt: "/Press-Sports-Background.png",
    gallery: [
      { image: "/backdrop-01.png", code: "press" },
      { image: "/press-1-01.png", code: "press" },
      { image: "/press-2-01.png", code: "press" },
      { image: "/press-3-01.png", code: "press" },
    ],
    imageAlt: "Press Sports profile and media experience",
    accent: "from-[#4fe0ff] via-[#79c7ff] to-[#d7fbff]",
  },
  {
    title: "SiCoustics",
    href: "https://sicoustics.com/",
    category: "Marketing site",
    year: "2024",
    role: "Built a cleaner frontend presentation for a technical brand that needed more trust, more clarity, and less visual noise.",
    summary:
      "Created a more polished web presence for a niche acoustics company, balancing technical credibility with a sharper, more modern visual system.",
    impact: [
      "Improved first-impression trust for a highly specialized service business.",
      "Made complex offerings easier to scan without flattening the brand.",
      "Delivered a cleaner marketing experience with stronger hierarchy and presentation.",
    ],
    stack: ["WordPress", "Adobe CC", "Marketing UI"],
    backgroundArt: "/backdrop-flipped-01.png",
    gallery: [
      { image: "/backdrop-flipped-01.png", code: "sic" },
      { image: "/sic-1-01.png", code: "sic" },
      { image: "/sic-3-01.png", code: "sic" },
      { image: "/sic-2-01.png", code: "sic" },
    ],
    imageAlt: "SiCoustics website screens",
    accent: "from-[#a7c8ff] via-[#7fb0ff] to-[#e7f1ff]",
  },
];

export const projectArchive: ProjectArchiveEntry[] = [
  {
    title: "CleanRCans",
    href: "https://cleanrcans.com/",
    category: "Local service brand",
    note: "Sharper service positioning, cleaner conversion flow, and stronger mobile-first presentation.",
    stack: ["WordPress", "Brand UI"],
    icon: "/cleanrcans.jpg",
    iconAlt: "CleanRCans preview",
  },
  {
    title: "Vaporwave 3D",
    href: "https://vaporwave.coltonmorrill.com/",
    category: "Interactive experiment",
    note: "A visual sandbox for realtime graphics, motion, and atmosphere.",
    stack: ["Three.js", "Creative Frontend"],
    icon: "/vaporwave-01.svg",
    iconAlt: "Vaporwave logo",
  },
  {
    title: "Little Patriots",
    href: "https://play.google.com/store/apps/details?id=com.tacksystems.littlepatriots&hl=en_US&gl=US",
    category: "Mobile app",
    note: "Education-focused mobile work with kid-friendly UX constraints.",
    stack: ["Flutter", "Product Design"],
    icon: "/little-pat.png",
    iconAlt: "Little Patriots icon",
  },
  {
    title: "Robal",
    href: "https://play.google.com/store/apps/details?id=com.ctay.robal&hl=en_US&gl=US",
    category: "Utility app",
    note: "Practical mobile interface work built around straightforward task completion.",
    stack: [".NET", "Mobile UX"],
    icon: "/robal.png",
    iconAlt: "Robal icon",
  },
  {
    title: "Document Imaging System",
    category: "Enterprise tooling",
    note: "Internal software work centered on structure, speed, and legibility.",
    stack: ["XAML", "Business UI"],
    icon: "/docs-logo.png",
    iconAlt: "Document Imaging System logo",
  },
];

export const projectSectionStats = [
  "Product-minded frontend leadership",
  "UI systems that survive delivery pressure",
  "Design execution grounded in business constraints",
] as const;

export const aboutStackIcons: IconDefinition[] = [
  faReact,
  faFigma,
  faWordpress,
  faHtml5,
  faCss3,
  faJs,
  faAws,
  faMicrosoft,
  faJira,
  faGithub,
];

export const experienceItems: ExperienceData[] = [
  {
    ImagePath: "/fundlaunchicon.svg",
    ImageAlt: "Fund Launch logo",
    JobPosition: "Front End Software Engineer",
    Company: "Fund Launch",
    Duration: "November 2025 - April 2026 | 6 mo",
    location: "Lehi, Utah",
  },
  {
    ImagePath: "/phoenix.jpg",
    ImageAlt: "Phoenix Cyber branding",
    JobPosition: "Frontend Developer",
    Company: "Phoenix Cyber",
    Duration: "July 2023 - June 2025 | 2 yrs",
    location: "Salt Lake City, Utah",
  },
  {
    ImagePath: "/icon.png",
    ImageAlt: "Icon of the Vibility logo",
    JobPosition: "Frontend Developer",
    Company: "Vibility",
    Duration: "November 2022 - July 2023 | 8 mo",
    location: "Salt Lake City, Utah",
  },
  {
    ImagePath: "/tackicon.png",
    ImageAlt: "Icon of the Tack Systems logo",
    JobPosition: "Web Designer / Frontend Developer",
    Company: "Tack Systems LLC",
    Duration: "April 2021 - November 2022 | 1 yr 7 mo",
    location: "Salt Lake City, Utah",
  },
  {
    ImagePath: "/seo-rei.jpg",
    ImageAlt: "SEO for Real Estate Investors",
    JobPosition: "Web Designer & SEO Support",
    Company: "SEO For Real Estate Investors",
    Duration: "July 2020 - March 2021 | 9 mo",
    location: "Rexburg, Idaho",
  },
  {
    ImagePath: "/chick_fil_a_franchise_logo.jpg",
    ImageAlt: "Chick-Fil-A logo",
    JobPosition: "Web Designer",
    Company: "Chick-Fil-A Franchise",
    Duration: "April 2020 - May 2020 | Contract",
    location: "Coralville, Iowa",
  },
];
