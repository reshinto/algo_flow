import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { dfsExploration } from "../sources/dfs-exploration.ts?fn";

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

describe("dfsExploration", () => {
  it("visits all cells in a fully open grid", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");

    const result = dfsExploration(grid, [0, 0]);

    expect(result.visited.length).toBe(9);
  });

  it("starts with the start cell as first visited", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 1, 1, "start");

    const result = dfsExploration(grid, [1, 1]);

    expect(result.visited[0]).toEqual([1, 1]);
  });

  it("does not visit wall cells", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");
    setCell(grid, 0, 1, "wall");
    setCell(grid, 1, 0, "wall");
    setCell(grid, 1, 1, "wall");

    const result = dfsExploration(grid, [0, 0]);

    expect(result.visited.length).toBe(1);
  });

  it("visits only reachable cells when walls partition the grid", () => {
    const grid = createEmptyGrid(4, 4);
    setCell(grid, 0, 0, "start");
    for (let wallRow = 0; wallRow < 4; wallRow++) {
      setCell(grid, wallRow, 2, "wall");
    }

    const result = dfsExploration(grid, [0, 0]);

    expect(result.visited.length).toBe(8);
  });

  it("does not visit the same cell twice", () => {
    const grid = createEmptyGrid(4, 4);
    setCell(grid, 0, 0, "start");

    const result = dfsExploration(grid, [0, 0]);

    const visitedSet = new Set(
      result.visited.map((cell: [number, number]) => `${cell[0]},${cell[1]}`),
    );
    expect(visitedSet.size).toBe(result.visited.length);
  });

  it("tracks maxDepth correctly for a linear corridor", () => {
    const grid = createEmptyGrid(1, 5);
    setCell(grid, 0, 0, "start");

    const result = dfsExploration(grid, [0, 0]);

    // In a 1x5 corridor starting at [0,0], max depth is 4
    expect(result.maxDepth).toBe(4);
  });

  it("returns maxDepth of 0 for isolated start cell", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 1, 1, "start");
    setCell(grid, 0, 1, "wall");
    setCell(grid, 2, 1, "wall");
    setCell(grid, 1, 0, "wall");
    setCell(grid, 1, 2, "wall");
    setCell(grid, 0, 0, "wall");
    setCell(grid, 0, 2, "wall");
    setCell(grid, 2, 0, "wall");
    setCell(grid, 2, 2, "wall");

    const result = dfsExploration(grid, [1, 1]);

    expect(result.maxDepth).toBe(0);
    expect(result.visited.length).toBe(1);
  });

  it("handles 1x1 grid", () => {
    const grid = createEmptyGrid(1, 1);
    setCell(grid, 0, 0, "start");

    const result = dfsExploration(grid, [0, 0]);

    expect(result.visited.length).toBe(1);
    expect(result.maxDepth).toBe(0);
  });
});
