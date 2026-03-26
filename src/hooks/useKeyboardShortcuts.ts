/**
 * @file useKeyboardShortcuts.ts
 * @module hooks/useKeyboardShortcuts
 *
 * Provides global keyboard accessibility for the entire AlgoFlow application.
 * This hook binds a `keydown` listener to the window object and delegates commands
 * directly to the Zustand store. It intelligently ignores commands if the user is
 * currently typing inside an input field to prevent accidental triggers.
 */
import { useEffect } from "react";
import { useAppStore } from "@/store";

/**
 * Initializes global keyboard listeners for playback and UI state management.
 *
 * @example
 * // Mounts silently at the root AppShell
 * useKeyboardShortcuts();
 */
export function useKeyboardShortcuts(): void {
  // Subscribe specifically to totalSteps to ensure bound shortcuts know the mathematical limit of the current algorithm.
  const totalSteps = useAppStore((state) => state.totalSteps);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;

      // Determine if the user is typing into an actionable input field.
      // E.g. defining target indices or sorting arrays.
      const isInputFocused =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable;

      // Escape hatch: If the user is actively typing, do not hijack their keyboard inputs.
      if (isInputFocused) return;

      // Extract the transient global state via `getState()` to avoid unnecessary React re-renders on the hook.
      const state = useAppStore.getState();

      switch (event.code) {
        // Spacebar toggles algorithmic playback (Play / Pause).
        case "Space": {
          event.preventDefault(); // Prevents the browser from instantly scrolling the page downwards.
          state.togglePlayback();
          break;
        }
        // Right Arrow advances the algorithm precisely ONE single execution step.
        case "ArrowRight": {
          event.preventDefault();
          state.stepForward(totalSteps); // Pass totalSteps bounds so it refuses to advance past the final frame.
          break;
        }
        // Left Arrow reverses the algorithm precisely ONE single execution step.
        case "ArrowLeft": {
          event.preventDefault();
          state.stepBackward();
          break;
        }
        // "R" Key forcibly zeroes the engine, tearing down the current progression and rebooting the active algorithm to Frame 0.
        case "KeyR": {
          // Verify they aren't trying to hit CMD+R (Refresh page) natively.
          if (!event.metaKey && !event.ctrlKey) {
            event.preventDefault();
            state.reset();
          }
          break;
        }
        // "L" Key acts as a quick-toggle for the Educational "Library" Drawer.
        case "KeyL": {
          event.preventDefault();
          state.toggleEducationalDrawer();
          break;
        }
        // Escape acts as a universal "Cancel/Close" layer.
        case "Escape": {
          // Forces the Command Palette / Mobile Drawer definitively closed.
          state.closeMobileDrawer();
          // If the Educational Drawer is actively open, dismiss it.
          if (state.educationalDrawerOpen) {
            state.toggleEducationalDrawer();
          }
          break;
        }
        // Number Row bindings automatically map to Playback Engine speeds.
        case "Digit1":
        case "Digit2":
        case "Digit3":
        case "Digit4":
        case "Digit5": {
          // Maps physical key index: 1 -> 0.25x | 2 -> 0.5x | 3 -> 1.0x | 4 -> 2.0x | 5 -> 4.0x
          const speedMap = [0.25, 0.5, 1, 2, 4] as const;
          // Dynamically compute the array index by stripping the string literal "Digit" and mathematically dropping down a base index.
          const speedIndex = Number(event.code.replace("Digit", "")) - 1;
          const selectedSpeed = speedMap[speedIndex];

          if (selectedSpeed !== undefined) {
            state.setSpeed(selectedSpeed);
          }
          break;
        }
      }
    }

    // Bind event to the deepest root window context to guarantee global capture regardless of active pane focus.
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalSteps]); // Dependency array guarantees `stepForward` always possesses the up-to-date final frame count.
}
