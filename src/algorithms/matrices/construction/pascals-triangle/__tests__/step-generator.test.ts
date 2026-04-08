import { describe, it, expect } from "vitest";
import { generatePascalsTriangleSteps } from "../step-generator";

describe("generatePascalsTriangleSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generatePascalsTriangleSteps({ numRows: 5 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generatePascalsTriangleSteps({ numRows: 5 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generatePascalsTriangleSteps({ numRows: 5 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generatePascalsTriangleSteps({ numRows: 5 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generatePascalsTriangleSteps({ numRows: 5 });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits compute-value steps for inner cells", () => {
    // numRows=5 has inner cells at rows 2,3,4 → 1 + 2 + 3 = 6 inner cells
    const steps = generatePascalsTriangleSteps({ numRows: 5 });
    const computeSteps = steps.filter((step) => step.type === "compute-value");
    expect(computeSteps.length).toBe(6);
  });

  it("emits place-value steps for all edge cells", () => {
    // numRows=5: row0=1 edge, row1=2 edges, row2=2 edges, row3=2 edges, row4=2 edges = 9 edges
    const steps = generatePascalsTriangleSteps({ numRows: 5 });
    const placeSteps = steps.filter((step) => step.type === "place-value");
    expect(placeSteps.length).toBe(9);
  });

  it("single row produces only one place-value step", () => {
    const steps = generatePascalsTriangleSteps({ numRows: 1 });
    const placeSteps = steps.filter((step) => step.type === "place-value");
    expect(placeSteps.length).toBe(1);
  });

  it("compute-value step descriptions reference cell indices", () => {
    const steps = generatePascalsTriangleSteps({ numRows: 4 });
    const computeStep = steps.find((step) => step.type === "compute-value");
    expect(computeStep?.description).toMatch(/pascal\[/);
  });
});
