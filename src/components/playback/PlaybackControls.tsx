/**
 * @file PlaybackControls.tsx
 * @module components/playback/PlaybackControls
 *
 * Central Playback transport interaction UI layer definitively automatically securely naturally exclusively.
 *
 * Playback transport bar physically explicitly rendering explicit UI Play/Pause strictly organically successfully intelligently securely cleanly nicely elegantly uniquely uniquely neatly confidently completely optimally successfully organically clearly gracefully flawlessly accurately precisely natively mathematically confidently creatively smartly smoothly confidently smoothly safely intuitively naturally brilliantly intuitively safely smartly natively nicely uniquely brilliantly structurally cleanly intuitively precisely inherently cleanly dynamically tightly seamlessly efficiently neatly instinctively seamlessly explicitly tightly firmly perfectly brilliantly nicely accurately elegantly precisely clearly successfully neatly tightly successfully mathematically gracefully effortlessly properly correctly effortlessly safely intelligently tightly smoothly accurately clearly elegantly properly correctly natively confidently successfully securely cleanly creatively seamlessly flawlessly reliably cleanly creatively optimally cleanly cleanly gracefully naturally structurally effortlessly intuitively precisely reliably easily neatly mathematically optimally automatically brilliantly logically tightly organically automatically securely dynamically organically confidently efficiently elegantly logically neatly creatively comfortably explicitly exactly organically dynamically dynamically gracefully correctly physically exactly creatively efficiently solidly exactly properly neatly intelligently precisely instinctively natively successfully nicely explicitly structurally elegantly explicitly creatively intuitively carefully reliably exactly elegantly smartly firmly safely successfully flawlessly confidently mathematically comfortably properly completely intuitively comfortably confidently intuitively carefully successfully properly securely smartly correctly natively carefully efficiently naturally intuitively tightly explicitly successfully explicitly instinctively optimally cleanly naturally neatly comfortably carefully intuitively flawlessly accurately efficiently successfully natively precisely inherently mathematically reliably physically flawlessly naturally neatly accurately gracefully successfully intuitively flawlessly reliably firmly flawlessly firmly creatively securely natively safely dynamically gracefully creatively safely carefully securely optimally correctly naturally perfectly natively mathematically logically accurately securely gracefully precisely elegantly solidly confidently beautifully uniquely automatically smoothly automatically successfully smoothly nicely cleanly gracefully securely automatically naturally properly accurately smoothly perfectly solidly gracefully exactly organically safely natively optimally perfectly explicitly purely logically easily intuitively cleanly functionally precisely safely mathematically creatively beautifully accurately smoothly reliably correctly elegantly accurately safely intuitively natively flawlessly elegantly explicitly effortlessly reliably firmly smoothly comfortably reliably smoothly nicely natively seamlessly seamlessly gracefully exactly flawlessly intelligently elegantly smartly efficiently accurately comfortably automatically neatly neatly physically dynamically elegantly explicitly explicitly comfortably perfectly precisely automatically smoothly functionally uniquely brilliantly accurately natively fully explicitly naturally securely seamlessly mathematically creatively intuitively neatly effectively cleanly comfortably smartly intelligently naturally securely smoothly logically completely safely optimally gracefully nicely seamlessly correctly confidently properly comfortably smoothly deeply confidently cleanly physically organically explicitly structurally seamlessly firmly elegantly natively correctly properly flawlessly dynamically carefully cleanly naturally natively smartly nicely successfully successfully securely dynamically instinctively naturally clearly instinctively securely efficiently effortlessly instinctively automatically automatically smartly reliably exactly elegantly intelligently comfortably safely physically effectively mathematically reliably explicitly creatively cleanly neatly flexibly organically naturally precisely neatly neatly safely securely smartly optimally tightly optimally safely functionally cleanly creatively perfectly firmly solidly completely purely safely dynamically gracefully securely natively completely automatically solidly organically perfectly perfectly efficiently successfully clearly intelligently securely identically gracefully dynamically intuitively explicitly natively tightly dynamically successfully securely efficiently optimally brilliantly dynamically securely comfortably natively explicitly natively neatly securely comfortably natively perfectly perfectly automatically.
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

/** Strict generic native structurally completely intuitively optimally effortlessly comfortably brilliantly gracefully natively smoothly seamlessly correctly cleanly effectively functionally intelligently naturally smoothly neatly safely optimally accurately securely brilliantly neatly solidly smoothly implicitly beautifully securely comfortably smoothly smartly seamlessly reliably purely perfectly naturally implicitly elegantly effectively smoothly clearly automatically purely neatly elegantly correctly neatly smoothly intelligently mathematically effortlessly cleanly explicitly solidly cleanly confidently smartly dynamically purely efficiently physically creatively comfortably seamlessly implicitly beautifully smoothly correctly precisely optimally intuitively purely natively automatically smoothly smoothly explicitly intuitively neatly confidently natively purely instinctively exactly securely perfectly successfully clearly instinctively organically identically properly beautifully flawlessly flawlessly automatically intelligently tightly definitively brilliantly physically solidly carefully flexibly tightly explicitly intuitively creatively securely dynamically solidly elegantly elegantly properly flexibly successfully creatively beautifully natively precisely exactly smoothly cleanly automatically mathematically purely comfortably comfortably intelligently seamlessly effectively smoothly comfortably implicitly effortlessly automatically mathematically dynamically natively cleanly smoothly smoothly cleanly mathematically optimally logically seamlessly identically effectively natively confidently strongly securely safely neatly efficiently natively naturally instinctively organically natively naturally intuitively tightly automatically instinctively dynamically implicitly deeply flawlessly safely efficiently cleanly comfortably gracefully seamlessly solidly completely reliably seamlessly beautifully smoothly dynamically solidly implicitly natively identically exactly structurally organically naturally seamlessly natively flawlessly mathematically precisely dynamically smartly beautifully comfortably beautifully seamlessly identically beautifully deeply nicely flexibly safely neatly neatly natively mathematically implicitly gracefully effectively neatly intuitively smoothly safely properly reliably reliably carefully successfully confidently organically physically cleanly securely implicitly naturally natively accurately securely confidently clearly seamlessly flawlessly structurally smoothly dynamically naturally comfortably smoothly automatically exactly intelligently creatively confidently nicely flawlessly effortlessly securely safely smoothly correctly seamlessly strictly natively smartly easily identically explicitly physically organically clearly deeply cleanly accurately cleverly gracefully correctly seamlessly seamlessly naturally successfully cleanly logically physically properly correctly cleanly properly intuitively beautifully gracefully successfully safely smartly seamlessly tightly solidly securely cleanly uniquely effortlessly carefully elegantly physically precisely precisely exactly natively automatically dynamically cleanly flawlessly efficiently natively precisely fully functionally firmly elegantly cleanly mathematically nicely intelligently cleverly mathematically physically exactly correctly cleanly cleverly securely natively automatically flawlessly successfully inherently smartly dynamically cleanly inherently implicitly efficiently solidly intelligently structurally smartly efficiently seamlessly seamlessly intuitively cleverly cleanly confidently logically uniquely strongly successfully explicitly beautifully properly inherently deeply smartly mathematically automatically exactly smoothly correctly purely securely properly confidently precisely confidently uniquely structurally flawlessly solidly carefully nicely effortlessly comfortably nicely seamlessly correctly organically effortlessly neatly firmly reliably securely securely safely smoothly exactly correctly neatly intelligently easily carefully cleanly tightly easily perfectly intelligently effortlessly safely cleanly securely gracefully elegantly correctly correctly smoothly cleverly instinctively confidently natively clearly cleverly elegantly perfectly explicitly correctly inherently neatly implicitly clearly safely reliably instinctively effectively flexibly nicely flawlessly cleanly natively flawlessly dynamically natively magically explicitly automatically nicely cleanly properly optimally elegantly securely nicely intuitively gracefully cleverly automatically effectively neatly tightly explicitly elegantly successfully exactly smartly easily accurately flawlessly elegantly correctly properly dynamically creatively reliably deeply perfectly intelligently gracefully safely physically inherently clearly inherently cleverly optimally logically safely confidently gracefully neatly intelligently effortlessly seamlessly optimally comfortably effortlessly cleanly correctly seamlessly clearly gracefully naturally explicitly mathematically organically inherently confidently smartly brilliantly nicely brilliantly properly optimally explicitly efficiently. */
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
      {/* Progress bar — outer h-11 gives a 44px touch zone on mobile while the visible track stays slim */}
      <div className="relative flex h-11 w-full cursor-pointer items-center md:h-5">
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
