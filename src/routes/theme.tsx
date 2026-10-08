import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Page } from "@/components/shell";
import { PhoneFrame } from "@/components/phone-frame";
import { KitchenSink } from "@/components/kitchen-sink";
import { useBrittaTheme } from "@/britta/theme";
import { DEFAULT_SEED, normalizeHex, SEED_PRESETS, schemeFromSeed, SCHEME_ROLES } from "@/britta/palette";
import {
  BrittaButton,
  BrittaCard,
  BrittaChip,
  BrittaTextField,
} from "@/britta";
import { cn } from "@/lib/utils";
import { MdIcon } from "@/britta/icon";
import { downloadBrittaKit } from "@/britta/kit-export";

export const Route = createFileRoute("/theme")({ component: ThemePage });

function ThemePage() {
  const seed = useBrittaTheme((s) => s.seed);
  const setSeed = useBrittaTheme((s) => s.setSeed);
  const mode = useBrittaTheme((s) => s.mode);
  const setMode = useBrittaTheme((s) => s.setMode);
  const [draft, setDraft] = useState(seed);
  const scheme = useMemo(() => schemeFromSeed(seed, mode), [seed, mode]);

  function applyCustom() {
    const n = normalizeHex(draft);
    if (n) setSeed(n);
  }

  return (
    <Page
      eyebrow="Platforms"
      title="Theme lab"
      lede="A seed color rebuilds the entire Material 3 scheme — this studio included. Light and dark share the same hue."
    >
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_280px]">
        <div>
          <h2 className="mb-3 font-medium">Mode</h2>
          <div className="mb-8 flex gap-2">
            <BrittaChip
              selected={mode === "light"}
              icon="light_mode"
              onClick={() => setMode("light")}
            >
              Light
            </BrittaChip>
            <BrittaChip
              selected={mode === "dark"}
              icon="dark_mode"
              onClick={() => setMode("dark")}
            >
              Dark
            </BrittaChip>
          </div>

          <h2 className="mb-3 font-medium">Seed</h2>
          <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {SEED_PRESETS.map((p) => (
              <button
                key={p.seed}
                type="button"
                onClick={() => {
                  setSeed(p.seed);
                  setDraft(p.seed);
                }}
                className={cn(
                  "flex items-center gap-3 rounded-xl p-3 text-left ring-1 transition-shadow",
                  seed === p.seed
                    ? "bg-secondary-container ring-transparent"
                    : "bg-surface-container-low ring-outline-variant/60 hover:shadow-[var(--shadow-elevated)]",
                )}
              >
                <span
                  className="size-8 rounded-full ring-1 ring-black/10"
                  style={{ background: p.seed }}
                />
                <span>
                  <span className="block text-sm font-medium">{p.name}</span>
                  <span className="font-mono text-[11px] text-on-surface-variant">
                    {p.seed}
                  </span>
                </span>
              </button>
            ))}
          </div>
          <div className="flex max-w-md flex-col gap-3 sm:flex-row sm:items-end">
            <BrittaTextField
              label="Custom hex"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="#6750A4"
              leading="color_lens"
            />
            <BrittaButton onClick={applyCustom}>Apply</BrittaButton>
          </div>
          <button
            type="button"
            className="mt-3 text-sm text-primary"
            onClick={() => {
              setSeed(DEFAULT_SEED);
              setDraft(DEFAULT_SEED);
            }}
          >
            Reset to Britta purple
          </button>

          <div className="mt-8">
            <BrittaButton icon="download" onClick={() => downloadBrittaKit(seed)}>
              Download kit for this seed
            </BrittaButton>
          </div>

          <h2 className="mt-10 mb-3 font-medium">Live roles</h2>
          <div className="mb-8 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {SCHEME_ROLES.slice(0, 12).map((role) => (
              <div
                key={role.key}
                className="overflow-hidden rounded-lg ring-1 ring-outline-variant/50"
              >
                <div className="h-10" style={{ background: scheme[role.key] }} />
                <div className="truncate bg-surface-container-lowest px-2 py-1.5 text-[11px]">
                  {role.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <BrittaCard variant="filled" className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary text-on-primary">
                <MdIcon name="check" size={20} />
              </span>
              <div>
                <div className="text-sm font-medium">Primary action</div>
                <div className="text-xs text-on-surface-variant">
                  Filled button / FAB
                </div>
              </div>
            </BrittaCard>
            <BrittaCard variant="outlined" className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
                <MdIcon name="edit" size={20} />
              </span>
              <div>
                <div className="text-sm font-medium">Tonal container</div>
                <div className="text-xs text-on-surface-variant">
                  Secondary emphasis
                </div>
              </div>
            </BrittaCard>
          </div>
        </div>
        <PhoneFrame caption="Live · same seed">
          <KitchenSink />
        </PhoneFrame>
      </div>
    </Page>
  );
}
