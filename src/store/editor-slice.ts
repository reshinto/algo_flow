/**
 * Zustand slice for the Monaco code editor panel.
 * Tracks the active language tab and temporary editing state.
 * Edited code is non-persistent -- discarded on language switch or cancel.
 */

import type { StateCreator } from "zustand";

import type { SupportedLanguage } from "@/types";

/** State and actions for language selection and temporary code editing. */
export interface EditorSlice {
  activeLanguage: SupportedLanguage;
  isEditing: boolean;
  editedCode: string | null;

  setLanguage: (language: SupportedLanguage) => void;
  startEditing: (currentCode: string) => void;
  updateEditedCode: (code: string) => void;
  cancelEditing: () => void;
}

/** Factory consumed by the combined Zustand store in `store/index.ts`. */
export const createEditorSlice: StateCreator<EditorSlice> = (set) => ({
  activeLanguage: "typescript",
  isEditing: false,
  editedCode: null,

  setLanguage: (language: SupportedLanguage) => {
    // Switching languages discards any in-progress edits
    set({ activeLanguage: language, isEditing: false, editedCode: null });
  },

  startEditing: (currentCode: string) => {
    set({ isEditing: true, editedCode: currentCode });
  },

  updateEditedCode: (code: string) => {
    set({ editedCode: code });
  },

  cancelEditing: () => {
    set({ isEditing: false, editedCode: null });
  },
});
