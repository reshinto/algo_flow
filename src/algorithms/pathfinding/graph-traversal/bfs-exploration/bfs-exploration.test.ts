import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { bfsExploration } from "./sources/bfs-exploration.ts?fn";

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

describe("bfsExploration", () => {
  it("visits all cells in a fully open grid", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");

    const result = bfsExploration(grid, [0, 0]);

    expect(result.visited.length).toBe(9);
  });

  it("starts with the start cell as first visited", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 1, 1, "start");

    const result = bfsExploration(grid, [1, 1]);

    expect(result.visited[0]).toEqual([1, 1]);
  });

  it("counts layers correctly for open grid", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");

    const result = bfsExploration(grid, [0, 0]);

    // From corner (0,0) in a 3x3 grid, max BFS distance is 4 (to corner [2,2])
    expect(result.layers).toBeGreaterThanOrEqual(4);
  });

  it("does not visit wall cells", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");
    setCell(grid, 0, 1, "wall");
    setCell(grid, 1, 0, "wall");
    setCell(grid, 1, 1, "wall");

    const result = bfsExploration(grid, [0, 0]);

    // Only the start cell is reachable
    expect(result.visited.length).toBe(1);
  });

  it("visits only reachable cells when walls partition the grid", () => {
    const grid = createEmptyGrid(4, 4);
    setCell(grid, 0, 0, "start");
    // Create a wall that cuts off the right half
    for (let wallRow = 0; wallRow < 4; wallRow++) {
      setCell(grid, wallRow, 2, "wall");
    }

    const result = bfsExploration(grid, [0, 0]);

    // Left 2 columns: 4x2 = 8 cells
    expect(result.visited.length).toBe(8);
  });

  it("returns layer count of 1 for isolated start cell", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 1, 1, "start");
    setCell(grid, 0, 1, "wall");
    setCell(grid, 2, 1, "wall");
    setCell(grid, 1, 0, "wall");
    setCell(grid, 1, 2, "wall");
    // Corners are not direct neighbors so diagonals don't matter in 4-directional BFS
    setCell(grid, 0, 0, "wall");
    setCell(grid, 0, 2, "wall");
    setCell(grid, 2, 0, "wall");
    setCell(grid, 2, 2, "wall");

    const result = bfsExploration(grid, [1, 1]);

    expect(result.visited.length).toBe(1);
    expect(result.layers).toBe(1);
  });

  it("visits cells layer-by-layer (BFS order property)", () => {
    const grid = createEmptyGrid(5, 1);
    setCell(grid, 0, 0, "start");

    const result = bfsExploration(grid, [0, 0]);

    // In a 5x1 column, BFS visits in order [0,0],[1,0],[2,0],[3,0],[4,0]
    for (let visitIndex = 0; visitIndex < result.visited.length; visitIndex++) {
      expect(result.visited[visitIndex]).toEqual([visitIndex, 0]);
    }
  });

  it("handles 1x1 grid", () => {
    const grid = createEmptyGrid(1, 1);
    setCell(grid, 0, 0, "start");

    const result = bfsExploration(grid, [0, 0]);

    expect(result.visited.length).toBe(1);
    expect(result.layers).toBe(1);
  });

  it("does not visit the same cell twice", () => {
    const grid = createEmptyGrid(4, 4);
    setCell(grid, 0, 0, "start");

    const result = bfsExploration(grid, [0, 0]);

    const visitedSet = new Set(
      result.visited.map((cell: [number, number]) => `${cell[0]},${cell[1]}`),
    );
    expect(visitedSet.size).toBe(result.visited.length);
  });
});
