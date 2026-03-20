"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SectionWrapper from "@/components/ui/SectionWrapper";

// ─── Constants ────────────────────────────────────────────────────────────────

const USERNAME = "Aditi9560";
const GH_BASE = "https://api.github.com";
const LANG_COLORS = ["#00ff88", "#00d4ff", "#a855f7", "#f59e0b", "#f43f5e"];

// ─── Types ────────────────────────────────────────────────────────────────────

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  name: string | null;
  avatar_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
  html_url: string;
  description: string | null;
  fork: boolean;
}

interface GitHubData {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  loading: boolean;
  error: boolean;
}

interface LangEntry {
  name: string;
  value: number;
  pct: string;
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function seededRand(seed: string, index: number): number {
  let h = index * 2654435761;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 2246822519);
    h ^= h >>> 13;
  }
  return (Math.abs(h) % 1000) / 1000;
}

function heatColor(v: number): string {
  if (v === 0) return "#1a1a1a";
  if (v < 0.2) return "#002211";
  if (v < 0.45) return "#004422";
  if (v < 0.7) return "#007733";
  if (v < 0.9) return "#00bb55";
  return "#00ff88";
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

// ─── Data Hook ────────────────────────────────────────────────────────────────

function useGitHubData(): GitHubData {
  const [data, setData] = useState<GitHubData>({
    user: null,
    repos: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetch_() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`${GH_BASE}/users/${USERNAME}`),
          fetch(`${GH_BASE}/users/${USERNAME}/repos?sort=stars&per_page=100`),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("API error");

        const [user, repos] = await Promise.all([
          userRes.json() as Promise<GitHubUser>,
          reposRes.json() as Promise<GitHubRepo[]>,
        ]);

        if (!cancelled) setData({ user, repos, loading: false, error: false });
      } catch {
        if (!cancelled) setData({ user: null, repos: [], loading: false, error: true });
      }
    }

    fetch_();
    return () => { cancelled = true; };
  }, []);

  return data;
}

// ─── Count-up Hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger || target === 0) return;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    const id = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [trigger, target, duration]);
  return count;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`rounded-md bg-[var(--card)] relative overflow-hidden ${className}`}
    >
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
      />
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-9 w-20" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  suffix = "",
  trigger,
  index,
}: {
  icon: string;
  label: string;
  value: number;
  suffix?: string;
  trigger: boolean;
  index: number;
}) {
  const count = useCountUp(value, 1400, trigger);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 hover:border-[var(--accent)]/40 transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,255,136,0.07)]"
    >
      <div className="absolute top-0 left-0 w-10 h-10 overflow-hidden rounded-tl-xl pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-[var(--accent)]/30 rounded-tl-xl group-hover:border-[var(--accent)]/70 transition-colors duration-300" />
      </div>

      <p className="font-mono text-lg mb-2">{icon}</p>
      <p className="font-display text-4xl font-extrabold text-[var(--text-primary)] leading-none mb-2">
        {count}
        <span className="text-[var(--accent)] text-3xl">{suffix}</span>
      </p>
      <p className="font-mono text-[11px] tracking-widest text-[var(--text-muted)] uppercase">
        {label}
      </p>
    </motion.div>
  );
}

// ─── Repos Table ─────────────────────────────────────────────────────────────

function ReposTable({ repos }: { repos: GitHubRepo[] }) {
  const top5 = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
        {["Repository", "Language", "★ Stars", "Updated"].map((h) => (
          <span key={h} className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
            {h}
          </span>
        ))}
      </div>

      {top5.map((repo, i) => (
        <motion.a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-5 py-4 border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface)] transition-colors duration-200 group"
        >
          <span className="font-mono text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 truncate">
            {repo.name}
          </span>
          <span className="font-mono text-xs text-[var(--text-muted)]">
            {repo.language ?? "—"}
          </span>
          <span className="font-mono text-xs text-[var(--text-muted)] tabular-nums text-right">
            {repo.stargazers_count}
          </span>
          <span className="font-mono text-xs text-[var(--text-muted)] text-right whitespace-nowrap">
            {relativeTime(repo.pushed_at)}
          </span>
        </motion.a>
      ))}
    </div>
  );
}

