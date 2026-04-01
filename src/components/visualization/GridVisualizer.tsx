/** CSS grid visualizer for pathfinding algorithms with cell-state coloring and wave-expansion animations. */
import { useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiRotateCcw } from "react-icons/fi";

import { useAppStore } from "@/store";
import { GRID_DEFAULTS } from "@/utils/constants";
import { IconButton } from "@/components/shared";
import type { GridVisualState, GridCellType, GridCellState, GridCell } from "@/types";

interface GridVisualizerProps {
  visualState: GridVisualState;
}

type CellAppearance = GridCellType | GridCellState;

const CELL_COLORS: Record<CellAppearance, string> = {
  empty: "var(--color-surface-panel)",
  wall: "var(--color-text-muted)",
  start: "var(--color-viz-found)",
  end: "var(--color-viz-swapping)",
  default: "var(--color-surface-panel)",
  open: "var(--color-viz-comparing)",
  closed: "var(--color-viz-visiting)",
  path: "var(--color-viz-found)",
  current: "var(--color-viz-current)",
  "open-reverse": "var(--color-accent-rose)",
  "closed-reverse": "var(--color-viz-swapped)",
  "jump-point": "var(--color-accent-amber)",
  carved: "var(--color-viz-found)",
  generating: "var(--color-viz-comparing)",
};

function getCellColor(type: GridCellType, state: GridCellState): string {
  if (type === "wall") return CELL_COLORS.wall;
  if (type === "start") return CELL_COLORS.start;
  if (type === "end") return CELL_COLORS.end;
  if (state !== "default") return CELL_COLORS[state];
  return CELL_COLORS.empty;
}

type DragMode = "wall" | "clear" | "start" | "end" | null;

