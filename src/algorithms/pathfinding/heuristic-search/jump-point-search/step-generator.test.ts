import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { generateJumpPointSearchSteps } from "./step-generator";

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

describe("generateJumpPointSearchSteps", () => {
  it("produces steps for a grid where start and end share a row", () => {
    const grid = createEmptyGrid(3, 5);
    setCell(grid, 1, 0, "start");
    setCell(grid, 1, 4, "end");

    const steps = generateJumpPointSearchSteps({
      grid,
      startPosition: [1, 0],
      endPosition: [1, 4],
    });

    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const grid = createEmptyGrid(3, 5);
    const steps = generateJumpPointSearchSteps({
      grid,
      startPosition: [1, 0],
      endPosition: [1, 4],
    });

    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const grid = createEmptyGrid(3, 5);
    const steps = generateJumpPointSearchSteps({
      grid,
      startPosition: [1, 0],
      endPosition: [1, 4],
    });

    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("includes trace-path when path exists along a row", () => {
    const grid = createEmptyGrid(3, 5);
    setCell(grid, 1, 0, "start");
    setCell(grid, 1, 4, "end");

    const steps = generateJumpPointSearchSteps({
      grid,
      startPosition: [1, 0],
      endPosition: [1, 4],
    });

    const traceStep = steps.find((step) => step.type === "trace-path");
    expect(traceStep).toBeDefined();
  });

  it("produces grid visual states", () => {
    const grid = createEmptyGrid(3, 5);
    const steps = generateJumpPointSearchSteps({
      grid,
      startPosition: [1, 0],
      endPosition: [1, 4],
    });

    for (const step of steps) {
      expect(step.visualState.kind).toBe("grid");
    }
  });

  it("tracks visits in metrics", () => {
    const grid = createEmptyGrid(3, 5);
    const steps = generateJumpPointSearchSteps({
      grid,
      startPosition: [1, 0],
      endPosition: [1, 4],
    });

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.visits).toBeGreaterThan(0);
  });

  it("handles no-path scenario", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 1, 2, "wall");
    setCell(grid, 2, 1, "wall");

    const steps = generateJumpPointSearchSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
    expect(lastStep.description).toContain("No path");
  });

  it("has incrementing step indices", () => {
    const grid = createEmptyGrid(3, 5);
    const steps = generateJumpPointSearchSteps({
      grid,
      startPosition: [1, 0],
      endPosition: [1, 4],
    });

    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
