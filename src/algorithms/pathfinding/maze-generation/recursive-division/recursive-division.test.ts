import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { recursiveDivision } from "./sources/recursive-division.ts?fn";

function createOpenGrid(rows: number, cols: number): GridCell[][] {
  return Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => ({
      row: rowIndex,
      col: colIndex,
      type: "empty" as const,
      state: "default" as const,
    })),
  );
}

function setCell(grid: GridCell[][], row: number, col: number, type: GridCell["type"]): void {
  const gridRow = grid[row];
  if (gridRow) {
    const cell = gridRow[col];
    if (cell) cell.type = type;
  }
}

function countCellsOfType(grid: GridCell[][], type: GridCell["type"]): number {
  return grid.flat().filter((cell) => cell.type === type).length;
}

describe("recursiveDivision", () => {
  it("adds walls to an open grid", () => {
    const grid = createOpenGrid(9, 9);
    setCell(grid, 1, 1, "start");
    setCell(grid, 7, 7, "end");

    const result = recursiveDivision(grid, [1, 1], [7, 7]);

    expect(result.wallsBuilt).toBeGreaterThan(0);
  });

  it("increases wall count after generation", () => {
    const grid = createOpenGrid(9, 9);
    setCell(grid, 1, 1, "start");
    setCell(grid, 7, 7, "end");
    const wallsBefore = countCellsOfType(grid, "wall");

    recursiveDivision(grid, [1, 1], [7, 7]);

    const wallsAfter = countCellsOfType(grid, "wall");
    expect(wallsAfter).toBeGreaterThan(wallsBefore);
  });

  it("preserves start cell as start type", () => {
    const grid = createOpenGrid(9, 9);
    setCell(grid, 1, 1, "start");
    setCell(grid, 7, 7, "end");

    recursiveDivision(grid, [1, 1], [7, 7]);

    expect(grid[1]?.[1]?.type).toBe("start");
  });

  it("preserves end cell as end type", () => {
    const grid = createOpenGrid(9, 9);
    setCell(grid, 1, 1, "start");
    setCell(grid, 7, 7, "end");

    recursiveDivision(grid, [1, 1], [7, 7]);

    expect(grid[7]?.[7]?.type).toBe("end");
  });

  it("produces a navigable maze (start can reach end)", () => {
    const grid = createOpenGrid(9, 9);
    setCell(grid, 1, 1, "start");
    setCell(grid, 7, 7, "end");

    recursiveDivision(grid, [1, 1], [7, 7]);

    // BFS to check connectivity
    const rowCount = grid.length;
    const colCount = grid[0]?.length ?? 0;
    const visited: boolean[][] = Array.from({ length: rowCount }, () =>
      new Array(colCount).fill(false),
    );
    const queue: [number, number][] = [[1, 1]];
    visited[1]![1] = true;

    let reachable = false;
    while (queue.length > 0) {
      const current = queue.shift()!;
      const [currentRow, currentCol] = current;
      if (currentRow === 7 && currentCol === 7) {
        reachable = true;
        break;
      }
      for (const [deltaRow, deltaCol] of [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ] as [number, number][]) {
        const neighborRow = currentRow + deltaRow;
        const neighborCol = currentCol + deltaCol;
        if (neighborRow < 0 || neighborRow >= rowCount) continue;
        if (neighborCol < 0 || neighborCol >= colCount) continue;
        if (visited[neighborRow]![neighborCol]) continue;
        const cell = grid[neighborRow]?.[neighborCol];
        if (!cell || cell.type === "wall") continue;
        visited[neighborRow]![neighborCol] = true;
        queue.push([neighborRow, neighborCol]);
      }
    }

    expect(reachable).toBe(true);
  });

  it("returns wallsBuilt count matching actual wall cells added", () => {
    const grid = createOpenGrid(9, 9);
    setCell(grid, 1, 1, "start");
    setCell(grid, 7, 7, "end");

    const result = recursiveDivision(grid, [1, 1], [7, 7]);
    const wallCount = countCellsOfType(grid, "wall");

    expect(result.wallsBuilt).toBe(wallCount);
  });
});
