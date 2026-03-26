/**
 * Playback transport bar with play/pause, step, reset, rerun controls,
 * a scrubbable progress bar, and a speed selector.
 * Keyboard shortcuts are handled at a higher level; this component owns the click UI.
 */
import {
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronRight,
  FiPause,
  FiPlay,
  FiRotateCcw,
} from "react-icons/fi";

import { useAppStore } from "@/store";
import { PLAYBACK_SPEEDS } from "@/utils/constants";
import type { PlaybackSpeed } from "@/utils/constants";
import { IconButton } from "@/components/shared";

/** Step-through playback controls with progress scrubbing and speed selection. */
export default function PlaybackControls() {
  const currentStepIndex = useAppStore((state) => state.currentStepIndex);
  const totalSteps = useAppStore((state) => state.totalSteps);
  const isPlaying = useAppStore((state) => state.isPlaying);
  const speed = useAppStore((state) => state.speed);
  const play = useAppStore((state) => state.play);
  const pause = useAppStore((state) => state.pause);
  const stepForward = useAppStore((state) => state.stepForward);
  const stepBackward = useAppStore((state) => state.stepBackward);
  const reset = useAppStore((state) => state.reset);
  const seekTo = useAppStore((state) => state.seekTo);
  const setSpeed = useAppStore((state) => state.setSpeed);

  const isAtStart = currentStepIndex === 0;
  const isAtEnd = totalSteps === 0 || currentStepIndex >= totalSteps - 1;
  const hasSteps = totalSteps > 0;
  const progressPercent = totalSteps > 0 ? (currentStepIndex / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="flex flex-col gap-1 border-t border-[var(--color-border-default)] bg-[var(--color-surface-secondary)] px-4 py-2">
      {/* Invisible range input overlays the visible bar for scrubbing */}
      <div className="relative h-1.5 w-full cursor-pointer rounded-full bg-[var(--color-surface-tertiary)]">
        <input
          type="range"
          min={0}
          max={Math.max(0, totalSteps - 1)}
          value={currentStepIndex}
          onChange={(event) => seekTo(Number(event.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label="Playback progress"
          disabled={!hasSteps}
        />
        <div
          className="h-full rounded-full bg-[var(--color-accent-cyan)] transition-[width] duration-100"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Controls row */}
      <div className="flex items-center gap-1">
        <IconButton label="Reset" onClick={reset} disabled={isAtStart} size="sm">
          <FiChevronsLeft size={16} />
        </IconButton>

        <IconButton label="Step backward" onClick={stepBackward} disabled={isAtStart} size="sm">
          <FiChevronLeft size={16} />
        </IconButton>

        <IconButton
          label={isPlaying ? "Pause" : "Play"}
          onClick={isPlaying ? pause : play}
          disabled={!hasSteps || isAtEnd}
          size="sm"
        >
          {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
        </IconButton>

        <IconButton
          label="Step forward"
          onClick={() => stepForward(totalSteps)}
          disabled={isAtEnd}
          size="sm"
        >
          <FiChevronRight size={16} />
        </IconButton>

        <IconButton
          label="Rerun"
          onClick={() => {
            reset();
            play();
          }}
          disabled={!hasSteps}
          size="sm"
        >
          <FiRotateCcw size={16} />
        </IconButton>

        <span className="ml-2 font-mono text-xs text-[var(--color-text-muted)]">
          {hasSteps ? `${currentStepIndex + 1} / ${totalSteps}` : "0 / 0"}
        </span>

        <div className="flex-1" />

        <select
          value={speed}
          onChange={(event) => setSpeed(Number(event.target.value) as PlaybackSpeed)}
          className="h-7 rounded border border-[var(--color-border-default)] bg-[var(--color-surface-tertiary)] px-1 font-mono text-xs text-[var(--color-text-secondary)]"
          aria-label="Playback speed"
        >
          {PLAYBACK_SPEEDS.map((speedOption) => (
            <option key={speedOption} value={speedOption}>
              {speedOption}x
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
