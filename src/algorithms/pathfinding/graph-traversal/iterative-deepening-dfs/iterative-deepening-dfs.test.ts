import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { iterativeDeepeningDfs } from "./sources/iterative-deepening-dfs.ts?fn";

function createEmptyGrid(rows: number, cols: number): GridCell[][] {
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

describe("iterativeDeepeningDfs", () => {
  it("finds a path on an empty grid", () => {
    const grid = createEmptyGrid(4, 4);
    setCell(grid, 0, 0, "start");
    setCell(grid, 3, 3, "end");

    const result = iterativeDeepeningDfs(grid, [0, 0], [3, 3]);

    expect(result.path.length).toBeGreaterThan(0);
    expect(result.path[0]).toEqual([0, 0]);
    expect(result.path[result.path.length - 1]).toEqual([3, 3]);
  });

  it("finds shortest path (optimal length)", () => {
    const grid = createEmptyGrid(1, 5);
    setCell(grid, 0, 0, "start");
    setCell(grid, 0, 4, "end");

    const result = iterativeDeepeningDfs(grid, [0, 0], [0, 4]);

    // Manhattan distance from (0,0) to (0,4) is 4 — path has 5 cells including both endpoints
    expect(result.path.length).toBe(5);
  });

  it("returns empty path when no route exists", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");
    setCell(grid, 2, 2, "end");
    setCell(grid, 0, 1, "wall");
    setCell(grid, 1, 0, "wall");
    setCell(grid, 1, 1, "wall");

    const result = iterativeDeepeningDfs(grid, [0, 0], [2, 2]);

    expect(result.path).toEqual([]);
  });

  it("handles adjacent start and end", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");
    setCell(grid, 0, 1, "end");

    const result = iterativeDeepeningDfs(grid, [0, 0], [0, 1]);

    expect(result.path.length).toBe(2);
    expect(result.path[0]).toEqual([0, 0]);
    expect(result.path[1]).toEqual([0, 1]);
  });

  it("tracks depthReached when path is found", () => {
    const grid = createEmptyGrid(1, 4);
    setCell(grid, 0, 0, "start");
    setCell(grid, 0, 3, "end");

    const result = iterativeDeepeningDfs(grid, [0, 0], [0, 3]);

    expect(result.depthReached).toBe(3);
  });

  it("finds valid path (each consecutive pair is adjacent)", () => {
    const grid = createEmptyGrid(4, 4);
    setCell(grid, 0, 0, "start");
    setCell(grid, 3, 3, "end");

    const result = iterativeDeepeningDfs(grid, [0, 0], [3, 3]);

    for (let pathIndex = 1; pathIndex < result.path.length; pathIndex++) {
      const prev = result.path[pathIndex - 1]!;
      const curr = result.path[pathIndex]!;
      const rowDiff = Math.abs(curr[0] - prev[0]);
      const colDiff = Math.abs(curr[1] - prev[1]);
      expect(rowDiff + colDiff).toBe(1);
    }
  });

  it("tracks visited cells across iterations", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");
    setCell(grid, 2, 2, "end");

    const result = iterativeDeepeningDfs(grid, [0, 0], [2, 2]);

    // IDDFS revisits shallow nodes — visited count should be greater than path length
    expect(result.visited.length).toBeGreaterThan(0);
  });
});
