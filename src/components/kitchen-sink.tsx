import { useMemo, useState } from "react";
import {
  BrittaButton,
  BrittaCard,
  BrittaChip,
  BrittaFab,
  BrittaIconButton,
  BrittaLinearProgress,
  BrittaListItem,
  BrittaNavBar,
  BrittaSearch,
  BrittaSheet,
  BrittaSwitch,
  BrittaTextField,
  BrittaTopAppBar,
} from "@/britta";
import { MdIcon } from "@/britta/icon";
import { schemeFromSeed } from "@/britta/palette";
import { useBrittaTheme } from "@/britta/theme";

type Task = { id: string; title: string; note: string; done: boolean };

const SEED_TASKS: Task[] = [
  { id: "1", title: "Compile tokens", note: "CSS + Kotlin", done: true },
  { id: "2", title: "Parity pass", note: "Button, field, chip", done: true },
  { id: "3", title: "Icon packs", note: "13 packs · Symbols", done: true },
  { id: "4", title: "Shader lab", note: "GLSL + AGSL", done: false },
];

const TOKEN_SWATCHES: { key: "primary" | "primaryContainer" | "secondaryContainer" | "tertiaryContainer" | "surface" | "surfaceContainerHigh" | "error" | "outline"; label: string }[] = [
  { key: "primary", label: "Primary" },
  { key: "primaryContainer", label: "P. cont" },
  { key: "secondaryContainer", label: "Secondary" },
  { key: "tertiaryContainer", label: "Tertiary" },
  { key: "surface", label: "Surface" },
  { key: "surfaceContainerHigh", label: "High" },
  { key: "error", label: "Error" },
  { key: "outline", label: "Outline" },
];

