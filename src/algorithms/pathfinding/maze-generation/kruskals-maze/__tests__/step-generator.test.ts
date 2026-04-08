import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { generateKruskalsMazeSteps } from "../step-generator";

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

describe("generateKruskalsMazeSteps", () => {
  it("produces steps for a small maze grid", () => {
    const grid = createAllWallsGrid(7, 7);
    setCell(grid, 1, 1, "start");
    setCell(grid, 5, 5, "end");

    const steps = generateKruskalsMazeSteps({
      grid,
      startPosition: [1, 1],
      endPosition: [5, 5],
    });

    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const grid = createAllWallsGrid(7, 7);
    setCell(grid, 1, 1, "start");
    setCell(grid, 5, 5, "end");

    const steps = generateKruskalsMazeSteps({
      grid,
      startPosition: [1, 1],
      endPosition: [5, 5],
    });

    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const grid = createAllWallsGrid(7, 7);
    setCell(grid, 1, 1, "start");
    setCell(grid, 5, 5, "end");

    const steps = generateKruskalsMazeSteps({
      grid,
      startPosition: [1, 1],
      endPosition: [5, 5],
    });

    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("includes merge-cells steps", () => {
    const grid = createAllWallsGrid(7, 7);
    setCell(grid, 1, 1, "start");
    setCell(grid, 5, 5, "end");

    const steps = generateKruskalsMazeSteps({
      grid,
      startPosition: [1, 1],
      endPosition: [5, 5],
    });

    const mergeSteps = steps.filter((step) => step.type === "merge-cells");
    expect(mergeSteps.length).toBeGreaterThan(0);
  });

  it("produces grid visual states for all steps", () => {
    const grid = createAllWallsGrid(7, 7);
    setCell(grid, 1, 1, "start");
    setCell(grid, 5, 5, "end");

    const steps = generateKruskalsMazeSteps({
      grid,
      startPosition: [1, 1],
      endPosition: [5, 5],
    });

    for (const step of steps) {
      expect(step.visualState.kind).toBe("grid");
    }
  });

  it("has incrementing step indices", () => {
    const grid = createAllWallsGrid(7, 7);
    setCell(grid, 1, 1, "start");
    setCell(grid, 5, 5, "end");

    const steps = generateKruskalsMazeSteps({
      grid,
      startPosition: [1, 1],
      endPosition: [5, 5],
    });

    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