// ─── Language Donut ───────────────────────────────────────────────────────────

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: LangEntry }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 font-mono text-xs shadow-xl">
      <p className="text-[var(--text-primary)] font-semibold">{d.name}</p>
      <p className="text-[var(--text-muted)]">{d.pct}% of repos</p>
    </div>
  );
}

function LanguageDonut({ repos }: { repos: GitHubRepo[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const langMap: Record<string, number> = {};
  repos.forEach((r) => {
    if (r.language && !r.fork) {
      langMap[r.language] = (langMap[r.language] ?? 0) + 1;
    }
  });

  const total = Object.values(langMap).reduce((a, b) => a + b, 0);
  const langData: LangEntry[] = Object.entries(langMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, value]) => ({
      name,
      value,
      pct: total > 0 ? ((value / total) * 100).toFixed(0) : "0",
    }));

  if (langData.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 font-mono text-xs text-[var(--text-muted)]">
        No language data available
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
      <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--accent)] uppercase mb-6">
        Language Breakdown
      </p>

      {mounted ? (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={langData}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {langData.map((_, i) => (
                <Cell
                  key={i}
                  fill={LANG_COLORS[i % LANG_COLORS.length]}
                  opacity={0.9}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[220px] flex items-center justify-center">
          <Skeleton className="w-40 h-40 rounded-full" />
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-2 justify-center">
        {langData.map((d, i) => (
          <div key={d.name} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: LANG_COLORS[i % LANG_COLORS.length] }}
            />
            <span className="font-mono text-[11px] text-[var(--text-muted)]">
              {d.name}
              <span className="text-[var(--text-primary)] ml-1">{d.pct}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Activity Heatmap ─────────────────────────────────────────────────────────

function ActivityHeatmap({ repos }: { repos: GitHubRepo[] }) {
  const WEEKS = 52;
  const DAYS = 7;
  const now = Date.now();

  // Build a Set of "week indices" that have repo pushes
  const activeWeeks = new Set<number>();
  repos.forEach((r) => {
    const diff = now - new Date(r.pushed_at).getTime();
    const weekIdx = Math.floor(diff / (7 * 86400000));
    if (weekIdx >= 0 && weekIdx < WEEKS) activeWeeks.add(WEEKS - 1 - weekIdx);
  });

  // Generate 364 cell values
  const cells: number[] = Array.from({ length: WEEKS * DAYS }, (_, idx) => {
    const weekIdx = Math.floor(idx / DAYS);
    const base = activeWeeks.has(weekIdx) ? 0.65 : 0;
    const rand = seededRand(USERNAME, idx) * 0.35;
    // Low random noise everywhere, spike on active weeks
    const noise = seededRand(USERNAME + "n", idx) * 0.15;
    return Math.min(1, base + rand + noise);
  });

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const nowDate = new Date();
  const monthLabels: { label: string; col: number }[] = [];
  for (let w = 0; w < WEEKS; w++) {
    const d = new Date(now - (WEEKS - 1 - w) * 7 * 86400000);
    if (d.getDate() <= 7) {
      monthLabels.push({ label: months[d.getMonth()], col: w });
    }
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 overflow-x-auto">
      <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--accent)] uppercase mb-5">
        Activity Pulse — Last 52 Weeks
      </p>

      <div className="relative" style={{ minWidth: 680 }}>
        {/* Month labels */}
        <div className="flex mb-1.5" style={{ paddingLeft: 28 }}>
          {Array.from({ length: WEEKS }, (_, w) => {
            const label = monthLabels.find((m) => m.col === w);
            return (
              <div key={w} style={{ width: 13, flexShrink: 0 }}>
                {label && (
                  <span className="font-mono text-[9px] text-[var(--text-muted)] whitespace-nowrap">
                    {label.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex gap-0">
          {/* Day labels */}
          <div className="flex flex-col gap-[2px] mr-1.5 justify-around" style={{ width: 24 }}>
            {["Mon", "", "Wed", "", "Fri", "", ""].map((d, i) => (
              <div key={i} style={{ height: 11 }} className="flex items-center">
                <span className="font-mono text-[8px] text-[var(--text-muted)]">{d}</span>
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-[2px]">
            {Array.from({ length: WEEKS }, (_, w) => (
              <div key={w} className="flex flex-col gap-[2px]">
                {Array.from({ length: DAYS }, (_, d) => {
                  const v = cells[w * DAYS + d];
                  return (
                    <div
                      key={d}
                      title={`Activity: ${Math.round(v * 100)}%`}
                      className="w-[11px] h-[11px] rounded-sm transition-opacity duration-200 hover:opacity-80 cursor-default"
                      style={{ background: heatColor(v) }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Color legend */}
        <div className="flex items-center gap-1.5 mt-3 justify-end">
          <span className="font-mono text-[9px] text-[var(--text-muted)]">Less</span>
          {[0, 0.2, 0.45, 0.7, 0.95].map((v, i) => (
            <div
              key={i}
              className="w-[11px] h-[11px] rounded-sm"
              style={{ background: heatColor(v) }}
            />
          ))}
          <span className="font-mono text-[9px] text-[var(--text-muted)]">More</span>
        </div>
      </div>
    </div>
  );
}

// ─── Error Fallback ───────────────────────────────────────────────────────────

function ErrorFallback() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {["Public Repos", "Total Stars", "Followers", "Languages"].map((label) => (
          <div
            key={label}
            className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6"
          >
            <p className="font-display text-3xl font-extrabold text-[var(--text-muted)] mb-2">
              --
            </p>
            <p className="font-mono text-[11px] tracking-widest text-[var(--text-muted)] uppercase">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--border)] border-dashed bg-[var(--card)] p-8 text-center space-y-4">
        <p className="font-mono text-sm text-[var(--text-muted)]">
          GitHub API unavailable — rate limit or network error.
        </p>
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--accent)] text-[var(--accent)] font-mono text-xs tracking-widest uppercase hover:bg-[var(--accent)]/10 transition-all duration-200"
        >
          View on GitHub →
        </a>
      </div>
    </div>
  );
}

// ─── GitHubStats ──────────────────────────────────────────────────────────────

export default function GitHubStats() {
  const { user, repos, loading, error } = useGitHubData();
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true, margin: "-60px 0px" });

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const uniqueLangs = new Set(repos.map((r) => r.language).filter(Boolean)).size;

  const stats = [
    { icon: "◈", label: "Public Repos", value: user?.public_repos ?? 0, suffix: "" },
    { icon: "★", label: "Total Stars", value: totalStars, suffix: "" },
    { icon: "◉", label: "Followers", value: user?.followers ?? 0, suffix: "" },
    { icon: "◇", label: "Languages Used", value: uniqueLangs, suffix: "" },
  ];

  return (
    <SectionWrapper id="github">
      {/* Header */}
      <div className="mb-12">
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs tracking-[0.25em] text-[var(--accent)] uppercase mb-4"
        >
          // github activity
        </motion.p>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)]"
          >
            By The Numbers
          </motion.h2>
          <motion.a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-mono text-xs tracking-widest text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200 flex items-center gap-1.5"
          >
            @{USERNAME} ↗
          </motion.a>
        </div>
      </div>

      {error ? (
        <ErrorFallback />
      ) : (
        <div className="space-y-6">
          {/* ── Stat cards ── */}
          <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
              : stats.map((s, i) => (
                  <StatCard key={s.label} {...s} trigger={inView} index={i} />
                ))}
          </div>

          {/* ── Repos table + Language chart ── */}
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
              <Skeleton className="h-64 rounded-xl" />
              <Skeleton className="h-64 rounded-xl" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5"
            >
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--accent)] uppercase mb-3">
                  Top Repositories
                </p>
                <ReposTable repos={repos} />
              </div>
              <LanguageDonut repos={repos} />
            </motion.div>
          )}

          {/* ── Activity heatmap ── */}
          {loading ? (
            <Skeleton className="h-40 rounded-xl" />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <ActivityHeatmap repos={repos} />
            </motion.div>
          )}
        </div>
      )}
    </SectionWrapper>
  );
}
