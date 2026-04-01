import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { generateFloodFillBfsSteps } from "./step-generator";

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

describe("generateFloodFillBfsSteps", () => {
  it("produces steps for a small grid", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");

    const steps = generateFloodFillBfsSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateFloodFillBfsSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateFloodFillBfsSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces grid visual states for all steps", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateFloodFillBfsSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    for (const step of steps) {
      expect(step.visualState.kind).toBe("grid");
    }
  });

  it("tracks visits in metrics", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateFloodFillBfsSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.visits).toBeGreaterThan(0);
  });

  it("has incrementing step indices", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateFloodFillBfsSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("last step variables include filledCount", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateFloodFillBfsSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.variables).toHaveProperty("filledCount");
    expect(lastStep.variables["filledCount"]).toBe(9);
  });

  it("walls reduce the number of close-node steps", () => {
    const openGrid = createEmptyGrid(3, 3);
    const walledGrid = createEmptyGrid(3, 3);
    setCell(walledGrid, 0, 1, "wall");
    setCell(walledGrid, 1, 1, "wall");
    setCell(walledGrid, 2, 1, "wall");

    const openSteps = generateFloodFillBfsSteps({
      grid: openGrid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });
    const walledSteps = generateFloodFillBfsSteps({
      grid: walledGrid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    const openCloseNodes = openSteps.filter((step) => step.type === "close-node").length;
    const walledCloseNodes = walledSteps.filter((step) => step.type === "close-node").length;
    expect(walledCloseNodes).toBeLessThan(openCloseNodes);
  });
});
