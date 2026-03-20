"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  highlights: string[];
  accent: string;
  accentRgb: string;
  status: { label: string; color: "green" | "gray" };
  liveUrl?: string;
  githubUrl?: string;
  type: "personal" | "work";
  company?: string;
}

// ─── Personal Projects ────────────────────────────────────────────────────────

const personalProjects: Project[] = [
  {
    id: "resumeforge",
    number: "01",
    title: "ResumeForge",
    tagline: "Full-stack resume builder with real-time preview",
    description:
      "A complete resume generation platform. Users build resumes with a real-time preview panel, download as PDF, and persist drafts. Features Cloudinary image upload for profile photos.",
    tech: ["React", "Node.js", "TypeScript", "SQLite", "Cloudinary"],
    highlights: [
      "Real-time preview panel — edit on left, see result on right",
      "REST API with Express.js and SQLite persistence",
      "Cloudinary integration for profile photo uploads",
      "TypeScript throughout — typed from API to UI",
      "PDF export functionality",
    ],
    accent: "#00ff88",
    accentRgb: "0,255,136",
    status: { label: "Live", color: "green" },
    liveUrl: "https://resumeeforge.netlify.app/",
    githubUrl: "https://github.com/Aditi9560/portfolioforge",
    type: "personal",
  },
  {
    id: "ecotracker",
    number: "02",
    title: "EcoTracker Pro",
    tagline: "Carbon footprint dashboard with live data integrations",
    description:
      "A sustainability-focused dashboard that helps users track and visualize their carbon footprint across activities. Integrates MCP services for real-time weather, maps, and news.",
    tech: ["Node.js", "React", "TypeScript", "SQLite"],
    highlights: [
      "Interactive emissions visualization with charts (Chart.js)",
      "REST API backend with category-based tracking",
      "MCP service integration: weather, maps, environmental news",
      "TypeScript frontend + backend",
      "Responsive dashboard layout",
    ],
    accent: "#00d4ff",
    accentRgb: "0,212,255",
    status: { label: "Live", color: "green" },
    liveUrl: "https://ecotracker1.netlify.app/",
    githubUrl: "https://github.com/Aditi9560/EcoTracker-Pro1",
    type: "personal",
  },
  {
    id: "ecommerce",
    number: "03",
    title: "E-commerce Platform",
    tagline: "Full-stack shop with Razorpay payment integration",
    description:
      "A complete e-commerce application with product listings, cart, secure checkout via Razorpay, and an admin dashboard for order and inventory management.",
    tech: ["React", "Spring Boot", "Razorpay", "MySQL"],
    highlights: [
      "Razorpay payment gateway — secure end-to-end checkout",
      "Java Spring Boot REST API backend",
      "Admin dashboard for product and order management",
      "MySQL database with relational schema",
      "React frontend with cart state management",
    ],
    accent: "#a855f7",
    accentRgb: "168,85,247",
    status: { label: "GitHub", color: "gray" },
    githubUrl: "https://github.com/Aditi9560/ECommerce",
    type: "personal",
  },
  {
    id: "netflix-clone",
    number: "04",
    title: "Netflix Clone",
    tagline: "Frontend streaming UI with TMDB API and Firebase auth",
    description:
      "A frontend Netflix clone with movie browsing, trailer viewing, and user authentication. Integrates TMDB API for live movie data and Firebase for auth.",
    tech: ["ReactJS", "JavaScript", "Redux", "Firebase", "TMDB API"],
    highlights: [
      "Firebase Authentication — login, signup, and logout flows",
      "TMDB API integration for live movie and trailer data",
      "Redux state management for user session and movie data",
      "Fully responsive UI mimicking Netflix's design",
      "Browse movies by genre with trailer preview modal",
    ],
    accent: "#e50914",
    accentRgb: "229,9,20",
    status: { label: "Live", color: "green" },
    liveUrl: "https://projectdemovideostreaming.netlify.app/",
    githubUrl: "https://github.com/Aditi9560/Netlix-Clone",
    type: "personal",
  },
  {
    id: "pillars-institute",
    number: "05",
    title: "The Pillars Institute",
    tagline: "Production website for an educational coaching platform",
    description:
      "Official website for Pillars Institute — an educational coaching platform. Built with Next.js and Nodemailer for contact/inquiry emails.",
    tech: ["Next.js", "Nodemailer", "CSS"],
    highlights: [
      "Production website live at pillars.org.in",
      "Contact form with Nodemailer email integration",
      "Fully responsive design for all devices",
      "Built and deployed for a real client",
    ],
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    status: { label: "Live", color: "green" },
    liveUrl: "https://pillars.org.in/",
    githubUrl: "https://github.com/Aditi9560/Pillars-Institute",
    type: "personal",
  },
  {
    id: "dobby",
    number: "06",
    title: "Dobby — Voice Assistant",
    tagline: "Voice-controlled AI assistant for task automation",
    description:
      "A voice-controlled AI assistant for task automation. Uses GPT-3.5 for natural language understanding and NewsAPI for live news.",
    tech: ["Python", "OpenAI GPT-3.5", "NewsAPI", "Speech Recognition"],
    highlights: [
      "Voice-controlled commands using Python SpeechRecognition",
      "GPT-3.5 integration for intelligent responses",
      "Live news fetching via NewsAPI",
      "Task automation: weather, reminders, web search",
    ],
    accent: "#8b5cf6",
    accentRgb: "139,92,246",
    status: { label: "GitHub", color: "gray" },
    githubUrl: "https://github.com/Aditi9560/Voice_Assistant-Dobbyy-",
    type: "personal",
  },
];

