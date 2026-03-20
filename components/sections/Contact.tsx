"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import SectionWrapper from "@/components/ui/SectionWrapper";

// ─── Config — fill these in .env.local ───────────────────────────────────────
const EJS_SERVICE  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "";
const EJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EJS_PUBLIC   = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "";

// ─── Types ────────────────────────────────────────────────────────────────────

type ToastKind = "success" | "error";

interface Toast {
  id: number;
  kind: ToastKind;
  message: string;
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function ToastContainer({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed bottom-24 right-6 z-[200] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl font-mono text-xs max-w-xs ${
              t.kind === "success"
                ? "border-[var(--accent)]/50 bg-[var(--card)] text-[var(--accent)]"
                : "border-red-500/50 bg-[var(--card)] text-red-400"
            }`}
          >
            <span className="text-base">{t.kind === "success" ? "✓" : "✕"}</span>
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Form field components ────────────────────────────────────────────────────

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase mb-1.5">
      {children}
    </label>
  );
}

const inputBase =
  "w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] font-mono text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)]/60 focus:ring-1 focus:ring-[var(--accent)]/30 transition-all duration-200";

// ─── Social Card ──────────────────────────────────────────────────────────────

function SocialCard({
  href,
  icon,
  label,
  username,
  accentColor,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  username: string;
  accentColor: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} profile`}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] group transition-all duration-300"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}55`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${accentColor}15`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300"
        style={{ background: `${accentColor}15`, color: accentColor }}
      >
        {icon}
      </div>
      <div>
        <p className="font-display text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--text-primary)] transition-colors">
          {label}
        </p>
        <p className="font-mono text-xs text-[var(--text-muted)]">{username}</p>
      </div>
      <span className="ml-auto font-mono text-xs transition-transform duration-200 group-hover:translate-x-1" style={{ color: accentColor }}>
        ↗
      </span>
    </motion.a>
  );
}

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

// ─── Contact ──────────────────────────────────────────────────────────────────

const SUBJECTS = [
  "Job Opportunity",
  "Project Collaboration",
  "General Inquiry",
];

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [fields, setFields] = useState({ name: "", email: "", subject: SUBJECTS[0], message: "" });
  const [errors, setErrors] = useState<Partial<typeof fields>>({});
  const [sending, setSending] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (kind: ToastKind, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, kind, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  };

  const validate = () => {
    const errs: Partial<typeof fields> = {};
    if (!fields.name.trim()) errs.name = "Name is required";
    if (!fields.email.trim()) errs.email = "Email is required";
    else if (!validateEmail(fields.email)) errs.email = "Enter a valid email";
    if (!fields.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!EJS_SERVICE || !EJS_TEMPLATE || !EJS_PUBLIC) {
      addToast("error", "EmailJS is not configured. Add env vars to .env.local.");
      return;
    }

    setSending(true);
    try {
      await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          from_name: fields.name,
          from_email: fields.email,
          subject: fields.subject,
          message: fields.message,
          to_email: "aditiverma9560@gmail.com",
        },
        { publicKey: EJS_PUBLIC }
      );
      addToast("success", "Message sent! I'll get back to you soon ✓");
      setFields({ name: "", email: "", subject: SUBJECTS[0], message: "" });
    } catch {
      addToast("error", "Failed to send. Please email me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <SectionWrapper id="contact">
        {/* Header */}
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-xs tracking-[0.25em] text-[var(--accent)] uppercase mb-4"
          >
            // get in touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)]"
          >
            Let&apos;s Work Together
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">

          {/* ── Left: Form ── */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            noValidate
            className="space-y-5"
            aria-label="Contact form"
          >
            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={fields.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`${inputBase} ${errors.name ? "border-red-500/70 focus:border-red-500/70 focus:ring-red-500/20" : ""}`}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 font-mono text-[10px] text-red-400">{errors.name}</p>
                )}
              </div>
              <div>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={fields.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`${inputBase} ${errors.email ? "border-red-500/70 focus:border-red-500/70 focus:ring-red-500/20" : ""}`}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 font-mono text-[10px] text-red-400">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div>
              <FieldLabel htmlFor="subject">Subject</FieldLabel>
              <select
                id="subject"
                name="subject"
                value={fields.subject}
                onChange={handleChange}
                aria-required="true"
                className={`${inputBase} appearance-none`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888888' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                }}
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s} style={{ background: "var(--surface)", color: "var(--text-primary)" }}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <textarea
                id="message"
                name="message"
                value={fields.message}
                onChange={handleChange}
                rows={6}
                placeholder="Tell me about your project or opportunity..."
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`${inputBase} resize-none ${errors.message ? "border-red-500/70 focus:border-red-500/70 focus:ring-red-500/20" : ""}`}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 font-mono text-[10px] text-red-400">{errors.message}</p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={sending}
              whileHover={!sending ? { scale: 1.02, boxShadow: "0 0 32px rgba(0,255,136,0.45)" } : {}}
              whileTap={!sending ? { scale: 0.97 } : {}}
              className="w-full py-3.5 rounded-lg bg-[var(--accent)] text-[#0a0a0a] font-mono font-bold text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {sending ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-[#0a0a0a]/30 border-t-[#0a0a0a] rounded-full block"
                  />
                  Sending...
                </>
              ) : (
                "Send Message →"
              )}
            </motion.button>
          </motion.form>

          {/* ── Right: Info ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Info card */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-5">
              {/* Availability */}
              <div className="flex items-center gap-3 pb-4 border-b border-[var(--border)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse shrink-0" />
                <div>
                  <p className="font-display text-sm font-bold text-[var(--accent)]">Open to Opportunities</p>
                  <p className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider mt-0.5">
                    Usually responds within 24 hours
                  </p>
                </div>
              </div>

              {/* Contact details */}
              {[
                { icon: "✉", label: "Email", value: "aditiverma9560@gmail.com", href: "mailto:aditiverma9560@gmail.com" },
                { icon: "📍", label: "Location", value: "Bangalore, India", href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="text-base mt-0.5 shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-[var(--text-muted)] uppercase mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-mono text-sm text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-200">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-mono text-sm text-[var(--text-primary)]">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social cards */}
            <div className="space-y-3">
              <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--text-muted)] uppercase">Connect</p>
              <SocialCard
                href="https://github.com/Aditi9560"
                icon={<GitHubIcon />}
                label="GitHub"
                username="Aditi9560"
                accentColor="#00ff88"
              />
              <SocialCard
                href="https://www.linkedin.com/in/aditi-verma-95214024a/"
                icon={<LinkedInIcon />}
                label="LinkedIn"
                username="aditiverma"
                accentColor="#00d4ff"
              />
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      <ToastContainer toasts={toasts} />
    </>
  );
}
