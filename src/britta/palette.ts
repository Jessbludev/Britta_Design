/** Material 3-inspired tonal palettes from a single seed color. */

export type ThemeMode = "light" | "dark";

export type MdScheme = {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  onSurfaceVariant: string;
  surfaceDim: string;
  surfaceBright: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  outline: string;
  outlineVariant: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  scrim: string;
  shadow: string;
  surfaceTint: string;
};

export const DEFAULT_SEED = "#6750A4";

export const SEED_PRESETS: { name: string; seed: string }[] = [
  { name: "Britta", seed: "#6750A4" },
  { name: "Ink", seed: "#355070" },
  { name: "Teal", seed: "#0F6C6C" },
  { name: "Olive", seed: "#4A6B2F" },
  { name: "Clay", seed: "#8B4A3A" },
  { name: "Slate", seed: "#3D4C5F" },
];

/** Canonical Material 3 baseline (seed #6750A4). */
export const OFFICIAL_LIGHT: MdScheme = {
  primary: "#6750A4",
  onPrimary: "#FFFFFF",
  primaryContainer: "#EADDFF",
  onPrimaryContainer: "#21005D",
  secondary: "#625B71",
  onSecondary: "#FFFFFF",
  secondaryContainer: "#E8DEF8",
  onSecondaryContainer: "#1D192B",
  tertiary: "#7D5260",
  onTertiary: "#FFFFFF",
  tertiaryContainer: "#FFD8E4",
  onTertiaryContainer: "#31111D",
  error: "#B3261E",
  onError: "#FFFFFF",
  errorContainer: "#F9DEDC",
  onErrorContainer: "#410E0B",
  background: "#FFFBFE",
  onBackground: "#1C1B1F",
  surface: "#FFFBFE",
  onSurface: "#1C1B1F",
  onSurfaceVariant: "#49454F",
  surfaceDim: "#DED8E1",
  surfaceBright: "#FFFBFE",
  surfaceContainerLowest: "#FFFFFF",
  surfaceContainerLow: "#F7F2FA",
  surfaceContainer: "#F3EDF7",
  surfaceContainerHigh: "#ECE6F0",
  surfaceContainerHighest: "#E6E0E9",
  outline: "#79747E",
  outlineVariant: "#CAC4D0",
  inverseSurface: "#313033",
  inverseOnSurface: "#F4EFF4",
  inversePrimary: "#D0BCFF",
  scrim: "#000000",
  shadow: "#000000",
  surfaceTint: "#6750A4",
};

export const OFFICIAL_DARK: MdScheme = {
  primary: "#D0BCFF",
  onPrimary: "#381E72",
  primaryContainer: "#4F378B",
  onPrimaryContainer: "#EADDFF",
  secondary: "#CCC2DC",
  onSecondary: "#332D41",
  secondaryContainer: "#4A4458",
  onSecondaryContainer: "#E8DEF8",
  tertiary: "#EFB8C8",
  onTertiary: "#492532",
  tertiaryContainer: "#633B48",
  onTertiaryContainer: "#FFD8E4",
  error: "#F2B8B5",
  onError: "#601410",
  errorContainer: "#8C1D18",
  onErrorContainer: "#F9DEDC",
  background: "#1C1B1F",
  onBackground: "#E6E1E5",
  surface: "#1C1B1F",
  onSurface: "#E6E1E5",
  onSurfaceVariant: "#CAC4D0",
  surfaceDim: "#1C1B1F",
  surfaceBright: "#3B383E",
  surfaceContainerLowest: "#0F0E11",
  surfaceContainerLow: "#1C1B1F",
  surfaceContainer: "#201F23",
  surfaceContainerHigh: "#2B2930",
  surfaceContainerHighest: "#36343B",
  outline: "#938F99",
  outlineVariant: "#49454F",
  inverseSurface: "#E6E1E5",
  inverseOnSurface: "#313033",
  inversePrimary: "#6750A4",
  scrim: "#000000",
  shadow: "#000000",
  surfaceTint: "#D0BCFF",
};

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n));
}

