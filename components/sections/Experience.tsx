"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Badge from "@/components/ui/Badge";
import { experience } from "@/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EntryMeta {
  badgeLabel: string;
  badgeColor: "green" | "blue";
}

// Parallel metadata not stored in data.ts (badge styling)
const entryMeta: EntryMeta[] = [
  { badgeLabel: "Current", badgeColor: "green" },
  { badgeLabel: "Internship", badgeColor: "blue" },
];

// ─── Animated Timeline Line ───────────────────────────────────────────────────

function TimelineLine({ inView }: { inView: boolean }) {
  return (
    <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--border)] overflow-hidden">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ originY: 0 }}
        className="absolute inset-0 bg-gradient-to-b from-[var(--accent)] via-[var(--accent)] to-[var(--accent)]/20"
      />
      {/* Glow */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ originY: 0 }}
        className="absolute inset-0 w-[3px] -left-[1px] bg-[var(--accent)]/30 blur-[2px]"
      />
    </div>
  );
}

// ─── Timeline Dot ─────────────────────────────────────────────────────────────

function TimelineDot({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className="absolute -left-[9px] top-8 w-[18px] h-[18px] rounded-full border-2 border-[var(--accent)] bg-[var(--background)] z-10 flex items-center justify-center"
      style={{ boxShadow: "0 0 10px rgba(0,255,136,0.5)" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
    </motion.div>
  );
}

// ─── Experience Card ──────────────────────────────────────────────────────────

function ExperienceCard({
  entry,
  meta,
  index,
  inView,
}: {
  entry: (typeof experience)[0];
  meta: EntryMeta;
  index: number;
  inView: boolean;
}) {
  const [expanded, setExpanded] = useState(index === 0); // first card open by default

  const badgeStyles = {
    green: "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10",
    blue: "border-[#00d4ff] text-[#00d4ff] bg-[#00d4ff]/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: 0.2 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="ml-8 relative"
    >
      {/* Animated left border */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.35 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{ originY: 0 }}
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--accent)]/60 to-transparent rounded-full"
      />

      <div className="ml-6 rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden hover:border-[var(--accent)]/30 transition-colors duration-300">

        {/* Card header */}
        <div className="p-6">
          {/* Top row: badge + duration */}
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase border ${badgeStyles[meta.badgeColor]}`}
            >
              {meta.badgeColor === "green" && (
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              )}
              {meta.badgeLabel}
            </span>
            <span className="font-mono text-[11px] text-[var(--text-muted)] tracking-wider">
              {entry.startDate} — {entry.endDate}
            </span>
          </div>

          {/* Company + role */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h3 className="font-display text-xl font-bold text-[var(--text-primary)] leading-tight mb-1">
                {entry.company}
              </h3>
              <p className="font-mono text-sm text-[var(--accent)]">{entry.role}</p>
              {entry.location && (
                <p className="font-mono text-xs text-[var(--text-muted)] mt-1 tracking-wide">
                  📍 {entry.location}
                </p>
              )}
            </div>
          </div>

          {/* Expand / collapse toggle */}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-5 flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200 group"
          >
            <motion.span
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.25 }}
              className="inline-block text-[var(--accent)]"
            >
              ▸
            </motion.span>
            {expanded ? "Collapse" : "Show details"}
          </button>
        </div>

        {/* Collapsible: bullets + tech */}
        <motion.div
          initial={false}
          animate={expanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-6 border-t border-[var(--border)] pt-5 space-y-5">
            {/* Bullet points */}
            <ul className="space-y-3">
              {entry.bullets.map((bullet, bi) => (
                <motion.li
                  key={bi}
                  initial={{ opacity: 0, x: -12 }}
                  animate={expanded ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: bi * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3 font-mono text-xs text-[var(--text-muted)] leading-relaxed"
                >
                  <span className="text-[var(--accent)] mt-0.5 shrink-0">▹</span>
                  {bullet}
                </motion.li>
              ))}
            </ul>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {entry.techStack.map((tech, ti) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={expanded ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.25, delay: 0.1 + ti * 0.04 }}
                  className="px-2.5 py-1 rounded-md bg-[var(--surface)] border border-[var(--border)] font-mono text-[10px] tracking-wider text-[var(--text-muted)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)] transition-all duration-200"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(timelineRef, { once: true, margin: "-80px 0px" });

  return (
    <SectionWrapper id="experience">
      {/* Header */}
      <div className="mb-14">
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs tracking-[0.25em] text-[var(--accent)] uppercase mb-4"
        >
          // work experience
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)]"
        >
          Where I&apos;ve Worked
        </motion.h2>
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className="relative pl-1">
        <TimelineLine inView={inView} />

        <div className="space-y-10">
          {experience.map((entry, i) => (
            <div key={entry.company} className="relative">
              <TimelineDot inView={inView} delay={0.3 + i * 0.2} />
              <ExperienceCard
                entry={entry}
                meta={entryMeta[i]}
                index={i}
                inView={inView}
              />
            </div>
          ))}
        </div>

        {/* End cap */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="relative mt-10 ml-8 pl-6"
        >
          <div className="absolute -left-[9px] w-[18px] h-[18px] rounded-full border border-dashed border-[var(--accent)]/40 bg-[var(--background)] flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-[var(--accent)]/40" />
          </div>
          <p className="font-mono text-xs text-[var(--text-muted)] italic tracking-wider">
            The story continues...
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
