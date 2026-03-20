"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/lib/data";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="w-6 h-5 flex flex-col justify-between cursor-pointer" aria-label="Toggle menu">
      <motion.span
        animate={open ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className="block h-0.5 w-full bg-[var(--text-primary)] origin-left"
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block h-0.5 w-full bg-[var(--text-primary)]"
      />
      <motion.span
        animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className="block h-0.5 w-full bg-[var(--text-primary)] origin-left"
      />
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center justify-center w-10 h-10 rounded-md border-2 border-[var(--accent)] text-[var(--accent)] font-display font-bold text-sm tracking-widest hover:bg-[var(--accent)] hover:text-[var(--background)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,136,0.4)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {personalInfo.initials}
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-xs font-mono tracking-widest text-[var(--text-muted)] uppercase hover:text-[var(--accent)] transition-colors duration-300 relative group"
                  whileHover={{ y: -1 }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
            </div>

            {/* Right: Theme toggle + Hamburger */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-md text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--card)] transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                {mounted ? (
                  theme === "dark" ? <SunIcon /> : <MoonIcon />
                ) : (
                  <div className="w-[18px] h-[18px]" />
                )}
              </motion.button>

              {/* Hamburger (mobile only) */}
              <button
                className="md:hidden p-1"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Open navigation"
              >
                <HamburgerIcon open={mobileOpen} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[var(--surface)] border-l border-[var(--border)] md:hidden flex flex-col pt-20 px-8 gap-2"
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  className="text-left py-4 text-sm font-mono tracking-widest text-[var(--text-muted)] uppercase hover:text-[var(--accent)] border-b border-[var(--border)] transition-colors duration-300"
                >
                  <span className="text-[var(--accent)] mr-2">0{i + 1}.</span>
                  {link.label}
                </motion.button>
              ))}

              {/* Contact CTA */}
              <motion.button
                onClick={() => handleNavClick("#contact")}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mt-8 px-6 py-3 border border-[var(--accent)] text-[var(--accent)] rounded-md text-xs font-mono tracking-widest uppercase hover:bg-[var(--accent)] hover:text-[var(--background)] transition-all duration-300"
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
