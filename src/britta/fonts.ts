export type FontEntry = {
  id: string;
  name: string;
  role: string;
  google: string;
  cssVar: string;
  weights: number[];
  compose: string;
  specimen: string;
  className: string;
};

export const FONTS: FontEntry[] = [
  {
    id: "inter",
    name: "Inter",
    role: "Body and UI",
    google: "Inter",
    cssVar: "--font-sans",
    weights: [400, 500, 600, 700],
    compose: `val Inter = FontFamily(
    Font(GoogleFont("Inter"), provider, FontWeight.Normal),
    Font(GoogleFont("Inter"), provider, FontWeight.Medium),
    Font(GoogleFont("Inter"), provider, FontWeight.SemiBold)
)`,
    specimen: "Design once. Ship on Web and Android.",
    className: "font-sans",
  },
  {
    id: "outfit",
    name: "Outfit",
    role: "Display",
    google: "Outfit",
    cssVar: "--font-display",
    weights: [500, 600, 700],
    compose: `val Outfit = FontFamily(
    Font(GoogleFont("Outfit"), provider, FontWeight.Medium),
    Font(GoogleFont("Outfit"), provider, FontWeight.SemiBold)
)`,
    specimen: "Britta Design",
    className: "font-display",
  },
  {
    id: "jetbrains",
    name: "JetBrains Mono",
    role: "Code",
    google: "JetBrains Mono",
    cssVar: "--font-mono",
    weights: [400, 500],
    compose: `val JetBrainsMono = FontFamily(
    Font(GoogleFont("JetBrains Mono"), provider, FontWeight.Normal),
    Font(GoogleFont("JetBrains Mono"), provider, FontWeight.Medium)
)`,
    specimen: "fun BrittaTheme() { MaterialTheme(...) }",
    className: "font-mono",
  },
];

export const GOOGLE_FONTS_CSS =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700&family=JetBrains+Mono:wght@400;500&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap";

export const COMPOSE_FONT_PROVIDER = `val provider = GoogleFont.Provider(
    providerAuthority = "com.google.android.gms.fonts",
    providerPackage = "com.google.android.gms",
    certificates = R.array.com_google_android_gms_fonts_certs
)

val BrittaSans = FontFamily(
    Font(googleFont = GoogleFont("Inter"), fontProvider = provider, weight = FontWeight.Normal),
    Font(googleFont = GoogleFont("Inter"), fontProvider = provider, weight = FontWeight.Medium),
    Font(googleFont = GoogleFont("Inter"), fontProvider = provider, weight = FontWeight.SemiBold)
)

val BrittaDisplay = FontFamily(
    Font(googleFont = GoogleFont("Outfit"), fontProvider = provider, weight = FontWeight.SemiBold)
)
`;

export const TYPE_SPECIMENS = [
  { name: "Display large", className: "text-display-large font-display font-medium", sample: "Britta" },
  { name: "Headline large", className: "text-headline-large font-display font-semibold", sample: "Material 3" },
  { name: "Title large", className: "text-title-large font-medium", sample: "Jetpack Compose" },
  { name: "Body large", className: "text-body-large", sample: "One token source compiles to CSS variables and Kotlin Color / Dp / TextStyle." },
  { name: "Label large", className: "text-label-large font-medium tracking-wide", sample: "GET STARTED" },
];
