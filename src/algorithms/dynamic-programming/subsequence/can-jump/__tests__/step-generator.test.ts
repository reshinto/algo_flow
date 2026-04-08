import { describe, it, expect } from "vitest";
import { generateCanJumpSteps } from "../step-generator";

describe("generateCanJumpSteps", () => {
  it("produces steps for a standard reachable input", () => {
    const steps = generateCanJumpSteps({ nums: [2, 3, 1, 1, 4] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateCanJumpSteps({ nums: [2, 3, 1, 1, 4] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateCanJumpSteps({ nums: [2, 3, 1, 1, 4] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for all steps", () => {
    const steps = generateCanJumpSteps({ nums: [2, 3, 1, 1, 4] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes a fill-table step for base case R(0)", () => {
    const steps = generateCanJumpSteps({ nums: [2, 3, 1, 1, 4] });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBe(1);
  });

  it("includes compute-cell steps for indices 1..n-1", () => {
    const steps = generateCanJumpSteps({ nums: [2, 3, 1, 1, 4] });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(4);
  });

  it("includes read-cache steps only for reachable source indices", () => {
    const steps = generateCanJumpSteps({ nums: [2, 3, 1, 1, 4] });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBeGreaterThan(0);
  });

  it("has incrementing step indices", () => {
    const steps = generateCanJumpSteps({ nums: [2, 3, 1, 1, 4] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles single-element array [0]", () => {
    const steps = generateCanJumpSteps({ nums: [0] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("marks result false in complete step variables for unreachable input", () => {
    const steps = generateCanJumpSteps({ nums: [3, 2, 1, 0, 4] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.type).toBe("complete");
    expect(completeStep?.variables?.result).toBe(false);
  });

  it("marks result true in complete step variables for reachable input", () => {
    const steps = generateCanJumpSteps({ nums: [2, 3, 1, 1, 4] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.type).toBe("complete");
    expect(completeStep?.variables?.result).toBe(true);
  });
});
