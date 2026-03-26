/**
 * @file editor-slice.ts
 * @module store/editor-slice
 *
 * Code Editor Layout Manager.
 * Governs the Monaco Editor instances. Tracks which programming language tab is actively displayed
 * and handles the localized "Editing" state when a user manually overrides the source code representation.
 */
import type { StateCreator } from "zustand";
import type { SupportedLanguage } from "@/types";

/**
 * Interface strictly managing the Code View Panel.
 */
export interface EditorSlice {
  /** The actively selected programming language tab (e.g. 'typescript', 'python', 'java'). */
  activeLanguage: SupportedLanguage;
  /** True if the user clicked "Edit Code" and is actively typing strings into the Monaco editor. */
  isEditing: boolean;
  /** A temporary buffer holding the user's customized string until they discard it. */
  editedCode: string | null;

  /** Swaps the active programming language tab visible on screen. */
  setLanguage: (language: SupportedLanguage) => void;
  /** Unlocks the Monaco editor into read-write mode and buffers the initial boilerplate. */
  startEditing: (currentCode: string) => void;
  /** Actively caches the user's keystrokes while they type. */
  updateEditedCode: (code: string) => void;
  /** Discards the temp buffer and hard-resets the editor back to read-only Mode. */
  cancelEditing: () => void;
}

/**
 * Factory consumed by the combined Zustand store.
 */
export const createEditorSlice: StateCreator<EditorSlice> = (set) => ({
  activeLanguage: "typescript",
  isEditing: false,
  editedCode: null,

  setLanguage: (language: SupportedLanguage) => {
    // Structural Design Choice: Switching languages forcibly discards any in-progress edits.
    // This prevents a user from typing Python code, swapping to the Java tab, and rendering invalid Python syntax inside the Java runner.
    set({ activeLanguage: language, isEditing: false, editedCode: null });
  },

  startEditing: (currentCode: string) => {
    // Buffer the rigid string format natively into memory so `updateEditedCode` can mutate it.
    set({ isEditing: true, editedCode: currentCode });
  },

  updateEditedCode: (code: string) => {
    // Bound natively to the Monaco Editor `onChange` prop.
    set({ editedCode: code });
  },

  cancelEditing: () => {
    // Wipes the uncommitted buffer clean.
    set({ isEditing: false, editedCode: null });
  },
});
