import { describe, it, expect } from "vitest";
import { generateSpiralOrderSteps } from "./step-generator";

const DEFAULT_MATRIX = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

describe("generateSpiralOrderSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateSpiralOrderSteps({ matrix: DEFAULT_MATRIX });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSpiralOrderSteps({ matrix: DEFAULT_MATRIX });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSpiralOrderSteps({ matrix: DEFAULT_MATRIX });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generateSpiralOrderSteps({ matrix: DEFAULT_MATRIX });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSpiralOrderSteps({ matrix: DEFAULT_MATRIX });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits collect-element steps for every cell", () => {
    const steps = generateSpiralOrderSteps({ matrix: DEFAULT_MATRIX });
    const collectSteps = steps.filter((step) => step.type === "collect-element");
    expect(collectSteps.length).toBe(16);
  });

  it("emits shrink-boundary steps after each pass", () => {
    const steps = generateSpiralOrderSteps({ matrix: DEFAULT_MATRIX });
    const shrinkSteps = steps.filter((step) => step.type === "shrink-boundary");
    expect(shrinkSteps.length).toBeGreaterThan(0);
  });

  it("final collected order matches expected spiral", () => {
    const steps = generateSpiralOrderSteps({ matrix: DEFAULT_MATRIX });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("matrix");
    if (completeStep.visualState.kind === "matrix") {
      expect(completeStep.visualState.collectedOrder).toEqual([
        1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10,
      ]);
    }
  });

  it("handles a 3x3 matrix with correct collected order", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const steps = generateSpiralOrderSteps({ matrix });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "matrix") {
      expect(completeStep.visualState.collectedOrder).toEqual([1, 2, 3, 6, 9, 8, 7, 4, 5]);
    }
  });

  it("handles a single row matrix", () => {
    const steps = generateSpiralOrderSteps({ matrix: [[1, 2, 3]] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "matrix") {
      expect(completeStep.visualState.collectedOrder).toEqual([1, 2, 3]);
    }
  });
});
