/**
 * @file playback-slice.ts
 * @module store/playback-slice
 *
 * Algorithmic Execution Timeline array management.
 *
 * Playback is essentially a virtual Playhead moving across the pre-computed `ExecutionStep[]` array.
 * This slice owns the pointer integer (`currentStepIndex`) and all UI transport controls (Play, Pause, Fast-forward).
 */
import type { StateCreator } from "zustand";
import type { PlaybackSpeed } from "@/utils/constants";

/**
 * Native interface for controlling the virtual timeline.
 */
export interface PlaybackSlice {
  /** Virtual Pointer navigating the master `steps` array */
  currentStepIndex: number;
  /** Global generic identifying if the timing-loop interval is currently active */
  isPlaying: boolean;
  /** Mathematical multiplier adjusting millisecond timing spans */
  speed: PlaybackSpeed;

  play: () => void;
  pause: () => void;
  togglePlayback: () => void;

  /** Accepts total steps dynamically to definitively prevent Out-of-Bounds memory leaks */
  stepForward: (totalSteps: number) => void;
  /** Reverses the timeline progression strictly to a minimum bound of Index 0 */
  stepBackward: () => void;

  /** Manual scrub handler binding Slider inputs directly to timeline locations */
  seekTo: (index: number) => void;

  /** Resets the Playhead pointer absolutely and halts interval progression */
  reset: () => void;

  /** Re-calculates internal mathematical loops configuring step delays */
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
    // Bounding Box Logic: The timeline logically stops the instant it renders the final Array sequence element.
    if (currentStepIndex < totalSteps - 1) {
      set({ currentStepIndex: currentStepIndex + 1 });
    } else {
      // Reached conclusion: forcefully pause execution to prevent phantom recursive intervals!
      set({ isPlaying: false });
    }
  },

  stepBackward: () => {
    const { currentStepIndex } = get();
    // Bounding Box Logic: Never regress into negative memory allocations!
    if (currentStepIndex > 0) {
      set({ currentStepIndex: currentStepIndex - 1 });
    }
  },

  seekTo: (index: number) => {
    // Defensively enforce a hard minimum floor to block negative layout crashes.
    set({ currentStepIndex: Math.max(0, index) });
  },

  reset: () => {
    set({ currentStepIndex: 0, isPlaying: false });
  },

  setSpeed: (speed: PlaybackSpeed) => {
    set({ speed });
  },
});
