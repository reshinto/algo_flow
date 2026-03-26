import { useEffect } from "react";

import { useAppStore } from "@/store";

/** Global keyboard shortcuts for playback and UI */
export function useKeyboardShortcuts(): void {
  const totalSteps = useAppStore((state) => state.totalSteps);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      const isInputFocused =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable;

      if (isInputFocused) return;

      const state = useAppStore.getState();

      switch (event.code) {
        case "Space": {
          event.preventDefault();
          state.togglePlayback();
          break;
        }
        case "ArrowRight": {
          event.preventDefault();
          state.stepForward(totalSteps);
          break;
        }
        case "ArrowLeft": {
          event.preventDefault();
          state.stepBackward();
          break;
        }
        case "KeyR": {
          if (!event.metaKey && !event.ctrlKey) {
            event.preventDefault();
            state.reset();
          }
          break;
        }
        case "KeyL": {
          event.preventDefault();
          state.toggleEducationalDrawer();
          break;
        }
        case "Escape": {
          state.closeMobileDrawer();
          if (state.educationalDrawerOpen) {
            state.toggleEducationalDrawer();
          }
          break;
        }
        case "Digit1":
        case "Digit2":
        case "Digit3":
        case "Digit4":
        case "Digit5": {
          const speedMap = [0.25, 0.5, 1, 2, 4] as const;
          const speedIndex = Number(event.code.replace("Digit", "")) - 1;
          const selectedSpeed = speedMap[speedIndex];
          if (selectedSpeed !== undefined) {
            state.setSpeed(selectedSpeed);
          }
          break;
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalSteps]);
}
