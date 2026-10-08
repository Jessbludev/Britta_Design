import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MdIcon } from "./icon";

export function BrittaBadge({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-w-4 items-center justify-center rounded-full bg-error px-1 text-[11px] font-medium text-on-error",
        !children && "size-2 min-w-0 px-0",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function BrittaLinearProgress({
  value,
  indeterminate,
}: {
  value?: number;
  indeterminate?: boolean;
}) {
  return (
    <div className="relative h-1 w-full overflow-hidden rounded-full bg-primary/20">
      <div
        className={cn(
          "absolute inset-y-0 left-0 rounded-full bg-primary",
          indeterminate && "animate-[britta-indeterminate_1.4s_ease_infinite]",
        )}
        style={
          indeterminate
            ? { width: "40%" }
            : { width: `${Math.max(0, Math.min(100, value ?? 0))}%` }
        }
      />
    </div>
  );
}

export function BrittaCircularProgress({
  size = 40,
  indeterminate = true,
  value = 0,
}: {
  size?: number;
  indeterminate?: boolean;
  value?: number;
}) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (c * Math.max(0, Math.min(100, value))) / 100;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={indeterminate ? "animate-spin" : ""}
      aria-hidden
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--md-primary)"
        strokeOpacity={0.2}
        strokeWidth={4}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--md-primary)"
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={indeterminate ? c * 0.75 : offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

export function BrittaDivider({ className }: { className?: string }) {
  return <hr className={cn("border-0 border-t border-outline-variant", className)} />;
}

export function BrittaBanner({
  icon = "info",
  title,
  body,
  action,
  tone = "info",
  className,
}: {
  icon?: string;
  title: string;
  body?: string;
  action?: { label: string; onClick: () => void };
  tone?: "info" | "error";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl p-4",
        tone === "error"
          ? "bg-error-container text-on-error-container"
          : "bg-secondary-container text-on-secondary-container",
        className,
      )}
      role="status"
    >
      <MdIcon name={icon} size={22} className="mt-0.5 shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium">{title}</div>
        {body ? <p className="mt-0.5 text-sm opacity-80">{body}</p> : null}
      </div>
      {action ? (
        <button
          type="button"
          onClick={action.onClick}
          className="self-center text-sm font-medium underline-offset-2 hover:underline"
        >
          {action.label}
        </button>
      ) : null}
    </div>
  );
}

