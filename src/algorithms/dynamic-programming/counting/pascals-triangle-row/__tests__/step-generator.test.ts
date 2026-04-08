import { describe, it, expect } from "vitest";
import { generatePascalsTriangleRowSteps } from "../step-generator";

describe("generatePascalsTriangleRowSteps", () => {
  it("produces steps for a small input", () => {
    const steps = generatePascalsTriangleRowSteps({ rowIndex: 4 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generatePascalsTriangleRowSteps({ rowIndex: 4 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generatePascalsTriangleRowSteps({ rowIndex: 4 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for all steps", () => {
    const steps = generatePascalsTriangleRowSteps({ rowIndex: 4 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes fill-table steps for all initial 1s (rowIndex + 1 cells)", () => {
    const rowIndex = 4;
    const steps = generatePascalsTriangleRowSteps({ rowIndex });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBe(rowIndex + 1);
  });

  it("includes compute-cell steps for each inner-loop update", () => {
    // Row 4: outer loop runs for rowNumber 2,3,4
    // Inner iterations: rowNumber-1, rowNumber-2, ..., 1 → 1+2+3 = 6 computes
    const steps = generatePascalsTriangleRowSteps({ rowIndex: 4 });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(6);
  });

  it("includes two read-cache steps per compute-cell step", () => {
    const steps = generatePascalsTriangleRowSteps({ rowIndex: 4 });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(cacheSteps.length).toBe(computeSteps.length * 2);
  });

  it("has incrementing step indices", () => {
    const steps = generatePascalsTriangleRowSteps({ rowIndex: 4 });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles row 0 edge case — only initialize and complete", () => {
    const steps = generatePascalsTriangleRowSteps({ rowIndex: 0 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(0);
  });

  it("handles row 1 edge case — no compute steps", () => {
    const steps = generatePascalsTriangleRowSteps({ rowIndex: 1 });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(0);
  });

  it("final complete step variables contain the full result row for row 4", () => {
    const steps = generatePascalsTriangleRowSteps({ rowIndex: 4 });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables.result).toEqual([1, 4, 6, 4, 1]);
  });

  it("dp-table has correct size — rowIndex + 1 cells", () => {
    const rowIndex = 6;
    const steps = generatePascalsTriangleRowSteps({ rowIndex });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.visualState.kind).toBe("dp-table");
    if (lastStep?.visualState.kind === "dp-table") {
      expect(lastStep.visualState.table).toHaveLength(rowIndex + 1);
    }
  });
});
