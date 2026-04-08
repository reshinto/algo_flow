import { describe, it, expect } from "vitest";
import { generateKthSmallestSortedMatrixSteps } from "../step-generator";

const DEFAULT_MATRIX = [
  [1, 5, 9],
  [10, 11, 13],
  [12, 13, 15],
];

describe("generateKthSmallestSortedMatrixSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateKthSmallestSortedMatrixSteps({ matrix: DEFAULT_MATRIX, targetK: 8 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateKthSmallestSortedMatrixSteps({ matrix: DEFAULT_MATRIX, targetK: 8 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateKthSmallestSortedMatrixSteps({ matrix: DEFAULT_MATRIX, targetK: 8 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generateKthSmallestSortedMatrixSteps({ matrix: DEFAULT_MATRIX, targetK: 8 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateKthSmallestSortedMatrixSteps({ matrix: DEFAULT_MATRIX, targetK: 8 });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("includes a mark-found step when the kth element is found", () => {
    const steps = generateKthSmallestSortedMatrixSteps({ matrix: DEFAULT_MATRIX, targetK: 8 });
    const foundStep = steps.find((step) => step.type === "mark-found");
    expect(foundStep).toBeDefined();
  });

  it("emits compare-cell steps during binary search", () => {
    const steps = generateKthSmallestSortedMatrixSteps({ matrix: DEFAULT_MATRIX, targetK: 8 });
    const compareSteps = steps.filter((step) => step.type === "compare-cell");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("result in complete step matches the kth smallest value", () => {
    const steps = generateKthSmallestSortedMatrixSteps({ matrix: DEFAULT_MATRIX, targetK: 8 });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables.result).toBe(13);
  });

  it("handles k=1 (minimum element)", () => {
    const steps = generateKthSmallestSortedMatrixSteps({ matrix: DEFAULT_MATRIX, targetK: 1 });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables.result).toBe(1);
  });

  it("handles k=n² (maximum element)", () => {
    const steps = generateKthSmallestSortedMatrixSteps({ matrix: DEFAULT_MATRIX, targetK: 9 });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables.result).toBe(15);
  });
});
