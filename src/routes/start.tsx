import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/shell";
import { CodeBlock } from "@/components/code-block";
import { BrittaButton, BrittaCard } from "@/britta";
import { MdIcon } from "@/britta/icon";
import { downloadBrittaKit } from "@/britta/kit-export";
import { useBrittaTheme } from "@/britta/theme";

export const Route = createFileRoute("/start")({ component: StartPage });

function StartPage() {
  const seed = useBrittaTheme((s) => s.seed);
  return (
    <Page
      eyebrow="Platforms"
      title="Get started"
      lede="Install the web kit, the Compose module, or just steal the tokens. Everything in this studio is generated from one seed."
    >
      <ol className="mb-12 grid gap-4 md:grid-cols-3">
        {[
          {
            n: "01",
            title: "Pick a seed",
            body: "Use Theme lab to lock a Material 3 scheme. Download CSS, Kotlin, or the standalone britta.css file.",
            to: "/theme",
            label: "Open theme lab",
          },
          {
            n: "02",
            title: "Drop in components",
            body: "React primitives live under @/britta. Compose primitives live in com.britta.design — same variant names.",
            to: "/components",
            label: "Browse components",
          },
          {
            n: "03",
            title: "Icons and shaders",
            body: "Grab a Material Symbols pack, then drop a seed-tinted GLSL / AGSL surface behind a hero or card.",
            to: "/shaders",
            label: "Open shader lab",
          },
        ].map((s) => (
          <BrittaCard key={s.n} variant="filled" className="flex flex-col p-5">
            <span className="font-mono text-xs text-primary">{s.n}</span>
            <h2 className="mt-2 font-display text-xl font-medium">{s.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-on-surface-variant">
              {s.body}
            </p>
            <Link to={s.to} className="mt-4 text-sm font-medium text-primary">
              {s.label}
            </Link>
          </BrittaCard>
        ))}
      </ol>

      <h2 className="mb-3 font-display text-xl font-medium">Web · TypeScript</h2>
      <CodeBlock
        tabs={[
          {
            id: "use",
            label: "App.tsx",
            lang: "tsx",
            code: `import { BrittaButton, MdIcon } from "@/britta";
import { BrittaThemeRoot } from "@/britta/theme";

export function App() {
  return (
    <BrittaThemeRoot>
      <BrittaButton icon="check">Save</BrittaButton>
      <MdIcon name="android" />
    </BrittaThemeRoot>
  );
}`,
          },
          {
            id: "css",
            label: "styles.css",
            lang: "css",
            code: `@import "tailwindcss";
/* Map Britta roles into Tailwind v4 */
@theme inline {
  --color-primary: var(--md-primary);
  --color-on-primary: var(--md-on-primary);
  --font-sans: Inter, ui-sans-serif, system-ui, sans-serif;
}`,
          },
        ]}
      />

      <h2 className="mt-10 mb-3 font-display text-xl font-medium">
        Android · Kotlin
      </h2>
      <CodeBlock
        tabs={[
          {
            id: "kt",
            label: "MainActivity.kt",
            lang: "kt",
            code: `class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            BrittaTheme {
                BrittaButton(
                    text = "Save",
                    icon = Icons.Outlined.Check,
                    onClick = { }
                )
            }
        }
    }
}`,
          },
        ]}
      />

      <h2 className="mt-10 mb-3 font-display text-xl font-medium">
        Fonts · Google Fonts
      </h2>
      <CodeBlock
        tabs={[
          {
            id: "css",
            label: "CSS",
            lang: "css",
            code: `@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap");`,
          },
          {
            id: "kt",
            label: "Compose",
            lang: "kt",
            code: `val provider = GoogleFont.Provider(
    providerAuthority = "com.google.android.gms.fonts",
    providerPackage = "com.google.android.gms",
    certificates = R.array.com_google_android_gms_fonts_certs
)
val Inter = FontFamily(
    Font(GoogleFont("Inter"), provider, FontWeight.Normal)
)`,
          },
        ]}
      />

      <div className="mt-10 flex flex-wrap gap-3">
        <BrittaButton icon="download" onClick={() => downloadBrittaKit(seed)}>
          Download kit
        </BrittaButton>
        <BrittaButton asChild>
          <Link to="/android">
            <MdIcon name="android" size={20} />
            Compose kit
          </Link>
        </BrittaButton>
        <BrittaButton asChild variant="outlined">
          <Link to="/playground">
            <MdIcon name="science" size={20} />
            Playground
          </Link>
        </BrittaButton>
      </div>

      <div className="mt-12 flex items-start gap-3 rounded-xl bg-surface-container p-4 text-sm text-on-surface-variant">
        <MdIcon name="info" size={20} className="mt-0.5 text-primary" />
        <p>
          This studio is the live web implementation. The Kotlin sources are the
          canonical Compose module — open them from the Android kit page and
          paste into Android Studio. Both sides read the same generated tokens.
        </p>
      </div>
    </Page>
  );
}
