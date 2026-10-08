import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import {
  type ButtonHTMLAttributes,
  type ReactNode,
  forwardRef,
} from "react";
import { cn } from "@/lib/utils";
import { MdIcon } from "./icon";

const stateLayer =
  "after:pointer-events-none after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:duration-150 after:ease-out hover:after:opacity-[0.08] active:after:opacity-[0.12] focus-visible:after:opacity-[0.12]";

export const buttonVariants = cva(
  cn(
    "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap font-medium",
    "rounded-full select-none transition-[transform,box-shadow,background-color,color,opacity] duration-150 ease-out",
    "active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-[0.38]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    stateLayer,
  ),
  {
    variants: {
      variant: {
        filled: "bg-primary text-on-primary after:bg-on-primary",
        tonal:
          "bg-primary-container text-on-primary-container after:bg-on-primary-container",
        outlined:
          "bg-transparent text-primary ring-1 ring-inset ring-outline-variant after:bg-primary",
        text: "bg-transparent text-primary after:bg-primary",
        elevated:
          "bg-surface-container-low text-primary shadow-[var(--shadow-elevated)] after:bg-primary",
      },
      size: {
        sm: "min-h-8 px-4 text-sm",
        md: "min-h-10 px-6 text-sm",
        lg: "min-h-12 px-7 text-[15px]",
      },
    },
    defaultVariants: { variant: "filled", size: "md" },
  },
);

export type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>["variant"]
>;

export type BrittaButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    icon?: string;
    iconRight?: string;
    static?: boolean;
    asChild?: boolean;
  };

export const BrittaButton = forwardRef<HTMLButtonElement, BrittaButtonProps>(
  function BrittaButton(
    {
      className,
      variant,
      size,
      icon,
      iconRight,
      children,
      type = "button",
      static: isStatic,
      asChild,
      ...props
    },
    ref,
  ) {
    const Comp = asChild ? Slot : "button";
    const content = (
      <>
        {icon ? <MdIcon name={icon} size={size === "sm" ? 18 : 20} /> : null}
        {children}
        {iconRight ? (
          <MdIcon name={iconRight} size={size === "sm" ? 18 : 20} />
        ) : null}
      </>
    );
    if (asChild) {
      return (
        <Slot
          className={cn(
            buttonVariants({ variant, size }),
            isStatic && "active:scale-100",
            className,
          )}
          {...props}
        >
          {children}
        </Slot>
      );
    }
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          buttonVariants({ variant, size }),
          isStatic && "active:scale-100",
          icon && !children && "px-0",
          className,
        )}
        {...props}
      >
        {content}
      </button>
    );
  },
);

export function BrittaIconButton({
  icon,
  label,
  filled,
  className,
  size = 40,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: string;
  label: string;
  filled?: boolean;
  size?: 32 | 40 | 48;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full text-on-surface",
        "transition-transform duration-150 ease-out active:not-disabled:scale-[0.96]",
        "hover:bg-on-surface/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/35",
        "disabled:opacity-[0.38]",
        size === 32 && "size-8",
        size === 40 && "size-10",
        size === 48 && "size-12",
        className,
      )}
      {...props}
    >
      <MdIcon name={icon} size={size === 32 ? 18 : 24} filled={filled} />
    </button>
  );
}

export function BrittaFab({
  icon = "add",
  label,
  extended,
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: string;
  label?: string;
  extended?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const dim =
    size === "sm" ? "size-10" : size === "lg" ? "size-24 rounded-[28px]" : "size-14";
  return (
    <button
      type="button"
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden bg-primary-container text-on-primary-container",
        "shadow-[var(--shadow-fab)] transition-[transform,box-shadow] duration-150 ease-out",
        "active:not-disabled:scale-[0.96] hover:shadow-[var(--shadow-fab-hover)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/35",
        stateLayer,
        "after:bg-on-primary-container",
        extended
          ? "h-14 rounded-2xl px-5 text-sm font-medium"
          : cn(dim, "rounded-2xl"),
        className,
      )}
      {...props}
    >
      <MdIcon name={icon} size={size === "lg" ? 36 : 24} />
      {extended || label ? <span>{label}</span> : null}
    </button>
  );
}

export function BrittaSegmented({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string; icon?: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div
      role="tablist"
      className="inline-flex rounded-full bg-surface-container p-1 ring-1 ring-outline-variant"
    >
      {options.map((opt) => {
        const selected = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(opt.id)}
            className={cn(
              "inline-flex min-h-9 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors duration-150",
              selected
                ? "bg-secondary-container text-on-secondary-container"
                : "text-on-surface hover:bg-on-surface/10",
            )}
          >
            {opt.icon ? <MdIcon name={opt.icon} size={18} /> : null}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export function BrittaChip({
  children,
  selected,
  onClick,
  icon,
  trailing,
  className,
}: {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  icon?: string;
  trailing?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-sm font-medium ring-1 ring-inset transition-colors duration-150",
        selected
          ? "bg-secondary-container text-on-secondary-container ring-transparent"
          : "bg-transparent text-on-surface-variant ring-outline-variant hover:bg-on-surface/10",
        className,
      )}
    >
      {icon ? <MdIcon name={icon} size={18} filled={selected} /> : null}
      {children}
      {trailing ? <MdIcon name={trailing} size={16} /> : null}
    </button>
  );
}
