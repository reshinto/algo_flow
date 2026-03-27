import { motion, AnimatePresence } from "framer-motion";

import type { StackQueueVisualState, StackElementState, InputCharState } from "@/types";

interface StackQueueVisualizerProps {
  visualState: StackQueueVisualState;
}

const INPUT_CHAR_COLORS: Record<InputCharState, string> = {
  default: "var(--color-viz-default)",
  current: "var(--color-viz-current)",
  processed: "var(--color-viz-sorted)",
  matched: "var(--color-accent-emerald)",
  mismatched: "var(--color-accent-rose)",
};

const STACK_ELEMENT_COLORS: Record<StackElementState, string> = {
  default: "var(--color-viz-default)",
  pushing: "var(--color-viz-current)",
  popping: "var(--color-viz-swapping)",
  matched: "var(--color-accent-emerald)",
  mismatched: "var(--color-accent-rose)",
};

export default function StackQueueVisualizer({ visualState }: StackQueueVisualizerProps) {
  const { stackElements, inputChars, statusMessage } = visualState;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-4">
      {/* Input string row */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-[var(--color-text-muted)]">Input</span>
        <div className="flex flex-wrap gap-1">
          {inputChars.map((char, idx) => (
            <motion.div
              key={idx}
              className="flex h-9 w-9 items-center justify-center rounded font-mono text-sm font-bold"
              animate={{ backgroundColor: INPUT_CHAR_COLORS[char.state] }}
              transition={{ duration: 0.25 }}
              style={{
                border: "1px solid var(--color-border-subtle)",
                color: "var(--color-text-primary)",
              }}
            >
              {char.value}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stack */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-[var(--color-text-muted)]">
          Stack ({stackElements.length} element{stackElements.length !== 1 ? "s" : ""})
        </span>
        <div className="flex flex-col-reverse gap-1">
          <AnimatePresence>
            {stackElements.map((element, idx) => (
              <motion.div
                key={`${element.value}-${idx}`}
                initial={{ opacity: 0, y: -10, scaleY: 0.8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scaleY: 1,
                  backgroundColor: STACK_ELEMENT_COLORS[element.state],
                }}
                exit={{ opacity: 0, y: -10, scaleY: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex h-10 w-14 items-center justify-center rounded font-mono text-base font-bold"
                style={{
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-primary)",
                }}
              >
                {element.value}
              </motion.div>
            ))}
          </AnimatePresence>

          {stackElements.length === 0 && (
            <div
              className="flex h-10 w-14 items-center justify-center rounded font-mono text-xs"
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

      {/* Status */}
      {statusMessage && (
        <div
          className="text-center text-sm font-semibold"
          style={{
            color: statusMessage.includes("✓")
              ? "var(--color-accent-emerald)"
              : "var(--color-accent-rose)",
          }}
        >
          {statusMessage}
        </div>
      )}
    </div>
  );
}
