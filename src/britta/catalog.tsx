import { useState, type ReactNode } from "react";
import {
  BrittaAvatar,
  BrittaBadge,
  BrittaBanner,
  BrittaBarChart,
  BrittaButton,
  BrittaCard,
  BrittaCheckbox,
  BrittaChip,
  BrittaCircularProgress,
  BrittaDialog,
  BrittaDonut,
  BrittaFab,
  BrittaIconButton,
  BrittaLinearProgress,
  BrittaListItem,
  BrittaMenu,
  BrittaNavBar,
  BrittaNavRail,
  BrittaRadio,
  BrittaSearch,
  BrittaSegmented,
  BrittaSelect,
  BrittaShaderSurface,
  BrittaSheet,
  BrittaSlider,
  BrittaSnackbar,
  BrittaSparkline,
  BrittaSwitch,
  BrittaTabs,
  BrittaTextField,
  BrittaTooltip,
  BrittaTopAppBar,
} from "./index";
import { MdIcon } from "./icon";

export type CatalogCategory =
  | "actions"
  | "inputs"
  | "navigation"
  | "surfaces"
  | "feedback"
  | "graphics";

export type CatalogItem = {
  slug: string;
  name: string;
  category: CatalogCategory;
  blurb: string;
  Preview: () => ReactNode;
  playground?: () => ReactNode;
  tsx: string;
  kotlin: string;
};

export const CATEGORIES: { id: CatalogCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "actions", label: "Actions" },
  { id: "inputs", label: "Inputs" },
  { id: "navigation", label: "Navigation" },
  { id: "surfaces", label: "Surfaces" },
  { id: "feedback", label: "Feedback" },
  { id: "graphics", label: "Graphics" },
];

function ButtonsPreview() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <BrittaButton>Filled</BrittaButton>
      <BrittaButton variant="tonal">Tonal</BrittaButton>
      <BrittaButton variant="outlined">Outlined</BrittaButton>
      <BrittaButton variant="text">Text</BrittaButton>
    </div>
  );
}

function ButtonsPlayground() {
  const [disabled, setDisabled] = useState(false);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        <BrittaButton disabled={disabled} icon="add">
          Filled
        </BrittaButton>
        <BrittaButton variant="tonal" disabled={disabled} icon="edit">
          Tonal
        </BrittaButton>
        <BrittaButton variant="outlined" disabled={disabled}>
          Outlined
        </BrittaButton>
        <BrittaButton variant="text" disabled={disabled}>
          Text
        </BrittaButton>
        <BrittaButton variant="elevated" disabled={disabled} iconRight="arrow_forward">
          Elevated
        </BrittaButton>
      </div>
      <BrittaSwitch checked={disabled} onChange={setDisabled} label="Disabled" />
    </div>
  );
}

function IconButtonPreview() {
  return (
    <div className="flex items-center gap-2">
      <BrittaIconButton icon="favorite" label="Favorite" />
      <BrittaIconButton icon="favorite" label="Favorite filled" filled />
      <BrittaIconButton icon="share" label="Share" />
      <BrittaIconButton icon="more_vert" label="More" />
    </div>
  );
}

function FabPreview() {
  return (
    <div className="flex items-end gap-3">
      <BrittaFab size="sm" aria-label="Add" />
      <BrittaFab aria-label="Add" />
      <BrittaFab extended label="Compose" icon="edit" />
    </div>
  );
}

function ChipPreview() {
  const [sel, setSel] = useState("all");
  return (
    <div className="flex flex-wrap gap-2">
      {["all", "web", "android", "tokens"].map((id) => (
        <BrittaChip
          key={id}
          selected={sel === id}
          onClick={() => setSel(id)}
          icon={id === "all" ? "filter_list" : undefined}
        >
          {id[0]!.toUpperCase() + id.slice(1)}
        </BrittaChip>
      ))}
    </div>
  );
}

function SegmentedPreview() {
  const [v, setV] = useState("web");
  return (
    <BrittaSegmented
      value={v}
      onChange={setV}
      options={[
        { id: "web", label: "Web", icon: "language" },
        { id: "android", label: "Android", icon: "android" },
      ]}
    />
  );
}

