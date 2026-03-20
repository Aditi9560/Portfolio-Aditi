"use client";

import { motion } from "framer-motion";
import { Typewriter } from "@/components/ui/AnimatedText";
import { personalInfo } from "@/lib/data";

// ─── Variants ────────────────────────────────────────────────────────────────

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Animated Name ────────────────────────────────────────────────────────────

function AnimatedName({ name }: { name: string }) {
  return (
    <span className="block whitespace-nowrap">
      {name.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.35 + i * 0.05,
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// ─── Social Icons ─────────────────────────────────────────────────────────────

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ─── Code Block ───────────────────────────────────────────────────────────────

type TokenColor = "keyword" | "type" | "string" | "property" | "comment" | "operator";

interface CodeLine {
  indent: number;
  tokens: Array<{ text: string; color: TokenColor }>;
}

const colorMap: Record<TokenColor, string> = {
  keyword: "#00d4ff",
  type: "#00ff88",
  string: "#ffd080",
  property: "#f0f0f0",
  comment: "#4a4a4a",
  operator: "#888888",
};

const codeLines: CodeLine[] = [
  { indent: 0, tokens: [{ text: "interface ", color: "keyword" }, { text: "Developer", color: "type" }, { text: " {", color: "operator" }] },
  { indent: 1, tokens: [{ text: "name", color: "property" }, { text: ": ", color: "operator" }, { text: '"Aditi Verma"', color: "string" }, { text: ";", color: "operator" }] },
  { indent: 1, tokens: [{ text: "role", color: "property" }, { text: ": ", color: "operator" }, { text: '"Full-Stack Developer"', color: "string" }, { text: ";", color: "operator" }] },
  { indent: 1, tokens: [{ text: "stack", color: "property" }, { text: ": ", color: "operator" }, { text: "TechStack", color: "type" }, { text: "[];", color: "operator" }] },
  { indent: 1, tokens: [{ text: "location", color: "property" }, { text: ": ", color: "operator" }, { text: '"Bangalore, IN"', color: "string" }, { text: ";", color: "operator" }] },
  { indent: 0, tokens: [{ text: "}", color: "operator" }] },
  { indent: 0, tokens: [{ text: "", color: "operator" }] },
  { indent: 0, tokens: [{ text: "const ", color: "keyword" }, { text: "aditi", color: "type" }, { text: ": ", color: "operator" }, { text: "Developer", color: "type" }, { text: " = {", color: "operator" }] },
  { indent: 1, tokens: [{ text: "stack", color: "property" }, { text: ": [", color: "operator" }] },
  { indent: 2, tokens: [{ text: '"React"', color: "string" }, { text: ", ", color: "operator" }, { text: '"Node.js"', color: "string" }, { text: ",", color: "operator" }] },
  { indent: 2, tokens: [{ text: '".NET"', color: "string" }, { text: ", ", color: "operator" }, { text: '"PostgreSQL"', color: "string" }, { text: ",", color: "operator" }] },
  { indent: 1, tokens: [{ text: "],", color: "operator" }] },
  { indent: 1, tokens: [{ text: "openTo", color: "property" }, { text: ": ", color: "operator" }, { text: '"great opportunities"', color: "string" }, { text: ",", color: "operator" }] },
  { indent: 0, tokens: [{ text: "};", color: "operator" }] },
  { indent: 0, tokens: [{ text: "", color: "operator" }] },
  { indent: 0, tokens: [{ text: "// currently building @ Podtech IO  ✦", color: "comment" }] },
];

function CodeBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-xl border border-[var(--border)] bg-[#0d0d0d] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(0,255,136,0.06)]"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-[10px] font-mono text-[var(--text-muted)] tracking-widest">
            developer.ts
          </span>
        </div>

        {/* Code body */}
        <div className="p-5 font-mono text-[12px] leading-[1.8] select-none">
          {codeLines.map((line, li) => (
            <div key={li} style={{ paddingLeft: `${line.indent * 16}px`, minHeight: "1.8em" }}>
              {line.tokens.map((token, ti) => (
                <span key={ti} style={{ color: colorMap[token.color] }}>
                  {token.text}
                </span>
              ))}
              {li === codeLines.length - 1 && (
                <motion.span
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "linear", times: [0, 0.49, 0.5, 1] }}
                  className="inline-block w-[7px] h-[13px] bg-[var(--accent)] ml-[2px] align-middle"
                />
              )}
            </div>
          ))}
        </div>

        {/* Subtle neon edge glow */}
        <div className="absolute inset-0 rounded-xl pointer-events-none ring-1 ring-[var(--accent)]/10" />
      </motion.div>
    </motion.div>
  );
}

// ─── Scroll Indicator ─────────────────────────────────────────────────────────

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-[10px] font-mono tracking-[0.2em] text-[var(--text-muted)] uppercase">
        scroll
      </span>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-[1px] h-8 bg-gradient-to-b from-[var(--accent)] to-transparent"
      />
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const roleTitles = [
  "Full-Stack Developer",
  "Enterprise App Builder",
  "Sustainability Tech Engineer",
  "AI-Assisted Developer",
];
export default function Hero() {
  const handleScroll = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient glow blobs */}
      <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-[var(--accent)]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 rounded-full bg-[var(--accent-secondary)]/5 blur-[100px] pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* ── Left column ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center md:items-start md:text-left min-w-0 overflow-hidden"
          >
            {/* Availability pill */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--accent)] text-[var(--accent)] text-[11px] font-mono tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                {personalInfo.title}
              </span>
            </motion.div>

            {/* Name — letter stagger */}
            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(2rem,4.5vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-[var(--text-primary)] mb-5"
              style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
            >
              <AnimatedName name={personalInfo.name} />
            </motion.h1>

            {/* Typewriter roles */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 h-8 mb-6"
            >
              <span className="text-[var(--text-muted)] font-mono text-sm">~$</span>
              <Typewriter
                texts={roleTitles}
                speed={55}
                pauseDuration={2200}
                className="text-[var(--accent)] font-mono text-sm sm:text-base tracking-wide"
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="text-[var(--text-muted)] font-mono text-sm leading-relaxed max-w-md mb-8"
            >
              Building scalable enterprise apps — from data center sustainability
              to workplace safety platforms.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-4 justify-center md:justify-start mb-8"
            >
              <motion.button
                onClick={() => handleScroll("#projects")}
                whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(0,255,136,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3 rounded-md bg-[var(--accent)] text-[#0a0a0a] text-xs font-mono font-bold tracking-widest uppercase transition-shadow duration-300"
              >
                View Projects
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download="Aditi_Verma_Resume.pdf"
                whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(0,255,136,0.2)" }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3 rounded-md border border-[var(--accent)] text-[var(--accent)] text-xs font-mono tracking-widest uppercase transition-all duration-300 hover:bg-[var(--accent)]/10"
              >
                Download Resume
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4"
            >
              <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-widest uppercase">
                find me
              </span>
              <div className="w-8 h-px bg-[var(--border)]" />

              {personalInfo.socials.github && (
                <motion.a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.18 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </motion.a>
              )}

              {personalInfo.socials.linkedin && (
                <motion.a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.18 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </motion.a>
              )}
            </motion.div>
          </motion.div>

          {/* ── Right column — code block, tablet and up ── */}
          <div className="hidden md:block">
            <CodeBlock />
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
