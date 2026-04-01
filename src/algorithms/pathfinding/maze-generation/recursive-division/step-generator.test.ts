import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { generateRecursiveDivisionSteps } from "./step-generator";

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

describe("generateRecursiveDivisionSteps", () => {
  it("produces steps for a small open grid", () => {
    const grid = createOpenGrid(7, 7);
    setCell(grid, 1, 1, "start");
    setCell(grid, 5, 5, "end");

    const steps = generateRecursiveDivisionSteps({
      grid,
      startPosition: [1, 1],
      endPosition: [5, 5],
    });

    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const grid = createOpenGrid(7, 7);
    setCell(grid, 1, 1, "start");
    setCell(grid, 5, 5, "end");

    const steps = generateRecursiveDivisionSteps({
      grid,
      startPosition: [1, 1],
      endPosition: [5, 5],
    });

    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const grid = createOpenGrid(7, 7);
    setCell(grid, 1, 1, "start");
    setCell(grid, 5, 5, "end");

    const steps = generateRecursiveDivisionSteps({
      grid,
      startPosition: [1, 1],
      endPosition: [5, 5],
    });

    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("includes carve-cell steps (used for buildWall)", () => {
    const grid = createOpenGrid(9, 9);
    setCell(grid, 1, 1, "start");
    setCell(grid, 7, 7, "end");

    const steps = generateRecursiveDivisionSteps({
      grid,
      startPosition: [1, 1],
      endPosition: [7, 7],
    });

    // buildWall produces "carve-cell" type steps
    const wallSteps = steps.filter((step) => step.type === "carve-cell");
    expect(wallSteps.length).toBeGreaterThan(0);
  });

  it("produces grid visual states for all steps", () => {
    const grid = createOpenGrid(7, 7);
    setCell(grid, 1, 1, "start");
    setCell(grid, 5, 5, "end");

    const steps = generateRecursiveDivisionSteps({
      grid,
      startPosition: [1, 1],
      endPosition: [5, 5],
    });

    for (const step of steps) {
      expect(step.visualState.kind).toBe("grid");
    }
  });

  it("has incrementing step indices", () => {
    const grid = createOpenGrid(7, 7);
    setCell(grid, 1, 1, "start");
    setCell(grid, 5, 5, "end");

    const steps = generateRecursiveDivisionSteps({
      grid,
      startPosition: [1, 1],
      endPosition: [5, 5],
    });

    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