function FieldPreview() {
  const [v, setV] = useState("");
  return (
    <div className="w-full max-w-sm">
      <BrittaTextField
        label="Email"
        placeholder="you@studio.dev"
        leading="mail"
        value={v}
        onChange={(e) => setV(e.target.value)}
        supporting="We never share this."
      />
    </div>
  );
}

function SearchPreview() {
  const [q, setQ] = useState("");
  return (
    <div className="w-full max-w-sm">
      <BrittaSearch value={q} onChange={setQ} placeholder="Search components" />
    </div>
  );
}

function SwitchPreview() {
  const [on, setOn] = useState(true);
  const [off, setOff] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <BrittaSwitch checked={on} onChange={setOn} label="Dark theme" />
      <BrittaSwitch checked={off} onChange={setOff} label="Compact density" />
    </div>
  );
}

function CheckRadioPreview() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [r, setR] = useState("light");
  return (
    <div className="flex flex-col gap-3">
      <BrittaCheckbox checked={a} onChange={setA} label="Generate CSS" />
      <BrittaCheckbox checked={b} onChange={setB} label="Generate Kotlin" />
      <div className="flex gap-4 pt-1">
        <BrittaRadio checked={r === "light"} onChange={() => setR("light")} label="Light" />
        <BrittaRadio checked={r === "dark"} onChange={() => setR("dark")} label="Dark" />
      </div>
    </div>
  );
}

function SliderPreview() {
  const [v, setV] = useState(42);
  return (
    <div className="w-full max-w-sm">
      <BrittaSlider value={v} onChange={setV} label="Emphasis" />
    </div>
  );
}

function CardPreview() {
  return (
    <BrittaCard variant="filled" className="w-full max-w-[200px]">
      <div className="text-sm font-medium">Filled card</div>
      <p className="mt-1 text-xs text-on-surface-variant">Highest container.</p>
    </BrittaCard>
  );
}

function ListPreview() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl bg-surface-container-low">
      <BrittaListItem
        title="Inter"
        supporting="Body and UI"
        leading={<MdIcon name="font_download" size={20} />}
        trailing={<MdIcon name="check" size={20} className="text-primary" />}
      />
      <BrittaListItem
        title="Outfit"
        supporting="Display"
        leading={<MdIcon name="title" size={20} />}
      />
      <BrittaListItem
        title="JetBrains Mono"
        supporting="Code"
        leading={<MdIcon name="code" size={20} />}
      />
    </div>
  );
}

function MenuPreview() {
  return (
    <BrittaMenu
      items={[
        { label: "Edit", icon: "edit" },
        { label: "Share", icon: "share" },
        { label: "Delete", icon: "delete", danger: true },
      ]}
    />
  );
}

function AppBarPreview() {
  return (
    <div className="w-full overflow-hidden rounded-xl ring-1 ring-outline-variant">
      <BrittaTopAppBar
        title="Britta"
        leading={<BrittaIconButton icon="menu" label="Menu" />}
        actions={
          <>
            <BrittaIconButton icon="search" label="Search" />
            <BrittaIconButton icon="more_vert" label="More" />
          </>
        }
      />
    </div>
  );
}

function NavBarPreview() {
  const [v, setV] = useState("home");
  return (
    <div className="w-full overflow-hidden rounded-xl ring-1 ring-outline-variant">
      <BrittaNavBar
        value={v}
        onChange={setV}
        items={[
          { id: "home", label: "Home", icon: "home" },
          { id: "browse", label: "Browse", icon: "explore" },
          { id: "saved", label: "Saved", icon: "bookmark" },
          { id: "you", label: "You", icon: "person" },
        ]}
      />
    </div>
  );
}

function TabsPreview() {
  const [v, setV] = useState("tsx");
  return (
    <div className="w-full">
      <BrittaTabs
        value={v}
        onChange={setV}
        items={[
          { id: "tsx", label: "TypeScript" },
          { id: "kt", label: "Kotlin" },
          { id: "css", label: "CSS" },
        ]}
      />
    </div>
  );
}

