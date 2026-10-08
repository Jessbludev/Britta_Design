import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page } from "@/components/shell";
import { CodeBlock } from "@/components/code-block";
import { BrittaCard, BrittaChip, BrittaTextField } from "@/britta";
import {
  COMPOSE_FONT_PROVIDER,
  FONTS,
  GOOGLE_FONTS_CSS,
  TYPE_SPECIMENS,
} from "@/britta/fonts";
import { MdIcon } from "@/britta/icon";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/fonts")({ component: FontsPage });

function FontsPage() {
  const [sample, setSample] = useState("The quick brown fox jumps over the lazy dog.");
  const [weight, setWeight] = useState(400);

  return (
    <Page
      eyebrow="Foundation"
      title="Fonts"
      lede="Inter for UI, Outfit for display, JetBrains Mono for code, Material Symbols for icons — loaded from Google Fonts on the web and via ui-text-google-fonts in Compose."
    >
      <div className="mb-10 grid gap-4 md:grid-cols-3">
        {FONTS.map((font) => (
          <BrittaCard key={font.id} variant="filled" className="p-5">
            <div className="text-xs font-medium tracking-[0.08em] text-on-surface-variant uppercase">
              {font.role}
            </div>
            <h2 className={cn("mt-2 text-2xl font-medium", font.className)}>
              {font.name}
            </h2>
            <p className={cn("mt-3 text-sm leading-6 text-on-surface-variant", font.className)}>
              {font.specimen}
            </p>
            <div className="mt-4 flex flex-wrap gap-1">
              {font.weights.map((w) => (
                <span
                  key={w}
                  className="rounded-full bg-surface px-2 py-0.5 font-mono text-[11px] text-on-surface-variant"
                >
                  {w}
                </span>
              ))}
            </div>
          </BrittaCard>
        ))}
      </div>

      <h2 className="mb-3 font-display text-xl font-medium">Type tester</h2>
      <div className="mb-4 max-w-xl">
        <BrittaTextField
          label="Specimen"
          value={sample}
          onChange={(e) => setSample(e.target.value)}
          leading="title"
        />
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {[400, 500, 600, 700].map((w) => (
          <BrittaChip key={w} selected={weight === w} onClick={() => setWeight(w)}>
            {w}
          </BrittaChip>
        ))}
      </div>
      <div className="mb-12 overflow-hidden rounded-xl bg-surface-container-low ring-1 ring-outline-variant/60">
        {FONTS.map((font) => (
          <div
            key={font.id}
            className="border-t border-outline-variant/60 px-5 py-6 first:border-t-0"
          >
            <div className="mb-2 text-xs font-medium tracking-[0.08em] text-on-surface-variant uppercase">
              {font.name}
            </div>
            <p
              className={cn("text-2xl leading-snug sm:text-3xl", font.className)}
              style={{ fontWeight: weight }}
            >
              {sample || "Type something"}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mb-4 font-display text-xl font-medium">Scale</h2>
      <div className="mb-12 overflow-hidden rounded-xl ring-1 ring-outline-variant/60">
        {TYPE_SPECIMENS.map((row) => (
          <div
            key={row.name}
            className="flex flex-col gap-1 border-t border-outline-variant/60 px-5 py-4 first:border-t-0 sm:flex-row sm:items-baseline sm:gap-8"
          >
            <div className="w-36 shrink-0 text-xs text-on-surface-variant">
              {row.name}
            </div>
            <div className={row.className}>{row.sample}</div>
          </div>
        ))}
      </div>

      <h2 className="mb-3 font-display text-xl font-medium">Material Symbols</h2>
      <p className="mb-4 max-w-2xl text-sm leading-6 text-on-surface-variant">
        Variable axes FILL, wght, GRAD, and opsz. The same ligature name is the
        Compose Icons.Outlined.* mapping on the Icons page.
      </p>
      <div className="mb-10 flex flex-wrap gap-3">
        {["palette", "android", "language", "font_download", "widgets", "code"].map(
          (name) => (
            <span
              key={name}
              className="flex size-14 items-center justify-center rounded-xl bg-surface-container-high text-on-surface"
            >
              <MdIcon name={name} size={28} />
            </span>
          ),
        )}
      </div>

      <CodeBlock
        tabs={[
          {
            id: "css",
            label: "Google Fonts CSS",
            lang: "css",
            code: `@import url("${GOOGLE_FONTS_CSS}");

:root {
  --font-sans: Inter, ui-sans-serif, system-ui, sans-serif;
  --font-display: Outfit, var(--font-sans);
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}`,
          },
          {
            id: "kt",
            label: "Compose",
            lang: "kt",
            code: COMPOSE_FONT_PROVIDER,
          },
        ]}
      />
    </Page>
  );
}
