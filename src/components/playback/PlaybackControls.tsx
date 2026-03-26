/**
 * Playback transport bar with play/pause, step, reset, rerun controls,
 * a scrubbable progress bar, and a speed selector.
 * Keyboard shortcuts are handled at a higher level; this component owns the click UI.
 *
 * Touch targets are 44px minimum (WCAG 2.5.5 AAA) on mobile, scaling down
 * to 36px on desktop. The play/pause button uses an accent fill to establish
 * visual hierarchy as the primary action.
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
      {/* Progress bar — outer h-5 gives a 20px touch zone while the visible track stays slim */}
      <div className="relative flex h-5 w-full cursor-pointer items-center">
        <div className="relative h-1.5 w-full rounded-full bg-[var(--color-surface-tertiary)]">
          <div
            className="h-full rounded-full bg-[var(--color-accent-cyan)] transition-[width] duration-100"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
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
      </div>

      {/* Controls row — gap-2 on mobile for fat-finger spacing, gap-1 on desktop */}
      <div className="flex items-center justify-between gap-1 sm:justify-start sm:gap-2 md:gap-1">
        {/* Secondary controls use lg (44px) on mobile, md (36px) on desktop */}
        <IconButton
          label="Reset"
          onClick={reset}
          disabled={isAtStart}
          size="lg"
          className="md:h-9 md:w-9"
        >
          <FiChevronsLeft size={18} />
        </IconButton>

        <IconButton
          label="Step backward"
          onClick={stepBackward}
          disabled={isAtStart}
          size="lg"
          className="md:h-9 md:w-9"
        >
          <FiChevronLeft size={18} />
        </IconButton>

        {/* Play/Pause — primary action with accent fill and larger icon */}
        <IconButton
          label={isPlaying ? "Pause" : "Play"}
          onClick={isPlaying ? pause : play}
          disabled={!hasSteps || isAtEnd}
          size="lg"
          className="bg-[var(--color-accent-cyan)] text-[var(--color-surface-primary)] hover:bg-[var(--color-accent-cyan)] hover:opacity-90 md:h-9 md:w-9"
        >
          {isPlaying ? (
            <FiPause size={20} />
          ) : (
            /* pl-0.5 optically centers the triangular play icon */
            <span className="pl-0.5">
              <FiPlay size={20} />
            </span>
          )}
        </IconButton>

        <IconButton
          label="Step forward"
          onClick={() => stepForward(totalSteps)}
          disabled={isAtEnd}
          size="lg"
          className="md:h-9 md:w-9"
        >
          <FiChevronRight size={18} />
        </IconButton>

        <IconButton
          label="Rerun"
          onClick={() => {
            reset();
            play();
          }}
          disabled={!hasSteps}
          size="lg"
          className="md:h-9 md:w-9"
        >
          <FiRotateCcw size={18} />
        </IconButton>

        {/* Step counter — hidden on narrow screens to prevent overflow */}
        <span className="ml-1 hidden whitespace-nowrap font-mono text-xs text-[var(--color-text-muted)] sm:inline">
          {hasSteps ? `${currentStepIndex + 1} / ${totalSteps}` : "0 / 0"}
        </span>

        <div className="flex-1" />

        {/* Speed selector — 44px tall on mobile, 28px on desktop */}
        <select
          value={speed}
          onChange={(event) => setSpeed(Number(event.target.value) as PlaybackSpeed)}
          className="h-11 w-16 rounded border border-[var(--color-border-default)] bg-[var(--color-surface-tertiary)] px-1 font-mono text-xs text-[var(--color-text-secondary)] sm:w-auto sm:px-2 md:h-7 md:px-1"
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
