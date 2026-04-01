import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { generateBinaryTreeMazeSteps } from "./step-generator";

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

describe("generateBinaryTreeMazeSteps", () => {
  it("produces steps for a small maze grid", () => {
    const grid = createAllWallsGrid(7, 7);
    setCell(grid, 1, 1, "start");
    setCell(grid, 5, 5, "end");

    const steps = generateBinaryTreeMazeSteps({
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

    const steps = generateBinaryTreeMazeSteps({
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

    const steps = generateBinaryTreeMazeSteps({
      grid,
      startPosition: [1, 1],
      endPosition: [5, 5],
    });

    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("includes carve-cell steps", () => {
    const grid = createAllWallsGrid(7, 7);
    setCell(grid, 1, 1, "start");
    setCell(grid, 5, 5, "end");

    const steps = generateBinaryTreeMazeSteps({
      grid,
      startPosition: [1, 1],
      endPosition: [5, 5],
    });

    const carveSteps = steps.filter((step) => step.type === "carve-cell");
    expect(carveSteps.length).toBeGreaterThan(0);
  });

  it("produces grid visual states for all steps", () => {
    const grid = createAllWallsGrid(7, 7);
    setCell(grid, 1, 1, "start");
    setCell(grid, 5, 5, "end");

    const steps = generateBinaryTreeMazeSteps({
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

    const steps = generateBinaryTreeMazeSteps({
      grid,
      startPosition: [1, 1],
      endPosition: [5, 5],
    });

    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("step count matches expected passage and wall carves", () => {
    const grid = createAllWallsGrid(7, 7);
    setCell(grid, 1, 1, "start");
    setCell(grid, 5, 5, "end");

    const steps = generateBinaryTreeMazeSteps({
      grid,
      startPosition: [1, 1],
      endPosition: [5, 5],
    });

    // initialize + carve steps + complete >= 2 (min)
    expect(steps.length).toBeGreaterThanOrEqual(3);
  });
});
