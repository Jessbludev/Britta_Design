import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Page } from "@/components/shell";
import { PhoneFrame } from "@/components/phone-frame";
import { CodeBlock } from "@/components/code-block";
import {
  BrittaButton,
  BrittaCard,
  BrittaChip,
  BrittaFab,
  BrittaIconButton,
  BrittaListItem,
  BrittaNavBar,
  BrittaSearch,
  BrittaSwitch,
  BrittaTextField,
  BrittaTopAppBar,
} from "@/britta";
import { MdIcon } from "@/britta/icon";
import { useBrittaTheme } from "@/britta/theme";
import { downloadText } from "@/lib/download";

export const Route = createFileRoute("/playground")({ component: PlaygroundPage });

function PlaygroundPage() {
  const [title, setTitle] = useState("Inbox");
  const [cta, setCta] = useState("Compose");
  const [search, setSearch] = useState(true);
  const [chips, setChips] = useState(true);
  const [list, setList] = useState(true);
  const [fab, setFab] = useState(true);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const platform = useBrittaTheme((s) => s.platform);

  const tsx = useMemo(
    () => generateTsx({ title, cta, search, chips, list, fab }),
    [title, cta, search, chips, list, fab],
  );
  const kotlin = useMemo(
    () => generateKotlinSrc({ title, cta, search, chips, list, fab }),
    [title, cta, search, chips, list, fab],
  );

  return (
    <Page
      eyebrow="Studio"
      title="Playground"
      lede="Compose a Material 3 screen. The same controls emit TypeScript and Kotlin against one token contract."
    >
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_280px]">
        <div>
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <BrittaTextField
              label="Screen title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              leading="title"
            />
            <BrittaTextField
              label="Primary action"
              value={cta}
              onChange={(e) => setCta(e.target.value)}
              leading="edit"
            />
          </div>
          <div className="mb-8 flex flex-col gap-3">
            <BrittaSwitch checked={search} onChange={setSearch} label="Search bar" />
            <BrittaSwitch checked={chips} onChange={setChips} label="Filter chips" />
            <BrittaSwitch checked={list} onChange={setList} label="List items" />
            <BrittaSwitch checked={fab} onChange={setFab} label="Floating action" />
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            <BrittaButton
              size="sm"
              variant="tonal"
              icon="download"
              onClick={() => downloadText("Screen.tsx", tsx, "text/plain")}
            >
              Screen.tsx
            </BrittaButton>
            <BrittaButton
              size="sm"
              variant="tonal"
              icon="download"
              onClick={() => downloadText("Screen.kt", kotlin, "text/plain")}
            >
              Screen.kt
            </BrittaButton>
          </div>
          <CodeBlock
            tabs={
              platform === "android"
                ? [
                    { id: "kt", label: "Kotlin", lang: "kt", code: kotlin },
                    { id: "tsx", label: "TypeScript", lang: "tsx", code: tsx },
                  ]
                : [
                    { id: "tsx", label: "TypeScript", lang: "tsx", code: tsx },
                    { id: "kt", label: "Kotlin", lang: "kt", code: kotlin },
                  ]
            }
          />
        </div>
        <PhoneFrame caption="Live · shared tokens">
          <div className="relative flex min-h-[460px] flex-col bg-surface">
            <BrittaTopAppBar
              title={title || "Screen"}
              leading={<BrittaIconButton icon="menu" label="Menu" />}
              actions={<BrittaIconButton icon="more_vert" label="More" />}
            />
            <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pb-3">
              {search ? (
                <BrittaSearch value={q} onChange={setQ} placeholder="Search" />
              ) : null}
              {chips ? (
                <div className="flex gap-2">
                  {["all", "web", "android"].map((id) => (
                    <BrittaChip
                      key={id}
                      selected={filter === id}
                      onClick={() => setFilter(id)}
                    >
                      {id[0]!.toUpperCase() + id.slice(1)}
                    </BrittaChip>
                  ))}
                </div>
              ) : null}
              {list ? (
                <BrittaCard variant="filled" className="p-1">
                  {[
                    { t: "Compile tokens", s: "CSS + Kotlin" },
                    { t: "Parity pass", s: "Button, field, chip" },
                    { t: "Ship kit", s: title || "Screen" },
                  ].map((row) => (
                    <BrittaListItem
                      key={row.t}
                      title={row.t}
                      supporting={row.s}
                      leading={<MdIcon name="check_circle" size={20} className="text-primary" />}
                    />
                  ))}
                </BrittaCard>
              ) : (
                <p className="px-2 py-8 text-center text-sm text-on-surface-variant">
                  Toggle list items to populate the screen.
                </p>
              )}
            </div>
            {fab ? (
              <div className="relative">
                <div className="absolute -top-8 right-4 z-10">
                  <BrittaFab extended icon="edit" label={cta || "Action"} />
                </div>
              </div>
            ) : null}
            <BrittaNavBar
              value="home"
              onChange={() => {}}
              items={[
                { id: "home", label: "Home", icon: "home" },
                { id: "kit", label: "Kit", icon: "widgets" },
                { id: "you", label: "You", icon: "person" },
              ]}
            />
          </div>
        </PhoneFrame>
      </div>
    </Page>
  );
}

function generateTsx(cfg: {
  title: string;
  cta: string;
  search: boolean;
  chips: boolean;
  list: boolean;
  fab: boolean;
}) {
  const body = [
    `      <BrittaTopAppBar title="${cfg.title || "Screen"}" />`,
    cfg.search ? `      <BrittaSearch value={q} onChange={setQ} />` : null,
    cfg.chips
      ? `      <div className="flex gap-2">
        <BrittaChip selected>All</BrittaChip>
        <BrittaChip>Web</BrittaChip>
        <BrittaChip>Android</BrittaChip>
      </div>`
      : null,
    cfg.list
      ? `      <BrittaCard variant="filled">
        <BrittaListItem title="Compile tokens" supporting="CSS + Kotlin" />
        <BrittaListItem title="Parity pass" supporting="Button, field, chip" />
      </BrittaCard>`
      : null,
    cfg.fab
      ? `      <BrittaFab extended icon="edit" label="${cfg.cta || "Action"}" />`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

  return `import { BrittaTopAppBar, BrittaSearch, BrittaChip, BrittaCard, BrittaListItem, BrittaFab } from "@/britta";

export function Screen() {
  return (
    <div className="flex min-h-dvh flex-col bg-surface text-on-surface">
${body}
    </div>
  );
}`;
}

function generateKotlinSrc(cfg: {
  title: string;
  cta: string;
  search: boolean;
  chips: boolean;
  list: boolean;
  fab: boolean;
}) {
  const lines = [
    `        TopAppBar(title = { Text("${cfg.title || "Screen"}") })`,
    cfg.search
      ? `        OutlinedTextField(value = q, onValueChange = { q = it }, label = { Text("Search") })`
      : null,
    cfg.chips
      ? `        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            BrittaChip(label = "All", selected = true, onClick = { })
            BrittaChip(label = "Web", selected = false, onClick = { })
        }`
      : null,
    cfg.list
      ? `        BrittaCard {
            Text("Compile tokens")
            Text("Parity pass")
        }`
      : null,
    cfg.fab
      ? `        BrittaFab(onClick = { }, icon = Icons.Outlined.Edit, extended = true, label = "${cfg.cta || "Action"}")`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

  return `import com.britta.design.*

@Composable
fun Screen() {
    BrittaTheme {
        Column(Modifier.fillMaxSize().background(MaterialTheme.colorScheme.surface)) {
${lines}
        }
    }
}`;
}
