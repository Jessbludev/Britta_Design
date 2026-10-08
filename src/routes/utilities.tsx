import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Page } from "@/components/shell";
import { CodeBlock } from "@/components/code-block";
import { BrittaChip, BrittaSearch, BrittaButton } from "@/britta";
import {
  DEFAULT_PLAYGROUND,
  UTILITIES,
  UTILITY_GROUPS,
  type UtilityKind,
} from "@/britta/utilities";
import { generateStandaloneCss } from "@/britta/compiler";
import { useBrittaTheme } from "@/britta/theme";
import { downloadText } from "@/lib/download";
import { cn } from "@/lib/utils";
import { MdIcon } from "@/britta/icon";

export const Route = createFileRoute("/utilities")({ component: UtilitiesPage });

function UtilitiesPage() {
  const seed = useBrittaTheme((s) => s.seed);
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<UtilityKind | "all">("all");
  const [selected, setSelected] = useState<string[]>(DEFAULT_PLAYGROUND);

  const items = useMemo(() => {
    return UTILITIES.filter((u) => {
      if (kind !== "all" && u.kind !== kind) return false;
      if (!q) return true;
      const hay = `${u.className} ${u.css} ${u.compose}`.toLowerCase();
      return hay.includes(q.toLowerCase());
    });
  }, [q, kind]);

  function toggle(name: string) {
    setSelected((cur) =>
      cur.includes(name) ? cur.filter((c) => c !== name) : [...cur, name],
    );
  }

  const standalone = useMemo(() => generateStandaloneCss(seed), [seed]);

  return (
    <Page
      eyebrow="Foundation"
      title="Utilities"
      lede="Tailwind-class names mapped onto Material 3 tokens. The same padding token is p-md on the web and BrittaGeneratedSpacing.md.dp in Compose."
    >
      <div className="mb-8 grid items-start gap-6 lg:grid-cols-[1fr_280px]">
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl font-medium">Live playground</h2>
            <button
              type="button"
              className="text-sm text-primary"
              onClick={() => setSelected(DEFAULT_PLAYGROUND)}
            >
              Reset
            </button>
          </div>
          <div className="mb-3 flex flex-wrap gap-2">
            {selected.map((name) => (
              <BrittaChip key={name} selected trailing="close" onClick={() => toggle(name)}>
                {name}
              </BrittaChip>
            ))}
          </div>
          <div className="rounded-xl bg-surface-container-low p-6 ring-1 ring-outline-variant/60">
            <div className={cn("transition-colors duration-150", selected.join(" "))}>
              Design once. Ship on Web and Android.
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-surface-container p-4 text-sm">
          <div className="mb-2 text-xs font-medium tracking-[0.08em] text-on-surface-variant uppercase">
            Compose equivalent
          </div>
          <pre className="font-mono text-[11px] leading-5 text-on-surface whitespace-pre-wrap">
            {selected
              .map((name) => UTILITIES.find((u) => u.className === name)?.compose)
              .filter(Boolean)
              .join("\n")}
          </pre>
        </div>
      </div>

      <div className="mb-4 max-w-md">
        <BrittaSearch value={q} onChange={setQ} placeholder="Search utilities" />
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {UTILITY_GROUPS.map((g) => (
          <BrittaChip
            key={g.id}
            selected={kind === g.id}
            onClick={() => setKind(g.id)}
          >
            {g.label}
          </BrittaChip>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl ring-1 ring-outline-variant/60">
        <div className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.4fr)_40px] bg-surface-container text-xs font-medium text-on-surface-variant sm:grid">
          <div className="px-4 py-3">Class</div>
          <div className="px-4 py-3">CSS</div>
          <div className="px-4 py-3">Compose</div>
          <div />
        </div>
        {items.map((u) => {
          const on = selected.includes(u.className);
          return (
            <button
              key={u.className}
              type="button"
              onClick={() => toggle(u.className)}
              className={cn(
                "grid w-full grid-cols-1 gap-1 border-t border-outline-variant/60 px-4 py-3 text-left sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.4fr)_40px] sm:items-center",
                on ? "bg-secondary-container/60" : "hover:bg-surface-container-low",
              )}
            >
              <div className="flex items-center gap-2 font-mono text-sm">
                {u.preview ? (
                  <span
                    className="size-4 shrink-0 rounded-sm ring-1 ring-outline-variant/70"
                    style={{ background: u.preview }}
                  />
                ) : null}
                {u.className}
              </div>
              <div className="font-mono text-[12px] text-on-surface-variant">{u.css}</div>
              <div className="font-mono text-[12px] text-on-surface-variant">{u.compose}</div>
              <div className="hidden justify-end sm:flex">
                <MdIcon
                  name={on ? "check" : "add"}
                  size={18}
                  className={on ? "text-primary" : "text-on-surface-variant"}
                />
              </div>
            </button>
          );
        })}
      </div>

      <h2 className="mt-12 mb-3 font-display text-xl font-medium">
        Standalone CSS
      </h2>
      <p className="mb-4 max-w-2xl text-sm leading-6 text-on-surface-variant">
        Drop britta.css into any page — no Tailwind required. Prefix{" "}
        <span className="font-mono text-on-surface">b-</span> keeps the utilities
        from colliding with other systems.
      </p>
      <div className="mb-4">
        <BrittaButton
          icon="download"
          onClick={() => downloadText("britta.css", standalone, "text/css")}
        >
          Download britta.css
        </BrittaButton>
      </div>
      <CodeBlock
        tabs={[
          {
            id: "html",
            label: "HTML",
            lang: "tsx",
            code: `<link rel="stylesheet" href="./britta.css" />
<button class="britta-button">Save</button>
<div class="b-flex b-gap-md b-p-lg b-rounded-lg b-bg-primary-container">
  <p class="b-text-on-primary-container b-font-display">Hello</p>
</div>`,
          },
          {
            id: "css",
            label: "britta.css",
            lang: "css",
            code: standalone.split("\n").slice(0, 40).join("\n") + "\n/* … */",
          },
        ]}
      />
    </Page>
  );
}
