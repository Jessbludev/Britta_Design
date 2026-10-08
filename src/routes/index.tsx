import { createFileRoute, Link } from "@tanstack/react-router";
import { BrittaButton, BrittaCard, BrittaChip, BrittaShaderCanvas } from "@/britta";
import { MdIcon } from "@/britta/icon";
import { PhoneFrame } from "@/components/phone-frame";
import { KitchenSink } from "@/components/kitchen-sink";
import { CodeBlock } from "@/components/code-block";
import { CATALOG } from "@/britta/catalog";
import { ICONS, ICON_PACKS } from "@/britta/icons-data";
import { SHADERS } from "@/britta/shaders";
import { downloadBrittaKit } from "@/britta/kit-export";
import { useBrittaTheme } from "@/britta/theme";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const seed = useBrittaTheme((s) => s.seed);
  return (
    <div>
      <section className="relative overflow-hidden">
        <BrittaShaderCanvas
          shaderId="tonal-mesh"
          intensity={0.55}
          className="pointer-events-none absolute inset-0 opacity-70"
          label=""
        />
        <div className="relative mx-auto grid max-w-[1080px] items-center gap-12 px-4 py-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary-container px-3 py-1 text-xs font-medium text-on-secondary-container">
              <MdIcon name="auto_awesome" size={16} />
              v1.1 · Icons, shaders, AGSL
            </p>
            <h1 className="font-display text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-on-surface sm:text-6xl">
              Design once.
              <br />
              Ship on Web and Android.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-on-surface-variant sm:text-lg">
              Britta compiles Material 3 tokens into Tailwind utilities,
              TypeScript components, Kotlin Compose, icon packs, and dual
              GLSL / AGSL shaders. Same color roles, type, and lighting — two platforms.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BrittaButton asChild>
                <Link to="/shaders">
                  Open shader lab
                  <MdIcon name="arrow_forward" size={20} />
                </Link>
              </BrittaButton>
              <BrittaButton asChild variant="outlined">
                <Link to="/icons">
                  <MdIcon name="interests" size={20} />
                  Icon packs
                </Link>
              </BrittaButton>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <BrittaChip icon="palette">Material 3</BrittaChip>
              <BrittaChip icon="gradient">GLSL + AGSL</BrittaChip>
              <BrittaChip icon="android">Jetpack Compose</BrittaChip>
              <BrittaChip icon="interests">Material Symbols</BrittaChip>
              <BrittaChip icon="grain">Elevation lighting</BrittaChip>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <PhoneFrame caption="Compose preview · shared tokens">
              <KitchenSink />
            </PhoneFrame>
          </div>
        </div>
      </section>

      <section className="border-t border-outline-variant/70">
        <div className="mx-auto grid max-w-[1080px] grid-cols-2 gap-px bg-outline-variant/70 sm:grid-cols-4">
          {[
            { n: String(CATALOG.length), l: "Components" },
            { n: String(ICONS.length), l: "Symbols" },
            { n: String(ICON_PACKS.length), l: "Icon packs" },
            { n: String(SHADERS.length), l: "Shaders" },
          ].map((s) => (
            <div key={s.l} className="bg-background px-4 py-6 text-center sm:py-8">
              <div className="font-display text-3xl font-semibold tabular-nums">
                {s.n}
              </div>
              <div className="mt-1 text-xs tracking-[0.12em] text-on-surface-variant uppercase">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-outline-variant/70 bg-surface-container-low">
        <div className="mx-auto grid max-w-[1080px] gap-6 px-4 py-12 sm:px-8 md:grid-cols-3">
          {[
            {
              icon: "token",
              title: "One token contract",
              body: "Color, type, space, and shape live in one seed. The compiler emits CSS variables, Tailwind utilities, and Kotlin Color / Dp / TextStyle.",
            },
            {
              icon: "interests",
              title: "Icon packs",
              body: `${ICONS.length} Material Symbols in ${ICON_PACKS.length} packs. Outlined, rounded, sharp — FILL and weight axes, mapped to Icons.Outlined in Compose.`,
            },
            {
              icon: "gradient",
              title: "Shaders & shading",
              body: `${SHADERS.length} seed-tinted surfaces in GLSL ES 3.0 and Android AGSL. Elevation is a lighting model, not a drop-shadow.`,
            },
          ].map((f) => (
            <BrittaCard key={f.title} variant="filled" className="p-5">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
                <MdIcon name={f.icon} size={22} />
              </span>
              <h2 className="mt-4 font-display text-xl font-medium">{f.title}</h2>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                {f.body}
              </p>
            </BrittaCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] px-4 py-14 sm:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.14em] text-primary uppercase">
              Components
            </p>
            <h2 className="mt-1 font-display text-3xl font-semibold">
              The core kit
            </h2>
          </div>
          <Link to="/components" className="text-sm font-medium text-primary">
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATALOG.slice(0, 6).map((c) => (
            <Link
              key={c.slug}
              to="/components/$slug"
              params={{ slug: c.slug }}
              className="group rounded-xl bg-surface-container-low p-4 ring-1 ring-outline-variant/60 transition-shadow hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="flex min-h-24 items-center justify-center overflow-hidden rounded-lg bg-surface p-3">
                <c.Preview />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-on-surface-variant capitalize">
                    {c.category}
                  </div>
                </div>
                <MdIcon
                  name="arrow_forward"
                  size={18}
                  className="text-on-surface-variant transition-transform group-hover:translate-x-0.5"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-outline-variant/70">
        <div className="mx-auto grid max-w-[1080px] items-start gap-8 px-4 py-14 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-medium tracking-[0.14em] text-primary uppercase">
              Same API, two languages
            </p>
            <h2 className="mt-1 font-display text-3xl font-semibold">
              TypeScript and Kotlin, side by side
            </h2>
            <p className="mt-3 text-sm leading-6 text-on-surface-variant">
              Variants, icons, and color roles map across platforms. Copy either
              snippet — they compile against the same generated tokens. Download
              the full Compose module as a zip.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <BrittaButton icon="download" onClick={() => downloadBrittaKit(seed)}>
                Download kit
              </BrittaButton>
              <BrittaButton asChild variant="outlined">
                <Link to="/android">
                  <MdIcon name="android" size={20} />
                  Android kit
                </Link>
              </BrittaButton>
            </div>
          </div>
          <CodeBlock
            tabs={[
              {
                id: "tsx",
                label: "TypeScript",
                lang: "tsx",
                code: `import { BrittaButton, BrittaThemeRoot } from "@/britta";

export function SaveBar() {
  return (
    <BrittaThemeRoot>
      <BrittaButton variant="filled" icon="check">
        Save draft
      </BrittaButton>
    </BrittaThemeRoot>
  );
}`,
              },
              {
                id: "kt",
                label: "Kotlin",
                lang: "kt",
                code: `import com.britta.design.BrittaButton
import com.britta.design.BrittaTheme

@Composable
fun SaveBar() {
    BrittaTheme {
        BrittaButton(
            text = "Save draft",
            icon = Icons.Outlined.Check,
            onClick = { viewModel.save() }
        )
    }
}`,
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
