interface BadgeProps {
  label: string;
  variant?: "default" | "accent" | "muted";
}

export default function Badge({ label, variant = "default" }: BadgeProps) {
  const variantStyles: Record<string, string> = {
    default:
      "border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_8px_rgba(0,255,136,0.3)]",
    accent:
      "border border-[var(--accent)] text-[var(--accent)] shadow-[0_0_8px_rgba(0,255,136,0.2)]",
    muted:
      "bg-[var(--card)] text-[var(--text-muted)] border border-[var(--border)]",
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-default ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}
