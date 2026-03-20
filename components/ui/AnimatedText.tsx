"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ─── Typewriter ───────────────────────────────────────────────────────────────

interface TypewriterProps {
  texts: string[];
  /** ms between character prints (default 60) */
  speed?: number;
  /** ms to pause before erasing (default 2000) */
  pauseDuration?: number;
  className?: string;
}

export function Typewriter({
  texts,
  speed = 60,
  pauseDuration = 2000,
  className = "",
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    if (!isDeleting && charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting && charIndex === currentText.length) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, speed / 2);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((i) => (i + 1) % texts.length);
    }
  }, [charIndex, isDeleting, textIndex, texts, speed, pauseDuration]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-blink text-[var(--accent)]">|</span>
    </span>
  );
}

// ─── Fade-in Word Split ───────────────────────────────────────────────────────

interface FadeInTextProps {
  text: string;
  className?: string;
  /** Stagger delay between words in seconds (default 0.04) */
  stagger?: number;
  /** Initial delay before animation starts (default 0) */
  delay?: number;
}

export function FadeInText({
  text,
  className = "",
  stagger = 0.04,
  delay = 0,
}: FadeInTextProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className={`inline ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