// ─── Work / Enterprise Projects ───────────────────────────────────────────────

const workProjects: Project[] = [
  {
    id: "lifesafety",
    number: "W-01",
    title: "LifeSafety.ai",
    tagline: "AI-powered workplace safety platform for construction sites",
    description:
      "Enterprise safety platform built for construction sites. Developed real-time AI-powered safety monitoring modules, PPE detection, people counting, and compliance dashboards.",
    tech: ["React.js", "Node.js", ".NET", "PostgreSQL", "REST APIs", "Microservices"],
    highlights: [
      "AI-powered PPE detection — cameras detect helmets, vests, gloves with alerts",
      "Real-time people counting across zones with density threshold notifications",
      "Accessibility monitoring — AI detects obstructions in emergency pathways",
      "Automated mobile alert system for instant safety response",
      "Analytics dashboards for safety audits and compliance reporting",
    ],
    accent: "#00d4ff",
    accentRgb: "0,212,255",
    status: { label: "Enterprise", color: "gray" },
    type: "work",
    company: "Podtech IO",
  },
  {
    id: "reportzero",
    number: "W-02",
    title: "Report Zero",
    tagline: "Environmental intelligence platform for data centre operations",
    description:
      "Environmental intelligence platform integrated into data centre operations. Provides unified sustainability reporting and real-time metrics aligned to global standards.",
    tech: ["React.js", "Node.js", "PostgreSQL", "Azure", "REST APIs", "Microservices"],
    highlights: [
      "Real-time PUE, WUE, CUE carbon emission metrics for data centres",
      "Audit-ready compliance reporting aligned to global sustainability standards",
      "Azure Functions for automated data ingestion from GridStatus.io",
      "Multi-tenant RBAC with role and permissions management",
      "Historical data ingestion APIs and client data verification workflows",
    ],
    accent: "#00d4ff",
    accentRgb: "0,212,255",
    status: { label: "Enterprise", color: "gray" },
    type: "work",
    company: "Podtech IO",
  },
  {
    id: "yondrone",
    number: "W-03",
    title: "YondrOne",
    tagline: "Data centre management with admin, ticketing, and planner tools",
    description:
      "Data centre management platform with admin controls, ticketing system, and operational planning tools.",
    tech: ["React.js", "Node.js", "SQL Server", "REST APIs"],
    highlights: [
      "Admin dashboard for data centre operational management",
      "Ticketing system for issue tracking and resolution",
      "Planner module for scheduling and resource management",
      "Role-based access control across modules",
    ],
    accent: "#00d4ff",
    accentRgb: "0,212,255",
    status: { label: "Enterprise", color: "gray" },
    type: "work",
    company: "Podtech IO",
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function ExternalLinkIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function LockIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Project["status"] }) {
  const styles = {
    green: "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/8",
    gray: "border-[var(--border)] text-[var(--text-muted)] bg-[var(--surface)]",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono tracking-widest uppercase ${styles[status.color]}`}>
      {status.color === "green" && (
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
      )}
      {status.label}
    </span>
  );
}

// ─── Tech Pill ────────────────────────────────────────────────────────────────

function TechPill({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      className="px-2.5 py-1 rounded-md border text-[10px] font-mono tracking-wider transition-colors duration-200"
      style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${accent}55`;
        (e.currentTarget as HTMLElement).style.color = accent;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
      }}
    >
      {label}
    </span>
  );
}

