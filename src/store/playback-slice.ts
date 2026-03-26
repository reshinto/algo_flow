/* Playback slice — manages step-through execution state (current index, play/pause,
   speed). Playback is a pointer into the pre-computed ExecutionStep[] array; this
   slice owns that pointer and all transport controls. */

import type { StateCreator } from "zustand";

import type { PlaybackSpeed } from "@/utils/constants";

export interface PlaybackSlice {
  currentStepIndex: number;
  isPlaying: boolean;
  speed: PlaybackSpeed;

  play: () => void;
  pause: () => void;
  togglePlayback: () => void;
  stepForward: (totalSteps: number) => void;
  stepBackward: () => void;
  seekTo: (index: number) => void;
  reset: () => void;
  setSpeed: (speed: PlaybackSpeed) => void;
}

export const createPlaybackSlice: StateCreator<PlaybackSlice> = (set, get) => ({
  currentStepIndex: 0,
  isPlaying: false,
  speed: 1,

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),

  togglePlayback: () => {
    set({ isPlaying: !get().isPlaying });
  },

  stepForward: (totalSteps: number) => {
    const { currentStepIndex } = get();
    if (currentStepIndex < totalSteps - 1) {
      set({ currentStepIndex: currentStepIndex + 1 });
    } else {
      set({ isPlaying: false });
    }
  },

  stepBackward: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex > 0) {
      set({ currentStepIndex: currentStepIndex - 1 });
    }
  },

  seekTo: (index: number) => {
    set({ currentStepIndex: Math.max(0, index) });
  },

  reset: () => {
    set({ currentStepIndex: 0, isPlaying: false });
  },

  setSpeed: (speed: PlaybackSpeed) => {
    set({ speed });
  },
});
