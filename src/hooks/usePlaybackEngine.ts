/**
 * @file usePlaybackEngine.ts
 * @module hooks/usePlaybackEngine
 *
 * Central nervous system for automated algorithmic execution.
 * When the user toggles "Play", this hook constructs a strictly timed browser `setInterval`
 * game-loop that advances the active algorithm state automatically.
 * It dynamically recalculates the exact millisecond delay per step based on the user's active `speed` multiplier.
 */
import { useEffect, useRef } from "react";
import { useAppStore } from "@/store";
import { BASE_PLAYBACK_INTERVAL_MS } from "@/utils/constants";

/**
 * Mounts the playback simulation engine onto the global layout.
 * Evaluates active global store properties and commands the timeline to auto-advance intervals.
 */
export function usePlaybackEngine(): void {
  // We use a React ref instead of state to store the raw interval ID, bypassing unnecessary component re-renders.
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Subscribe exactly to the required playback configurations.
  const isPlaying = useAppStore((state) => state.isPlaying);
  const speed = useAppStore((state) => state.speed);
  const totalSteps = useAppStore((state) => state.totalSteps);
  const stepForward = useAppStore((state) => state.stepForward);

  useEffect(() => {
    // Teardown function: Always clear the previous active interval if the dependency configuration unexpectedly shifts mid-playback.
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // If the user explicitly hit Pause OR the algorithm requires literally 0 steps to finish, refuse to boot the playback loop.
    if (!isPlaying || totalSteps === 0) return;

    // Mathematically scale the interval constraint.
    // Example: If base interval is 1000ms and speed is 2x, the loop fires every 500ms.
    const intervalMs = BASE_PLAYBACK_INTERVAL_MS / speed;

    intervalRef.current = setInterval(() => {
      // Step explicitly forward, providing the total steps boundary so it gracefully halts precisely at the final computational frame.
      stepForward(totalSteps);
    }, intervalMs);

    // Standard React cleanup: Guarantees no phantom memory leaks persist when the AppShell unmounts.
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, speed, totalSteps, stepForward]);
}
