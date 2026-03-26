/**
 * @file ui-slice.ts
 * @module store/ui-slice
 *
 * Generic UI Layout Architecture slice.
 * Manages overarching layout rendering decisions specifically handling Mobile interface components.
 * Tracks global drawer states and determines precisely which physical pane currently commands viewport focus.
 */
import type { StateCreator } from "zustand";

/**
 * Interface mapping global layout structural visibility.
 */
export interface UISlice {
  /** Responsive layout "Command Palette" visibility state */
  isMobileDrawerOpen: boolean;
  /** Right-hand side Educational Explainer library tracking */
  educationalDrawerOpen: boolean;
  /** For constrained Mobile Viewports, determines the singular active tab structure. */
  activePanel: "code" | "visualization" | "explanation";

  /** Inverts the layout state for the Mobile Algorithm Selector menu */
  toggleMobileDrawer: () => void;
  /** Acknowledges selections by forcefully dismissing the Drawer overlay */
  closeMobileDrawer: () => void;
  /** Inverts the Educational Reading context Drawer tab wrapper */
  toggleEducationalDrawer: () => void;
  /** Mounts explicit components statically (e.g. rendering Monaco versus Grid graphs) on small devices */
  setActivePanel: (panel: "code" | "visualization" | "explanation") => void;
}

export const createUISlice: StateCreator<UISlice> = (set, get) => ({
  isMobileDrawerOpen: false,
  educationalDrawerOpen: false,
  // By default, Algorithmic Visualizations are given structural priority on fresh loads
  activePanel: "visualization",

  toggleMobileDrawer: () => {
    set({ isMobileDrawerOpen: !get().isMobileDrawerOpen });
  },

  closeMobileDrawer: () => {
    // Specifically fired universally `onEscape` configurations as a safety net
    set({ isMobileDrawerOpen: false });
  },

  toggleEducationalDrawer: () => {
    set({ educationalDrawerOpen: !get().educationalDrawerOpen });
  },

  setActivePanel: (panel) => {
    set({ activePanel: panel });
  },
});
