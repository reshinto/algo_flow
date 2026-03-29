import { describe, it, expect } from "vitest";
import { generateCatalanNumbersSteps } from "./step-generator";

describe("generateCatalanNumbersSteps", () => {
  it("produces steps for a small input", () => {
    const steps = generateCatalanNumbersSteps({ targetIndex: 5 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateCatalanNumbersSteps({ targetIndex: 5 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateCatalanNumbersSteps({ targetIndex: 5 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for every step", () => {
    const steps = generateCatalanNumbersSteps({ targetIndex: 5 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes a fill-table step for the base case C(0)", () => {
    const steps = generateCatalanNumbersSteps({ targetIndex: 5 });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("includes compute-cell steps for indices 1 through targetIndex", () => {
    const steps = generateCatalanNumbersSteps({ targetIndex: 5 });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    // One compute-cell per (outerIndex, splitIndex) pair: 1+2+3+4+5 = 15
    expect(computeSteps.length).toBe(15);
  });

  it("includes read-cache steps — two per (outerIndex, splitIndex) pair", () => {
    const steps = generateCatalanNumbersSteps({ targetIndex: 5 });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    // Two reads per pair: 2 * (1+2+3+4+5) = 30
    expect(cacheSteps.length).toBe(30);
  });

  it("has incrementing step indices", () => {
    const steps = generateCatalanNumbersSteps({ targetIndex: 5 });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles C(0) edge case — initialize then complete", () => {
    const steps = generateCatalanNumbersSteps({ targetIndex: 0 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles C(1) producing a single compute-cell after base case", () => {
    const steps = generateCatalanNumbersSteps({ targetIndex: 1 });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(1);
  });
});