export function normalizeHex(input: string): string | null {
  let h = input.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(h)) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return `#${h.toUpperCase()}`;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const n = normalizeHex(hex) ?? DEFAULT_SEED;
  const v = parseInt(n.slice(1), 16);
  return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const h = (n: number) =>
    Math.round(clamp(n, 0, 255))
      .toString(16)
      .padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`.toUpperCase();
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const { r, g, b } = hexToRgb(hex);
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;
  const max = Math.max(r1, g1, b1);
  const min = Math.min(r1, g1, b1);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: l * 100 };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r1) h = (g1 - b1) / d + (g1 < b1 ? 6 : 0);
  else if (max === g1) h = (b1 - r1) / d + 2;
  else h = (r1 - g1) / d + 4;
  return { h: h * 60, s: s * 100, l: l * 100 };
}

function hue2rgb(p: number, q: number, t: number) {
  let x = t;
  if (x < 0) x += 1;
  if (x > 1) x -= 1;
  if (x < 1 / 6) return p + (q - p) * 6 * x;
  if (x < 1 / 2) return q;
  if (x < 2 / 3) return p + (q - p) * (2 / 3 - x) * 6;
  return p;
}

export function hslToHex(h: number, s: number, l: number): string {
  const hh = ((h % 360) + 360) % 360;
  const ss = clamp(s / 100);
  const ll = clamp(l / 100);
  if (ss === 0) {
    const v = ll * 255;
    return rgbToHex(v, v, v);
  }
  const q = ll < 0.5 ? ll * (1 + ss) : ll + ss - ll * ss;
  const p = 2 * ll - q;
  const hk = hh / 360;
  const r = hue2rgb(p, q, hk + 1 / 3) * 255;
  const g = hue2rgb(p, q, hk) * 255;
  const b = hue2rgb(p, q, hk - 1 / 3) * 255;
  return rgbToHex(r, g, b);
}

/** Approximate M3 tone (0 = black, 100 = white) while keeping hue. */
export function tone(hex: string, t: number, satMul = 1): string {
  const { h, s } = hexToHsl(hex);
  const toneClamped = clamp(t, 0, 100);
  const falloff = Math.pow(Math.abs(toneClamped - 50) / 50, 1.15);
  const chroma = s * satMul * (1 - falloff * 0.42);
  return hslToHex(h, chroma, toneClamped);
}

function shiftHue(hex: string, deg: number): string {
  const { h, s, l } = hexToHsl(hex);
  return hslToHex(h + deg, s, l);
}

function neutral(seed: string, t: number): string {
  return tone(seed, t, 0.14);
}

export function schemeFromSeed(seed: string, mode: ThemeMode): MdScheme {
  const s = normalizeHex(seed) ?? DEFAULT_SEED;
  if (s === DEFAULT_SEED) {
    return mode === "light" ? OFFICIAL_LIGHT : OFFICIAL_DARK;
  }
  const secondary = shiftHue(s, 18);
  const tertiary = shiftHue(s, -52);
  const error = "#B3261E";
  const light = mode === "light";

  if (light) {
    return {
      primary: tone(s, 40),
      onPrimary: tone(s, 100, 0),
      primaryContainer: tone(s, 90),
      onPrimaryContainer: tone(s, 12),
      secondary: tone(secondary, 40, 0.55),
      onSecondary: "#FFFFFF",
      secondaryContainer: tone(secondary, 90, 0.45),
      onSecondaryContainer: tone(secondary, 14, 0.5),
      tertiary: tone(tertiary, 38, 0.7),
      onTertiary: "#FFFFFF",
      tertiaryContainer: tone(tertiary, 90, 0.55),
      onTertiaryContainer: tone(tertiary, 14, 0.6),
      error: tone(error, 40),
      onError: "#FFFFFF",
      errorContainer: tone(error, 90),
      onErrorContainer: tone(error, 12),
      background: neutral(s, 98.5),
      onBackground: neutral(s, 11),
      surface: neutral(s, 98.5),
      onSurface: neutral(s, 11),
      onSurfaceVariant: tone(s, 32, 0.28),
      surfaceDim: neutral(s, 87),
      surfaceBright: neutral(s, 98.5),
      surfaceContainerLowest: "#FFFFFF",
      surfaceContainerLow: neutral(s, 96.5),
      surfaceContainer: neutral(s, 94.5),
      surfaceContainerHigh: neutral(s, 92.5),
      surfaceContainerHighest: neutral(s, 90),
      outline: tone(s, 50, 0.22),
      outlineVariant: tone(s, 80, 0.18),
      inverseSurface: neutral(s, 20),
      inverseOnSurface: neutral(s, 95),
      inversePrimary: tone(s, 80),
      scrim: "#000000",
      shadow: "#000000",
      surfaceTint: tone(s, 40),
    };
  }

  return {
    primary: tone(s, 80),
    onPrimary: tone(s, 18),
    primaryContainer: tone(s, 30),
    onPrimaryContainer: tone(s, 90),
    secondary: tone(secondary, 80, 0.5),
    onSecondary: tone(secondary, 18, 0.5),
    secondaryContainer: tone(secondary, 28, 0.4),
    onSecondaryContainer: tone(secondary, 90, 0.4),
    tertiary: tone(tertiary, 80, 0.65),
    onTertiary: tone(tertiary, 18, 0.6),
    tertiaryContainer: tone(tertiary, 28, 0.5),
    onTertiaryContainer: tone(tertiary, 90, 0.5),
    error: tone(error, 80),
    onError: tone(error, 18),
    errorContainer: tone(error, 28),
    onErrorContainer: tone(error, 90),
    background: neutral(s, 6.5),
    onBackground: neutral(s, 90),
    surface: neutral(s, 6.5),
    onSurface: neutral(s, 90),
    onSurfaceVariant: tone(s, 80, 0.22),
    surfaceDim: neutral(s, 6.5),
    surfaceBright: neutral(s, 24),
    surfaceContainerLowest: neutral(s, 4),
    surfaceContainerLow: neutral(s, 10),
    surfaceContainer: neutral(s, 12.5),
    surfaceContainerHigh: neutral(s, 17),
    surfaceContainerHighest: neutral(s, 22),
    outline: tone(s, 62, 0.2),
    outlineVariant: tone(s, 30, 0.18),
    inverseSurface: neutral(s, 90),
    inverseOnSurface: neutral(s, 18),
    inversePrimary: tone(s, 40),
    scrim: "#000000",
    shadow: "#000000",
    surfaceTint: tone(s, 80),
  };
}

const CSS_KEYS: Record<keyof MdScheme, string> = {
  primary: "--md-primary",
  onPrimary: "--md-on-primary",
  primaryContainer: "--md-primary-container",
  onPrimaryContainer: "--md-on-primary-container",
  secondary: "--md-secondary",
  onSecondary: "--md-on-secondary",
  secondaryContainer: "--md-secondary-container",
  onSecondaryContainer: "--md-on-secondary-container",
  tertiary: "--md-tertiary",
  onTertiary: "--md-on-tertiary",
  tertiaryContainer: "--md-tertiary-container",
  onTertiaryContainer: "--md-on-tertiary-container",
  error: "--md-error",
  onError: "--md-on-error",
  errorContainer: "--md-error-container",
  onErrorContainer: "--md-on-error-container",
  background: "--md-background",
  onBackground: "--md-on-background",
  surface: "--md-surface",
  onSurface: "--md-on-surface",
  onSurfaceVariant: "--md-on-surface-variant",
  surfaceDim: "--md-surface-dim",
  surfaceBright: "--md-surface-bright",
  surfaceContainerLowest: "--md-surface-container-lowest",
  surfaceContainerLow: "--md-surface-container-low",
  surfaceContainer: "--md-surface-container",
  surfaceContainerHigh: "--md-surface-container-high",
  surfaceContainerHighest: "--md-surface-container-highest",
  outline: "--md-outline",
  outlineVariant: "--md-outline-variant",
  inverseSurface: "--md-inverse-surface",
  inverseOnSurface: "--md-inverse-on-surface",
  inversePrimary: "--md-inverse-primary",
  scrim: "--md-scrim",
  shadow: "--md-shadow",
  surfaceTint: "--md-surface-tint",
};

export function schemeToCssVars(scheme: MdScheme): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of Object.keys(CSS_KEYS) as (keyof MdScheme)[]) {
    out[CSS_KEYS[key]] = scheme[key];
  }
  return out;
}

export function applySchemeToElement(
  el: HTMLElement,
  scheme: MdScheme,
  mode: ThemeMode,
) {
  const vars = schemeToCssVars(scheme);
  for (const [k, v] of Object.entries(vars)) el.style.setProperty(k, v);
  el.dataset.theme = mode;
  el.style.colorScheme = mode;
}

export function hexToArgb(hex: string): string {
  const n = normalizeHex(hex) ?? DEFAULT_SEED;
  return `0xFF${n.slice(1)}`;
}

export function tonalRamp(hex: string, satMul = 1): { tone: number; hex: string }[] {
  const steps = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
  return steps.map((t) => ({ tone: t, hex: tone(hex, t, satMul) }));
}

export const SCHEME_ROLES: { key: keyof MdScheme; label: string }[] = [
  { key: "primary", label: "Primary" },
  { key: "onPrimary", label: "On primary" },
  { key: "primaryContainer", label: "Primary container" },
  { key: "onPrimaryContainer", label: "On primary container" },
  { key: "secondary", label: "Secondary" },
  { key: "onSecondary", label: "On secondary" },
  { key: "secondaryContainer", label: "Secondary container" },
  { key: "onSecondaryContainer", label: "On secondary container" },
  { key: "tertiary", label: "Tertiary" },
  { key: "onTertiary", label: "On tertiary" },
  { key: "tertiaryContainer", label: "Tertiary container" },
  { key: "onTertiaryContainer", label: "On tertiary container" },
  { key: "error", label: "Error" },
  { key: "onError", label: "On error" },
  { key: "errorContainer", label: "Error container" },
  { key: "onErrorContainer", label: "On error container" },
  { key: "background", label: "Background" },
  { key: "onBackground", label: "On background" },
  { key: "surface", label: "Surface" },
  { key: "onSurface", label: "On surface" },
  { key: "onSurfaceVariant", label: "On surface variant" },
  { key: "surfaceContainerLowest", label: "Surface container lowest" },
  { key: "surfaceContainerLow", label: "Surface container low" },
  { key: "surfaceContainer", label: "Surface container" },
  { key: "surfaceContainerHigh", label: "Surface container high" },
  { key: "surfaceContainerHighest", label: "Surface container highest" },
  { key: "outline", label: "Outline" },
  { key: "outlineVariant", label: "Outline variant" },
  { key: "inverseSurface", label: "Inverse surface" },
  { key: "inverseOnSurface", label: "Inverse on surface" },
  { key: "inversePrimary", label: "Inverse primary" },
];
