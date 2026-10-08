import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MdIcon } from "@/britta/icon";
import { BrittaIconButton, BrittaSegmented } from "@/britta";
import { useBrittaTheme } from "@/britta/theme";
import { CommandPalette } from "./command-palette";

const NAV = [
  {
    heading: "Studio",
    items: [
      { to: "/", icon: "home", label: "Home" },
      { to: "/components", icon: "widgets", label: "Components" },
      { to: "/tokens", icon: "palette", label: "Tokens" },
      { to: "/icons", icon: "interests", label: "Icons" },
      { to: "/shaders", icon: "gradient", label: "Shaders" },
      { to: "/utilities", icon: "grid_view", label: "Utilities" },
      { to: "/fonts", icon: "font_download", label: "Fonts" },
      { to: "/playground", icon: "science", label: "Playground" },
    ],
  },
  {
    heading: "Platforms",
    items: [
      { to: "/theme", icon: "styler", label: "Theme lab" },
      { to: "/android", icon: "android", label: "Android kit" },
      { to: "/start", icon: "rocket_launch", label: "Get started" },
    ],
  },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 px-2 py-1">
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
        <span className="font-display text-lg font-semibold">B</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[17px] font-semibold tracking-tight text-on-surface">
          Britta
        </span>
        <span className="mt-0.5 text-[11px] tracking-[0.14em] text-on-surface-variant uppercase">
          Design
        </span>
      </span>
    </Link>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex flex-col gap-5">
      {NAV.map((group) => (
        <div key={group.heading}>
          <div className="px-4 pb-1 text-[11px] font-medium tracking-[0.08em] text-on-surface-variant uppercase">
            {group.heading}
          </div>
          <div className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onNavigate}
                  className={cn(
                    "mx-3 flex h-12 items-center gap-3 rounded-full px-4 text-sm font-medium transition-colors duration-150",
                    active
                      ? "bg-secondary-container text-on-secondary-container"
                      : "text-on-surface-variant hover:bg-on-surface/10 hover:text-on-surface",
                  )}
                >
                  <MdIcon name={item.icon} size={22} filled={active} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function ThemeControls() {
  const mode = useBrittaTheme((s) => s.mode);
  const toggleMode = useBrittaTheme((s) => s.toggleMode);
  const platform = useBrittaTheme((s) => s.platform);
  const setPlatform = useBrittaTheme((s) => s.setPlatform);
  return (
    <div className="flex flex-col gap-3 px-4">
      <BrittaSegmented
        value={platform}
        onChange={(id) => setPlatform(id as "web" | "android")}
        options={[
          { id: "web", label: "Web", icon: "language" },
          { id: "android", label: "Android", icon: "android" },
        ]}
      />
      <button
        type="button"
        onClick={toggleMode}
        className="flex h-11 items-center justify-between rounded-full bg-surface-container-highest px-4 text-sm text-on-surface"
      >
        <span>{mode === "dark" ? "Dark" : "Light"}</span>
        <MdIcon name={mode === "dark" ? "dark_mode" : "light_mode"} size={20} />
      </button>
    </div>
  );
}

function Drawer({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-surface-container-low">
      <div className="px-3 pt-5 pb-4">
        <Logo />
      </div>
      <button
        type="button"
        onClick={() =>
          window.dispatchEvent(
            new KeyboardEvent("keydown", { key: "k", metaKey: true }),
          )
        }
        className="mx-4 mb-4 flex h-11 items-center gap-3 rounded-full bg-surface-container-highest px-4 text-sm text-on-surface-variant"
      >
        <MdIcon name="search" size={20} />
        <span className="flex-1 text-left">Search</span>
        <kbd className="rounded-md bg-surface-container px-1.5 py-0.5 font-mono text-[10px] text-on-surface-variant">
          ⌘K
        </kbd>
      </button>
      <div className="flex-1 overflow-auto pb-4">
        <NavLinks onNavigate={onNavigate} />
      </div>
      <div className="border-t border-outline-variant/60 py-4">
        <ThemeControls />
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const title =
    NAV.flatMap((g) => g.items).find(
      (i) =>
        i.to === pathname || (i.to !== "/" && pathname.startsWith(`${i.to}/`)),
    )?.label ?? "Britta";

  return (
    <div className="flex min-h-dvh bg-background text-on-background">
      <aside className="sticky top-0 hidden h-dvh w-[272px] shrink-0 lg:block">
        <Drawer />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-1 bg-background/90 px-2 backdrop-blur-md lg:hidden">
          <BrittaIconButton
            icon="menu"
            label="Open navigation"
            onClick={() => setOpen(true)}
          />
          <div className="min-w-0 flex-1 truncate px-1 font-display text-lg font-semibold">
            {title}
          </div>
          <BrittaIconButton
            icon="search"
            label="Search"
            onClick={() =>
              window.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true }),
              )
            }
          />
        </header>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-scrim/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative h-full w-[min(100vw-48px,300px)] shadow-[var(--shadow-modal)]">
            <Drawer onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
      <CommandPalette />
    </div>
  );
}

export function Page({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-4 py-8 sm:px-8 sm:py-12">
      <header className="mb-10 max-w-2xl">
        {eyebrow ? (
          <p className="mb-2 text-xs font-medium tracking-[0.14em] text-primary uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-4xl leading-[1.1] font-semibold tracking-tight text-on-surface sm:text-5xl">
          {title}
        </h1>
        {lede ? (
          <p className="mt-4 text-base leading-7 text-on-surface-variant sm:text-lg">
            {lede}
          </p>
        ) : null}
      </header>
      {children}
    </div>
  );
}
