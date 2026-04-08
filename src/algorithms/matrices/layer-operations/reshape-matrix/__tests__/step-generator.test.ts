import { describe, it, expect } from "vitest";
import { generateReshapeMatrixSteps } from "../step-generator";

const DEFAULT_MATRIX = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
];

describe("generateReshapeMatrixSteps", () => {
  it("produces steps for a valid 2x4 → 4x2 reshape", () => {
    const steps = generateReshapeMatrixSteps({
      matrix: DEFAULT_MATRIX,
      targetRows: 4,
      targetCols: 2,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateReshapeMatrixSteps({
      matrix: DEFAULT_MATRIX,
      targetRows: 4,
      targetCols: 2,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateReshapeMatrixSteps({
      matrix: DEFAULT_MATRIX,
      targetRows: 4,
      targetCols: 2,
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generateReshapeMatrixSteps({
      matrix: DEFAULT_MATRIX,
      targetRows: 4,
      targetCols: 2,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateReshapeMatrixSteps({
      matrix: DEFAULT_MATRIX,
      targetRows: 4,
      targetCols: 2,
    });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits place-value steps for each element in a valid reshape", () => {
    const steps = generateReshapeMatrixSteps({
      matrix: DEFAULT_MATRIX,
      targetRows: 4,
      targetCols: 2,
    });
    const placeSteps = steps.filter((step) => step.type === "place-value");
    expect(placeSteps.length).toBe(8);
  });

  it("produces only initialize and complete steps for an impossible reshape", () => {
    const steps = generateReshapeMatrixSteps({
      matrix: DEFAULT_MATRIX,
      targetRows: 3,
      targetCols: 3,
    });
    const placeSteps = steps.filter((step) => step.type === "place-value");
    expect(placeSteps.length).toBe(0);
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
