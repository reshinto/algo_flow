import { describe, it, expect } from "vitest";
import type { GridCell } from "@/types";
import { generateDfsExplorationSteps } from "./step-generator";

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

describe("generateDfsExplorationSteps", () => {
  it("produces steps for a small grid", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateDfsExplorationSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [0, 0],
    });

    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateDfsExplorationSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [0, 0],
    });

    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateDfsExplorationSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [0, 0],
    });

    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces grid visual states for all steps", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateDfsExplorationSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [0, 0],
    });

    for (const step of steps) {
      expect(step.visualState.kind).toBe("grid");
    }
  });

  it("has incrementing step indices", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateDfsExplorationSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [0, 0],
    });

    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("tracks visits in metrics", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateDfsExplorationSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [0, 0],
    });

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.visits).toBeGreaterThan(0);
  });

  it("includes open-node and close-node steps", () => {
    const grid = createEmptyGrid(3, 3);

    const steps = generateDfsExplorationSteps({
      grid,
      startPosition: [0, 0],
      endPosition: [0, 0],
    });

    const openStep = steps.find((step) => step.type === "open-node");
    const closeStep = steps.find((step) => step.type === "close-node");
    expect(openStep).toBeDefined();
    expect(closeStep).toBeDefined();
  });
});
