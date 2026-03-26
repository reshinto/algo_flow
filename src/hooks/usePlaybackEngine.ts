import { useEffect, useRef } from "react";

import { useAppStore } from "@/store";
import { BASE_PLAYBACK_INTERVAL_MS } from "@/utils/constants";

/** Drives automatic step advancement when playback is active */
export function usePlaybackEngine(): void {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isPlaying = useAppStore((state) => state.isPlaying);
  const speed = useAppStore((state) => state.speed);
  const totalSteps = useAppStore((state) => state.totalSteps);
  const stepForward = useAppStore((state) => state.stepForward);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isPlaying || totalSteps === 0) return;

    const intervalMs = BASE_PLAYBACK_INTERVAL_MS / speed;
    intervalRef.current = setInterval(() => {
      stepForward(totalSteps);
    }, intervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, speed, totalSteps, stepForward]);
}
