"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  streaming?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GREETING: Message = {
  id: "greeting",
  role: "assistant",
  content:
    "Hi! 👋 I'm an AI assistant trained on Aditi's portfolio. Ask me about her experience, projects, tech stack, or whether she's open to new opportunities.",
  timestamp: new Date(),
};

const SUGGESTED = [
  "What's your tech stack?",
  "Tell me about Report Zero",
  "Are you open to work?",
  "What projects have you built?",
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5">
      {/* AV avatar */}
      <div className="w-7 h-7 rounded-full border border-[var(--accent)] bg-[var(--surface)] flex items-center justify-center shrink-0 mb-0.5">
        <span className="font-display text-[9px] font-bold text-[var(--accent)]">AV</span>
      </div>
      <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-sm bg-[var(--surface)] border border-[var(--border)]">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] block"
          />
        ))}
      </div>
    </div>
  );
}

// ─── Message Bubble ───────────────────────────────────────────────────────────

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Bot avatar */}
      {!isUser && (
        <div className="w-7 h-7 rounded-full border border-[var(--accent)] bg-[var(--surface)] flex items-center justify-center shrink-0 mb-0.5">
          <span className="font-display text-[9px] font-bold text-[var(--accent)]">AV</span>
        </div>
      )}

      <div className={`flex flex-col gap-1 max-w-[78%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-3.5 py-2.5 rounded-2xl font-mono text-xs leading-relaxed ${
            isUser
              ? "bg-[var(--accent)] text-[#0a0a0a] rounded-br-sm font-medium"
              : "bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] rounded-bl-sm"
          }`}
        >
          {message.content}
          {message.streaming && (
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear", times: [0, 0.49, 0.5, 1] }}
              className="inline-block w-[6px] h-[12px] bg-current ml-[2px] align-middle opacity-70"
            />
          )}
        </div>
        <span className="text-[9px] font-mono text-[var(--text-muted)] px-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Chat Panel ───────────────────────────────────────────────────────────────

function ChatPanel({
  messages,
  isStreaming,
  input,
  onInput,
  onSend,
  onSuggestion,
  messagesEndRef,
  inputRef,
}: {
  messages: Message[];
  isStreaming: boolean;
  input: string;
  onInput: (v: string) => void;
  onSend: () => void;
  onSuggestion: (q: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  const hasUserMessage = messages.some((m) => m.role === "user");

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isStreaming) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="w-[350px] max-w-[calc(100vw-3rem)] rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_24px_64px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col"
      style={{ height: 480 }}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-[var(--border)] bg-[var(--surface)] shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full border-2 border-[var(--accent)] bg-[var(--background)] flex items-center justify-center"
            style={{ boxShadow: "0 0 10px rgba(0,255,136,0.3)" }}
          >
            <span className="font-display text-[10px] font-bold text-[var(--accent)]">AV</span>
          </div>
          <div>
            <p className="font-display text-sm font-bold text-[var(--text-primary)] leading-tight">
              Ask Aditi
            </p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <p className="font-mono text-[10px] text-[var(--text-muted)] tracking-wide">
                AI portfolio assistant
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isStreaming && messages[messages.length - 1]?.role !== "assistant" && (
          <TypingIndicator />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Suggestions (before first user message) ── */}
      <AnimatePresence>
        {!hasUserMessage && !isStreaming && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="px-3 pb-2 shrink-0 overflow-hidden"
          >
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  onClick={() => onSuggestion(q)}
                  className="px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] font-mono text-[10px] text-[var(--text-muted)] hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-all duration-200 text-left leading-snug"
                >
                  {q}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Input ── */}
      <div className="px-3 pb-3 pt-2 border-t border-[var(--border)] shrink-0">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] focus-within:border-[var(--accent)]/50 transition-colors duration-200">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => onInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={isStreaming}
            placeholder={isStreaming ? "Aditi is typing..." : "Ask something..."}
            className="flex-1 bg-transparent font-mono text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none disabled:opacity-50"
          />
          <button
            onClick={onSend}
            disabled={!input.trim() || isStreaming}
            className="w-7 h-7 rounded-lg bg-[var(--accent)] text-[#0a0a0a] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-[0_0_12px_rgba(0,255,136,0.4)] shrink-0"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Floating Button ──────────────────────────────────────────────────────────

function FloatingButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="relative">
      {/* Pulse ring — only when closed */}
      {!isOpen && (
        <>
          <motion.div
            animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-[var(--accent)]"
          />
          <motion.div
            animate={{ scale: [1, 1.35], opacity: [0.25, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
            className="absolute inset-0 rounded-full bg-[var(--accent)]"
          />
        </>
      )}

      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative z-10 flex items-center gap-2.5 pl-4 pr-5 h-12 rounded-full bg-[var(--accent)] text-[#0a0a0a] font-display font-bold text-sm shadow-[0_4px_24px_rgba(0,255,136,0.4)] hover:shadow-[0_4px_32px_rgba(0,255,136,0.6)] transition-shadow duration-300"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CloseIcon />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChatIcon />
            </motion.span>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {!isOpen && (
            <motion.span
              key="label"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden whitespace-nowrap"
            >
              Ask Aditi
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

// ─── AskAditi (root widget) ───────────────────────────────────────────────────

export default function AskAditi() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Close with Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      // Abort any previous stream
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      // Add user message
      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };

      // Build assistant placeholder immediately
      const assistantId = (Date.now() + 1).toString();
      const assistantMsg: Message = {
        id: assistantId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
        streaming: true,
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setInput("");
      setIsStreaming(true);

      try {
        // Build API messages (exclude greeting, exclude the streaming placeholder)
        const apiMessages = [
          ...messages
            .filter((m) => m.id !== "greeting")
            .map((m) => ({ role: m.role, content: m.content })),
          { role: "user" as const, content: trimmed },
        ];

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText || `HTTP ${res.status}`);
        }

        if (!res.body) throw new Error("No response body");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          accumulated += chunk;

          // Update the streaming assistant message in place
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: accumulated, streaming: true }
                : m
            )
          );
        }

        // Finalize — clear streaming flag
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, streaming: false } : m
          )
        );
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;

        const errText =
          err instanceof Error ? err.message : "Something went wrong.";

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: `Sorry, I ran into an error: ${errText}. Please try again.`,
                  streaming: false,
                }
              : m
          )
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [isStreaming, messages]
  );

  const handleSuggestion = useCallback(
    (q: string) => {
      setInput(q);
      send(q);
    },
    [send]
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <ChatPanel
            messages={messages}
            isStreaming={isStreaming}
            input={input}
            onInput={setInput}
            onSend={() => send(input)}
            onSuggestion={handleSuggestion}
            messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement>}
            inputRef={inputRef as React.RefObject<HTMLInputElement>}
          />
        )}
      </AnimatePresence>

      <FloatingButton isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />
    </div>
  );
}
