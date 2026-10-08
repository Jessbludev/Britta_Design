import { useId, type CSSProperties, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MdIcon } from "./icon";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  supporting?: string;
  error?: string;
  leading?: string;
  trailing?: string;
  variant?: "outlined" | "filled";
};

export function BrittaTextField({
  label,
  supporting,
  error,
  leading,
  trailing,
  variant = "outlined",
  className,
  id,
  ...props
}: FieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const describedBy = error
    ? `${fieldId}-err`
    : supporting
      ? `${fieldId}-help`
      : undefined;

  return (
    <label className={cn("flex w-full flex-col gap-1", className)}>
      <span className="px-1 text-xs font-medium text-on-surface-variant">
        {label}
      </span>
      <span
        className={cn(
          "relative flex min-h-14 items-center gap-2 px-4 transition-shadow duration-150",
          variant === "outlined"
            ? "rounded-md ring-1 ring-inset ring-outline-variant focus-within:ring-2 focus-within:ring-primary"
            : "rounded-t-md bg-surface-container-highest ring-0 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-outline focus-within:after:h-0.5 focus-within:after:bg-primary",
          error &&
            (variant === "outlined"
              ? "ring-error focus-within:ring-error"
              : "after:bg-error focus-within:after:bg-error"),
        )}
      >
        {leading ? (
          <MdIcon name={leading} size={20} className="text-on-surface-variant" />
        ) : null}
        <input
          id={fieldId}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className="h-14 w-full bg-transparent text-[16px] text-on-surface outline-none placeholder:text-on-surface-variant/70"
          {...props}
        />
        {trailing ? (
          <MdIcon name={trailing} size={20} className="text-on-surface-variant" />
        ) : null}
      </span>
      {error ? (
        <span id={`${fieldId}-err`} className="px-1 text-xs text-error">
          {error}
        </span>
      ) : supporting ? (
        <span
          id={`${fieldId}-help`}
          className="px-1 text-xs text-on-surface-variant"
        >
          {supporting}
        </span>
      ) : null}
    </label>
  );
}

export function BrittaSearch({
  value,
  onChange,
  placeholder = "Search",
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "flex min-h-12 items-center gap-3 rounded-full bg-surface-container-high px-4 text-on-surface",
        className,
      )}
    >
      <MdIcon name="search" size={22} className="text-on-surface-variant" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full bg-transparent text-[16px] outline-none placeholder:text-on-surface-variant"
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="rounded-full p-1 text-on-surface-variant hover:bg-on-surface/10"
        >
          <MdIcon name="close" size={18} />
        </button>
      ) : null}
    </label>
  );
}

export function BrittaSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label ?? "Toggle"}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-8 w-[52px] rounded-full transition-colors duration-150",
          checked ? "bg-primary" : "bg-surface-container-highest ring-2 ring-outline",
        )}
      >
        <span
          className={cn(
            "absolute top-1 flex size-6 items-center justify-center rounded-full transition-transform duration-150 ease-out",
            checked
              ? "translate-x-6 bg-on-primary"
              : "translate-x-1 bg-outline",
          )}
        >
          {checked ? (
            <MdIcon name="check" size={14} className="text-primary" />
          ) : null}
        </span>
      </button>
      {label ? (
        <span className="text-sm text-on-surface">{label}</span>
      ) : null}
    </label>
  );
}

export function BrittaCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-label={label ?? "Checkbox"}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative flex size-5 items-center justify-center rounded-[4px] transition-colors duration-150",
          "after:absolute after:-inset-2.5 after:content-['']",
          checked
            ? "bg-primary text-on-primary"
            : "bg-transparent ring-2 ring-inset ring-outline",
        )}
      >
        {checked ? <MdIcon name="check" size={16} /> : null}
      </button>
      {label ? (
        <span className="text-sm text-on-surface">{label}</span>
      ) : null}
    </label>
  );
}

export function BrittaRadio({
  checked,
  onChange,
  label,
  name,
}: {
  checked: boolean;
  onChange: () => void;
  label?: string;
  name?: string;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3">
      <button
        type="button"
        role="radio"
        name={name}
        aria-checked={checked}
        aria-label={label ?? "Radio"}
        onClick={onChange}
        className={cn(
          "relative flex size-5 items-center justify-center rounded-full ring-2 transition-colors duration-150",
          "after:absolute after:-inset-2.5 after:content-['']",
          checked ? "ring-primary" : "ring-outline",
        )}
      >
        {checked ? (
          <span className="size-2.5 rounded-full bg-primary" />
        ) : null}
      </button>
      {label ? (
        <span className="text-sm text-on-surface">{label}</span>
      ) : null}
    </label>
  );
}

export function BrittaSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  label?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="flex w-full flex-col gap-2">
      {label ? (
        <span className="flex items-center justify-between text-sm text-on-surface">
          {label}
          <span className="tabular-nums text-on-surface-variant">{value}</span>
        </span>
      ) : null}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="britta-slider w-full"
        style={{ "--pct": `${pct}%` } as CSSProperties}
      />
    </label>
  );
}

export function BrittaFieldRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

export function BrittaSelect({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string }[];
  className?: string;
}) {
  return (
    <label className={cn("flex w-full flex-col gap-1", className)}>
      <span className="px-1 text-xs font-medium text-on-surface-variant">{label}</span>
      <span className="relative flex min-h-14 items-center rounded-md ring-1 ring-inset ring-outline-variant focus-within:ring-2 focus-within:ring-primary">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-14 w-full appearance-none bg-transparent px-4 pr-10 text-[16px] text-on-surface outline-none"
        >
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
        <MdIcon
          name="expand_more"
          size={22}
          className="pointer-events-none absolute right-3 text-on-surface-variant"
        />
      </span>
    </label>
  );
}

