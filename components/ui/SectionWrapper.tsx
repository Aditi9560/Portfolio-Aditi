"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  /** Delay the animation by N seconds (default 0) */
  delay?: number;
}

export default function SectionWrapper({
  children,
  id,
  className = "",
  delay = 0,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section
      ref={ref}
      id={id}
      className={`relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{
          duration: 0.65,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}
