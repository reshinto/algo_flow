import { motion, useReducedMotion } from "framer-motion";

import type { MatrixVisualState, MatrixCellState } from "@/types";

interface MatrixVisualizerProps {
  visualState: MatrixVisualState;
}

const CELL_COLORS: Record<MatrixCellState, string> = {
  default: "var(--color-viz-default)",
  current: "var(--color-viz-current)",
  collected: "var(--color-viz-sorted)",
  boundary: "var(--color-viz-default)",
  swapping: "var(--color-accent-amber)",
  swapped: "var(--color-accent-cyan)",
  zeroed: "var(--color-accent-rose)",
  marked: "var(--color-accent-amber)",
  flipped: "var(--color-accent-cyan)",
  comparing: "var(--color-viz-current)",
  found: "var(--color-accent-emerald)",
  searching: "var(--color-accent-blue)",
  eliminated: "var(--color-viz-default)",
  placed: "var(--color-viz-sorted)",
  computing: "var(--color-accent-amber)",
  "layer-active": "var(--color-accent-violet)",
  "layer-processed": "var(--color-accent-cyan)",
};

const DIRECTION_LABEL: Record<string, string> = {
  right: "\u2192 Right",
  down: "\u2193 Down",
  left: "\u2190 Left",
  up: "\u2191 Up",
  "diagonal-down": "\u2198 Diagonal Down",
  "diagonal-up": "\u2197 Diagonal Up",
  "zigzag-left": "\u2190 Zigzag Left",
  "zigzag-right": "\u2192 Zigzag Right",
};

export default function MatrixVisualizer({ visualState }: MatrixVisualizerProps) {
  const shouldReduceMotion = useReducedMotion();
  const {
    cells,
    collectedOrder,
    direction,
    boundaries,
    phase,
    operationLabel,
    scalarResult,
    activeLayer,
    totalLayers,
    searchTarget,
  } = visualState;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
      {/* Status bar: direction, boundaries, phase, operation label */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--color-text-muted)]">
        {operationLabel && (
          <span className="font-semibold" style={{ color: "var(--color-accent-violet)" }}>
            {operationLabel}
          </span>
        )}
        {direction && (
          <span className="font-semibold" style={{ color: "var(--color-accent-amber)" }}>
            {DIRECTION_LABEL[direction] ?? direction}
          </span>
        )}
        {phase && (
          <span className="font-semibold" style={{ color: "var(--color-accent-cyan)" }}>
            Phase: {phase}
          </span>
        )}
        {searchTarget !== undefined && searchTarget !== null && (
          <span>
            Target:{" "}
            <span className="font-semibold" style={{ color: "var(--color-accent-emerald)" }}>
              {searchTarget}
            </span>
          </span>
        )}
        {activeLayer !== undefined && activeLayer !== null && totalLayers !== undefined && (
          <span>
            Layer: {activeLayer}/{totalLayers}
          </span>
        )}
        {scalarResult !== undefined && scalarResult !== null && (
          <span>
            Result:{" "}
            <span className="font-semibold" style={{ color: "var(--color-accent-emerald)" }}>
              {scalarResult}
            </span>
          </span>
        )}
        <span>
          top:{boundaries.top} bottom:{boundaries.bottom} left:{boundaries.left} right:
          {boundaries.right}
        </span>
      </div>

      {/* Matrix grid */}
      <div className="flex items-center justify-center overflow-hidden">
        <div className="flex flex-col gap-1">
          {cells.map((row, rowIdx) => (
            <div key={rowIdx} className="flex gap-1">
              {row.map((cell, colIdx) => {
                const isBoundaryRow = rowIdx === boundaries.top || rowIdx === boundaries.bottom;
                const isBoundaryCol = colIdx === boundaries.left || colIdx === boundaries.right;
                const isInBounds =
                  rowIdx >= boundaries.top &&
                  rowIdx <= boundaries.bottom &&
                  colIdx >= boundaries.left &&
                  colIdx <= boundaries.right;
                const borderColor =
                  (isBoundaryRow || isBoundaryCol) && isInBounds
                    ? "var(--color-accent-amber)"
                    : "var(--color-border-subtle)";

                return (
                  <motion.div
                    key={colIdx}
                    className="flex h-12 w-12 items-center justify-center rounded font-mono text-sm font-bold"
                    animate={{ backgroundColor: CELL_COLORS[cell.state] }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                    style={{
                      border: `1px solid ${borderColor}`,
                      color: "var(--color-text-primary)",
                      flexShrink: 0,
                    }}
                  >
                    {cell.value}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Collected order (shown when there are collected elements) */}
      {collectedOrder.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-muted)]">
            Collected ({collectedOrder.length})
          </span>
          <div className="flex flex-wrap gap-1">
            {collectedOrder.map((value, idx) => (
              <div
                key={idx}
                className="flex h-8 w-8 items-center justify-center rounded font-mono text-xs font-bold"
                style={{
                  backgroundColor: "var(--color-viz-sorted)",
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-primary)",
                }}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