// ─── Case Study Panel ─────────────────────────────────────────────────────────

function CaseStudyPanel({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ willChange: "transform" }}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border bg-[var(--card)] shadow-2xl"
        style={{ borderColor: `${project.accent}33` }}
      >
        {/* Accent top stripe */}
        <div
          className="h-[3px] w-full rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
        />

        <div className="p-6 sm:p-8">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <StatusBadge status={project.status} />
                {project.type === "work" && project.company && (
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono tracking-widest uppercase"
                    style={{ borderColor: `${project.accent}44`, color: project.accent }}
                  >
                    <LockIcon size={9} />
                    {project.company}
                  </span>
                )}
                {project.type === "personal" && (
                  <span className="font-mono text-xs tracking-widest" style={{ color: project.accent }}>
                    {project.number}
                  </span>
                )}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mb-1">
                {project.title}
              </h3>
              <p className="font-mono text-sm" style={{ color: project.accent }}>
                {project.tagline}
              </p>
            </div>

            <button
              onClick={onClose}
              className="shrink-0 p-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]/40 transition-all duration-200"
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Description */}
          <p className="font-mono text-sm text-[var(--text-muted)] leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Highlights */}
          <div className="mb-8">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)] mb-4">
              Key Highlights
            </p>
            <ul className="space-y-3">
              {project.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3 font-mono text-sm text-[var(--text-muted)]"
                >
                  <span className="shrink-0 mt-0.5"><CheckIcon color={project.accent} /></span>
                  {h}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div className="mb-8">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)] mb-3">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <TechPill key={t} label={t} accent={project.accent} />
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.type === "work" ? (
              <div
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-lg border font-mono text-xs text-[var(--text-muted)]"
                style={{ borderColor: "var(--border)" }}
              >
                <LockIcon size={13} />
                Enterprise / Confidential — not publicly available
              </div>
            ) : (
              <>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs tracking-widest uppercase text-[#0a0a0a] font-bold transition-all duration-300"
                    style={{
                      background: project.accent,
                      boxShadow: `0 0 20px rgba(${project.accentRgb},0.3)`,
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.boxShadow = `0 0 32px rgba(${project.accentRgb},0.55)`)
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px rgba(${project.accentRgb},0.3)`)
                    }
                  >
                    <ExternalLinkIcon size={14} />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg border font-mono text-xs tracking-widest uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all duration-200"
                    style={{ borderColor: "var(--border)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${project.accent}66`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    }}
                  >
                    <GitHubIcon size={14} />
                    View Code
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  onOpen,
  inView,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
  inView: boolean;
}) {
  const isWork = project.type === "work";

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      onClick={onOpen}
      className="group relative flex flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden cursor-pointer transition-all duration-300"
      style={{ "--card-accent": project.accent, "--card-accent-rgb": project.accentRgb } as React.CSSProperties}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${project.accent}44`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px rgba(${project.accentRgb},0.12)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Accent top stripe */}
      <div
        className="h-[2px] w-full"
        style={{ background: `linear-gradient(90deg, ${project.accent}, transparent 70%)` }}
      />

      <div className="flex-1 p-6 flex flex-col">
        {/* Watermark number */}
        <span
          className="absolute top-3 right-5 font-display font-extrabold text-7xl leading-none select-none pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
          style={{ color: `${project.accent}0d`, opacity: 0.06 }}
        >
          {project.number}
        </span>

        {/* Status + number/company row */}
        <div className="flex items-center justify-between mb-5">
          <StatusBadge status={project.status} />
          {isWork ? (
            <span className="font-mono text-[9px] tracking-widest text-[var(--text-muted)] uppercase">
              {project.company}
            </span>
          ) : (
            <span className="font-mono text-xs tracking-widest" style={{ color: project.accent }}>
              {project.number}
            </span>
          )}
        </div>

        {/* Title + tagline */}
        <h3 className="font-display text-xl font-bold text-[var(--text-primary)] leading-tight mb-2 transition-colors duration-200">
          {project.title}
        </h3>
        <p className="font-mono text-xs text-[var(--text-muted)] leading-relaxed mb-6 flex-1">
          {project.tagline}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md border border-[var(--border)] font-mono text-[10px] tracking-wider text-[var(--text-muted)]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <button
            onClick={(e) => { e.stopPropagation(); onOpen(); }}
            className="font-mono text-[10px] tracking-widest uppercase transition-colors duration-200"
            style={{ color: project.accent }}
          >
            {isWork ? "View Details →" : "View Case Study →"}
          </button>

          <div className="flex items-center gap-2">
            {isWork ? (
              /* Enterprise / Confidential badge */
              <span
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono text-[9px] tracking-widest uppercase text-[var(--text-muted)]"
                style={{ borderColor: "var(--border)" }}
              >
                <LockIcon size={10} />
                Confidential
              </span>
            ) : (
              <>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]/40 transition-all duration-200"
                    aria-label="GitHub"
                  >
                    <GitHubIcon size={14} />
                  </a>
                )}
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg border transition-all duration-200"
                    style={{ color: project.accent, borderColor: `${project.accent}44` }}
                    aria-label="Live demo"
                  >
                    <ExternalLinkIcon size={14} />
                  </a>
                ) : (
                  <span
                    className="p-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)]/30 cursor-not-allowed"
                    aria-label="No live URL"
                  >
                    <ExternalLinkIcon size={14} />
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"personal" | "work">("personal");
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-60px 0px" });

  const currentProjects = activeTab === "personal" ? personalProjects : workProjects;
  const totalCount = personalProjects.length + workProjects.length;
  const allProjects = [...personalProjects, ...workProjects];
  const activeProject = allProjects.find((p) => p.id === activeId) ?? null;

  useEffect(() => {
    document.body.style.overflow = activeId ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeId]);

  return (
    <SectionWrapper id="projects">
      {/* Header */}
      <div className="mb-10">
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs tracking-[0.25em] text-[var(--accent)] uppercase mb-4"
        >
          // selected projects
        </motion.p>

        <div className="flex items-end justify-between gap-4 flex-wrap mb-4">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)]"
          >
            Things I&apos;ve Built
          </motion.h2>

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-mono text-xs tracking-widest border border-[var(--border)] rounded-full px-3 py-1 text-[var(--text-muted)] shrink-0"
          >
            {totalCount} projects
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-sm text-[var(--text-muted)] max-w-lg"
        >
          Click any card to open the full case study.
        </motion.p>
      </div>

      {/* Tab Switcher */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="flex gap-2 mb-8"
      >
        <button
          onClick={() => setActiveTab("personal")}
          className={`px-4 py-2 rounded-lg font-mono text-xs tracking-widest uppercase transition-all duration-200 ${
            activeTab === "personal"
              ? "bg-[var(--accent)] text-[#0a0a0a] font-bold shadow-[0_0_16px_rgba(0,255,136,0.3)]"
              : "border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]/30"
          }`}
        >
          Personal ({personalProjects.length})
        </button>
        <button
          onClick={() => setActiveTab("work")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-mono text-xs tracking-widest uppercase transition-all duration-200 ${
            activeTab === "work"
              ? "bg-[#00d4ff] text-[#0a0a0a] font-bold shadow-[0_0_16px_rgba(0,212,255,0.3)]"
              : "border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[#00d4ff]/30"
          }`}
        >
          <LockIcon size={11} />
          Work ({workProjects.length})
        </button>
      </motion.div>

      {/* Cards grid */}
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="wait">
          {currentProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={() => setActiveId(project.id)}
              inView={inView}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Case study overlay */}
      <AnimatePresence>
        {activeProject && (
          <CaseStudyPanel
            project={activeProject}
            onClose={() => setActiveId(null)}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
