import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  applySchemeToElement,
  DEFAULT_SEED,
  normalizeHex,
  schemeFromSeed,
  type ThemeMode,
} from "./palette";

type PlatformPref = "web" | "android";

type ThemeState = {
  mode: ThemeMode;
  seed: string;
  platform: PlatformPref;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  setSeed: (seed: string) => void;
  setPlatform: (platform: PlatformPref) => void;
};

export const useBrittaTheme = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "light",
      seed: DEFAULT_SEED,
      platform: "web",
      setMode: (mode) => set({ mode }),
      toggleMode: () =>
        set((s) => ({ mode: s.mode === "light" ? "dark" : "light" })),
      setSeed: (seed) => {
        const n = normalizeHex(seed);
        if (n) set({ seed: n });
      },
      setPlatform: (platform) => set({ platform }),
    }),
    { name: "britta-theme" },
  ),
);

const SchemeContext = createContext({
  mode: "light" as ThemeMode,
  seed: DEFAULT_SEED,
});

export function BrittaThemeRoot({ children }: { children: ReactNode }) {
  const mode = useBrittaTheme((s) => s.mode);
  const seed = useBrittaTheme((s) => s.seed);

  useEffect(() => {
    applySchemeToElement(document.documentElement, schemeFromSeed(seed, mode), mode);
  }, [mode, seed]);

  const value = useMemo(() => ({ mode, seed }), [mode, seed]);
  return <SchemeContext.Provider value={value}>{children}</SchemeContext.Provider>;
}

export function useScheme() {
  return useContext(SchemeContext);
}

export const THEME_BOOTSTRAP_SCRIPT = `(function(){try{var raw=localStorage.getItem("britta-theme");if(!raw)return;var data=JSON.parse(raw);var s=data.state||data;if(s.mode==="dark"){document.documentElement.dataset.theme="dark";document.documentElement.style.colorScheme="dark";}}catch(e){}})();`;
