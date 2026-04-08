import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { multiSourceBfs } from "../sources/multi-source-bfs.ts?fn";

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

describe("multiSourceBfs", () => {
  it("assigns distance 1 to all cells on a 1x1 grid", () => {
    const grid = createEmptyGrid(1, 1);

    const result = multiSourceBfs(grid);

    expect(result.distances[0]?.[0]).toBe(1);
    expect(result.maxDistance).toBe(1);
  });

  it("all cells on single row grid have distance 1", () => {
    const grid = createEmptyGrid(1, 5);

    const result = multiSourceBfs(grid);

    /* Every cell is at boundary — distance is 1 */
    for (const distRow of result.distances) {
      for (const dist of distRow ?? []) {
        expect(dist).toBe(1);
      }
    }
  });

  it("center cell of a 3x3 open grid has distance 2", () => {
    const grid = createEmptyGrid(3, 3);

    const result = multiSourceBfs(grid);

    /* Center is (1,1). All edges are distance 1. Center is distance 2 from nearest edge. */
    expect(result.distances[1]?.[1]).toBe(2);
    expect(result.maxDistance).toBe(2);
  });

  it("walls have distance -1", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 1, 1, "wall");

    const result = multiSourceBfs(grid);

    expect(result.distances[1]?.[1]).toBe(-1);
  });

  it("cells directly adjacent to a wall have distance 1", () => {
    const grid = createEmptyGrid(5, 5);
    /* Place a wall in the center */
    setCell(grid, 2, 2, "wall");

    const result = multiSourceBfs(grid);

    /* Direct neighbors of center wall */
    expect(result.distances[1]?.[2]).toBe(1);
    expect(result.distances[3]?.[2]).toBe(1);
    expect(result.distances[2]?.[1]).toBe(1);
    expect(result.distances[2]?.[3]).toBe(1);
  });

  it("maxDistance equals the farthest cell from any wall", () => {
    /* A 5x5 open grid: corners are at distance 1, center (2,2) should be max */
    const grid = createEmptyGrid(5, 5);

    const result = multiSourceBfs(grid);

    expect(result.maxDistance).toBe(3);
    expect(result.distances[2]?.[2]).toBe(3);
  });

  it("all reachable cells receive a non-negative distance", () => {
    const grid = createEmptyGrid(4, 4);
    setCell(grid, 1, 1, "wall");

    const result = multiSourceBfs(grid);

    for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
      for (let colIndex = 0; colIndex < 4; colIndex++) {
        const cell = grid[rowIndex]?.[colIndex];
        if (cell?.type !== "wall") {
          expect(result.distances[rowIndex]?.[colIndex]).toBeGreaterThan(0);
        }
      }
    }
  });
});
