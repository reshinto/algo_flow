import { describe, it, expect } from "vitest";
import { generateSpiralMatrixIISteps } from "../step-generator";

describe("generateSpiralMatrixIISteps", () => {
  it("produces steps for the default input (n=4)", () => {
    const steps = generateSpiralMatrixIISteps({ matrixSize: 4 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSpiralMatrixIISteps({ matrixSize: 4 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSpiralMatrixIISteps({ matrixSize: 4 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generateSpiralMatrixIISteps({ matrixSize: 3 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSpiralMatrixIISteps({ matrixSize: 3 });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits place-value steps for every cell in a 3×3 matrix (9 cells)", () => {
    const steps = generateSpiralMatrixIISteps({ matrixSize: 3 });
    const placeSteps = steps.filter((step) => step.type === "place-value");
    expect(placeSteps.length).toBe(9);
  });

  it("emits place-value steps for every cell in a 4×4 matrix (16 cells)", () => {
    const steps = generateSpiralMatrixIISteps({ matrixSize: 4 });
    const placeSteps = steps.filter((step) => step.type === "place-value");
    expect(placeSteps.length).toBe(16);
  });

  it("handles n=1 with a single place-value step", () => {
    const steps = generateSpiralMatrixIISteps({ matrixSize: 1 });
    const placeSteps = steps.filter((step) => step.type === "place-value");
    expect(placeSteps.length).toBe(1);
  });

  it("final matrix state has correct cell values for 3×3", () => {
    const steps = generateSpiralMatrixIISteps({ matrixSize: 3 });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("matrix");
    if (completeStep.visualState.kind === "matrix") {
      const cells = completeStep.visualState.cells;
      expect(cells[0]?.[0]?.value).toBe(1);
      expect(cells[0]?.[1]?.value).toBe(2);
      expect(cells[0]?.[2]?.value).toBe(3);
      expect(cells[1]?.[2]?.value).toBe(4);
      expect(cells[1]?.[1]?.value).toBe(9);
    }
  });
});
