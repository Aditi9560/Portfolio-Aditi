// ─── Types ───────────────────────────────────────────────────────────────────

export interface PersonalInfo {
  name: string;
  initials: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: string[];
}

export interface Experience {
  company: string;
  role: string;
  type: "Full-time" | "Internship" | "Contract";
  startDate: string;
  endDate: string;
  location: string;
  bullets: string[];
  techStack: string[];
}

export interface Project {
  name: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  highlights: string[];
  featured: boolean;
  type?: "personal" | "work";
  company?: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  note?: string;
}

export interface Achievement {
  title: string;
  issuer: string;
  year?: string;
  icon?: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const personalInfo: PersonalInfo = {
  name: "Aditi Verma",
  initials: "AV",
  title: "Full-Stack Developer",
  tagline: "Building enterprise-grade software at the intersection of performance and design.",
  email: "aditiverma9560@gmail.com",
  phone: "+91-9560941289",
  location: "Bangalore, India",
  socials: {
    github: "https://github.com/Aditi9560/",
    linkedin: "https://www.linkedin.com/in/aditi-verma-95214024a/",
  },
};

export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    icon: "◈",
    skills: ["React.js", "Redux", "Material UI", "Tailwind CSS", "i18n", "HTML", "CSS"],
  },
  {
    category: "Backend",
    icon: "◉",
    skills: ["Node.js", "Express.js", "Spring Boot", ".NET", "REST APIs", "Hibernate"],
  },
  {
    category: "Languages",
    icon: "◇",
    skills: ["JavaScript", "TypeScript", "Java"],
  },
  {
    category: "Databases",
    icon: "▣",
    skills: ["MySQL", "PostgreSQL", "SQL Server", "SQLite"],
  },
  {
    category: "Tools & DevOps",
    icon: "◎",
    skills: ["Git", "Docker", "VS Code", "Eclipse", "n8n"],
  },
  {
    category: "AI Tools",
    icon: "✦",
    skills: ["Replit AI", "ChatGPT", "Claude Code"],
  },
];

export const experience: Experience[] = [
  {
    company: "Podtech IO India Pvt. Ltd.",
    role: "Software Developer",
    type: "Full-time",
    startDate: "Nov 2024",
    endDate: "Present",
    location: "Bangalore, India",
    bullets: [
      "Developed enterprise full-stack applications: LifeSafety.ai, Report Zero, and YondrOne — spanning safety management, reporting, and IoT-connected platforms.",
      "Built scalable REST APIs using .NET and Node.js/Express in a microservices architecture, handling complex business logic across multiple services.",
      "Leveraged Replit AI for accelerated code generation, automated debugging, and streamlined testing workflows.",
      "Designed and optimized relational database schemas in SQL Server and PostgreSQL for high-throughput enterprise data workloads.",
      "Owned multiple modules across enterprise applications, collaborating with cross-functional teams to ship features on tight timelines.",
    ],
    techStack: [".NET", "Node.js", "Express.js", "React.js", "SQL Server", "PostgreSQL", "Docker"],
  },
  {
    company: "Userology Technologies Pvt. Ltd.",
    role: "Software Development Intern",
    type: "Internship",
    startDate: "Feb 2024",
    endDate: "Aug 2024",
    location: "Remote",
    bullets: [
      "Built and documented production-grade REST APIs using Java and Spring Boot, serving as the core backend for the platform.",
      "Developed reusable React.js UI components with comprehensive test coverage, improving maintainability and reducing regression bugs.",
    ],
    techStack: ["Java", "Spring Boot", "React.js", "REST APIs"],
  },
];

