"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

// ─── Count-up Hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);

  return count;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ stat, trigger, index }: { stat: Stat; trigger: boolean; index: number }) {
  const count = useCountUp(stat.value, 1200, trigger);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
      className="relative p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] group hover:border-[var(--accent)]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,136,0.08)]"
    >
      {/* Accent corner */}
      <div className="absolute top-0 left-0 w-8 h-8 overflow-hidden rounded-tl-xl">
        <div className="absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-[var(--accent)]/40 rounded-tl-xl group-hover:border-[var(--accent)] transition-colors duration-300" />
      </div>

      <p className="font-display text-4xl font-extrabold text-[var(--text-primary)] leading-none mb-2">
        {count}
        <span className="text-[var(--accent)]">{stat.suffix}</span>
      </p>
      <p className="text-xs font-mono tracking-widest text-[var(--text-muted)] uppercase">
        {stat.label}
      </p>
    </motion.div>
  );
}

// ─── Highlight Pill ───────────────────────────────────────────────────────────

function HighlightPill({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] text-xs font-mono text-[var(--text-muted)] hover:border-[var(--accent)]/50 hover:text-[var(--text-primary)] transition-all duration-300 cursor-default"
    >
      {label}
    </motion.span>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

const stats: Stat[] = [
  { value: 2, suffix: "+", label: "Years of Experience" },
  { value: 3, suffix: "", label: "Enterprise Products" },
  { value: 10, suffix: "+", label: "Modules Shipped" },
  { value: 1, suffix: "", label: "Gold Medal" },
];

const highlights = [
  "🏆 Rising Star Award",
  "🥇 Gold Medalist — Delhi University",
  "🤖 AI-Assisted Dev",
];

const paragraphs = [
  "I'm a full-stack developer at Podtech IO, where I build enterprise-grade applications that solve real problems — from monitoring carbon emissions in data centers (Report Zero) to managing workplace safety permits (LifeSafety.ai).",
  "I work across the full stack: React frontends, Node.js/Express and .NET backends, PostgreSQL and SQL Server databases, with microservices architectures deployed on Azure. I use AI tools daily — Claude Code, Replit AI — to ship faster and smarter.",
  "I'm a University of Delhi Gold Medalist, a Podtech Rising Star Award winner, and someone who genuinely loves the craft of building things that scale.",
];

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px 0px" });

  return (
    <SectionWrapper id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

        {/* ── Left: text ── */}
        <div className="space-y-6">
          {/* Section label */}
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-xs tracking-[0.25em] text-[var(--accent)] uppercase"
          >
            // about me
          </motion.p>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] leading-tight"
          >
            Who I Am
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ originX: 0 }}
            className="w-16 h-px bg-[var(--accent)]"
          />

          {/* Paragraphs */}
          <div className="space-y-4">
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="text-[var(--text-muted)] font-mono text-sm leading-[1.85]"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Highlight pills */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3 pt-2"
          >
            {highlights.map((label, i) => (
              <HighlightPill key={label} label={label} delay={0.65 + i * 0.1} />
            ))}
          </motion.div>
        </div>

        {/* ── Right: stat cards ── */}
        <div ref={statsRef} className="space-y-6">
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} trigger={statsInView} index={i} />
            ))}
          </div>

          {/* Terminal-style "currently" card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.2em] text-[var(--text-muted)] uppercase">
                currently
              </span>
            </div>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-start gap-3">
                <span className="text-[var(--accent)] mt-0.5 shrink-0">▸</span>
                <span className="text-[var(--text-muted)]">
                  Building enterprise SaaS at{" "}
                  <span className="text-[var(--text-primary)]">Podtech IO</span>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[var(--accent)] mt-0.5 shrink-0">▸</span>
                <span className="text-[var(--text-muted)]">
                  Shipping{" "}
                  <span className="text-[var(--text-primary)]">
                    LifeSafety.ai, Report Zero, YondrOne
                  </span>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[var(--accent)] mt-0.5 shrink-0">▸</span>
                <span className="text-[var(--text-muted)]">
                  Stack:{" "}
                  <span className="text-[var(--accent-secondary)]">
                    React · .NET · Node.js · PostgreSQL
                  </span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
