import { useCallback, useState } from "react";
import { FiRotateCcw } from "react-icons/fi";

import { useAppStore } from "@/store";
import { GRID_DEFAULTS } from "@/utils/constants";
import { IconButton } from "@/components/shared";
import type { GridCell } from "@/types";

type DragMode = "wall" | "clear" | "start" | "end" | null;

export default function GridInputEditor() {
  const input = useAppStore((state) => state.input) as {
    grid: GridCell[][];
    startPosition: [number, number];
    endPosition: [number, number];
  };
  const setInput = useAppStore((state) => state.setInput);
  const [dragMode, setDragMode] = useState<DragMode>(null);

  const grid = input.grid;
  const rowCount = grid.length;
  const colCount = grid[0]?.length ?? 0;

  const updateCell = useCallback(
    (row: number, col: number, mode: DragMode) => {
      if (!mode) return;

      const newGrid = grid.map((gridRow) =>
        gridRow.map((cell) => ({ ...cell, state: "default" as const })),
      );
      let newStart = [...input.startPosition] as [number, number];
      let newEnd = [...input.endPosition] as [number, number];

      if (mode === "start") {
        /* Move start: clear old start, set new */
        const oldStartRow = newGrid[newStart[0]];
        if (oldStartRow) {
          const oldCell = oldStartRow[newStart[1]];
          if (oldCell) oldCell.type = "empty";
        }
        const targetRow = newGrid[row];
        if (targetRow) {
          const targetCell = targetRow[col];
          if (targetCell) targetCell.type = "start";
        }
        newStart = [row, col];
      } else if (mode === "end") {
        const oldEndRow = newGrid[newEnd[0]];
        if (oldEndRow) {
          const oldCell = oldEndRow[newEnd[1]];
          if (oldCell) oldCell.type = "empty";
        }
        const targetRow = newGrid[row];
        if (targetRow) {
          const targetCell = targetRow[col];
          if (targetCell) targetCell.type = "end";
        }
        newEnd = [row, col];
      } else if (mode === "wall") {
        const targetRow = newGrid[row];
        if (targetRow) {
          const targetCell = targetRow[col];
          if (targetCell && targetCell.type === "empty") {
            targetCell.type = "wall";
          }
        }
      } else if (mode === "clear") {
        const targetRow = newGrid[row];
        if (targetRow) {
          const targetCell = targetRow[col];
          if (targetCell && targetCell.type === "wall") {
            targetCell.type = "empty";
          }
        }
      }

      setInput({ grid: newGrid, startPosition: newStart, endPosition: newEnd });
    },
    [grid, input.startPosition, input.endPosition, setInput],
  );

  const handleCellMouseDown = (row: number, col: number) => {
    const cellRow = grid[row];
    const cell = cellRow?.[col];
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

  const handleMouseUp = () => {
    setDragMode(null);
  };

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
    <div className="flex flex-col gap-1 border-b border-[var(--color-border-default)] px-3 py-2">
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-[var(--color-text-muted)]">
          Click to add walls, drag start/end nodes
        </span>
        <div className="flex-1" />
        <IconButton label="Reset grid" onClick={handleReset} size="sm">
          <FiRotateCcw size={12} />
        </IconButton>
      </div>
      <div
        className="grid select-none gap-px"
        style={{
          gridTemplateColumns: `repeat(${colCount}, 1fr)`,
        }}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {Array.from({ length: rowCount }, (_, rowIndex) =>
          Array.from({ length: colCount }, (_, colIndex) => {
            const cellRow = grid[rowIndex];
            const cell = cellRow?.[colIndex];
            if (!cell) return null;

            let cellColor = "var(--color-surface-tertiary)";
            if (cell.type === "wall") cellColor = "var(--color-text-muted)";
            if (cell.type === "start") cellColor = "var(--color-viz-found)";
            if (cell.type === "end") cellColor = "var(--color-viz-swapping)";

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="aspect-square cursor-pointer"
                style={{ backgroundColor: cellColor, minHeight: 6 }}
                onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}
