import { describe, it, expect } from "vitest";
import { generateMatrixDiagonalSumSteps } from "./step-generator";

const DEFAULT_MATRIX = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

describe("generateMatrixDiagonalSumSteps", () => {
  it("produces steps for the default 3x3 input", () => {
    const steps = generateMatrixDiagonalSumSteps({ matrix: DEFAULT_MATRIX });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateMatrixDiagonalSumSteps({ matrix: DEFAULT_MATRIX });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateMatrixDiagonalSumSteps({ matrix: DEFAULT_MATRIX });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generateMatrixDiagonalSumSteps({ matrix: DEFAULT_MATRIX });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateMatrixDiagonalSumSteps({ matrix: DEFAULT_MATRIX });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits accumulate steps for each diagonal element", () => {
    const steps = generateMatrixDiagonalSumSteps({ matrix: DEFAULT_MATRIX });
    const accumulateSteps = steps.filter((step) => step.type === "accumulate");
    // 3x3: 3 primary + 3 secondary + 1 center-adjustment = 7
    expect(accumulateSteps.length).toBe(7);
  });

  it("final scalar result equals 25 for the 3x3 default matrix", () => {
    const steps = generateMatrixDiagonalSumSteps({ matrix: DEFAULT_MATRIX });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("matrix");
    if (completeStep.visualState.kind === "matrix") {
      expect(completeStep.visualState.scalarResult).toBe(25);
    }
  });

  it("produces correct result for a 4x4 matrix (no center subtraction)", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    const steps = generateMatrixDiagonalSumSteps({ matrix });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "matrix") {
      expect(completeStep.visualState.scalarResult).toBe(68);
    }
  });

  it("emits correct accumulate count for even-sized matrix (no center step)", () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];
    const steps = generateMatrixDiagonalSumSteps({ matrix });
    const accumulateSteps = steps.filter((step) => step.type === "accumulate");
    // 2x2: 2 primary + 2 secondary = 4 (no center adjustment)
    expect(accumulateSteps.length).toBe(4);
  });
});