function ProgressPreview() {
  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-4">
      <BrittaLinearProgress value={64} />
      <div className="flex items-center gap-4">
        <BrittaCircularProgress />
        <BrittaCircularProgress indeterminate={false} value={64} />
        <span className="relative inline-flex">
          <BrittaIconButton icon="notifications" label="Alerts" />
          <BrittaBadge className="absolute -top-0.5 -right-0.5">3</BrittaBadge>
        </span>
      </div>
    </div>
  );
}

function DialogPlayground() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <BrittaButton onClick={() => setOpen(true)}>Open dialog</BrittaButton>
      <BrittaDialog
        open={open}
        onOpenChange={setOpen}
        title="Discard draft?"
        description="This will permanently delete the unsaved token changes."
        action={{ label: "Discard", onClick: () => setOpen(false) }}
      />
    </div>
  );
}

function SheetPlayground() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <BrittaButton onClick={() => setOpen(true)}>Open sheet</BrittaButton>
      <BrittaSheet
        open={open}
        onOpenChange={setOpen}
        title="New token"
        action={{ label: "Save", onClick: () => setOpen(false) }}
      >
        <p className="text-sm text-on-surface-variant">
          Modal bottom sheet. Compose maps this to ModalBottomSheet.
        </p>
      </BrittaSheet>
    </div>
  );
}

function SnackbarPlayground() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <BrittaButton variant="tonal" onClick={() => setOpen(true)}>
        Show snackbar
      </BrittaButton>
      <BrittaSnackbar
        open={open}
        message="Tokens compiled to CSS and Kotlin."
        action={{ label: "Undo", onClick: () => setOpen(false) }}
        onDismiss={() => setOpen(false)}
      />
    </div>
  );
}

function TooltipPreview() {
  return (
    <BrittaTooltip content="Copy token">
      <BrittaIconButton icon="content_copy" label="Copy" />
    </BrittaTooltip>
  );
}

function NavRailPreview() {
  const [v, setV] = useState("home");
  return (
    <div className="overflow-hidden rounded-xl bg-surface ring-1 ring-outline-variant">
      <BrittaNavRail
        value={v}
        onChange={setV}
        fab={<BrittaFab size="sm" aria-label="Add" />}
        items={[
          { id: "home", label: "Home", icon: "home" },
          { id: "kit", label: "Kit", icon: "widgets" },
          { id: "you", label: "You", icon: "person" },
        ]}
      />
    </div>
  );
}

function AvatarPreview() {
  return (
    <div className="flex items-center gap-3">
      <BrittaAvatar name="Britta Design" size="sm" />
      <BrittaAvatar name="Ada Lovelace" />
      <BrittaAvatar name="Jet Pack" size="lg" />
    </div>
  );
}

function SelectPreview() {
  const [v, setV] = useState("outlined");
  return (
    <div className="w-full max-w-xs">
      <BrittaSelect
        label="Variant"
        value={v}
        onChange={setV}
        options={[
          { id: "filled", label: "Filled" },
          { id: "outlined", label: "Outlined" },
          { id: "tonal", label: "Tonal" },
        ]}
      />
    </div>
  );
}

function BannerPreview() {
  return (
    <BrittaBanner
      icon="auto_awesome"
      title="Shader pack loaded"
      body="10 AGSL / GLSL surfaces, seed-tinted."
    />
  );
}

function ChartPreview() {
  return (
    <div className="flex w-full items-end gap-4">
      <BrittaDonut value={72} size={88} label="Parity" />
      <div className="min-w-0 flex-1">
        <BrittaSparkline />
      </div>
    </div>
  );
}

function BarsPreview() {
  return <BrittaBarChart className="w-full" />;
}

function ShaderPreview() {
  return (
    <BrittaShaderSurface shader="aurora" className="h-24 w-full" intensity={0.85}>
      <div className="flex h-24 items-end p-3">
        <span className="rounded-full bg-surface/80 px-2 py-0.5 text-[11px] font-medium">
          Aurora
        </span>
      </div>
    </BrittaShaderSurface>
  );
}

