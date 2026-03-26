/**
 * Visualizes dynamic programming execution as an animated table of cells.
 * Supports both tabulation (bottom-up) and memoization (top-down with call stack).
 * Each cell reflects its computation state via color and scale transitions.
 */
import { motion } from "framer-motion";

import type { DPTableVisualState, DPCellState } from "@/types";

interface DPTableVisualizerProps {
  visualState: DPTableVisualState;
}

/** Maps each DP cell computation state to its CSS color variable. */
const CELL_COLORS: Record<DPCellState, string> = {
  default: "var(--color-surface-panel)",
  computing: "var(--color-viz-swapping)",
  computed: "var(--color-viz-sorted)",
  "reading-cache": "var(--color-viz-comparing)",
  current: "var(--color-viz-current)",
};

/** Renders DP table cells, an optional call stack, and a color legend. */
export default function DPTableVisualizer({ visualState }: DPTableVisualizerProps) {
  const { table, currentIndex, callStack } = visualState;

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      {/* DP Table cells */}
      <div className="flex flex-1 flex-wrap items-center justify-center gap-2">
        {table.map((cell) => {
          const isActive = cell.index === currentIndex;
          return (
            <motion.div
              key={cell.index}
              className="flex flex-col items-center gap-1"
              animate={{ scale: isActive ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.div
                className="flex h-12 w-16 items-center justify-center rounded border font-mono text-lg"
                animate={{
                  backgroundColor: CELL_COLORS[cell.state],
                  borderColor: isActive ? "var(--color-accent-cyan)" : "var(--color-border-subtle)",
                }}
                transition={{ duration: 0.3 }}
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

      {/* Call stack (for memoization visualization) */}
      {callStack && callStack.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">Call Stack:</span>
          <div className="flex flex-wrap gap-1">
            {callStack.map((frame, frameIndex) => (
              <span
                key={frameIndex}
                className="rounded bg-[var(--color-surface-base)] px-2 py-0.5 font-mono text-xs text-[var(--color-accent-violet)]"
              >
                {frame}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-[10px]">
        <LegendItem color={CELL_COLORS.default} label="Not computed" />
        <LegendItem color={CELL_COLORS.computing} label="Computing" />
        <LegendItem color={CELL_COLORS.computed} label="Computed" />
        <LegendItem color={CELL_COLORS["reading-cache"]} label="Reading cache" />
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
