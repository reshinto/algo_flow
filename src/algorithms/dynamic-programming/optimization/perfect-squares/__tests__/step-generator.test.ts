import { describe, it, expect } from "vitest";
import { generatePerfectSquaresSteps } from "../step-generator";

describe("generatePerfectSquaresSteps", () => {
  it("produces steps for a small input", () => {
    const steps = generatePerfectSquaresSteps({ targetNumber: 12 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generatePerfectSquaresSteps({ targetNumber: 12 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generatePerfectSquaresSteps({ targetNumber: 12 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for every step", () => {
    const steps = generatePerfectSquaresSteps({ targetNumber: 12 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes a fill-table step for the base case S(0) = 0", () => {
    const steps = generatePerfectSquaresSteps({ targetNumber: 12 });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("includes compute-cell steps for each index 1..n", () => {
    const targetNumber = 12;
    const steps = generatePerfectSquaresSteps({ targetNumber });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(targetNumber);
  });

  it("includes read-cache steps — one per perfect square candidate per cell", () => {
    const steps = generatePerfectSquaresSteps({ targetNumber: 4 });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    // For n=4: i=1 has j=1 (1 read), i=2 has j=1 (1 read), i=3 has j=1 (1 read), i=4 has j=1,j=2 (2 reads) = 5 total
    expect(cacheSteps.length).toBe(5);
  });

  it("has incrementing step indices", () => {
    const steps = generatePerfectSquaresSteps({ targetNumber: 5 });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("table cells are labelled S(i)", () => {
    const steps = generatePerfectSquaresSteps({ targetNumber: 4 });
    const finalStep = steps[steps.length - 1]!;
    const visualState = finalStep.visualState;
    if (visualState.kind === "dp-table") {
      expect(visualState.table[0]?.label).toBe("S(0)");
      expect(visualState.table[4]?.label).toBe("S(4)");
    }
  });

  it("handles n=1 edge case (single perfect square)", () => {
    const steps = generatePerfectSquaresSteps({ targetNumber: 1 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("final complete step carries the correct result", () => {
    const steps = generatePerfectSquaresSteps({ targetNumber: 13 });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.type).toBe("complete");
    expect(completeStep.variables["result"]).toBe(2);
  });
});
