import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CATALOG, CATEGORIES } from "@/britta/catalog";
import { BrittaChip, BrittaSearch } from "@/britta";
import { Page } from "@/components/shell";
import { MdIcon } from "@/britta/icon";

export const Route = createFileRoute("/components/")({
  component: ComponentsPage,
});

function ComponentsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]["id"]>("all");
  const items = useMemo(() => {
    return CATALOG.filter((c) => {
      if (cat !== "all" && c.category !== cat) return false;
      if (!q) return true;
      const hay = `${c.name} ${c.blurb} ${c.slug}`.toLowerCase();
      return hay.includes(q.toLowerCase());
    });
  }, [q, cat]);

  return (
    <Page
      eyebrow="Library"
      title="Components"
      lede={`${CATALOG.length} primitives with live previews, TypeScript, and Jetpack Compose. Filter by role or search by name.`}
    >
      <div className="mb-6 max-w-md">
        <BrittaSearch value={q} onChange={setQ} placeholder="Filter components" />
      </div>
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <BrittaChip
            key={c.id}
            selected={cat === c.id}
            onClick={() => setCat(c.id)}
          >
            {c.label}
          </BrittaChip>
        ))}
      </div>
      {items.length === 0 ? (
        <p className="py-16 text-center text-sm text-on-surface-variant">
          No components match.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((c) => (
            <Link
              key={c.slug}
              to="/components/$slug"
              params={{ slug: c.slug }}
              className="flex flex-col rounded-xl bg-surface-container-low p-4 ring-1 ring-outline-variant/60 transition-shadow hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="flex min-h-[120px] items-center justify-center overflow-hidden rounded-lg bg-surface px-2 py-3">
                <div className="max-w-full">
                  <c.Preview />
                </div>
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <div className="font-display text-lg font-medium">{c.name}</div>
                  <p className="mt-1 text-sm leading-5 text-on-surface-variant">
                    {c.blurb}
                  </p>
                </div>
                <MdIcon
                  name="chevron_right"
                  size={20}
                  className="mt-1 shrink-0 text-on-surface-variant"
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </Page>
  );
}
