import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CATALOG } from "@/britta/catalog";
import { MdIcon } from "@/britta/icon";
import { useBrittaTheme } from "@/britta/theme";
import { SEED_PRESETS } from "@/britta/palette";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMode = useBrittaTheme((s) => s.toggleMode);
  const setSeed = useBrittaTheme((s) => s.setSeed);
  const setPlatform = useBrittaTheme((s) => s.setPlatform);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function go(to: string) {
    setOpen(false);
    void navigate({ to });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close command palette"
        className="absolute inset-0 bg-scrim/40"
        onClick={() => setOpen(false)}
      />
      <div className="relative mx-auto mt-[12vh] w-[min(calc(100vw-24px),520px)] overflow-hidden rounded-xl bg-surface-container-high shadow-[var(--shadow-modal)]">
        <Command label="Command palette" className="text-on-surface">
          <div className="flex items-center gap-2 border-b border-outline-variant px-4">
            <MdIcon name="search" size={20} className="text-on-surface-variant" />
            <Command.Input
              autoFocus
              placeholder="Jump to a component, token, or action"
              className="h-12 w-full bg-transparent text-[16px] outline-none placeholder:text-on-surface-variant"
            />
          </div>
          <Command.List className="max-h-80 overflow-auto p-2">
            <Command.Empty className="px-3 py-8 text-center text-sm text-on-surface-variant">
              Nothing matches
            </Command.Empty>
            <Command.Group
              heading="Go to"
              className="px-2 py-1 text-[11px] font-medium tracking-[0.06em] text-on-surface-variant uppercase"
            >
              {[
                { to: "/", label: "Home", icon: "home" },
                { to: "/components", label: "Components", icon: "widgets" },
                { to: "/tokens", label: "Tokens", icon: "palette" },
                { to: "/icons", label: "Icons", icon: "interests" },
                { to: "/shaders", label: "Shaders", icon: "gradient" },
                { to: "/utilities", label: "Utilities", icon: "grid_view" },
                { to: "/fonts", label: "Fonts", icon: "font_download" },
                { to: "/playground", label: "Playground", icon: "science" },
                { to: "/theme", label: "Theme lab", icon: "styler" },
                { to: "/android", label: "Android kit", icon: "android" },
                { to: "/start", label: "Get started", icon: "rocket_launch" },
              ].map((item) => (
                <Command.Item
                  key={item.to}
                  value={item.label}
                  onSelect={() => go(item.to)}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm data-[selected=true]:bg-secondary-container data-[selected=true]:text-on-secondary-container"
                >
                  <MdIcon name={item.icon} size={20} />
                  {item.label}
                </Command.Item>
              ))}
            </Command.Group>
            <Command.Group
              heading="Components"
              className="mt-2 px-2 py-1 text-[11px] font-medium tracking-[0.06em] text-on-surface-variant uppercase"
            >
              {CATALOG.map((c) => (
                <Command.Item
                  key={c.slug}
                  value={`${c.name} ${c.slug}`}
                  onSelect={() => go(`/components/${c.slug}`)}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm data-[selected=true]:bg-secondary-container data-[selected=true]:text-on-secondary-container"
                >
                  <MdIcon name="widgets" size={20} />
                  {c.name}
                </Command.Item>
              ))}
            </Command.Group>
            <Command.Group
              heading="Actions"
              className="mt-2 px-2 py-1 text-[11px] font-medium tracking-[0.06em] text-on-surface-variant uppercase"
            >
              <Command.Item
                value="toggle theme dark light"
                onSelect={() => {
                  toggleMode();
                  setOpen(false);
                }}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm data-[selected=true]:bg-secondary-container"
              >
                <MdIcon name="contrast" size={20} />
                Toggle light / dark
              </Command.Item>
              <Command.Item
                value="platform web"
                onSelect={() => {
                  setPlatform("web");
                  setOpen(false);
                }}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm data-[selected=true]:bg-secondary-container"
              >
                <MdIcon name="language" size={20} />
                Prefer TypeScript
              </Command.Item>
              <Command.Item
                value="platform android kotlin"
                onSelect={() => {
                  setPlatform("android");
                  setOpen(false);
                }}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm data-[selected=true]:bg-secondary-container"
              >
                <MdIcon name="android" size={20} />
                Prefer Kotlin
              </Command.Item>
              {SEED_PRESETS.map((p) => (
                <Command.Item
                  key={p.seed}
                  value={`seed ${p.name}`}
                  onSelect={() => {
                    setSeed(p.seed);
                    setOpen(false);
                  }}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm data-[selected=true]:bg-secondary-container"
                >
                  <span
                    className="size-4 rounded-full ring-1 ring-outline-variant"
                    style={{ background: p.seed }}
                  />
                  Seed {p.name}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}

export function openCommandPalette() {
  window.dispatchEvent(
    new KeyboardEvent("keydown", { key: "k", metaKey: true }),
  );
}
