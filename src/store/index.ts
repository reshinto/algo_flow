/**
 * @file index.ts
 * @module store/index
 *
 * Root Store Configuration.
 *
 * AlgoFlow utilizes Zustand for global state management. To prevent a massive, monolithic store file,
 * the state is horizontally split using the "Slice Pattern". Four independent domains (Algorithm, Playback, Editor, UI)
 * are constructed individually and merged here into a single strict `AppStore` interface.
 *
 * @see https://docs.pmnd.rs/zustand/guides/slices-pattern
 */
import { create } from "zustand";

import type { AlgorithmSlice } from "./algorithm-slice";
import { createAlgorithmSlice } from "./algorithm-slice";
import type { EditorSlice } from "./editor-slice";
import { createEditorSlice } from "./editor-slice";
import type { PlaybackSlice } from "./playback-slice";
import { createPlaybackSlice } from "./playback-slice";
import type { UISlice } from "./ui-slice";
import { createUISlice } from "./ui-slice";

/**
 * Intersection Type deeply merging all application domains into one unified interface.
 */
export type AppStore = AlgorithmSlice & PlaybackSlice & EditorSlice & UISlice;

/**
 * The single source of truth hook accessed by all React Components.
 *
 * @example
 * const isPlaying = useAppStore(state => state.isPlaying);
 * const togglePlayback = useAppStore(state => state.togglePlayback);
 */
export const useAppStore = create<AppStore>()((...args) => ({
  ...createAlgorithmSlice(...args),
  ...createPlaybackSlice(...args),
  ...createEditorSlice(...args),
  ...createUISlice(...args),
}));
