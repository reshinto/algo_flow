import { describe, it, expect } from "vitest";
import { generateLISTabulationSteps } from "./step-generator";

describe("generateLISTabulationSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateLISTabulationSteps({ sequence: [10, 9, 2, 5, 3, 7, 101, 18] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateLISTabulationSteps({ sequence: [10, 9, 2, 5, 3, 7, 101, 18] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateLISTabulationSteps({ sequence: [10, 9, 2, 5, 3, 7, 101, 18] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for every step", () => {
    const steps = generateLISTabulationSteps({ sequence: [10, 9, 2, 5, 3, 7, 101, 18] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes fill-table steps — one per element (n=8 fill steps)", () => {
    const steps = generateLISTabulationSteps({ sequence: [10, 9, 2, 5, 3, 7, 101, 18] });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBe(8);
  });

  it("includes read-cache steps — one per (outerIndex, innerIndex) pair scanned", () => {
    const steps = generateLISTabulationSteps({ sequence: [10, 9, 2, 5, 3, 7, 101, 18] });
    const readSteps = steps.filter((step) => step.type === "read-cache");
    // n=8 → outer loop runs 7 times, inner scans: 1+2+3+4+5+6+7 = 28
    expect(readSteps.length).toBe(28);
  });

  it("has incrementing step indices", () => {
    const steps = generateLISTabulationSteps({ sequence: [10, 9, 2, 5, 3, 7, 101, 18] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("complete step variables contain the correct result of 4", () => {
    const steps = generateLISTabulationSteps({ sequence: [10, 9, 2, 5, 3, 7, 101, 18] });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["result"]).toBe(4);
  });

  it("handles a single-element sequence", () => {
    const steps = generateLISTabulationSteps({ sequence: [42] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["result"]).toBe(1);
  });

  it("handles an empty sequence", () => {
    const steps = generateLISTabulationSteps({ sequence: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["result"]).toBe(0);
  });

  it("returns result of 4 for [0,1,0,3,2,3]", () => {
    const steps = generateLISTabulationSteps({ sequence: [0, 1, 0, 3, 2, 3] });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["result"]).toBe(4);
  });

  it("returns result of 1 for all-equal sequence [7,7,7]", () => {
    const steps = generateLISTabulationSteps({ sequence: [7, 7, 7] });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["result"]).toBe(1);
  });
});
