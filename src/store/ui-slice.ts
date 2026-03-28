/**
 * UI Layout slice — manages drawers, active panel, and theme state.
 */
import type { StateCreator } from "zustand";

export type AppTheme = "dark" | "light" | "system";

export interface UISlice {
  isMobileDrawerOpen: boolean;
  educationalDrawerOpen: boolean;
  activePanel: "code" | "visualization" | "explanation";
  theme: AppTheme;

  toggleMobileDrawer: () => void;
  closeMobileDrawer: () => void;
  toggleEducationalDrawer: () => void;
  setActivePanel: (panel: "code" | "visualization" | "explanation") => void;
  setTheme: (theme: AppTheme) => void;
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