export const projects: Project[] = [
  // ── Personal ──────────────────────────────────────────────────────────────
  {
    name: "ResumeForge",
    description:
      "A full-stack resume generation platform with real-time preview, PDF download, and cloud image integration.",
    techStack: ["React", "Node.js", "TypeScript", "SQLite", "Cloudinary"],
    liveUrl: "https://resumeeforge.netlify.app/",
    githubUrl: "https://github.com/Aditi9560/portfolioforge",
    highlights: [
      "Real-time resume preview with live editing and section reordering",
      "One-click PDF export with pixel-perfect layout rendering",
      "Cloudinary integration for profile photo upload and CDN delivery",
      "Draft persistence via REST API with SQLite backend",
    ],
    featured: true,
    type: "personal",
  },
  {
    name: "EcoTracker Pro",
    description:
      "A carbon footprint dashboard to track, calculate, and visualize personal and organizational emissions.",
    techStack: ["Node.js", "React", "TypeScript", "SQLite"],
    liveUrl: "https://ecotracker1.netlify.app/",
    githubUrl: "https://github.com/Aditi9560/EcoTracker-Pro1",
    highlights: [
      "Interactive charts for emissions tracking across transport, energy, and consumption categories",
      "MCP services integration for live weather, maps, and environmental news feeds",
      "REST API with modular service architecture for extensibility",
    ],
    featured: true,
    type: "personal",
  },
  {
    name: "E-commerce Platform",
    description:
      "Full-stack e-commerce application with secure payment processing, product management, and an admin dashboard.",
    techStack: ["React", "Spring Boot", "Razorpay", "MySQL"],
    githubUrl: "https://github.com/Aditi9560/ECommerce",
    highlights: [
      "Secure Razorpay payment gateway integration with webhook verification",
      "Admin dashboard for product, order, and user management",
      "JWT-based authentication and role-based access control",
    ],
    featured: false,
    type: "personal",
  },
  {
    name: "Netflix Clone",
    description:
      "A frontend Netflix clone with movie browsing, trailer viewing, and user authentication. Integrates TMDB API for live movie data and Firebase for auth.",
    techStack: ["ReactJS", "JavaScript", "Redux", "Firebase", "TMDB API"],
    liveUrl: "https://projectdemovideostreaming.netlify.app/",
    githubUrl: "https://github.com/Aditi9560/Netlix-Clone",
    highlights: [
      "Firebase Authentication — login, signup, and logout flows",
      "TMDB API integration for live movie and trailer data",
      "Redux state management for user session and movie data",
      "Fully responsive UI mimicking Netflix's design",
      "Browse movies by genre with trailer preview modal",
    ],
    featured: true,
    type: "personal",
  },
  {
    name: "The Pillars Institute",
    description:
      "Official website for Pillars Institute — an educational coaching platform. Built with Next.js and Nodemailer for contact/inquiry emails.",
    techStack: ["Next.js", "Nodemailer", "CSS"],
    liveUrl: "https://pillars.org.in/",
    githubUrl: "https://github.com/Aditi9560/Pillars-Institute",
    highlights: [
      "Production website live at pillars.org.in",
      "Contact form with Nodemailer email integration",
      "Fully responsive design for all devices",
      "Built and deployed for a real client",
    ],
    featured: false,
    type: "personal",
  },
  {
    name: "Dobby — Voice Assistant",
    description:
      "A voice-controlled AI assistant for task automation. Uses GPT-3.5 for natural language understanding and NewsAPI for live news.",
    techStack: ["Python", "OpenAI GPT-3.5", "NewsAPI", "Speech Recognition"],
    githubUrl: "https://github.com/Aditi9560/Voice_Assistant-Dobbyy-",
    highlights: [
      "Voice-controlled commands using Python SpeechRecognition",
      "GPT-3.5 integration for intelligent responses",
      "Live news fetching via NewsAPI",
      "Task automation: weather, reminders, web search",
    ],
    featured: false,
    type: "personal",
  },
  // ── Work / Enterprise ─────────────────────────────────────────────────────
  {
    name: "LifeSafety.ai",
    description:
      "AI-powered workplace safety platform for construction sites. Built enterprise modules for real-time safety monitoring and compliance.",
    techStack: ["React.js", "Node.js", ".NET", "PostgreSQL", "REST APIs", "Microservices"],
    highlights: [
      "AI-powered PPE detection — cameras detect helmets, vests, gloves with alerts",
      "Real-time people counting across zones with density threshold notifications",
      "Accessibility monitoring — AI detects obstructions in emergency pathways",
      "Automated mobile alert system for instant safety response",
      "Analytics dashboards for safety audits and compliance reporting",
    ],
    featured: true,
    type: "work",
    company: "Podtech IO",
  },
  {
    name: "Report Zero",
    description:
      "Environmental intelligence platform integrated into data centre operations. Provides unified sustainability reporting and real-time metrics aligned to global standards.",
    techStack: ["React.js", "Node.js", "PostgreSQL", "Azure", "REST APIs", "Microservices"],
    highlights: [
      "Real-time PUE, WUE, CUE carbon emission metrics for data centres",
      "Audit-ready compliance reporting aligned to global sustainability standards",
      "Azure Functions for automated data ingestion from GridStatus.io",
      "Multi-tenant RBAC with role and permissions management",
      "Historical data ingestion APIs and client data verification workflows",
    ],
    featured: true,
    type: "work",
    company: "Podtech IO",
  },
  {
    name: "YondrOne",
    description:
      "Data centre management platform with admin controls, ticketing system, and operational planning tools.",
    techStack: ["React.js", "Node.js", "SQL Server", "REST APIs"],
    highlights: [
      "Admin dashboard for data centre operational management",
      "Ticketing system for issue tracking and resolution",
      "Planner module for scheduling and resource management",
      "Role-based access control across modules",
    ],
    featured: true,
    type: "work",
    company: "Podtech IO",
  },
];

export const education: Education[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "IGNOU University",
    year: "2022 – 2024",
  },
  {
    degree: "Bachelor of Science (B.Sc.)",
    institution: "University of Delhi",
    year: "2019 – 2022",
    note: "Gold Medalist",
  },
];

export const achievements: Achievement[] = [
  {
    title: "Rising Star of the Year Award",
    issuer: "Podtech IO India Pvt. Ltd.",
    icon: "★",
  },
  {
    title: "Java Full Stack Development Certification",
    issuer: "Ducat",
    icon: "◈",
  },
  {
    title: "React — Namaste React Course",
    issuer: "Akshay Saini",
    icon: "◉",
  },
  {
    title: "Gold Medalist — B.Sc.",
    issuer: "University of Delhi",
    icon: "✦",
  },
];
