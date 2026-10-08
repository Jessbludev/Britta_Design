import * as Dialog from "@radix-ui/react-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { MdIcon } from "./icon";
import { BrittaButton, BrittaIconButton } from "./button";

export function BrittaCard({
  variant = "elevated",
  className,
  children,
}: {
  variant?: "elevated" | "filled" | "outlined";
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl p-4 text-on-surface",
        variant === "elevated" &&
          "bg-surface-container-low shadow-[var(--shadow-elevated)]",
        variant === "filled" && "bg-surface-container-highest",
        variant === "outlined" && "bg-surface ring-1 ring-outline-variant",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BrittaListItem({
  overline,
  title,
  supporting,
  leading,
  trailing,
  onClick,
}: {
  overline?: string;
  title: string;
  supporting?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  onClick?: () => void;
}) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-4 px-4 py-3 text-left",
        onClick && "hover:bg-on-surface/10 rounded-lg transition-colors",
      )}
    >
      {leading ? (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant">
          {leading}
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        {overline ? (
          <div className="text-[11px] font-medium tracking-[0.06em] text-on-surface-variant uppercase">
            {overline}
          </div>
        ) : null}
        <div className="truncate text-[16px] text-on-surface">{title}</div>
        {supporting ? (
          <div className="truncate text-sm text-on-surface-variant">
            {supporting}
          </div>
        ) : null}
      </div>
      {trailing}
    </Comp>
  );
}

export function BrittaDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  action,
  cancel = "Cancel",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description?: string;
  children?: ReactNode;
  action?: { label: string; onClick: () => void };
  cancel?: string;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-scrim/40 data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content
          className={cn(
            "fixed top-1/2 left-1/2 z-50 w-[min(calc(100vw-32px),360px)] -translate-x-1/2 -translate-y-1/2",
            "rounded-[28px] bg-surface-container-high p-6 shadow-[var(--shadow-modal)]",
            "focus:outline-none",
          )}
        >
          <Dialog.Title className="font-display text-[24px] leading-8 font-medium text-on-surface">
            {title}
          </Dialog.Title>
          {description ? (
            <Dialog.Description className="mt-3 text-sm leading-5 text-on-surface-variant">
              {description}
            </Dialog.Description>
          ) : null}
          {children ? <div className="mt-4">{children}</div> : null}
          <div className="mt-6 flex justify-end gap-2">
            <Dialog.Close asChild>
              <BrittaButton variant="text">{cancel}</BrittaButton>
            </Dialog.Close>
            {action ? (
              <BrittaButton
                variant="text"
                onClick={() => {
                  action.onClick();
                  onOpenChange(false);
                }}
              >
                {action.label}
              </BrittaButton>
            ) : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function BrittaSheet({
  open,
  onOpenChange,
  title,
  children,
  action,
  contained,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  children?: ReactNode;
  action?: { label: string; onClick: () => void };
  /** Keep the sheet inside a relatively positioned parent (phone frames). */
  contained?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  const panel = (
    <>
      <button
        type="button"
        aria-label="Dismiss"
        className="absolute inset-0 bg-scrim/40"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="britta-sheet-title"
        className="absolute inset-x-0 bottom-0 rounded-t-[28px] bg-surface-container-high p-5 shadow-[var(--shadow-modal)]"
      >
        <div className="mx-auto mb-4 h-1 w-8 rounded-full bg-on-surface-variant/40" />
        <h2
          id="britta-sheet-title"
          className="font-display text-xl font-medium text-on-surface"
        >
          {title}
        </h2>
        {children ? <div className="mt-4">{children}</div> : null}
        <div className="mt-5 flex justify-end gap-2">
          <BrittaButton variant="text" onClick={() => onOpenChange(false)}>
            Cancel
          </BrittaButton>
          {action ? (
            <BrittaButton onClick={action.onClick}>{action.label}</BrittaButton>
          ) : null}
        </div>
      </div>
    </>
  );

  if (contained) {
    return <div className="absolute inset-0 z-30">{panel}</div>;
  }

  if (typeof document === "undefined") return null;
  return createPortal(
    <div className="fixed inset-0 z-50">{panel}</div>,
    document.body,
  );
}

export function BrittaSnackbar({
  open,
  message,
  action,
  onDismiss,
}: {
  open: boolean;
  message: string;
  action?: { label: string; onClick: () => void };
  onDismiss: () => void;
}) {
  if (!open) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
      <div className="pointer-events-auto flex min-h-12 max-w-lg items-center gap-3 rounded-md bg-inverse-surface px-4 py-3 text-sm text-inverse-on-surface shadow-[var(--shadow-elevated)]">
        <span className="flex-1">{message}</span>
        {action ? (
          <button
            type="button"
            className="font-medium text-inverse-primary"
            onClick={action.onClick}
          >
            {action.label}
          </button>
        ) : null}
        <BrittaIconButton
          icon="close"
          label="Dismiss"
          size={32}
          className="text-inverse-on-surface hover:bg-white/10"
          onClick={onDismiss}
        />
      </div>
    </div>
  );
}

export function BrittaTooltip({
  content,
  children,
}: {
  content: string;
  children: ReactNode;
}) {
  return (
    <Tooltip.Root delayDuration={400}>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          sideOffset={6}
          className="rounded-md bg-inverse-surface px-2 py-1 text-xs text-inverse-on-surface shadow-sm"
        >
          {content}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

export function BrittaMenu({
  items,
}: {
  items: { label: string; icon?: string; onClick?: () => void; danger?: boolean }[];
}) {
  return (
    <div className="min-w-44 overflow-hidden rounded-md bg-surface-container py-2 shadow-[var(--shadow-modal)] ring-1 ring-outline-variant/40">
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={item.onClick}
          className={cn(
            "flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm hover:bg-on-surface/10",
            item.danger ? "text-error" : "text-on-surface",
          )}
        >
          {item.icon ? <MdIcon name={item.icon} size={20} /> : null}
          {item.label}
        </button>
      ))}
    </div>
  );
}
