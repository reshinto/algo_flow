import { motion } from "framer-motion";

import type { GridVisualState, GridCellType, GridCellState } from "@/types";

interface GridVisualizerProps {
  visualState: GridVisualState;
}

type CellAppearance = GridCellType | GridCellState;

const CELL_COLORS: Record<CellAppearance, string> = {
  /* Cell types */
  empty: "var(--color-surface-panel)",
  wall: "var(--color-text-muted)",
  start: "var(--color-viz-found)",
  end: "var(--color-viz-swapping)",
  /* Cell states */
  default: "var(--color-surface-panel)",
  open: "var(--color-viz-comparing)",
  closed: "var(--color-viz-visiting)",
  path: "var(--color-viz-found)",
  current: "var(--color-viz-current)",
};

function getCellColor(type: GridCellType, state: GridCellState): string {
  if (type === "wall") return CELL_COLORS.wall;
  if (type === "start") return CELL_COLORS.start;
  if (type === "end") return CELL_COLORS.end;
  if (state !== "default") return CELL_COLORS[state];
  return CELL_COLORS.empty;
}

export default function GridVisualizer({ visualState }: GridVisualizerProps) {
  const { cells, startPosition, endPosition, currentPath } = visualState;
  const rowCount = cells.length;
  const colCount = cells[0]?.length ?? 0;

  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <div
        className="mx-auto grid flex-1 place-items-stretch gap-px"
        style={{
          gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))`,
          maxWidth: "100%",
          maxHeight: "100%",
          aspectRatio: `${colCount} / ${rowCount}`,
        }}
      >
        {cells.flat().map((cell) => {
          const color = getCellColor(cell.type, cell.state);
          const isStart = cell.row === startPosition[0] && cell.col === startPosition[1];
          const isEnd = cell.row === endPosition[0] && cell.col === endPosition[1];

          return (
            <motion.div
              key={`${cell.row}-${cell.col}`}
              className="relative flex items-center justify-center rounded-[1px]"
              animate={{ backgroundColor: color }}
              transition={{ duration: 0.15 }}
              title={`(${cell.row}, ${cell.col})${cell.type === "wall" ? " - wall" : ""}${cell.fCost != null ? ` f=${cell.fCost}` : ""}`}
            >
              {isStart && (
                <span className="text-[8px] font-bold text-[var(--color-surface-base)]">S</span>
              )}
              {isEnd && (
                <span className="text-[8px] font-bold text-[var(--color-surface-base)]">E</span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Path info */}
      <div className="flex gap-4 text-xs">
        <div className="flex items-center gap-1">
          <span className="text-[var(--color-text-muted)]">Start:</span>
          <span className="font-mono text-[var(--color-accent-emerald)]">
            ({startPosition[0]}, {startPosition[1]})
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[var(--color-text-muted)]">End:</span>
          <span className="font-mono text-[var(--color-accent-rose)]">
            ({endPosition[0]}, {endPosition[1]})
          </span>
        </div>
        {currentPath.length > 0 && (
          <div className="flex items-center gap-1">
            <span className="text-[var(--color-text-muted)]">Path length:</span>
            <span className="font-mono text-[var(--color-accent-cyan)]">{currentPath.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}
