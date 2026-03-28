import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import type { HashMapVisualState, HashMapEntryState, HashMapInputElementState } from "@/types";

interface HashMapVisualizerProps {
  visualState: HashMapVisualState;
}

const INPUT_ELEMENT_COLORS: Record<HashMapInputElementState, string> = {
  default: "var(--color-viz-default)",
  current: "var(--color-viz-current)",
  processed: "var(--color-viz-sorted)",
  found: "var(--color-accent-emerald)",
};

const ENTRY_COLORS: Record<HashMapEntryState, string> = {
  default: "var(--color-viz-default)",
  inserting: "var(--color-viz-current)",
  "looking-up": "var(--color-accent-amber)",
  found: "var(--color-accent-emerald)",
};

export default function HashMapVisualizer({ visualState }: HashMapVisualizerProps) {
  const shouldReduceMotion = useReducedMotion();
  const { entries, inputElements, lookupKey, resultPair } = visualState;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-4">
      {/* Input array row */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-[var(--color-text-muted)]">Input array</span>
        <div className="flex flex-wrap gap-1">
          {inputElements.map((element) => (
            <motion.div
              key={element.index}
              className="flex h-9 w-9 items-center justify-center rounded font-mono text-sm font-bold"
              animate={{ backgroundColor: INPUT_ELEMENT_COLORS[element.state] }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
              style={{
                border: "1px solid var(--color-border-subtle)",
                color: "var(--color-text-primary)",
              }}
            >
              {element.value}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hash map table */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-[var(--color-text-muted)]">
          Hash map ({entries.length} entr{entries.length !== 1 ? "ies" : "y"})
          {lookupKey !== null && (
            <span className="ml-2 text-[var(--color-accent-amber)]">
              looking up: <span className="font-mono font-bold">{lookupKey}</span>
            </span>
          )}
        </span>

        <div className="flex flex-col gap-1">
          {/* Header row */}
          <div className="flex gap-1">
            <div
              className="flex h-7 w-24 items-center justify-center rounded-t text-xs font-semibold"
              style={{
                backgroundColor: "var(--color-surface-tertiary)",
                color: "var(--color-text-muted)",
                border: "1px solid var(--color-border-default)",
              }}
            >
              value (key)
            </div>
            <div
              className="flex h-7 w-24 items-center justify-center rounded-t text-xs font-semibold"
              style={{
                backgroundColor: "var(--color-surface-tertiary)",
                color: "var(--color-text-muted)",
                border: "1px solid var(--color-border-default)",
              }}
            >
              index
            </div>
          </div>

          {/* Entry rows */}
          <AnimatePresence>
            {entries.map((entry) => (
              <motion.div
                key={entry.key}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                className="flex gap-1"
              >
                <motion.div
                  className="flex h-9 w-24 items-center justify-center rounded font-mono text-sm font-bold"
                  animate={{ backgroundColor: ENTRY_COLORS[entry.state] }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
                  style={{
                    border: "1px solid var(--color-border-subtle)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {entry.key}
                </motion.div>
                <motion.div
                  className="flex h-9 w-24 items-center justify-center rounded font-mono text-sm"
                  animate={{ backgroundColor: ENTRY_COLORS[entry.state] }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
                  style={{
                    border: "1px solid var(--color-border-subtle)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {entry.value}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {entries.length === 0 && (
            <div
              className="flex h-9 w-52 items-center justify-center rounded font-mono text-xs"
              style={{
                border: "1px dashed var(--color-border-default)",
                color: "var(--color-text-muted)",
              }}
            >
              empty
            </div>
          )}
        </div>
      </div>

      {/* Result */}
      {resultPair !== null && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm font-semibold"
          style={{ color: "var(--color-accent-emerald)" }}
        >
          Found: indices [{resultPair[0]}, {resultPair[1]}]
        </motion.div>
      )}
    </div>
  );
}
