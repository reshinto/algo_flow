import { describe, it, expect } from "vitest";
import { generateFlipImageSteps } from "../step-generator";

const DEFAULT_MATRIX = [
  [1, 1, 0],
  [1, 0, 1],
  [0, 0, 0],
];

describe("generateFlipImageSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateFlipImageSteps({ matrix: DEFAULT_MATRIX });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateFlipImageSteps({ matrix: DEFAULT_MATRIX });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateFlipImageSteps({ matrix: DEFAULT_MATRIX });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generateFlipImageSteps({ matrix: DEFAULT_MATRIX });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateFlipImageSteps({ matrix: DEFAULT_MATRIX });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits flip-cell steps for all transformed elements", () => {
    const steps = generateFlipImageSteps({ matrix: DEFAULT_MATRIX });
    const flipSteps = steps.filter((step) => step.type === "flip-cell");
    // 3-col matrix (odd): each row has 1 pair of end-flips (2 steps) + 1 middle-flip = 3 per row, 9 total
    expect(flipSteps.length).toBe(9);
  });

  it("final visual state reflects the correctly flipped and inverted matrix", () => {
    const steps = generateFlipImageSteps({ matrix: DEFAULT_MATRIX });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("matrix");
    if (completeStep.visualState.kind === "matrix") {
      const finalValues = completeStep.visualState.cells.map((row) =>
        row.map((cell) => cell.value),
      );
      expect(finalValues).toEqual([
        [1, 0, 0],
        [0, 1, 0],
        [1, 1, 1],
      ]);
    }
  });

  it("handles a 1×1 matrix with only initialize, phase, and complete steps (no pairs)", () => {
    const steps = generateFlipImageSteps({ matrix: [[0]] });
    // 1×1: only one middle-flip step
    const flipSteps = steps.filter((step) => step.type === "flip-cell");
    expect(flipSteps.length).toBe(1);
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("does not mutate the original input matrix", () => {
    const matrix = [
      [1, 1, 0],
      [1, 0, 1],
      [0, 0, 0],
    ];
    const originalSnapshot = matrix.map((row) => [...row]);
    generateFlipImageSteps({ matrix });
    expect(matrix).toEqual(originalSnapshot);
  });
});