export default function GridVisualizer({ visualState }: GridVisualizerProps) {
  const shouldReduceMotion = useReducedMotion();
  const input = useAppStore((state) => state.input) as {
    grid: GridCell[][];
    startPosition: [number, number];
    endPosition: [number, number];
  };
  const setInput = useAppStore((state) => state.setInput);
  const [dragMode, setDragMode] = useState<DragMode>(null);

  const { cells, startPosition: vizStart, endPosition: vizEnd, currentPath } = visualState;
  const rowCount = cells.length;
  const colCount = cells[0]?.length ?? 0;

  const updateCell = useCallback(
    (row: number, col: number, mode: DragMode) => {
      if (!mode) return;
      const grid = input.grid;

      const newGrid = grid.map((gridRow) =>
        gridRow.map((cell) => ({ ...cell, state: "default" as const })),
      );
      let newStart = [...input.startPosition] as [number, number];
      let newEnd = [...input.endPosition] as [number, number];

      if (mode === "start") {
        const oldStartCell = newGrid[newStart[0]]?.[newStart[1]];
        if (oldStartCell) oldStartCell.type = "empty";
        const targetCell = newGrid[row]?.[col];
        if (targetCell) targetCell.type = "start";
        newStart = [row, col];
      } else if (mode === "end") {
        const oldEndCell = newGrid[newEnd[0]]?.[newEnd[1]];
        if (oldEndCell) oldEndCell.type = "empty";
        const targetCell = newGrid[row]?.[col];
        if (targetCell) targetCell.type = "end";
        newEnd = [row, col];
      } else if (mode === "wall") {
        const targetCell = newGrid[row]?.[col];
        if (targetCell && targetCell.type === "empty") {
          targetCell.type = "wall";
        }
      } else if (mode === "clear") {
        const targetCell = newGrid[row]?.[col];
        if (targetCell && targetCell.type === "wall") {
          targetCell.type = "empty";
        }
      }

      setInput({ grid: newGrid, startPosition: newStart, endPosition: newEnd });
    },
    [input, setInput],
  );

  const handleCellMouseDown = (row: number, col: number) => {
    const cell = input.grid[row]?.[col];
    if (!cell) return;
    if (cell.type === "start") {
      setDragMode("start");
    } else if (cell.type === "end") {
      setDragMode("end");
    } else if (cell.type === "wall") {
      setDragMode("clear");
      updateCell(row, col, "clear");
    } else {
      setDragMode("wall");
      updateCell(row, col, "wall");
    }
  };

  const handleCellMouseEnter = (row: number, col: number) => {
    if (!dragMode) return;
    updateCell(row, col, dragMode);
  };

  const handleMouseUp = () => setDragMode(null);

  const handleReset = () => {
    const { rows, cols, startPosition, endPosition } = GRID_DEFAULTS;
    const newGrid: GridCell[][] = [];
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      const row: GridCell[] = [];
      for (let colIndex = 0; colIndex < cols; colIndex++) {
        let cellType: GridCell["type"] = "empty";
        if (rowIndex === startPosition[0] && colIndex === startPosition[1]) cellType = "start";
        if (rowIndex === endPosition[0] && colIndex === endPosition[1]) cellType = "end";
        row.push({ row: rowIndex, col: colIndex, type: cellType, state: "default" });
      }
      newGrid.push(row);
    }
    setInput({
      grid: newGrid,
      startPosition: [...startPosition],
      endPosition: [...endPosition],
    });
  };

  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <div className="flex items-center justify-between pb-1 text-xs px-2">
        <span className="text-[10px] text-[var(--color-text-muted)]">
          Click and drag directly on the grid below to dynamically plot walls and target nodes!
        </span>
        <IconButton label="Reset grid" onClick={handleReset} size="sm" className="h-6 w-6">
          <FiRotateCcw size={12} />
        </IconButton>
      </div>

      <div
        className="mx-auto grid flex-1 select-none place-items-stretch gap-px"
        style={{
          gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))`,
          maxWidth: "100%",
          maxHeight: "100%",
          aspectRatio: `${colCount} / ${rowCount}`,
        }}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDragStart={(e) => e.preventDefault()}
      >
        {cells.flat().map((cell) => {
          const color = getCellColor(cell.type, cell.state);
          const isStart = cell.row === vizStart[0] && cell.col === vizStart[1];
          const isEnd = cell.row === vizEnd[0] && cell.col === vizEnd[1];

          return (
            <motion.div
              key={`${cell.row}-${cell.col}`}
              className="relative flex items-center justify-center rounded-[1px] cursor-pointer"
              animate={{ backgroundColor: color }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.15 }}
              title={`(${cell.row}, ${cell.col})${cell.type === "wall" ? " - wall" : ""}${cell.fCost != null ? ` f=${cell.fCost}` : ""}`}
              onMouseDown={() => handleCellMouseDown(cell.row, cell.col)}
              onMouseEnter={() => handleCellMouseEnter(cell.row, cell.col)}
            >
              {isStart && (
                <span className="text-[8px] font-bold text-[var(--color-surface-base)] pointer-events-none">
                  S
                </span>
              )}
              {isEnd && (
                <span className="text-[8px] font-bold text-[var(--color-surface-base)] pointer-events-none">
                  E
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-between items-center text-xs mt-2 px-2">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <span className="text-[var(--color-text-muted)]">Start:</span>
            <span className="font-mono text-[var(--color-accent-emerald)]">
              ({vizStart[0]}, {vizStart[1]})
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[var(--color-text-muted)]">End:</span>
            <span className="font-mono text-[var(--color-accent-rose)]">
              ({vizEnd[0]}, {vizEnd[1]})
            </span>
          </div>
        </div>
        {currentPath.length > 0 && (
          <div className="flex items-center gap-1">
            <span className="text-[var(--color-text-muted)]">Target Reached: Path Cost</span>
            <span className="font-mono px-2 py-0.5 rounded bg-[var(--color-accent-cyan)] font-bold text-[var(--color-surface-base)]">
              {currentPath.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
