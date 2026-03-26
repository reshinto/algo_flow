/* UI slice — manages layout and drawer state across responsive breakpoints.
   Tracks mobile drawer visibility, educational panel toggle, and the active
   panel for the single-panel mobile layout. */

import type { StateCreator } from "zustand";

export interface UISlice {
  isMobileDrawerOpen: boolean;
  educationalDrawerOpen: boolean;
  activePanel: "code" | "visualization" | "explanation";

  toggleMobileDrawer: () => void;
  closeMobileDrawer: () => void;
  toggleEducationalDrawer: () => void;
  setActivePanel: (panel: "code" | "visualization" | "explanation") => void;
}

export const createUISlice: StateCreator<UISlice> = (set, get) => ({
  isMobileDrawerOpen: false,
  educationalDrawerOpen: false,
  activePanel: "visualization",

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
});
