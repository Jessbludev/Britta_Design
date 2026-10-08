import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Page } from "@/components/shell";
import {
  ICON_CATEGORIES,
  ICON_PACKS,
  ICONS,
  iconCompose,
  iconsJson,
  iconsKotlinObject,
  packIcons,
  type IconPackId,
} from "@/britta/icons-data";
import { BrittaChip, BrittaSearch, BrittaSwitch, BrittaButton, BrittaSegmented } from "@/britta";
import { MdIcon, type MdIconStyle } from "@/britta/icon";
import { CodeBlock } from "@/components/code-block";
import { cn } from "@/lib/utils";
import { downloadText } from "@/lib/download";

export const Route = createFileRoute("/icons")({ component: IconsPage });

function IconsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof ICON_CATEGORIES)[number]["id"]>("all");
  const [pack, setPack] = useState<IconPackId | "all">("all");
  const [filled, setFilled] = useState(false);
  const [style, setStyle] = useState<MdIconStyle>("outlined");
  const [picked, setPicked] = useState(ICONS[0]!.name);
  const [weight, setWeight] = useState<100 | 400 | 700>(400);

  const items = useMemo(() => {
    return ICONS.filter((icon) => {
      if (pack !== "all" && !icon.packs.includes(pack)) return false;
      if (cat !== "all" && icon.category !== cat) return false;
      if (!q) return true;
      return `${icon.name} ${icon.label} ${iconCompose(icon.name)}`
        .toLowerCase()
        .includes(q.toLowerCase());
    });
  }, [q, cat, pack]);

  const active = ICONS.find((icon) => icon.name === picked) ?? ICONS[0]!;
  const compose = iconCompose(active.name, style);

  return (
    <Page
      eyebrow="Foundation"
      title="Icon packs"
      lede={`${ICONS.length} Material Symbols across ${ICON_PACKS.length} packs. Outlined, rounded, and sharp, with FILL / weight / optical size. Same ligature on web; Compose maps to Icons.Outlined.*.`}
    >
      <div className="mb-6 flex flex-wrap gap-3">
        <BrittaButton
          icon="download"
          onClick={() =>
            downloadText(
              pack === "all" ? "britta-icons.json" : `britta-icons-${pack}.json`,
              iconsJson(pack === "all" ? undefined : pack),
              "application/json",
            )
          }
        >
          Download JSON
        </BrittaButton>
        <BrittaButton
          variant="outlined"
          icon="android"
          onClick={() => downloadText("BrittaIcons.kt", iconsKotlinObject(style))}
        >
          Compose object
        </BrittaButton>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ICON_PACKS.map((p) => {
          const count = packIcons(p.id).length;
          const selected = pack === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setPack(selected ? "all" : p.id)}
              className={cn(
                "flex items-start gap-3 rounded-xl p-3 text-left ring-1 transition-colors",
                selected
                  ? "bg-secondary-container text-on-secondary-container ring-transparent"
                  : "bg-surface-container-low ring-outline-variant/60 hover:bg-surface-container",
              )}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-container text-on-primary-container">
                <MdIcon name={p.icon} size={22} filled={selected} style={style} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium">{p.label}</span>
                <span className="block text-[11px] text-on-surface-variant">
                  {count} symbols · {p.blurb}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mb-4 max-w-md">
        <BrittaSearch value={q} onChange={setQ} placeholder="Search symbols" />
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {ICON_CATEGORIES.map((c) => (
          <BrittaChip key={c.id} selected={cat === c.id} onClick={() => setCat(c.id)}>
            {c.label}
          </BrittaChip>
        ))}
      </div>
      <div className="mb-6 flex flex-wrap items-center gap-6">
        <BrittaSegmented
          value={style}
          onChange={(id) => setStyle(id as MdIconStyle)}
          options={[
            { id: "outlined", label: "Outlined" },
            { id: "rounded", label: "Rounded" },
            { id: "sharp", label: "Sharp" },
          ]}
        />
        <BrittaSwitch checked={filled} onChange={setFilled} label="Fill" />
        <div className="flex items-center gap-2 text-sm">
          <span className="text-on-surface-variant">Weight</span>
          {([100, 400, 700] as const).map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => setWeight(w)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                weight === w
                  ? "bg-secondary-container text-on-secondary-container"
                  : "text-on-surface-variant hover:bg-on-surface/10",
              )}
            >
              {w}
            </button>
          ))}
        </div>
        <span className="text-xs text-on-surface-variant tabular-nums">
          {items.length} shown
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div>
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-on-surface-variant">
              <MdIcon name="search_off" size={36} />
              <p className="text-sm">No symbols match</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-1 sm:grid-cols-6 md:grid-cols-8">
              {items.map((icon) => (
                <button
                  key={icon.name}
                  type="button"
                  onClick={() => setPicked(icon.name)}
                  title={icon.label}
                  className={cn(
                    "flex aspect-square flex-col items-center justify-center gap-1 rounded-xl text-on-surface",
                    picked === icon.name
                      ? "bg-secondary-container text-on-secondary-container"
                      : "hover:bg-surface-container",
                  )}
                >
                  <MdIcon
                    name={icon.name}
                    size={28}
                    filled={filled}
                    weight={weight}
                    style={style}
                  />
                  <span className="max-w-full truncate px-1 text-[10px] text-on-surface-variant">
                    {icon.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-xl bg-surface-container-low p-5 ring-1 ring-outline-variant/60">
            <div className="flex justify-center py-4">
              <MdIcon
                name={active.name}
                size={72}
                filled={filled}
                weight={weight}
                style={style}
              />
            </div>
            <div className="font-display text-lg font-medium">{active.label}</div>
            <div className="font-mono text-xs text-on-surface-variant">{active.name}</div>
            <div className="mt-2 flex flex-wrap gap-1">
              {active.packs.map((p) => (
                <span
                  key={p}
                  className="rounded-full bg-surface-container-highest px-2 py-0.5 text-[10px] text-on-surface-variant"
                >
                  {p}
                </span>
              ))}
            </div>
            <div className="mt-4">
              <CodeBlock
                tabs={[
                  {
                    id: "tsx",
                    label: "Web",
                    lang: "tsx",
                    code: `<MdIcon name="${active.name}"${filled ? " filled" : ""}${style !== "outlined" ? ` style="${style}"` : ""} weight={${weight}} />`,
                  },
                  {
                    id: "kt",
                    label: "Compose",
                    lang: "kt",
                    code: `Icon(
    ${compose},
    contentDescription = "${active.label}"
)`,
                  },
                  {
                    id: "css",
                    label: "CSS",
                    lang: "css",
                    code: `.icon {
  font-family: "Material Symbols ${style[0]!.toUpperCase()}${style.slice(1)}";
  font-variation-settings: "FILL" ${filled ? 1 : 0}, "wght" ${weight}, "GRAD" 0, "opsz" 24;
}
/* ligature: ${active.name} */`,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
