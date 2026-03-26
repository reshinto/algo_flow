import { create } from "zustand";

import type { AlgorithmSlice } from "./algorithm-slice";
import { createAlgorithmSlice } from "./algorithm-slice";
import type { EditorSlice } from "./editor-slice";
import { createEditorSlice } from "./editor-slice";
import type { PlaybackSlice } from "./playback-slice";
import { createPlaybackSlice } from "./playback-slice";
import type { UISlice } from "./ui-slice";
import { createUISlice } from "./ui-slice";

export type AppStore = AlgorithmSlice & PlaybackSlice & EditorSlice & UISlice;

export const useAppStore = create<AppStore>()((...args) => ({
  ...createAlgorithmSlice(...args),
  ...createPlaybackSlice(...args),
  ...createEditorSlice(...args),
  ...createUISlice(...args),
}));
