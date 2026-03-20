"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACTIVATE_CMD   = "sudo aditi";
const DEACTIVATE_CMD = "exit";

const BOOT_LINES = [
  "$ initializing aditi.exe ...",
  "$ loading profile data ............ [OK]",
  "$ mounting enterprise experience ... [OK]",
  "$ linking React + Node.js modules .. [OK]",
  "$ injecting neon green theme ....... [OK]",
  "$ starting AI assistant ............ [OK]",
  "",
  "  Welcome to Aditi's Terminal Portfolio v2.0",
  "  Type 'exit' to return to normal mode.",
  "",
  "$ █",
];

export default function TerminalMode() {
  const [active, setActive]       = useState(false);
  const [booting, setBooting]     = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const bufferRef = useRef("");
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Apply / remove .terminal class on <html>
  useEffect(() => {
    const html = document.documentElement;
    if (active) {
      html.classList.add("terminal");
    } else {
      html.classList.remove("terminal");
    }
    return () => html.classList.remove("terminal");
  }, [active]);

  const runBootSequence = useCallback(() => {
    setBooting(true);
    setBootLines([]);
    let i = 0;
    const next = () => {
      if (i < BOOT_LINES.length) {
        setBootLines((prev) => [...prev, BOOT_LINES[i]]);
        i++;
        timerRef.current = setTimeout(next, i < 7 ? 280 : 120);
      } else {
        setBooting(false);
      }
    };
    timerRef.current = setTimeout(next, 100);
  }, []);

  const activate = useCallback(() => {
    setActive(true);
    runBootSequence();
  }, [runBootSequence]);

  const deactivate = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActive(false);
    setBooting(false);
    setBootLines([]);
  }, []);

  // Global keydown listener — builds a rolling buffer
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ignore when user is typing in a real input
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "Escape") {
        if (active) { deactivate(); }
        bufferRef.current = "";
        return;
      }

      if (e.key.length === 1) {
        bufferRef.current = (bufferRef.current + e.key).slice(-ACTIVATE_CMD.length);
        if (!active && bufferRef.current === ACTIVATE_CMD) {
          bufferRef.current = "";
          activate();
        }
      }

      if (active && e.key === "Enter") {
        // check if user typed "exit" — detect via a simpler approach:
        // we track the deactivate command separately
      }
    };

    const exitHandler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (!active) return;

      if (e.key.length === 1) {
        const exitBuf = ((exitBufRef.current ?? "") + e.key).slice(-DEACTIVATE_CMD.length);
        exitBufRef.current = exitBuf;
        if (exitBuf === DEACTIVATE_CMD) {
          exitBufRef.current = "";
          deactivate();
        }
      }
    };

    window.addEventListener("keydown", handler);
    window.addEventListener("keydown", exitHandler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("keydown", exitHandler);
    };
  }, [active, activate, deactivate]);

  const exitBufRef = useRef("");

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9998] pointer-events-none"
          aria-hidden="true"
        >
          {/* Boot overlay — shows during boot, then fades */}
          <AnimatePresence>
            {booting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center bg-black/95 pointer-events-auto"
              >
                <div className="max-w-lg w-full mx-4 p-8 font-mono text-sm leading-relaxed">
                  {bootLines.map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[#00ff88]"
                    >
                      {line || "\u00A0"}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Exit hint — shown after boot */}
          {!booting && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-auto"
            >
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-black/80 border border-[#00ff88]/30 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                <span className="font-mono text-xs text-[#00ff88]/70 tracking-widest">
                  terminal mode active — type &quot;exit&quot; to return
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
