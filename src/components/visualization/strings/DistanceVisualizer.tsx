/**
 * DistanceVisualizer — renders string-distance DP matrix with source/target char labels,
 * cell-state coloring, current-cell highlight, edit operations list, and final result.
 */

import { motion, useReducedMotion } from "framer-motion";

import type {
  DistanceVisualState,
  DistanceCellState,
  EditOperation,
  StringCharState,
} from "@/types";

interface DistanceVisualizerProps {
  visualState: DistanceVisualState;
}

const CELL_SIZE = 32;

const CHAR_COLORS: Record<StringCharState, string> = {
  default: "var(--color-viz-default)",
  current: "var(--color-viz-current)",
  matching: "var(--color-accent-amber)",
  matched: "var(--color-accent-emerald)",
  mismatched: "var(--color-accent-rose)",
};

const CELL_COLORS: Record<DistanceCellState, string> = {
  default: "var(--color-viz-default)",
  computing: "var(--color-viz-current)",
  computed: "var(--color-viz-sorted)",
  path: "var(--color-accent-emerald)",
  current: "var(--color-accent-amber)",
};

const OPERATION_ICONS: Record<EditOperation["type"], string> = {
  insert: "↑",
  delete: "←",
  replace: "↗",
  match: "✓",
};

const OPERATION_LABELS: Record<EditOperation["type"], string> = {
  insert: "Insert",
  delete: "Delete",
  replace: "Replace",
  match: "Match",
};

const OPERATION_COLORS: Record<EditOperation["type"], string> = {
  insert: "var(--color-accent-cyan)",
  delete: "var(--color-accent-rose)",
  replace: "var(--color-accent-amber)",
  match: "var(--color-accent-emerald)",
};

export default function DistanceVisualizer({ visualState }: DistanceVisualizerProps) {
  const shouldReduceMotion = useReducedMotion();
  const { sourceChars, targetChars, matrix, currentRow, currentCol, operations, result } =
    visualState;

  const transition = shouldReduceMotion ? { duration: 0 } : { duration: 0.2 };

  // Column count = sourceChars.length + 1 (one base-case column for empty string)
  // Row count    = targetChars.length + 1 (one base-case row for empty string)
  const colCount = sourceChars.length + 1;
  const rowCount = targetChars.length + 1;

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto p-4">
      <div className="flex min-w-max flex-col gap-6">
        {/* Matrix section */}
        <div className="flex flex-col gap-1">
          {/* Column headers: blank corner + empty-string label + source chars */}
          <div className="flex gap-1">
            {/* Corner spacer (target label column + empty-string column) */}
            <div style={{ width: CELL_SIZE + 4 + CELL_SIZE, flexShrink: 0 }} />
            {/* Empty-string base-case column label */}
            <div
              className="flex items-center justify-center font-mono text-xs"
              style={{
                width: CELL_SIZE,
                height: 16,
                color: "var(--color-text-muted)",
                flexShrink: 0,
              }}
            >
              ε
            </div>
            {/* Source char labels */}
            {sourceChars.map((char, charIdx) => (
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
                animate={{ backgroundColor: CHAR_COLORS[char.state] }}
                transition={transition}
              >
                {char.value}
              </motion.div>
            ))}
          </div>

          {/* Matrix rows */}
          {Array.from({ length: rowCount }, (_, rowIdx) => {
            // rowIdx 0 = base case (empty string), rowIdx 1..m = targetChars[rowIdx-1]
            const targetChar = rowIdx === 0 ? null : (targetChars[rowIdx - 1] ?? null);
            const matrixRow = matrix[rowIdx];

            return (
              <div key={rowIdx} className="flex gap-1">
                {/* Target char label (left column) */}
                {targetChar !== null ? (
                  <motion.div
                    className="flex items-center justify-center rounded font-mono text-sm font-bold"
                    style={{
                      width: CELL_SIZE,
                      height: CELL_SIZE,
                      border: "1px solid var(--color-border-subtle)",
                      color: "var(--color-text-primary)",
                      flexShrink: 0,
                    }}
                    animate={{ backgroundColor: CHAR_COLORS[targetChar.state] }}
                    transition={transition}
                  >
                    {targetChar.value}
                  </motion.div>
                ) : (
                  /* Empty-string base-case row label */
                  <div
                    className="flex items-center justify-center font-mono text-xs"
                    style={{
                      width: CELL_SIZE,
                      height: CELL_SIZE,
                      color: "var(--color-text-muted)",
                      flexShrink: 0,
                    }}
                  >
                    ε
                  </div>
                )}

                {/* Gap between label and cells */}
                <div style={{ width: 4, flexShrink: 0 }} />

                {/* DP matrix cells for this row */}
                {Array.from({ length: colCount }, (_, colIdx) => {
                  const cell = matrixRow?.[colIdx];
                  const isCurrentCell = rowIdx === currentRow && colIdx === currentCol;

                  return (
                    <motion.div
                      key={colIdx}
                      className="flex items-center justify-center rounded font-mono text-sm font-bold"
                      style={{
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        color: "var(--color-text-primary)",
                        flexShrink: 0,
                        border: isCurrentCell
                          ? "2px solid var(--color-accent-amber)"
                          : "1px solid var(--color-border-subtle)",
                        boxShadow: isCurrentCell
                          ? "0 0 6px 1px color-mix(in srgb, var(--color-accent-amber) 40%, transparent)"
                          : "none",
                      }}
                      animate={{
                        backgroundColor: cell ? CELL_COLORS[cell.state] : CELL_COLORS.default,
                      }}
                      transition={transition}
                    >
                      {cell !== undefined ? cell.value : ""}
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Operations list */}
        {operations.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-xs text-[var(--color-text-muted)]">Edit operations</span>
            <div className="flex flex-wrap gap-2">
              {operations.map((operation, opIdx) => (
                <div
                  key={opIdx}
                  className="flex items-center gap-1 rounded px-2 py-1 font-mono text-xs"
                  style={{
                    backgroundColor: "var(--color-surface-tertiary)",
                    border: "1px solid var(--color-border-subtle)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  <span style={{ color: OPERATION_COLORS[operation.type] }}>
                    {OPERATION_ICONS[operation.type]}
                  </span>
                  <span>{OPERATION_LABELS[operation.type]}</span>
                  <span style={{ color: "var(--color-text-muted)" }}>
                    [{operation.sourceIdx},{operation.targetIdx}]
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        {result !== null && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <span className="text-sm text-[var(--color-text-muted)]">Edit distance:</span>
            <span
              className="rounded px-3 py-1 font-mono text-lg font-bold"
              style={{
                backgroundColor: "var(--color-accent-emerald)",
                color: "var(--color-text-primary)",
              }}
            >
              {result}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
