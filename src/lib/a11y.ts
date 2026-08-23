import { create } from "zustand";

export type FontScale = "md" | "lg" | "xl" | "xxl";
export type Contrast = "standard" | "high" | "dark" | "yellow";
export type Spacing = "normal" | "loose";

export type A11ySettings = {
  fontScale: FontScale;
  contrast: Contrast;
  spacing: Spacing;
  underlineLinks: boolean;
  easyRead: boolean;
  reduceMotion: boolean;
};

const DEFAULTS: A11ySettings = {
  fontScale: "lg",
  contrast: "standard",
  spacing: "normal",
  underlineLinks: false,
  easyRead: false,
  reduceMotion: false,
};

const KEY = "cz-a11y";

function themeColor(contrast: Contrast) {
  if (contrast === "dark" || contrast === "yellow") return "#000000";
  if (contrast === "high") return "#ffffff";
  return "#1B4D47";
}

export function applyA11y(s: A11ySettings) {
  if (typeof document === "undefined") return;
  const d = document.documentElement;
  d.dataset.type = s.fontScale;
  d.dataset.contrast = s.contrast;
  d.dataset.spacing = s.spacing;
  d.dataset.links = s.underlineLinks ? "on" : "off";
  d.dataset.easy = s.easyRead ? "on" : "off";
  d.dataset.motion = s.reduceMotion ? "reduce" : "ok";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", themeColor(s.contrast));
}

function persist(s: A11ySettings) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

export function loadA11y(): A11ySettings {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<A11ySettings>;
      return { ...DEFAULTS, ...parsed };
    }
    const fontScale = (localStorage.getItem("cz-a11y-font") as FontScale) || DEFAULTS.fontScale;
    const contrast = (localStorage.getItem("cz-a11y-contrast") as Contrast) || DEFAULTS.contrast;
    return { ...DEFAULTS, fontScale, contrast };
  } catch {
    return { ...DEFAULTS };
  }
}

function pick(s: A11yState): A11ySettings {
  return {
    fontScale: s.fontScale,
    contrast: s.contrast,
    spacing: s.spacing,
    underlineLinks: s.underlineLinks,
    easyRead: s.easyRead,
    reduceMotion: s.reduceMotion,
  };
}

type A11yState = A11ySettings & {
  setFontScale: (v: FontScale) => void;
  setContrast: (v: Contrast) => void;
  setSpacing: (v: Spacing) => void;
  setUnderlineLinks: (v: boolean) => void;
  setEasyRead: (v: boolean) => void;
  setReduceMotion: (v: boolean) => void;
  patch: (partial: Partial<A11ySettings>) => void;
  reset: () => void;
  hydrate: () => void;
};

function commit(set: (p: Partial<A11yState>) => void, get: () => A11yState, partial: Partial<A11ySettings>) {
  set(partial);
  const next = pick(get());
  applyA11y(next);
  persist(next);
}

export const useA11y = create<A11yState>((set, get) => ({
  ...DEFAULTS,
  setFontScale: (fontScale) => commit(set, get, { fontScale }),
  setContrast: (contrast) => commit(set, get, { contrast }),
  setSpacing: (spacing) => commit(set, get, { spacing }),
  setUnderlineLinks: (underlineLinks) => commit(set, get, { underlineLinks }),
  setEasyRead: (easyRead) => {
    if (easyRead) {
      const cur = get();
      commit(set, get, {
        easyRead: true,
        spacing: "loose",
        underlineLinks: true,
        fontScale: cur.fontScale === "md" ? "lg" : cur.fontScale,
      });
      return;
    }
    commit(set, get, { easyRead: false });
  },
  setReduceMotion: (reduceMotion) => commit(set, get, { reduceMotion }),
  patch: (partial) => commit(set, get, partial),
  reset: () => commit(set, get, { ...DEFAULTS }),
  hydrate: () => {
    const loaded = loadA11y();
    applyA11y(loaded);
    set(loaded);
  },
}));
