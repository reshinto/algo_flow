import { describe, it, expect } from "vitest";
import { generateUniquePathsSteps } from "../step-generator";

describe("generateUniquePathsSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateUniquePathsSteps({ rows: 3, columns: 7 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateUniquePathsSteps({ rows: 3, columns: 7 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateUniquePathsSteps({ rows: 3, columns: 7 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states on every step", () => {
    const steps = generateUniquePathsSteps({ rows: 3, columns: 7 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes fill-table steps — one per column for the base row", () => {
    const steps = generateUniquePathsSteps({ rows: 3, columns: 7 });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBe(7);
  });

  it("includes compute-cell steps for non-first-column positions", () => {
    const steps = generateUniquePathsSteps({ rows: 3, columns: 7 });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBeGreaterThan(0);
  });

  it("includes two read-cache steps per compute-cell step", () => {
    const steps = generateUniquePathsSteps({ rows: 3, columns: 7 });
    const computeCount = steps.filter((step) => step.type === "compute-cell").length;
    const cacheCount = steps.filter((step) => step.type === "read-cache").length;
    expect(cacheCount).toBe(computeCount * 2);
  });

  it("has incrementing step indices", () => {
    const steps = generateUniquePathsSteps({ rows: 3, columns: 7 });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("final dp-table state has P(6)=28 for 3×7 default input", () => {
    const steps = generateUniquePathsSteps({ rows: 3, columns: 7 });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.visualState.kind).toBe("dp-table");
    if (lastStep.visualState.kind === "dp-table") {
      const lastCell = lastStep.visualState.table[6];
      expect(lastCell?.value).toBe(28);
    }
  });

  it("returns only initialize and complete steps for a 1×1 grid", () => {
    const steps = generateUniquePathsSteps({ rows: 1, columns: 1 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(0);
  });

  it("uses P(j) labels on all table cells", () => {
    const steps = generateUniquePathsSteps({ rows: 2, columns: 3 });
    const firstStep = steps[0]!;
    if (firstStep.visualState.kind === "dp-table") {
      expect(firstStep.visualState.table[0]?.label).toBe("P(0)");
      expect(firstStep.visualState.table[1]?.label).toBe("P(1)");
    }
  });

  it("final result is 3 for a 3×2 grid", () => {
    const steps = generateUniquePathsSteps({ rows: 3, columns: 2 });
    const lastStep = steps[steps.length - 1]!;
    if (lastStep.visualState.kind === "dp-table") {
      const lastCell = lastStep.visualState.table[1];
      expect(lastCell?.value).toBe(3);
    }
  });
});
