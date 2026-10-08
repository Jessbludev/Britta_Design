import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/shell";
import { PhoneFrame } from "@/components/phone-frame";
import { KitchenSink } from "@/components/kitchen-sink";
import { CodeBlock } from "@/components/code-block";
import { BrittaButton, BrittaCard } from "@/britta";
import { MdIcon } from "@/britta/icon";
import {
  THEME_KT,
  BUTTON_KT,
  FIELD_KT,
  NAV_KT,
  SHEET_KT,
  SAMPLE_APP_KT,
  SETTINGS_GRADLE,
  MODULE_GRADLE,
} from "@/britta/compose-kit";
import { downloadBrittaKit } from "@/britta/kit-export";
import { useBrittaTheme } from "@/britta/theme";

export const Route = createFileRoute("/android")({ component: AndroidPage });

const MAP = [
  ["BrittaTheme", "MaterialTheme + generated ColorScheme"],
  ["BrittaButton", "Button / Tonal / Outlined / Text / Elevated"],
  ["BrittaTextField", "OutlinedTextField"],
  ["BrittaChip", "FilterChip / AssistChip"],
  ["BrittaFab", "FloatingActionButton"],
  ["BrittaCard", "Card / OutlinedCard"],
  ["BrittaNavBar", "NavigationBar"],
  ["BrittaNavRail", "NavigationRail"],
  ["BrittaSheet", "ModalBottomSheet"],
  ["MdIcon", "Icons.Outlined.* + Material Symbols"],
  ["BrittaShaders", "RuntimeShader AGSL (API 33)"],
  ["BrittaSparkline", "Canvas sparkline / donut / bars"],
];

function AndroidPage() {
  const seed = useBrittaTheme((s) => s.seed);
  return (
    <Page
      eyebrow="Platforms"
      title="Android kit"
      lede="A Jetpack Compose library that consumes the same generated tokens as the web kit. Drop britta-compose into your Gradle graph."
    >
      <div className="mb-8 flex flex-wrap gap-3">
        <BrittaButton icon="download" onClick={() => downloadBrittaKit(seed)}>
          Download Compose kit
        </BrittaButton>
        <p className="self-center text-sm text-on-surface-variant">
          Zip includes Gradle module, generated tokens for seed {seed}, CSS, and a sample activity.
        </p>
      </div>
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_280px]">
        <div>
          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: "palette", title: "Generated colors", body: "Light + dark ColorScheme from the seed." },
              { icon: "format_size", title: "Type & space", body: "sp / dp objects, Inter via Google Fonts." },
              { icon: "widgets", title: "Parity APIs", body: "Variant names match the TypeScript kit." },
            ].map((c) => (
              <BrittaCard key={c.title} variant="filled" className="p-4">
                <MdIcon name={c.icon} size={22} className="text-primary" />
                <div className="mt-2 font-medium">{c.title}</div>
                <p className="mt-1 text-xs leading-5 text-on-surface-variant">
                  {c.body}
                </p>
              </BrittaCard>
            ))}
          </div>

          <h2 className="mb-3 font-display text-xl font-medium">
            Component map
          </h2>
          <div className="mb-10 overflow-hidden rounded-xl ring-1 ring-outline-variant/60">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-container text-on-surface-variant">
                <tr>
                  <th className="px-4 py-3 font-medium">Britta</th>
                  <th className="px-4 py-3 font-medium">Compose</th>
                </tr>
              </thead>
              <tbody>
                {MAP.map(([a, b]) => (
                  <tr key={a} className="border-t border-outline-variant/60">
                    <td className="px-4 py-3 font-mono text-xs">{a}</td>
                    <td className="px-4 py-3 text-on-surface-variant">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mb-3 font-display text-xl font-medium">
            Gradle · britta-compose
          </h2>
          <CodeBlock
            tabs={[
              {
                id: "settings",
                label: "settings.gradle.kts",
                lang: "gradle",
                code: SETTINGS_GRADLE,
              },
              {
                id: "module",
                label: "build.gradle.kts",
                lang: "gradle",
                code: MODULE_GRADLE,
              },
            ]}
          />

          <h2 className="mt-10 mb-3 font-display text-xl font-medium">
            Theme, button, sheet, sample
          </h2>
          <CodeBlock
            tabs={[
              { id: "theme", label: "BrittaTheme.kt", lang: "kt", code: THEME_KT },
              { id: "btn", label: "BrittaButton.kt", lang: "kt", code: BUTTON_KT },
              { id: "field", label: "BrittaTextField.kt", lang: "kt", code: FIELD_KT },
              { id: "nav", label: "BrittaNavigation.kt", lang: "kt", code: NAV_KT },
              { id: "sheet", label: "BrittaSheet.kt", lang: "kt", code: SHEET_KT },
              { id: "sample", label: "BrittaSampleApp.kt", lang: "kt", code: SAMPLE_APP_KT },
            ]}
          />
        </div>
        <PhoneFrame caption="Pixel · Compose preview">
          <KitchenSink />
        </PhoneFrame>
      </div>
    </Page>
  );
}
