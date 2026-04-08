import { motion, useReducedMotion } from "framer-motion";

import type { StringVisualState, StringCharState, FailureTableEntryState } from "@/types";

interface StringVisualizerProps {
  visualState: StringVisualState;
}

const CHAR_COLORS: Record<StringCharState, string> = {
  default: "var(--color-viz-default)",
  current: "var(--color-viz-current)",
  matching: "var(--color-accent-amber)",
  matched: "var(--color-accent-emerald)",
  mismatched: "var(--color-accent-rose)",
};

const FAILURE_COLORS: Record<FailureTableEntryState, string> = {
  default: "var(--color-viz-default)",
  computing: "var(--color-viz-current)",
  computed: "var(--color-viz-sorted)",
};

const CELL_SIZE = 32;

export default function StringVisualizer({ visualState }: StringVisualizerProps) {
  const shouldReduceMotion = useReducedMotion();
  const { textChars, patternChars, failureTable, patternOffset, matchFound } = visualState;

  return (
    <div className="flex h-full flex-col gap-4 overflow-x-auto overflow-y-hidden p-4">
      <div className="flex min-h-0 min-w-max flex-1 flex-col items-center justify-center gap-4">
        {/* Text row */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">Text</span>
          <div className="flex flex-wrap gap-1">
            {textChars.map((char, idx) => (
              <motion.div
                key={idx}
                className="flex items-center justify-center rounded font-mono text-sm font-bold"
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-primary)",
                  flexShrink: 0,
                }}
                animate={{ backgroundColor: CHAR_COLORS[char.state] }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
              >
                {char.value}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pattern row — shifted to align with current comparison position */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">
            Pattern (offset: {patternOffset})
          </span>
          <motion.div
            className="flex gap-1"
            animate={{ x: patternOffset * (CELL_SIZE + 4) }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
          >
            {patternChars.map((char, idx) => (
              <motion.div
                key={idx}
                className="flex items-center justify-center rounded font-mono text-sm font-bold"
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-primary)",
                  flexShrink: 0,
                }}
                animate={{ backgroundColor: CHAR_COLORS[char.state] }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
              >
                {char.value}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Failure table */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">Failure table</span>
          <div className="flex flex-col gap-1">
            {/* Index labels */}
            <div className="flex gap-1">
              {failureTable.map((entry) => (
                <div
                  key={entry.index}
                  className="flex items-center justify-center font-mono text-xs"
                  style={{
                    width: CELL_SIZE,
                    height: 16,
                    color: "var(--color-text-muted)",
                    flexShrink: 0,
                  }}
                >
                  {entry.index}
                </div>
              ))}
            </div>
            {/* Pattern chars above failure values */}
            <div className="flex gap-1">
              {failureTable.map((entry, idx) => (
                <div
                  key={entry.index}
                  className="flex items-center justify-center rounded font-mono text-xs"
                  style={{
                    width: CELL_SIZE,
                    height: 20,
                    backgroundColor: "var(--color-surface-tertiary)",
                    border: "1px solid var(--color-border-subtle)",
                    color: "var(--color-text-muted)",
                    flexShrink: 0,
                  }}
                >
                  {patternChars[idx]?.value}
                </div>
              ))}
            </div>
            {/* Failure values */}
            <div className="flex gap-1">
              {failureTable.map((entry) => (
                <motion.div
                  key={entry.index}
                  className="flex items-center justify-center rounded font-mono text-sm font-bold"
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    border: "1px solid var(--color-border-subtle)",
                    color: "var(--color-text-primary)",
                    flexShrink: 0,
                  }}
                  animate={{ backgroundColor: FAILURE_COLORS[entry.state] }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                >
                  {entry.value}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Result */}
        {matchFound !== null && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm font-semibold"
            style={{
              color: matchFound ? "var(--color-accent-emerald)" : "var(--color-accent-rose)",
            }}
          >
            {matchFound ? "Pattern found ✓" : "Pattern not found ✗"}
          </motion.div>
        )}
      </div>
    </div>
  );
}
