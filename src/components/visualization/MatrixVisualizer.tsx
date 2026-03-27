import { motion } from "framer-motion";

import type { MatrixVisualState, MatrixCellState } from "@/types";

interface MatrixVisualizerProps {
  visualState: MatrixVisualState;
}

const CELL_COLORS: Record<MatrixCellState, string> = {
  default: "var(--color-viz-default)",
  current: "var(--color-viz-current)",
  collected: "var(--color-viz-sorted)",
  boundary: "var(--color-viz-default)",
};

const DIRECTION_LABEL: Record<string, string> = {
  right: "→ Right",
  down: "↓ Down",
  left: "← Left",
  up: "↑ Up",
};

export default function MatrixVisualizer({ visualState }: MatrixVisualizerProps) {
  const { cells, collectedOrder, direction, boundaries } = visualState;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
      {/* Direction + boundary info */}
      <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
        {direction && (
          <span className="font-semibold" style={{ color: "var(--color-accent-amber)" }}>
            {DIRECTION_LABEL[direction]}
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
                    transition={{ duration: 0.2 }}
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

      {/* Collected order */}
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
    </div>
  );
}
