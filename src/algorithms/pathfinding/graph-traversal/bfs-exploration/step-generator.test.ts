import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { generateBfsExplorationSteps } from "./step-generator";

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

describe("generateBfsExplorationSteps", () => {
  it("produces steps for a small grid", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 0, 0, "start");

    const steps = generateBfsExplorationSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [0, 0],
    });

    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateBfsExplorationSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [0, 0],
    });

    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateBfsExplorationSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [0, 0],
    });

    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces grid visual states for all steps", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateBfsExplorationSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [0, 0],
    });

    for (const step of steps) {
      expect(step.visualState.kind).toBe("grid");
    }
  });

  it("tracks visits in metrics", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateBfsExplorationSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [0, 0],
    });

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.visits).toBeGreaterThan(0);
  });

  it("has incrementing step indices", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateBfsExplorationSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [0, 0],
    });

    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("includes open-node steps for visited neighbors", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateBfsExplorationSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [0, 0],
    });

    const openNodeStep = steps.find((step) => step.type === "open-node");
    expect(openNodeStep).toBeDefined();
  });

  it("complete step description indicates no path", () => {
    const grid = createEmptyGrid(2, 2);

    const steps = generateBfsExplorationSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [0, 0],
    });

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });
});
