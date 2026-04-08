import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { generateDStarLiteSteps } from "../step-generator";

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

describe("generateDStarLiteSteps", () => {
  it("produces steps for a small grid", () => {
    const grid = createEmptyGrid(5, 5);
    setCell(grid, 0, 0, "start");
    setCell(grid, 4, 4, "end");

    const steps = generateDStarLiteSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [4, 4],
    });

    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const grid = createEmptyGrid(3, 3);
    const steps = generateDStarLiteSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const grid = createEmptyGrid(3, 3);
    const steps = generateDStarLiteSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("includes trace-path when path exists", () => {
    const grid = createEmptyGrid(5, 5);
    setCell(grid, 0, 0, "start");
    setCell(grid, 4, 4, "end");

    const steps = generateDStarLiteSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [4, 4],
    });

    const traceStep = steps.find((step) => step.type === "trace-path");
    expect(traceStep).toBeDefined();
  });

  it("produces grid visual states", () => {
    const grid = createEmptyGrid(3, 3);
    const steps = generateDStarLiteSteps({
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
    const steps = generateDStarLiteSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.visits).toBeGreaterThan(0);
  });

  it("handles no-path scenario", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 1, 2, "wall");
    setCell(grid, 2, 1, "wall");

    const steps = generateDStarLiteSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
    expect(lastStep.description).toContain("No path");
  });

  it("has incrementing step indices", () => {
    const grid = createEmptyGrid(3, 3);
    const steps = generateDStarLiteSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
