import { describe, it, expect } from "vitest";
import { generateSearch2DMatrixSteps } from "./step-generator";

const DEFAULT_MATRIX = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 60],
];

describe("generateSearch2DMatrixSteps", () => {
  it("produces steps for a found target", () => {
    const steps = generateSearch2DMatrixSteps({ matrix: DEFAULT_MATRIX, target: 3 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSearch2DMatrixSteps({ matrix: DEFAULT_MATRIX, target: 3 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSearch2DMatrixSteps({ matrix: DEFAULT_MATRIX, target: 3 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generateSearch2DMatrixSteps({ matrix: DEFAULT_MATRIX, target: 3 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSearch2DMatrixSteps({ matrix: DEFAULT_MATRIX, target: 3 });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("includes compare-cell steps during binary search", () => {
    const steps = generateSearch2DMatrixSteps({ matrix: DEFAULT_MATRIX, target: 3 });
    const compareSteps = steps.filter((step) => step.type === "compare-cell");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("includes a mark-found step when target is found", () => {
    const steps = generateSearch2DMatrixSteps({ matrix: DEFAULT_MATRIX, target: 3 });
    const foundSteps = steps.filter((step) => step.type === "mark-found");
    expect(foundSteps.length).toBe(1);
  });

  it("does not include mark-found when target is absent", () => {
    const steps = generateSearch2DMatrixSteps({ matrix: DEFAULT_MATRIX, target: 99 });
    const foundSteps = steps.filter((step) => step.type === "mark-found");
    expect(foundSteps.length).toBe(0);
  });

  it("handles an empty matrix gracefully", () => {
    const steps = generateSearch2DMatrixSteps({ matrix: [], target: 5 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("finds the last element with correct step types", () => {
    const steps = generateSearch2DMatrixSteps({ matrix: DEFAULT_MATRIX, target: 60 });
    const foundSteps = steps.filter((step) => step.type === "mark-found");
    expect(foundSteps.length).toBe(1);
  });
});
