import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BrittaShaderCanvas } from "./shader-canvas";
import type { ShaderId } from "./shaders";

export function BrittaShaderSurface({
  shader = "tonal-mesh",
  intensity = 0.9,
  className,
  children,
}: {
  shader?: ShaderId;
  intensity?: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl", className)}>
      <BrittaShaderCanvas
        shaderId={shader}
        intensity={intensity}
        className="absolute inset-0"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

type Series = { label: string; value: number; color?: string };

const DEFAULT_SERIES: Series[] = [
  { label: "Web", value: 42 },
  { label: "Android", value: 38 },
  { label: "Tokens", value: 28 },
  { label: "Icons", value: 22 },
];

export function BrittaBarChart({
  data = DEFAULT_SERIES,
  className,
}: {
  data?: Series[];
  className?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const colors = [
    "var(--md-primary)",
    "var(--md-secondary)",
    "var(--md-tertiary)",
    "var(--md-primary-container)",
  ];
  return (
    <div className={cn("flex h-40 items-end gap-3", className)} role="img" aria-label="Bar chart">
      {data.map((d, i) => (
        <div key={d.label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
          <div className="flex h-32 w-full items-end justify-center">
            <div
              className="w-full max-w-10 rounded-t-md"
              style={{
                height: `${(d.value / max) * 100}%`,
                background: d.color ?? colors[i % colors.length],
              }}
            />
          </div>
          <span className="truncate text-[11px] text-on-surface-variant">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export function BrittaSparkline({
  values = [8, 12, 9, 16, 14, 22, 18, 26, 24, 30],
  className,
}: {
  values?: number[];
  className?: string;
}) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(1, max - min);
  const w = 240;
  const h = 64;
  const pts = values.map((v, i) => {
    const x = (i / Math.max(1, values.length - 1)) * w;
    const y = h - 6 - ((v - min) / span) * (h - 12);
    return `${x},${y}`;
  });
  const last = values[values.length - 1] ?? 0;
  const first = values[0] ?? 0;
  const up = last >= first;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn("h-16 w-full", className)}
      role="img"
      aria-label="Sparkline"
    >
      <polyline
        fill="none"
        stroke={up ? "var(--md-primary)" : "var(--md-error)"}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={pts.join(" ")}
      />
      <circle
        cx={w}
        cy={h - 6 - ((last - min) / span) * (h - 12)}
        r="3.5"
        fill={up ? "var(--md-primary)" : "var(--md-error)"}
      />
    </svg>
  );
}

export function BrittaDonut({
  value = 64,
  size = 120,
  label = "Complete",
  className,
}: {
  value?: number;
  size?: number;
  label?: string;
  className?: string;
}) {
  const r = (size - 16) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("relative inline-flex", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--md-surface-container-highest)"
          strokeWidth={12}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--md-primary)"
          strokeWidth={12}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * pct) / 100}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-xl font-semibold tabular-nums">{pct}%</span>
        <span className="text-[10px] tracking-[0.08em] text-on-surface-variant uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}

export function BrittaAreaChart({
  values = [12, 18, 14, 22, 30, 26, 34, 40, 36, 44],
  className,
}: {
  values?: number[];
  className?: string;
}) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(1, max - min);
  const w = 320;
  const h = 120;
  const coords = values.map((v, i) => {
    const x = (i / Math.max(1, values.length - 1)) * w;
    const y = h - 8 - ((v - min) / span) * (h - 16);
    return [x, y] as const;
  });
  const line = coords.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `0,${h} ${line} ${w},${h}`;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn("h-28 w-full", className)}
      role="img"
      aria-label="Area chart"
    >
      <defs>
        <linearGradient id="britta-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--md-primary)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--md-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon fill="url(#britta-area)" points={area} />
      <polyline
        fill="none"
        stroke="var(--md-primary)"
        strokeWidth="2.25"
        strokeLinejoin="round"
        points={line}
      />
    </svg>
  );
}

export function BrittaAvatar({
  name,
  src,
  size = "md",
  className,
}: {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dim = size === "sm" ? "size-8 text-xs" : size === "lg" ? "size-14 text-lg" : "size-11 text-sm";
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
  const style: CSSProperties | undefined = src
    ? { backgroundImage: `url(${src})`, backgroundSize: "cover" }
    : undefined;
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-primary-container font-medium text-on-primary-container",
        dim,
        className,
      )}
      style={style}
      aria-label={name}
    >
      {src ? null : initials}
    </span>
  );
}
