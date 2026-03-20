"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

// ─── Types & Data ─────────────────────────────────────────────────────────────

interface Skill {
  name: string;
  level: number; // 1–5
}

interface Tab {
  id: string;
  label: string;
  icon: string;
  skills: Skill[];
}

const tabs: Tab[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "◈",
    skills: [
      { name: "React.js", level: 4 },
      { name: "Redux", level: 4 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Material UI", level: 4 },
      { name: "HTML / CSS", level: 5 },
      { name: "i18n", level: 3 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "◉",
    skills: [
      { name: "Node.js / Express", level: 4 },
      { name: "Spring Boot", level: 3 },
      { name: ".NET", level: 3 },
      { name: "REST APIs", level: 5 },
      { name: "Hibernate", level: 3 },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    icon: "▣",
    skills: [
      { name: "PostgreSQL", level: 4 },
      { name: "MySQL", level: 3 },
      { name: "SQL Server", level: 4 },
      { name: "SQLite", level: 3 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "◎",
    skills: [
      { name: "Git", level: 5 },
      { name: "Docker", level: 3 },
      { name: "VS Code", level: 5 },
      { name: "n8n", level: 3 },
      { name: "Eclipse", level: 3 },
    ],
  },
  {
    id: "ai",
    label: "AI Tools",
    icon: "✦",
    skills: [
      { name: "Claude Code", level: 5 },
      { name: "Replit AI", level: 4 },
      { name: "ChatGPT", level: 4 },
    ],
  },
];

// ─── Proficiency Dots ─────────────────────────────────────────────────────────

function ProficiencyDots({ level }: { level: number }) {
  return (
    <span className="flex items-center gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
            i < level ? "bg-[var(--accent)]" : "bg-[var(--border)]"
          }`}
        />
      ))}
    </span>
  );
}

// ─── Skill Pill ───────────────────────────────────────────────────────────────

function SkillPill({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.94 }}
      transition={{
        duration: 0.35,
        delay: index * 0.055,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 18px rgba(0,255,136,0.25)",
        borderColor: "rgba(0,255,136,0.6)",
      }}
      className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card)] cursor-default transition-colors duration-300 group"
    >
      <span className="font-mono text-xs tracking-wide text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">
        {skill.name}
      </span>
      <ProficiencyDots level={skill.level} />
    </motion.div>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

export default function Skills() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <SectionWrapper id="skills">
      {/* Header */}
      <div className="mb-12">
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs tracking-[0.25em] text-[var(--accent)] uppercase mb-4"
        >
          // skills &amp; proficiency
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)]"
        >
          What I Work With
        </motion.h2>
      </div>

      {/* Tab bar — code editor style */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-end gap-0 border-b border-[var(--border)] mb-8 overflow-x-auto scrollbar-none"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-3 font-mono text-xs tracking-widest whitespace-nowrap transition-all duration-200 outline-none
                ${
                  isActive
                    ? "text-[var(--accent)] bg-[var(--card)]"
                    : "text-[var(--text-muted)] bg-transparent hover:text-[var(--text-primary)] hover:bg-[var(--card)]/50"
                }`}
            >
              <span className={`transition-colors duration-200 ${isActive ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}`}>
                {tab.icon}
              </span>
              {tab.label}

              {/* Active underline */}
              {isActive && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]"
                  style={{ boxShadow: "0 0 8px rgba(0,255,136,0.6)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </motion.div>

      {/* Tab content */}
      <div className="min-h-[260px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
          >
            {current.skills.map((skill, i) => (
              <SkillPill key={skill.name} skill={skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-10 flex items-center gap-6 flex-wrap"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] text-[var(--text-muted)] uppercase">
          proficiency
        </span>
        {[
          { dots: 1, label: "Familiar" },
          { dots: 3, label: "Proficient" },
          { dots: 5, label: "Expert" },
        ].map(({ dots, label }) => (
          <div key={label} className="flex items-center gap-2">
            <ProficiencyDots level={dots} />
            <span className="text-[10px] font-mono text-[var(--text-muted)]">{label}</span>
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
