// Visualizer for sliding-window and character-frequency algorithms.
// Renders primary/secondary string rows, a frequency map bar, a window bracket,
// and a results summary at the bottom.

import { motion, useReducedMotion } from "framer-motion";

import type { FrequencyVisualState, StringCharState, FrequencyEntryState } from "@/types";

interface FrequencyVisualizerProps {
  visualState: FrequencyVisualState;
}

const CHAR_COLORS: Record<StringCharState, string> = {
  default: "var(--color-viz-default)",
  current: "var(--color-viz-current)",
  matching: "var(--color-accent-amber)",
  matched: "var(--color-accent-emerald)",
  mismatched: "var(--color-accent-rose)",
};

const FREQ_COLORS: Record<FrequencyEntryState, string> = {
  default: "var(--color-viz-default)",
  partial: "var(--color-accent-amber)",
  satisfied: "var(--color-accent-emerald)",
  excess: "var(--color-accent-rose)",
};

const CELL_SIZE = 32;

export default function FrequencyVisualizer({ visualState }: FrequencyVisualizerProps) {
  const shouldReduceMotion = useReducedMotion();
  const {
    primaryChars,
    secondaryChars,
    frequencyMap,
    windowStart,
    windowEnd,
    matchCount,
    resultIndices,
  } = visualState;

  const hasSecondary = secondaryChars.length > 0;
  const hasWindow = windowEnd >= windowStart && windowStart >= 0;

  return (
    <div className="flex h-full flex-col gap-4 overflow-x-auto overflow-y-hidden p-4">
      <div className="flex min-h-0 min-w-max flex-1 flex-col items-center justify-center gap-6">
        {/* Primary string row */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">Primary string</span>
          <div className="relative flex gap-1">
            {primaryChars.map((charEntry, charIdx) => (
              <motion.div
                key={charIdx}
                className="flex items-center justify-center rounded font-mono text-sm font-bold"
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-primary)",
                  flexShrink: 0,
                }}
                animate={{ backgroundColor: CHAR_COLORS[charEntry.state] }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
              >
                {charEntry.value}
              </motion.div>
            ))}
            {/* Window bracket — bottom border spanning windowStart..windowEnd */}
            {hasWindow && windowEnd < primaryChars.length && (
              <motion.div
                className="pointer-events-none absolute bottom-0"
                style={{
                  left: windowStart * (CELL_SIZE + 4),
                  width: (windowEnd - windowStart + 1) * (CELL_SIZE + 4) - 4,
                  height: CELL_SIZE,
                  border: "2px solid var(--color-accent-cyan, var(--color-viz-current))",
                  borderRadius: 4,
                  boxSizing: "border-box",
                }}
                animate={{
                  left: windowStart * (CELL_SIZE + 4),
                  width: (windowEnd - windowStart + 1) * (CELL_SIZE + 4) - 4,
                }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
              />
            )}
          </div>
          {hasWindow && (
            <span className="text-xs text-[var(--color-text-muted)]">
              Window: [{windowStart}, {windowEnd}]
            </span>
          )}
        </div>

        {/* Secondary string row — only when non-empty */}
        {hasSecondary && (
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[var(--color-text-muted)]">Secondary string</span>
            <div className="flex gap-1">
              {secondaryChars.map((charEntry, charIdx) => (
                <motion.div
                  key={charIdx}
                  className="flex items-center justify-center rounded font-mono text-sm font-bold"
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    border: "1px solid var(--color-border-subtle)",
                    color: "var(--color-text-primary)",
                    flexShrink: 0,
                  }}
                  animate={{ backgroundColor: CHAR_COLORS[charEntry.state] }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                >
                  {charEntry.value}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Frequency map — horizontal bar/table */}
        {frequencyMap.length > 0 && (
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[var(--color-text-muted)]">Frequency map</span>
            <div className="flex flex-wrap gap-2">
              {frequencyMap.map((entry) => (
                <motion.div
                  key={entry.char}
                  className="flex flex-col items-center gap-0.5"
                  style={{ minWidth: CELL_SIZE, flexShrink: 0 }}
                >
                  {/* Char label */}
                  <div
                    className="flex items-center justify-center rounded font-mono text-xs"
                    style={{
                      width: CELL_SIZE,
                      height: 20,
                      backgroundColor: "var(--color-surface-tertiary)",
                      border: "1px solid var(--color-border-subtle)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {entry.char}
                  </div>
                  {/* Count cell — colored by state */}
                  <motion.div
                    className="flex items-center justify-center rounded font-mono text-sm font-bold"
                    style={{
                      width: CELL_SIZE,
                      height: CELL_SIZE,
                      border: "1px solid var(--color-border-subtle)",
                      color: "var(--color-text-primary)",
                    }}
                    animate={{ backgroundColor: FREQ_COLORS[entry.state] }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                  >
                    {entry.count}
                  </motion.div>
                  {/* Target count label */}
                  <div
                    className="text-center font-mono text-xs"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    /{entry.targetCount}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Result summary */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
            Matches found:{" "}
            <span
              className="font-bold"
              style={{
                color: matchCount > 0 ? "var(--color-accent-emerald)" : "var(--color-text-primary)",
              }}
            >
              {matchCount}
            </span>
          </span>
          {resultIndices.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center font-mono text-xs"
              style={{ color: "var(--color-accent-emerald)" }}
            >
              Indices: [{resultIndices.join(", ")}]
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
