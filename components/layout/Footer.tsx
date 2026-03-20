"use client";

import { motion } from "framer-motion";

function BackToTopIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-[var(--border)] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left */}
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
              © {year}{" "}
              <span className="text-[var(--accent)]">Aditi Verma</span>
              {" "}— Designed &amp; built from scratch
            </p>
            <p className="font-mono text-xs text-[var(--text-muted)]">
              Made with{" "}
              <span className="text-[var(--text-primary)]">React</span>
              {", "}
              <span className="text-[var(--text-primary)]">Next.js</span>
            
            </p>
          </div>

          {/* Right — back to top */}
          <div className="flex items-center gap-4">
            {/* Easter egg hint */}
            <span className="font-mono text-[10px] text-[var(--text-muted)]/30 tracking-widest hidden sm:block select-none">
              {/* try: sudo aditi */}
            </span>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.08, boxShadow: "0 0 16px rgba(0,255,136,0.3)" }}
              whileTap={{ scale: 0.93 }}
              aria-label="Back to top"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 font-mono text-xs tracking-widest uppercase transition-all duration-300"
            >
              <BackToTopIcon />
              Top
            </motion.button>
          </div>
        </div>

        {/* Easter egg hint — visible but subtle */}
        <p className="mt-4 text-center font-mono text-[10px] tracking-[0.3em] text-[var(--border)] select-none">
          {`// try: sudo aditi`}
        </p>
      </div>
    </footer>
  );
}
