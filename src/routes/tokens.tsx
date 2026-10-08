import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Page } from "@/components/shell";
import { CodeBlock } from "@/components/code-block";
import { useBrittaTheme } from "@/britta/theme";
import {
  SCHEME_ROLES,
  schemeFromSeed,
  tonalRamp,
} from "@/britta/palette";
import {
  generateCss,
  generateKotlin,
  generateStandaloneCss,
  generateTokensJson,
  RADIUS,
  SPACING,
  TYPE_SCALE,
} from "@/britta/compiler";
import { BrittaButton, BrittaCard } from "@/britta";
import { downloadText } from "@/lib/download";
import { downloadBrittaKit } from "@/britta/kit-export";

export const Route = createFileRoute("/tokens")({ component: TokensPage });

function TokensPage() {
  const seed = useBrittaTheme((s) => s.seed);
  const mode = useBrittaTheme((s) => s.mode);
  const scheme = useMemo(() => schemeFromSeed(seed, mode), [seed, mode]);
  const ramp = useMemo(() => tonalRamp(seed), [seed]);
  const css = useMemo(() => generateCss(seed), [seed]);
  const kotlin = useMemo(() => generateKotlin(seed, mode), [seed, mode]);
  const json = useMemo(() => generateTokensJson(seed), [seed]);
  const standalone = useMemo(() => generateStandaloneCss(seed), [seed]);

  return (
    <Page
      eyebrow="Foundation"
      title="Tokens"
      lede="A single seed produces light and dark Material 3 schemes, then compiles to CSS custom properties and Kotlin Color / Dp objects."
    >
      <p className="mb-6 text-sm text-on-surface-variant">
        Active seed <span className="font-mono text-on-surface">{seed}</span> ·{" "}
        {mode} scheme. Change it in Theme lab.
      </p>

      <h2 className="mb-4 font-display text-xl font-medium">Color roles</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {SCHEME_ROLES.map((role) => {
          const hex = scheme[role.key];
          return (
            <div
              key={role.key}
              className="overflow-hidden rounded-lg ring-1 ring-outline-variant/50"
            >
              <div className="h-16" style={{ background: hex }} />
              <div className="bg-surface-container-lowest px-2.5 py-2">
                <div className="truncate text-xs font-medium">{role.label}</div>
                <div className="font-mono text-[11px] text-on-surface-variant">
                  {hex}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="mt-12 mb-4 font-display text-xl font-medium">Tonal ramp</h2>
      <div className="flex overflow-hidden rounded-xl ring-1 ring-outline-variant/60">
        {ramp.map((t) => (
          <div
            key={t.tone}
            className="flex h-20 flex-1 flex-col items-center justify-end pb-2 text-[10px] font-medium"
            style={{
              background: t.hex,
              color: t.tone > 55 ? "#1C1B1F" : "#FFFBFE",
            }}
            title={`${t.tone} ${t.hex}`}
          >
            {t.tone}
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <BrittaCard variant="filled">
          <h3 className="font-medium">Spacing</h3>
          <ul className="mt-3 space-y-2">
            {Object.entries(SPACING).map(([k, v]) => (
              <li key={k} className="flex items-center gap-3 text-sm">
                <span
                  className="h-3 rounded-sm bg-primary"
                  style={{ width: v }}
                />
                <span className="w-8 font-mono text-xs">{k}</span>
                <span className="text-on-surface-variant">{v}px / {v}dp</span>
              </li>
            ))}
          </ul>
        </BrittaCard>
        <BrittaCard variant="filled">
          <h3 className="font-medium">Radius</h3>
          <ul className="mt-3 space-y-3">
            {Object.entries(RADIUS).map(([k, v]) => (
              <li key={k} className="flex items-center gap-3 text-sm">
                <span
                  className="size-10 bg-primary-container"
                  style={{ borderRadius: k === "full" ? 999 : v }}
                />
                <span className="w-8 font-mono text-xs">{k}</span>
                <span className="text-on-surface-variant">{v}px</span>
              </li>
            ))}
          </ul>
        </BrittaCard>
        <BrittaCard variant="filled">
          <h3 className="font-medium">Type</h3>
          <ul className="mt-3 space-y-2">
            {Object.entries(TYPE_SCALE).map(([k, v]) => (
              <li key={k} className="text-sm">
                <span className="font-mono text-[11px] text-on-surface-variant">
                  {k}
                </span>
                <div style={{ fontSize: Math.min(v.size, 22), lineHeight: 1.2 }}>
                  {v.size}/{v.line} · {v.weight}
                </div>
              </li>
            ))}
          </ul>
        </BrittaCard>
      </div>

      <h2 className="mt-12 mb-3 font-display text-xl font-medium">
        Generated artifacts
      </h2>
      <div className="mb-4 flex flex-wrap gap-2">
        <BrittaButton
          size="sm"
          variant="tonal"
          icon="download"
          onClick={() => downloadText("tokens.css", css, "text/css")}
        >
          tokens.css
        </BrittaButton>
        <BrittaButton
          size="sm"
          variant="tonal"
          icon="download"
          onClick={() =>
            downloadText("BrittaGeneratedTokens.kt", kotlin, "text/plain")
          }
        >
          Kotlin
        </BrittaButton>
        <BrittaButton
          size="sm"
          variant="tonal"
          icon="download"
          onClick={() => downloadText("tokens.json", json, "application/json")}
        >
          tokens.json
        </BrittaButton>
        <BrittaButton
          size="sm"
          variant="outlined"
          icon="download"
          onClick={() => downloadText("britta.css", standalone, "text/css")}
        >
          britta.css
        </BrittaButton>
        <BrittaButton
          size="sm"
          icon="folder_zip"
          onClick={() => downloadBrittaKit(seed)}
        >
          Full kit .zip
        </BrittaButton>
      </div>
      <CodeBlock
        tabs={[
          { id: "css", label: "tokens.css", lang: "css", code: css },
          { id: "kt", label: "BrittaGeneratedTokens.kt", lang: "kt", code: kotlin },
          { id: "json", label: "tokens.json", lang: "json", code: json },
        ]}
      />
    </Page>
  );
}
