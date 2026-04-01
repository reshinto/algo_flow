import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { weightedAStar } from "./sources/weighted-a-star.ts?fn";

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

describe("weightedAStar", () => {
  it("finds a path on an empty grid", () => {
    const grid = createEmptyGrid(5, 5);
    setCell(grid, 0, 0, "start");
    setCell(grid, 4, 4, "end");

    const result = weightedAStar(grid, [0, 0], [4, 4], 1.5);

    expect(result.path.length).toBeGreaterThan(0);
    expect(result.path[0]).toEqual([0, 0]);
    expect(result.path[result.path.length - 1]).toEqual([4, 4]);
  });

  it("with weight=1 finds optimal path", () => {
    const grid = createEmptyGrid(5, 5);
    setCell(grid, 0, 0, "start");
    setCell(grid, 4, 4, "end");

    const result = weightedAStar(grid, [0, 0], [4, 4], 1.0);

    expect(result.path.length).toBe(9);
  });

  it("returns empty path when no route exists", () => {
    const grid = createEmptyGrid(5, 5);
    setCell(grid, 0, 0, "start");
    setCell(grid, 4, 4, "end");

    setCell(grid, 0, 1, "wall");
    setCell(grid, 1, 0, "wall");
    setCell(grid, 1, 1, "wall");

    const result = weightedAStar(grid, [0, 0], [4, 4], 1.5);

    expect(result.path).toEqual([]);
  });

  it("navigates around walls", () => {
    const grid = createEmptyGrid(5, 5);
    setCell(grid, 0, 0, "start");
    setCell(grid, 0, 4, "end");

    setCell(grid, 0, 2, "wall");
    setCell(grid, 1, 2, "wall");
    setCell(grid, 2, 2, "wall");

    const result = weightedAStar(grid, [0, 0], [0, 4], 1.5);

    expect(result.path.length).toBeGreaterThan(0);
    expect(result.path[result.path.length - 1]).toEqual([0, 4]);
  });

  it("handles adjacent start and end", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");
    setCell(grid, 0, 1, "end");

    const result = weightedAStar(grid, [0, 0], [0, 1], 1.5);

    expect(result.path).toEqual([
      [0, 0],
      [0, 1],
    ]);
  });

  it("handles start equal to end", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 1, 1, "start");

    const result = weightedAStar(grid, [1, 1], [1, 1], 1.5);

    expect(result.path.length).toBe(1);
    expect(result.path[0]).toEqual([1, 1]);
  });

  it("explores fewer nodes with higher weight", () => {
    const grid = createEmptyGrid(10, 10);
    setCell(grid, 0, 0, "start");
    setCell(grid, 9, 9, "end");

    const lowWeightResult = weightedAStar(grid, [0, 0], [9, 9], 1.0);
    const highWeightResult = weightedAStar(grid, [0, 0], [9, 9], 3.0);

    expect(highWeightResult.visited.length).toBeLessThanOrEqual(lowWeightResult.visited.length);
  });

  it("records the weight used", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");
    setCell(grid, 2, 2, "end");

    const result = weightedAStar(grid, [0, 0], [2, 2], 2.0);

    expect(result.weight).toBe(2.0);
  });
});
