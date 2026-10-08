import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PhoneFrame({
  children,
  caption,
  className,
}: {
  children: ReactNode;
  caption?: string;
  className?: string;
}) {
  const now = "9:41";
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative w-[280px] rounded-[36px] bg-on-surface p-[10px] shadow-[var(--shadow-modal)]">
        <div className="relative overflow-hidden rounded-[26px] bg-surface">
          <div className="flex h-8 items-center justify-between px-5 text-[11px] font-medium text-on-surface">
            <span className="tabular-nums">{now}</span>
            <span className="absolute top-1.5 left-1/2 h-4 w-20 -translate-x-1/2 rounded-full bg-on-surface/80" />
            <span className="flex items-center gap-1 text-[10px] tracking-tight">
              <span className="inline-block h-2 w-3 rounded-[1px] ring-1 ring-on-surface/70" />
              <span className="inline-block h-2.5 w-1.5 rounded-[1px] bg-on-surface" />
            </span>
          </div>
          <div className="min-h-[420px]">{children}</div>
          <div className="flex h-5 items-center justify-center">
            <span className="h-1 w-24 rounded-full bg-on-surface/30" />
          </div>
        </div>
      </div>
      {caption ? (
        <p className="text-xs font-medium tracking-[0.08em] text-on-surface-variant uppercase">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
