/**
 * Visualizes DP algorithm state as an animated table of cells.
 * Supports both tabulation (bottom-up) and memoization (top-down) variants —
 * the presence of `callStack` in the visual state determines which mode is active.
 */
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import type { DPTableVisualState, DPCellState } from "@/types";

interface DPTableVisualizerProps {
  visualState: DPTableVisualState;
}

/** Background color for each cell state, mapped to design-token CSS variables. */
const CELL_COLORS: Record<DPCellState, string> = {
  default: "var(--color-surface-panel)",
  computing: "var(--color-viz-swapping)",
  computed: "var(--color-viz-sorted)",
  "reading-cache": "var(--color-viz-comparing)",
  current: "var(--color-viz-current)",
};

export default function DPTableVisualizer({ visualState }: DPTableVisualizerProps) {
  const shouldReduceMotion = useReducedMotion();
  const { table, currentIndex, callStack } = visualState;
  const isMemoization = Array.isArray(callStack);

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      {/* Strategy badge — distinguishes top-down memoization from bottom-up tabulation */}
      <div className="flex items-center">
        <span className="rounded border border-[var(--color-border-subtle)] px-2 py-0.5 text-[10px] text-[var(--color-text-muted)]">
          {isMemoization ? "Top-down (Memoization)" : "Bottom-up (Tabulation)"}
        </span>
      </div>

      {/* DP table cells */}
      <div className="flex min-h-0 flex-1 flex-wrap items-center justify-center gap-2 overflow-hidden">
        {table.map((cell) => {
          const isActive = cell.index === currentIndex;
          const isCacheHit = isActive && cell.state === "reading-cache";
          return (
            <motion.div
              key={cell.index}
              className="relative flex flex-col items-center gap-1"
              animate={{ scale: isCacheHit ? 1.2 : isActive ? 1.1 : 1 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : isCacheHit
                    ? { type: "spring", stiffness: 500, damping: 18 }
                    : { type: "spring", stiffness: 300, damping: 25 }
              }
            >
              {/* "Cache hit!" floating label — appears only on cache-hit steps */}
              <AnimatePresence>
                {isCacheHit && (
                  <motion.span
                    key="cache-hit-label"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.15 }}
                    className="absolute -top-5 whitespace-nowrap rounded bg-[var(--color-viz-comparing)] px-1.5 py-0.5 font-mono text-[9px] font-semibold text-[var(--color-text-primary)]"
                  >
                    Cache hit!
                  </motion.span>
                )}
              </AnimatePresence>
              <motion.div
                className="flex h-12 w-16 items-center justify-center rounded border font-mono text-lg"
                animate={{
                  backgroundColor: CELL_COLORS[cell.state],
                  borderColor: isActive ? "var(--color-accent-cyan)" : "var(--color-border-subtle)",
                }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
              >
                <span className="text-[var(--color-text-primary)]">
                  {cell.value !== null ? cell.value : "—"}
                </span>
              </motion.div>
              <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                {cell.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Fixed-height region for call stack — prevents DP table from shifting during recursion */}
      {isMemoization && (
        <div className="h-[244px] shrink-0 overflow-hidden">
          {callStack && callStack.length > 0 && <CallStackPanel callStack={callStack} />}
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-[10px]">
        <LegendItem color={CELL_COLORS.default} label="Not computed" />
        <LegendItem color={CELL_COLORS.computing} label="Computing" />
        <LegendItem color={CELL_COLORS.computed} label="Computed" />
        <LegendItem
          color={CELL_COLORS["reading-cache"]}
          label={isMemoization ? "Reading cache" : "Reading table"}
        />
      </div>
    </div>
  );
}
function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: color }} />
      <span className="text-[var(--color-text-muted)]">{label}</span>
    </div>
  );
}

const MAX_VISIBLE_FRAMES = 8;

/** Vertical call stack panel — newest frame on top, oldest at bottom. Mirrors the CS convention
 *  for call stacks and makes depth-first recursion growth/shrink clearly visible. */
function CallStackPanel({ callStack }: { callStack: string[] }) {
  const shouldReduceMotion = useReducedMotion();
  const overflow =
    callStack.length > MAX_VISIBLE_FRAMES ? callStack.length - MAX_VISIBLE_FRAMES : 0;
  // Show the top MAX_VISIBLE_FRAMES frames (newest = last in array), displayed top-to-bottom reversed
  const visibleFrames = callStack.slice(callStack.length - MAX_VISIBLE_FRAMES).reverse();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="text-xs text-[var(--color-text-muted)]">Call Stack</span>
        <span className="rounded bg-[var(--color-surface-base)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-accent-violet)]">
          {callStack.length}
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        {overflow > 0 && (
          <span className="pl-1 font-mono text-[10px] text-[var(--color-text-muted)]">
            ... {overflow} more
          </span>
        )}
        <AnimatePresence initial={false}>
          {visibleFrames.map((frame, displayIndex) => {
            // depth: 0 = top of stack (newest), increases downward
            const depth = displayIndex;
            const isTop = depth === 0;
            return (
              <motion.div
                key={frame + (callStack.length - displayIndex)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.15 }}
                className="flex items-center gap-1.5"
                style={{ paddingLeft: `${depth * 8}px` }}
              >
                <span
                  className={`rounded px-2 py-0.5 font-mono text-xs ${
                    isTop
                      ? "bg-[var(--color-accent-violet)] text-white"
                      : "bg-[var(--color-surface-base)] text-[var(--color-accent-violet)]"
                  }`}
                >
                  {frame}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
