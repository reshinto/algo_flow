import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { generateMultiSourceBfsSteps } from "../step-generator";

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

describe("generateMultiSourceBfsSteps", () => {
  it("produces steps for a small grid", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateMultiSourceBfsSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateMultiSourceBfsSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateMultiSourceBfsSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces grid visual states for all steps", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateMultiSourceBfsSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    for (const step of steps) {
      expect(step.visualState.kind).toBe("grid");
    }
  });

  it("tracks queue operations in metrics", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateMultiSourceBfsSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.queueOperations).toBeGreaterThan(0);
  });

  it("has incrementing step indices", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateMultiSourceBfsSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("includes update-cost steps for distance labeling", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateMultiSourceBfsSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    const updateCostStep = steps.find((step) => step.type === "update-cost");
    expect(updateCostStep).toBeDefined();
  });

  it("last step variables include maxDistance", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateMultiSourceBfsSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.variables).toHaveProperty("maxDistance");
    expect(lastStep.variables["maxDistance"]).toBe(2);
  });

  it("walls do not get open-node or close-node steps", () => {
    const grid = createEmptyGrid(3, 3);
    setCell(grid, 1, 1, "wall");

    const steps = generateMultiSourceBfsSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [2, 2],
    });

    /* No step should reference the wall cell (1,1) as opened or closed */
    const wallSteps = steps.filter((step) => {
      const vars = step.variables as Record<string, unknown>;
      const nodeRef = vars["cell"] ?? vars["currentNode"] ?? vars["neighborNode"];
      if (Array.isArray(nodeRef)) {
        return nodeRef[0] === 1 && nodeRef[1] === 1;
      }
      return false;
    });
    expect(wallSteps.length).toBe(0);
  });
});