export function KitchenSink() {
  const [tab, setTab] = useState("today");
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useState<Task[]>(SEED_TASKS);
  const [sheet, setSheet] = useState(false);
  const [draft, setDraft] = useState("");
  const mode = useBrittaTheme((s) => s.mode);
  const toggleMode = useBrittaTheme((s) => s.toggleMode);
  const seed = useBrittaTheme((s) => s.seed);
  const scheme = useMemo(() => schemeFromSeed(seed, mode), [seed, mode]);

  const visible = tasks.filter((t) => {
    if (filter === "open" && t.done) return false;
    if (q && !t.title.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const titles: Record<string, string> = {
    today: "Today",
    kit: "Kit",
    tokens: "Tokens",
    you: "You",
  };

  function addTask() {
    const title = draft.trim();
    if (!title) return;
    setTasks((cur) => [
      { id: String(Date.now()), title, note: "Inbox", done: false },
      ...cur,
    ]);
    setDraft("");
    setSheet(false);
    setTab("today");
  }

  return (
    <div className="relative flex min-h-[460px] flex-col bg-surface">
      <BrittaTopAppBar
        title={titles[tab] ?? "Britta"}
        leading={<BrittaIconButton icon="menu" label="Menu" size={40} />}
        actions={<BrittaIconButton icon="account_circle" label="Account" />}
      />
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-3 pb-3">
        {tab === "today" ? (
          <>
            <BrittaSearch value={q} onChange={setQ} placeholder="Search tasks" />
            <div className="flex gap-2">
              <BrittaChip
                selected={filter === "all"}
                onClick={() => setFilter("all")}
              >
                All
              </BrittaChip>
              <BrittaChip
                selected={filter === "open"}
                onClick={() => setFilter("open")}
              >
                Open
              </BrittaChip>
            </div>
            <BrittaCard variant="filled" className="min-h-0 flex-1 overflow-auto p-1">
              {visible.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-on-surface-variant">
                  Nothing here
                </p>
              ) : (
                visible.map((t) => (
                  <BrittaListItem
                    key={t.id}
                    title={t.title}
                    supporting={t.note}
                    leading={
                      <MdIcon
                        name={t.done ? "check_circle" : "radio_button_unchecked"}
                        size={22}
                        filled={t.done}
                        className={t.done ? "text-primary" : undefined}
                      />
                    }
                    onClick={() =>
                      setTasks((cur) =>
                        cur.map((x) =>
                          x.id === t.id ? { ...x, done: !x.done } : x,
                        ),
                      )
                    }
                    trailing={
                      <MdIcon
                        name="chevron_right"
                        size={20}
                        className="text-on-surface-variant"
                      />
                    }
                  />
                ))
              )}
            </BrittaCard>
          </>
        ) : null}

        {tab === "kit" ? (
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <BrittaButton size="sm">Filled</BrittaButton>
              <BrittaButton size="sm" variant="tonal">
                Tonal
              </BrittaButton>
              <BrittaButton size="sm" variant="outlined">
                Out
              </BrittaButton>
            </div>
            <div className="flex flex-wrap gap-2">
              <BrittaChip selected icon="android">
                Compose
              </BrittaChip>
              <BrittaChip icon="language">Web</BrittaChip>
            </div>
            <BrittaCard variant="outlined" className="flex items-center justify-between">
              <div>
                <div className="text-xs text-on-surface-variant">Progress</div>
                <div className="text-sm font-medium">Token compile</div>
              </div>
              <span className="text-xs tabular-nums text-on-surface-variant">64%</span>
            </BrittaCard>
            <BrittaLinearProgress value={64} />
          </div>
        ) : null}

        {tab === "tokens" ? (
          <div className="grid grid-cols-4 gap-2">
            {TOKEN_SWATCHES.map((sw) => (
              <div key={sw.key} className="overflow-hidden rounded-lg ring-1 ring-outline-variant/50">
                <div className="h-10" style={{ background: scheme[sw.key] }} />
                <div className="truncate bg-surface-container-lowest px-1.5 py-1 text-[9px] text-on-surface-variant">
                  {sw.label}
                </div>
              </div>
            ))}
            <BrittaCard variant="filled" className="col-span-4 p-3">
              <div className="text-[11px] text-on-surface-variant">Seed</div>
              <div className="font-mono text-sm">{seed}</div>
            </BrittaCard>
          </div>
        ) : null}

        {tab === "you" ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 px-1 pt-1">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary-container font-display text-lg font-semibold text-on-primary-container">
                B
              </span>
              <div>
                <div className="font-medium">Britta Studio</div>
                <div className="text-xs text-on-surface-variant">
                  Shared tokens · two platforms
                </div>
              </div>
            </div>
            <BrittaCard variant="filled" className="flex items-center justify-between">
              <span className="text-sm">Dark theme</span>
              <BrittaSwitch checked={mode === "dark"} onChange={() => toggleMode()} />
            </BrittaCard>
            <BrittaListItem
              title="TypeScript kit"
              supporting="@/britta"
              leading={<MdIcon name="language" size={20} />}
            />
            <BrittaListItem
              title="Compose kit"
              supporting="com.britta.design"
              leading={<MdIcon name="android" size={20} />}
            />
          </div>
        ) : null}
      </div>
      {tab === "today" ? (
        <div className="relative">
          <div className="absolute -top-8 right-4 z-10">
            <BrittaFab aria-label="Add task" onClick={() => setSheet(true)} />
          </div>
        </div>
      ) : null}
      <BrittaNavBar
        value={tab}
        onChange={setTab}
        items={[
          { id: "today", label: "Today", icon: "home" },
          { id: "kit", label: "Kit", icon: "widgets" },
          { id: "tokens", label: "Tokens", icon: "palette" },
          { id: "you", label: "You", icon: "person" },
        ]}
      />
      <BrittaSheet
        contained
        open={sheet}
        onOpenChange={setSheet}
        title="New task"
        action={{ label: "Add", onClick: addTask }}
      >
        <BrittaTextField
          label="Title"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Compile Kotlin"
          leading="edit"
        />
      </BrittaSheet>
    </div>
  );
}
