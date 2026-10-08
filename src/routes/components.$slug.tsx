import { createFileRoute, Link } from "@tanstack/react-router";
import { getCatalog } from "@/britta/catalog";
import { Page } from "@/components/shell";
import { CodeBlock } from "@/components/code-block";
import { BrittaChip } from "@/britta";
import { useBrittaTheme } from "@/britta/theme";
import { MdIcon } from "@/britta/icon";

export const Route = createFileRoute("/components/$slug")({
  component: ComponentDetail,
});

function ComponentDetail() {
  const { slug } = Route.useParams();
  const item = getCatalog(slug);
  const platform = useBrittaTheme((s) => s.platform);

  if (!item) {
    return (
      <Page title="Missing component">
        <p className="text-on-surface-variant">
          No component named {slug}.{" "}
          <Link to="/components" className="text-primary">
            Back to library
          </Link>
        </p>
      </Page>
    );
  }

  const Play = item.playground ?? item.Preview;

  return (
    <Page eyebrow={item.category} title={item.name} lede={item.blurb}>
      <div className="mb-6 flex flex-wrap gap-2">
        <BrittaChip icon="language">React · TypeScript</BrittaChip>
        <BrittaChip icon="android">Jetpack Compose</BrittaChip>
        <BrittaChip icon="palette">Material 3</BrittaChip>
      </div>
      <div className="rounded-xl bg-surface-container-low p-6 ring-1 ring-outline-variant/60 sm:p-10">
        <div className="flex min-h-32 items-center justify-center">
          <Play />
        </div>
      </div>
      <h2 className="mt-10 mb-3 font-display text-xl font-medium">
        Implementation
      </h2>
      <CodeBlock
        tabs={
          platform === "android"
            ? [
                { id: "kt", label: "Kotlin", lang: "kt", code: item.kotlin },
                { id: "tsx", label: "TypeScript", lang: "tsx", code: item.tsx },
              ]
            : [
                { id: "tsx", label: "TypeScript", lang: "tsx", code: item.tsx },
                { id: "kt", label: "Kotlin", lang: "kt", code: item.kotlin },
              ]
        }
      />
      <p className="mt-6 flex items-center gap-2 text-sm text-on-surface-variant">
        <MdIcon name="info" size={18} />
        Both snippets consume the same generated color and type tokens. Switch
        Web / Android in the sidebar to prefer a language.
      </p>
    </Page>
  );
}