export const CATALOG: CatalogItem[] = [
  {
    slug: "button",
    name: "Button",
    category: "actions",
    blurb: "Filled, tonal, outlined, text, and elevated — one API on web and Compose.",
    Preview: ButtonsPreview,
    playground: ButtonsPlayground,
    tsx: `import { BrittaButton } from "@/britta";

<BrittaButton>Save</BrittaButton>
<BrittaButton variant="tonal" icon="edit">Edit</BrittaButton>
<BrittaButton variant="outlined">Cancel</BrittaButton>
<BrittaButton variant="text">Learn more</BrittaButton>
<BrittaButton variant="elevated" iconRight="arrow_forward">
  Continue
</BrittaButton>`,
    kotlin: `@Composable
fun Sample() {
    BrittaButton(text = "Save", onClick = { })
    BrittaButton(
        text = "Edit",
        variant = BrittaButtonVariant.Tonal,
        icon = Icons.Outlined.Edit,
        onClick = { }
    )
    BrittaButton(
        text = "Cancel",
        variant = BrittaButtonVariant.Outlined,
        onClick = { }
    )
}`,
  },
  {
    slug: "icon-button",
    name: "Icon button",
    category: "actions",
    blurb: "48×48 hit target around a 24px Material Symbol.",
    Preview: IconButtonPreview,
    tsx: `<BrittaIconButton icon="favorite" label="Favorite" />
<BrittaIconButton icon="favorite" label="Favorite" filled />`,
    kotlin: `IconButton(onClick = { }) {
    Icon(Icons.Outlined.Favorite, contentDescription = "Favorite")
}`,
  },
  {
    slug: "fab",
    name: "FAB",
    category: "actions",
    blurb: "Primary construction action. Small, regular, large, or extended.",
    Preview: FabPreview,
    tsx: `<BrittaFab aria-label="Add" />
<BrittaFab extended icon="edit" label="Compose" />`,
    kotlin: `FloatingActionButton(onClick = { }) {
    Icon(Icons.Outlined.Add, contentDescription = "Add")
}
ExtendedFloatingActionButton(
    text = { Text("Compose") },
    icon = { Icon(Icons.Outlined.Edit, null) },
    onClick = { }
)`,
  },
  {
    slug: "chip",
    name: "Chip",
    category: "actions",
    blurb: "Assist and filter chips with selected tonal container.",
    Preview: ChipPreview,
    tsx: `<BrittaChip selected onClick={() => {}}>Android</BrittaChip>
<BrittaChip onClick={() => {}}>Web</BrittaChip>`,
    kotlin: `FilterChip(
    selected = true,
    onClick = { },
    label = { Text("Android") }
)`,
  },
  {
    slug: "segmented",
    name: "Segmented button",
    category: "actions",
    blurb: "Exclusive choice, mapped 1:1 to Compose SingleChoiceSegmentedButtonRow.",
    Preview: SegmentedPreview,
    tsx: `<BrittaSegmented
  value={platform}
  onChange={setPlatform}
  options={[
    { id: "web", label: "Web", icon: "language" },
    { id: "android", label: "Android", icon: "android" },
  ]}
/>`,
    kotlin: `SingleChoiceSegmentedButtonRow {
    SegmentedButton(selected = true, onClick = { }, shape = ...) {
        Text("Web")
    }
    SegmentedButton(selected = false, onClick = { }, shape = ...) {
        Text("Android")
    }
}`,
  },
  {
    slug: "text-field",
    name: "Text field",
    category: "inputs",
    blurb: "Outlined 56px field with leading icon and supporting text.",
    Preview: FieldPreview,
    tsx: `<BrittaTextField
  label="Email"
  leading="mail"
  placeholder="you@studio.dev"
  supporting="We never share this."
/>`,
    kotlin: `OutlinedTextField(
    value = email,
    onValueChange = { email = it },
    label = { Text("Email") },
    leadingIcon = { Icon(Icons.Outlined.Mail, null) }
)`,
  },
  {
    slug: "search",
    name: "Search",
    category: "inputs",
    blurb: "Docked search bar. Same 48px height on web and Android.",
    Preview: SearchPreview,
    tsx: `<BrittaSearch value={q} onChange={setQ} placeholder="Search components" />`,
    kotlin: `DockedSearchBar(
    query = q,
    onQueryChange = { q = it },
    onSearch = { },
    active = false,
    onActiveChange = { }
) { }`,
  },
  {
    slug: "switch",
    name: "Switch",
    category: "inputs",
    blurb: "M3 switch with check glyph on the selected handle.",
    Preview: SwitchPreview,
    tsx: `<BrittaSwitch checked={dark} onChange={setDark} label="Dark theme" />`,
    kotlin: `Switch(checked = dark, onCheckedChange = { dark = it })`,
  },
  {
    slug: "selection",
    name: "Checkbox & radio",
    category: "inputs",
    blurb: "Expanded 44px hit area. Error/disabled states share tokens.",
    Preview: CheckRadioPreview,
    tsx: `<BrittaCheckbox checked={css} onChange={setCss} label="Generate CSS" />
<BrittaRadio checked={mode === "light"} onChange={() => setMode("light")} label="Light" />`,
    kotlin: `Checkbox(checked = css, onCheckedChange = { css = it })
RadioButton(selected = light, onClick = { light = true })`,
  },
  {
    slug: "slider",
    name: "Slider",
    category: "inputs",
    blurb: "Continuous slider with primary track and haloed thumb.",
    Preview: SliderPreview,
    tsx: `<BrittaSlider value={emphasis} onChange={setEmphasis} label="Emphasis" />`,
    kotlin: `Slider(value = emphasis, onValueChange = { emphasis = it })`,
  },
  {
    slug: "card",
    name: "Card",
    category: "surfaces",
    blurb: "Elevated, filled, and outlined. Concentric 12px radius on 16px padding.",
    Preview: CardPreview,
    tsx: `<BrittaCard variant="elevated">…</BrittaCard>
<BrittaCard variant="filled">…</BrittaCard>
<BrittaCard variant="outlined">…</BrittaCard>`,
    kotlin: `Card(colors = CardDefaults.elevatedCardColors()) { }
Card(colors = CardDefaults.cardColors()) { }
OutlinedCard { }`,
  },
  {
    slug: "list",
    name: "List item",
    category: "surfaces",
    blurb: "One, two, and three-line rows with leading avatar and trailing control.",
    Preview: ListPreview,
    tsx: `<BrittaListItem
  title="Inter"
  supporting="Body and UI"
  leading={<MdIcon name="font_download" />}
/>`,
    kotlin: `ListItem(
    headlineContent = { Text("Inter") },
    supportingContent = { Text("Body and UI") },
    leadingContent = { Icon(Icons.Outlined.FontDownload, null) }
)`,
  },
  {
    slug: "menu",
    name: "Menu",
    category: "surfaces",
    blurb: "Surface-container sheet, 8px items, danger row in error.",
    Preview: MenuPreview,
    tsx: `<BrittaMenu items={[
  { label: "Edit", icon: "edit" },
  { label: "Delete", icon: "delete", danger: true },
]} />`,
    kotlin: `DropdownMenu(expanded = open, onDismissRequest = { open = false }) {
    DropdownMenuItem(text = { Text("Edit") }, onClick = { })
    DropdownMenuItem(text = { Text("Delete") }, onClick = { })
}`,
  },
  {
    slug: "app-bar",
    name: "Top app bar",
    category: "navigation",
    blurb: "Small bar, 64px, center-aligned optional. Compose SmallTopAppBar.",
    Preview: AppBarPreview,
    tsx: `<BrittaTopAppBar
  title="Britta"
  leading={<BrittaIconButton icon="menu" label="Menu" />}
/>`,
    kotlin: `TopAppBar(
    title = { Text("Britta") },
    navigationIcon = {
        IconButton(onClick = { }) {
            Icon(Icons.Outlined.Menu, contentDescription = "Menu")
        }
    }
)`,
  },
  {
    slug: "nav-bar",
    name: "Navigation bar",
    category: "navigation",
    blurb: "3–5 destinations. Selected indicator uses secondary container.",
    Preview: NavBarPreview,
    tsx: `<BrittaNavBar
  value={tab}
  onChange={setTab}
  items={[
    { id: "home", label: "Home", icon: "home" },
    { id: "browse", label: "Browse", icon: "explore" },
  ]}
/>`,
    kotlin: `NavigationBar {
    NavigationBarItem(
        selected = true,
        onClick = { },
        icon = { Icon(Icons.Outlined.Home, null) },
        label = { Text("Home") }
    )
}`,
  },
  {
    slug: "tabs",
    name: "Tabs",
    category: "navigation",
    blurb: "Primary tabs with a 3px indicator. Used for TS / Kotlin / CSS.",
    Preview: TabsPreview,
    tsx: `<BrittaTabs
  value={lang}
  onChange={setLang}
  items={[
    { id: "tsx", label: "TypeScript" },
    { id: "kt", label: "Kotlin" },
  ]}
/>`,
    kotlin: `TabRow(selectedTabIndex = 0) {
    Tab(selected = true, onClick = { }, text = { Text("TypeScript") })
    Tab(selected = false, onClick = { }, text = { Text("Kotlin") })
}`,
  },
  {
    slug: "progress",
    name: "Progress & badge",
    category: "feedback",
    blurb: "Linear, circular, determinate. Badge sits on the error role.",
    Preview: ProgressPreview,
    tsx: `<BrittaLinearProgress value={64} />
<BrittaCircularProgress />
<BrittaBadge>3</BrittaBadge>`,
    kotlin: `LinearProgressIndicator(progress = { 0.64f })
CircularProgressIndicator()
BadgedBox(badge = { Badge { Text("3") } }) { }`,
  },
  {
    slug: "dialog",
    name: "Dialog",
    category: "surfaces",
    blurb: "Basic 28px-radius sheet. Maps to Compose AlertDialog / BasicAlertDialog.",
    Preview: DialogPlayground,
    playground: DialogPlayground,
    tsx: `<BrittaDialog
  open={open}
  onOpenChange={setOpen}
  title="Discard draft?"
  description="This will permanently delete unsaved changes."
  action={{ label: "Discard", onClick: discard }}
/>`,
    kotlin: `AlertDialog(
    onDismissRequest = { open = false },
    title = { Text("Discard draft?") },
    text = { Text("This will permanently delete unsaved changes.") },
    confirmButton = {
        TextButton(onClick = { discard() }) { Text("Discard") }
    },
    dismissButton = {
        TextButton(onClick = { open = false }) { Text("Cancel") }
    }
)`,
  },
  {
    slug: "sheet",
    name: "Bottom sheet",
    category: "surfaces",
    blurb: "Modal sheet from the bottom edge. Compose ModalBottomSheet.",
    Preview: SheetPlayground,
    playground: SheetPlayground,
    tsx: `<BrittaSheet
  open={open}
  onOpenChange={setOpen}
  title="New token"
  action={{ label: "Save", onClick: save }}
>
  <BrittaTextField label="Name" />
</BrittaSheet>`,
    kotlin: `@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TokenSheet(visible: Boolean, onDismiss: () -> Unit) {
    if (!visible) return
    ModalBottomSheet(onDismissRequest = onDismiss) {
        Text("New token")
    }
}`,
  },
  {
    slug: "snackbar",
    name: "Snackbar",
    category: "feedback",
    blurb: "Inverse-surface bar with optional action. Compose SnackbarHost.",
    Preview: SnackbarPlayground,
    playground: SnackbarPlayground,
    tsx: `<BrittaSnackbar
  open={open}
  message="Tokens compiled."
  action={{ label: "Undo", onClick: undo }}
  onDismiss={() => setOpen(false)}
/>`,
    kotlin: `SnackbarHost(hostState) { data ->
    Snackbar(snackbarData = data)
}`,
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    category: "feedback",
    blurb: "Plain inverse label. Compose PlainTooltip / RichTooltip.",
    Preview: TooltipPreview,
    tsx: `<BrittaTooltip content="Copy token">
  <BrittaIconButton icon="content_copy" label="Copy" />
</BrittaTooltip>`,
    kotlin: `TooltipBox(
    positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
    tooltip = { PlainTooltip { Text("Copy token") } },
    state = rememberTooltipState()
) {
    IconButton(onClick = { }) {
        Icon(Icons.Outlined.ContentCopy, contentDescription = "Copy")
    }
}`,
  },
  {
    slug: "nav-rail",
    name: "Navigation rail",
    category: "navigation",
    blurb: "Tablet / desktop destinations. Compose NavigationRail.",
    Preview: NavRailPreview,
    tsx: `<BrittaNavRail
  value={tab}
  onChange={setTab}
  fab={<BrittaFab size="sm" aria-label="Add" />}
  items={[{ id: "home", label: "Home", icon: "home" }]}
/>`,
    kotlin: `NavigationRail(header = { SmallFloatingActionButton(onClick = { }) {
    Icon(Icons.Outlined.Add, null)
} }) {
    NavigationRailItem(
        selected = true,
        onClick = { },
        icon = { Icon(Icons.Outlined.Home, null) },
        label = { Text("Home") }
    )
}`,
  },
  {
    slug: "avatar",
    name: "Avatar",
    category: "feedback",
    blurb: "Initials on primary-container. Compose maps to BrittaAvatar.",
    Preview: AvatarPreview,
    tsx: `<BrittaAvatar name="Ada Lovelace" />
<BrittaAvatar name="Jet Pack" size="lg" />`,
    kotlin: `BrittaAvatar(name = "Ada Lovelace")
BrittaAvatar(name = "Jet Pack", size = BrittaAvatarSize.Large)`,
  },
  {
    slug: "select",
    name: "Select",
    category: "inputs",
    blurb: "Outlined 56px menu. Compose ExposedDropdownMenuBox.",
    Preview: SelectPreview,
    tsx: `<BrittaSelect
  label="Variant"
  value={variant}
  onChange={setVariant}
  options={[
    { id: "filled", label: "Filled" },
    { id: "outlined", label: "Outlined" },
  ]}
/>`,
    kotlin: `ExposedDropdownMenuBox(expanded = open, onExpandedChange = { open = it }) {
    OutlinedTextField(value = variant, onValueChange = {}, readOnly = true)
}`,
  },
  {
    slug: "banner",
    name: "Banner",
    category: "feedback",
    blurb: "Inline status on secondary-container. Compose MaterialBanner.",
    Preview: BannerPreview,
    tsx: `<BrittaBanner
  icon="auto_awesome"
  title="Shader pack loaded"
  body="10 AGSL / GLSL surfaces, seed-tinted."
/>`,
    kotlin: `BrittaBanner(
    title = "Shader pack loaded",
    body = "10 AGSL / GLSL surfaces, seed-tinted.",
    icon = Icons.Outlined.AutoAwesome
)`,
  },
  {
    slug: "charts",
    name: "Charts",
    category: "graphics",
    blurb: "Sparkline, donut, bars, area — token-colored SVG. Compose Canvas.",
    Preview: ChartPreview,
    tsx: `<BrittaDonut value={72} label="Parity" />
<BrittaSparkline values={[8, 12, 9, 16, 22, 18, 26]} />
<BrittaBarChart data={[{ label: "Web", value: 42 }]} />`,
    kotlin: `BrittaDonut(value = 72f, label = "Parity")
BrittaSparkline(values = listOf(8f, 12f, 9f, 16f, 22f))
BrittaBarChart(data = listOf(BrittaSeries("Web", 42f)))`,
  },
  {
    slug: "bars",
    name: "Bar chart",
    category: "graphics",
    blurb: "Four-role bars using primary, secondary, tertiary, container.",
    Preview: BarsPreview,
    tsx: `<BrittaBarChart data={[
  { label: "Web", value: 42 },
  { label: "Android", value: 38 },
]} />`,
    kotlin: `BrittaBarChart(
    data = listOf(
        BrittaSeries("Web", 42f),
        BrittaSeries("Android", 38f)
    )
)`,
  },
  {
    slug: "shader-surface",
    name: "Shader surface",
    category: "graphics",
    blurb: "WebGL2 / AGSL background. Same uniforms, seed-tinted.",
    Preview: ShaderPreview,
    tsx: `<BrittaShaderSurface shader="aurora" intensity={0.85}>
  <p>Design once.</p>
</BrittaShaderSurface>`,
    kotlin: `@RequiresApi(33)
@Composable
fun Hero() {
    BrittaShaderSurface(id = "aurora") {
        Text("Design once.")
    }
}`,
  },
];

export function getCatalog(slug: string) {
  return CATALOG.find((c) => c.slug === slug);
}
