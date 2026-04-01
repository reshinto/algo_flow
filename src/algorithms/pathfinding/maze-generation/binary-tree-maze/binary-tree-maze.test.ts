import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { binaryTreeMaze } from "./sources/binary-tree-maze.ts?fn";

function createAllWallsGrid(rows: number, cols: number): GridCell[][] {
  return Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => ({
      row: rowIndex,
      col: colIndex,
      type: "wall" as const,
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

describe("binaryTreeMaze", () => {
  it("carves passages from an all-walls grid", () => {
    const grid = createAllWallsGrid(9, 9);
    setCell(grid, 1, 1, "start");
    setCell(grid, 7, 7, "end");

    const result = binaryTreeMaze(grid);

    expect(result.passagesCarved).toBeGreaterThan(0);
  });

  it("carves all odd-indexed passage cells", () => {
    const grid = createAllWallsGrid(9, 9);
    setCell(grid, 1, 1, "start");
    setCell(grid, 7, 7, "end");

    binaryTreeMaze(grid);

    // All odd-row, odd-col cells should be empty (carved passage cells)
    for (let rowIndex = 1; rowIndex < 8; rowIndex += 2) {
      for (let colIndex = 1; colIndex < 8; colIndex += 2) {
        const cell = grid[rowIndex]?.[colIndex];
        expect(cell?.type).not.toBe("wall");
      }
    }
  });

  it("does not carve border cells", () => {
    const grid = createAllWallsGrid(9, 9);
    setCell(grid, 1, 1, "start");
    setCell(grid, 7, 7, "end");

    binaryTreeMaze(grid);

    for (let colIndex = 0; colIndex < 9; colIndex++) {
      expect(grid[0]?.[colIndex]?.type).toBe("wall");
      expect(grid[8]?.[colIndex]?.type).toBe("wall");
    }
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      expect(grid[rowIndex]?.[0]?.type).toBe("wall");
      expect(grid[rowIndex]?.[8]?.type).toBe("wall");
    }
  });

  it("creates diagonal bias — top row corridor exists", () => {
    const grid = createAllWallsGrid(9, 9);
    setCell(grid, 1, 1, "start");
    setCell(grid, 7, 7, "end");

    binaryTreeMaze(grid);

    // Top passage row (row 1) should have all odd cells open AND connecting walls
    // The top row cannot go north so it always carves east — creating continuous corridor
    const topRowPassageCells = [1, 3, 5, 7];
    for (const colIndex of topRowPassageCells) {
      const cell = grid[1]?.[colIndex];
      expect(cell?.type).not.toBe("wall");
    }
  });

  it("returns passagesCarved count greater than number of passage cells alone", () => {
    const grid = createAllWallsGrid(9, 9);
    setCell(grid, 1, 1, "start");
    setCell(grid, 7, 7, "end");

    const result = binaryTreeMaze(grid);

    // 4x4=16 passage cells, plus at least 1 connecting wall per cell = >16
    expect(result.passagesCarved).toBeGreaterThan(16);
  });
});
