import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MdIcon } from "./icon";

export function BrittaTopAppBar({
  title,
  leading,
  actions,
  prominent,
  className,
}: {
  title: string;
  leading?: ReactNode;
  actions?: ReactNode;
  prominent?: boolean;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex items-end gap-1 bg-surface px-1 text-on-surface",
        prominent ? "h-28 pb-4" : "h-16",
        className,
      )}
    >
      <div className="flex h-16 w-full items-center gap-1">
        {leading}
        <h1
          className={cn(
            "min-w-0 flex-1 truncate px-2 font-medium",
            prominent ? "font-display text-[22px]" : "text-[22px]",
          )}
        >
          {title}
        </h1>
        <div className="flex items-center">{actions}</div>
      </div>
    </header>
  );
}

export function BrittaNavBar({
  items,
  value,
  onChange,
}: {
  items: { id: string; label: string; icon: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <nav className="flex h-20 items-start justify-around bg-surface-container px-2 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]">
      {items.map((item) => {
        const selected = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className="flex min-w-[64px] flex-col items-center gap-1 text-[12px] font-medium"
          >
            <span
              className={cn(
                "flex h-8 w-16 items-center justify-center rounded-full transition-colors duration-150",
                selected
                  ? "bg-secondary-container text-on-secondary-container"
                  : "text-on-surface-variant",
              )}
            >
              <MdIcon name={item.icon} size={24} filled={selected} />
            </span>
            <span
              className={selected ? "text-on-surface" : "text-on-surface-variant"}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export function BrittaNavRail({
  items,
  value,
  onChange,
  fab,
}: {
  items: { id: string; label: string; icon: string }[];
  value: string;
  onChange: (id: string) => void;
  fab?: ReactNode;
}) {
  return (
    <nav className="flex w-20 flex-col items-center gap-3 bg-surface py-6">
      {fab}
      <div className="mt-2 flex flex-col gap-1">
        {items.map((item) => {
          const selected = item.id === value;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className="flex w-20 flex-col items-center gap-1 py-1.5 text-[12px] font-medium"
            >
              <span
                className={cn(
                  "flex h-8 w-14 items-center justify-center rounded-full transition-colors duration-150",
                  selected
                    ? "bg-secondary-container text-on-secondary-container"
                    : "text-on-surface-variant hover:bg-on-surface/10",
                )}
              >
                <MdIcon name={item.icon} size={24} filled={selected} />
              </span>
              <span className={selected ? "text-on-surface" : "text-on-surface-variant"}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function BrittaTabs({
  items,
  value,
  onChange,
}: {
  items: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div
      role="tablist"
      className="flex border-b border-outline-variant"
    >
      {items.map((item) => {
        const selected = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(item.id)}
            className={cn(
              "relative min-h-12 flex-1 px-3 text-sm font-medium transition-colors",
              selected ? "text-on-surface" : "text-on-surface-variant hover:text-on-surface",
            )}
          >
            {item.label}
            <span
              className={cn(
                "absolute inset-x-4 bottom-0 h-[3px] rounded-t-full transition-colors",
                selected ? "bg-primary" : "bg-transparent",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
