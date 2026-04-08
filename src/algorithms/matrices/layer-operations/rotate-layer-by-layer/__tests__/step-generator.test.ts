import { describe, it, expect } from "vitest";
import { generateRotateLayerByLayerSteps } from "../step-generator";

const DEFAULT_MATRIX = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

describe("generateRotateLayerByLayerSteps", () => {
  it("produces steps for the default 4x4 input", () => {
    const steps = generateRotateLayerByLayerSteps({ matrix: DEFAULT_MATRIX });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateRotateLayerByLayerSteps({ matrix: DEFAULT_MATRIX });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateRotateLayerByLayerSteps({ matrix: DEFAULT_MATRIX });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generateRotateLayerByLayerSteps({ matrix: DEFAULT_MATRIX });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateRotateLayerByLayerSteps({ matrix: DEFAULT_MATRIX });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits select-layer steps for each layer", () => {
    const steps = generateRotateLayerByLayerSteps({ matrix: DEFAULT_MATRIX });
    const selectLayerSteps = steps.filter((step) => step.type === "select-layer");
    // 4x4 has 2 layers
    expect(selectLayerSteps.length).toBe(2);
  });

  it("emits swap-cells steps for each position in each layer", () => {
    const steps = generateRotateLayerByLayerSteps({ matrix: DEFAULT_MATRIX });
    const swapSteps = steps.filter((step) => step.type === "swap-cells");
    // 4x4: layer 0 has 3 positions × 3 swaps = 9; layer 1 has 1 position × 3 swaps = 3 → total 12
    expect(swapSteps.length).toBe(12);
  });

  it("emits process-layer steps after each layer completes", () => {
    const steps = generateRotateLayerByLayerSteps({ matrix: DEFAULT_MATRIX });
    const processLayerSteps = steps.filter((step) => step.type === "process-layer");
    expect(processLayerSteps.length).toBe(2);
  });

  it("produces correct final matrix state for 3x3 input", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const steps = generateRotateLayerByLayerSteps({ matrix });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("matrix");
    if (completeStep.visualState.kind === "matrix") {
      const finalValues = completeStep.visualState.cells.map((row) =>
        row.map((cell) => cell.value),
      );
      expect(finalValues).toEqual([
        [7, 4, 1],
        [8, 5, 2],
        [9, 6, 3],
      ]);
    }
  });

  it("produces correct final matrix state for 4x4 input", () => {
    const steps = generateRotateLayerByLayerSteps({ matrix: DEFAULT_MATRIX });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("matrix");
    if (completeStep.visualState.kind === "matrix") {
      const finalValues = completeStep.visualState.cells.map((row) =>
        row.map((cell) => cell.value),
      );
      expect(finalValues).toEqual([
        [13, 9, 5, 1],
        [14, 10, 6, 2],
        [15, 11, 7, 3],
        [16, 12, 8, 4],
      ]);
    }
  });

  it("handles 1x1 matrix — only initialize and complete steps", () => {
    const steps = generateRotateLayerByLayerSteps({ matrix: [[99]] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    // No layers to process
    const swapSteps = steps.filter((step) => step.type === "swap-cells");
    expect(swapSteps.length).toBe(0);
  });

  it("does not mutate the input matrix", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const originalSnapshot = JSON.stringify(matrix);
    generateRotateLayerByLayerSteps({ matrix });
    expect(JSON.stringify(matrix)).toBe(originalSnapshot);
  });
});
