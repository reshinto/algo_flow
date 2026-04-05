/**
 * TransformVisualizer — visualizes string transformation algorithms with
 * synchronized read/write pointer indicators, phase labels, and auxiliary data.
 */

import { motion, useReducedMotion } from "framer-motion";

import type { TransformVisualState, StringCharState } from "@/types";

interface TransformVisualizerProps {
  visualState: TransformVisualState;
}

const CHAR_COLORS: Record<StringCharState, string> = {
  default: "var(--color-viz-default)",
  current: "var(--color-viz-current)",
  matching: "var(--color-accent-amber)",
  matched: "var(--color-accent-emerald)",
  mismatched: "var(--color-accent-rose)",
};

const CELL_SIZE = 32;

export default function TransformVisualizer({ visualState }: TransformVisualizerProps) {
  const shouldReduceMotion = useReducedMotion();
  const { inputChars, outputChars, readPointer, writePointer, phase, auxiliaryData } = visualState;

  return (
    <div className="flex h-full flex-col gap-6 overflow-x-auto overflow-y-hidden p-4">
      <div className="flex min-h-0 min-w-max flex-1 flex-col items-center justify-center gap-4">
        {/* Input row */}
        <div className="flex flex-col gap-1">
          {/* Read pointer indicator (▼) above current read position */}
          <div className="flex gap-1" style={{ height: 16 }}>
            {inputChars.map((_, charIndex) => (
              <div
                key={charIndex}
                className="flex items-center justify-center font-mono text-xs font-bold"
                style={{
                  width: CELL_SIZE,
                  flexShrink: 0,
                  color: charIndex === readPointer ? "var(--color-viz-current)" : "transparent",
                }}
              >
                ▼
              </div>
            ))}
          </div>

          <span className="text-xs text-[var(--color-text-muted)]">Input</span>

          <div className="flex gap-1">
            {inputChars.map((char, charIndex) => (
              <motion.div
                key={charIndex}
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

          {/* Read pointer position label */}
          <div className="flex gap-1" style={{ height: 14 }}>
            {inputChars.map((_, charIndex) => (
              <div
                key={charIndex}
                className="flex items-center justify-center font-mono text-xs"
                style={{
                  width: CELL_SIZE,
                  flexShrink: 0,
                  color: charIndex === readPointer ? "var(--color-text-muted)" : "transparent",
                }}
              >
                {charIndex}
              </div>
            ))}
          </div>
        </div>

        {/* Phase indicator between input and output */}
        <div className="flex items-center gap-3">
          <div
            className="h-px w-8 flex-shrink-0"
            style={{ backgroundColor: "var(--color-border-subtle)" }}
          />
          <motion.span
            key={phase}
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              backgroundColor: "var(--color-surface-tertiary)",
              border: "1px solid var(--color-border-subtle)",
              color: "var(--color-text-secondary)",
            }}
          >
            ↓ {phase}
          </motion.span>
          <div
            className="h-px w-8 flex-shrink-0"
            style={{ backgroundColor: "var(--color-border-subtle)" }}
          />
        </div>

        {/* Output row */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">Output</span>

          {outputChars.length > 0 ? (
            <div className="flex gap-1">
              {outputChars.map((char, charIndex) => (
                <motion.div
                  key={charIndex}
                  className="flex items-center justify-center rounded font-mono text-sm font-bold"
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    border: "1px solid var(--color-border-subtle)",
                    color: "var(--color-text-primary)",
                    flexShrink: 0,
                  }}
                  initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    backgroundColor: CHAR_COLORS[char.state],
                  }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                >
                  {char.value}
                </motion.div>
              ))}
            </div>
          ) : (
            <div
              className="flex items-center justify-center rounded text-xs italic"
              style={{
                width: CELL_SIZE * 3,
                height: CELL_SIZE,
                border: "1px dashed var(--color-border-subtle)",
                color: "var(--color-text-muted)",
              }}
            >
              empty
            </div>
          )}

          {/* Write pointer position label */}
          {outputChars.length > 0 && (
            <div className="flex gap-1" style={{ height: 14 }}>
              {outputChars.map((_, charIndex) => (
                <div
                  key={charIndex}
                  className="flex items-center justify-center font-mono text-xs"
                  style={{
                    width: CELL_SIZE,
                    flexShrink: 0,
                    color: charIndex === writePointer ? "var(--color-text-muted)" : "transparent",
                  }}
                >
                  {charIndex}
                </div>
              ))}
            </div>
          )}

          {/* Write pointer indicator (▲) below current write position */}
          {outputChars.length > 0 && (
            <div className="flex gap-1" style={{ height: 16 }}>
              {outputChars.map((_, charIndex) => (
                <div
                  key={charIndex}
                  className="flex items-center justify-center font-mono text-xs font-bold"
                  style={{
                    width: CELL_SIZE,
                    flexShrink: 0,
                    color:
                      charIndex === writePointer ? "var(--color-accent-emerald)" : "transparent",
                  }}
                >
                  ▲
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Auxiliary data badge */}
        {auxiliaryData !== null && (
          <motion.div
            key={auxiliaryData}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-md px-3 py-1.5 text-xs font-medium"
            style={{
              backgroundColor: "var(--color-surface-tertiary)",
              border: "1px solid var(--color-border-subtle)",
              color: "var(--color-accent-amber)",
            }}
          >
            {auxiliaryData}
          </motion.div>
        )}
      </div>
    </div>
  );
}
