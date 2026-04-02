/**
 * UI Layout slice — manages drawers, active panel, and theme state.
 */
import type { StateCreator } from "zustand";

export type AppTheme = "dark" | "light" | "system";

/**
 * State and strictly typed actions responsible for macro-level UI layout presentation.
 * Drives mobile responsiveness, theming engines, and floating educational panels.
 */
export interface UISlice {
  /** Governs the slide-out mobile navigation drawer visibility. */
  isMobileDrawerOpen: boolean;
  /** Governs the right-side informational drawer containing algorithmic complexity breakdowns. */
  educationalDrawerOpen: boolean;
  /**
   * Active tab control tracking which core visualization interface the user is currently staring at.
   * Particularly relevant on mobile where screen real-estate only allows one view simultaneously.
   */
  activePanel: "code" | "visualization" | "explanation";
  /** Explicit styling classification for CSS variable binding. */
  theme: AppTheme;

  /** Transitions the mobile navigation overlay. */
  toggleMobileDrawer: () => void;
  /** Forcible reset for when a user clicks a nav link and the drawer must immediately hide. */
  closeMobileDrawer: () => void;
  /** Toggles the informative right-panel describing Big-O and algorithm mechanics. */
  toggleEducationalDrawer: () => void;
  /** Explicit override to force the layout system into rendering one of the three primary modules. */
  setActivePanel: (panel: "code" | "visualization" | "explanation") => void;
  /** Hard-binds the color palette scheme to the DOM, caching the decision into LocalStorage. */
  setTheme: (theme: AppTheme) => void;
  /** Cycles the user through `dark` -> `light` -> `system` automatically. */
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = "algoflow-theme";

function resolveSystemTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme: AppTheme): void {
  if (typeof document === "undefined") return;
  const resolved = theme === "system" ? resolveSystemTheme() : theme;
  if (resolved === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

function getStoredTheme(): AppTheme {
  if (typeof localStorage === "undefined") return "dark";
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "dark" || stored === "light" || stored === "system") return stored;
  return "dark";
}

const initialTheme = getStoredTheme();
applyTheme(initialTheme);

export const createUISlice: StateCreator<UISlice> = (set, get) => ({
  isMobileDrawerOpen: false,
  educationalDrawerOpen: false,
  activePanel: "visualization",
  theme: initialTheme,

  toggleMobileDrawer: () => {
    set({ isMobileDrawerOpen: !get().isMobileDrawerOpen });
  },

  closeMobileDrawer: () => {
    set({ isMobileDrawerOpen: false });
  },

  toggleEducationalDrawer: () => {
    set({ educationalDrawerOpen: !get().educationalDrawerOpen });
  },

  setActivePanel: (panel) => {
    set({ activePanel: panel });
  },

  setTheme: (theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    applyTheme(theme);
    set({ theme });
  },

  toggleTheme: () => {
    const current = get().theme;
    const next: AppTheme = current === "dark" ? "light" : current === "light" ? "system" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, next);
    applyTheme(next);
    set({ theme: next });
  },
});
