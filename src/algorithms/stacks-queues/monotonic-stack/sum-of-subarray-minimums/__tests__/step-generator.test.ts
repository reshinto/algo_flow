import { describe, it, expect } from "vitest";
import { generateSumOfSubarrayMinimumsSteps } from "../step-generator";

describe("generateSumOfSubarrayMinimumsSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateSumOfSubarrayMinimumsSteps({ arr: [3, 1, 2, 4] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSumOfSubarrayMinimumsSteps({ arr: [3, 1, 2, 4] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSumOfSubarrayMinimumsSteps({ arr: [3, 1, 2, 4] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateSumOfSubarrayMinimumsSteps({ arr: [3, 1, 2, 4] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSumOfSubarrayMinimumsSteps({ arr: [3, 1, 2, 4] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits visit steps for each element in each pass", () => {
    const steps = generateSumOfSubarrayMinimumsSteps({ arr: [3, 1, 2, 4] });
    const visitSteps = steps.filter((step) => step.type === "visit");
    // Two passes over 4 elements = 8 visit steps
    expect(visitSteps.length).toBe(8);
  });

  it("emits compare steps for boundary resolution and contribution sum", () => {
    const steps = generateSumOfSubarrayMinimumsSteps({ arr: [3, 1, 2, 4] });
    const compareSteps = steps.filter((step) => step.type === "compare");
    // 4 left-boundary compares + 4 right-boundary compares + 4 contribution compares = 12
    expect(compareSteps.length).toBe(12);
  });

  it("emits push steps for each element in each pass", () => {
    const steps = generateSumOfSubarrayMinimumsSteps({ arr: [3, 1, 2, 4] });
    const pushSteps = steps.filter((step) => step.type === "push");
    // Two passes over 4 elements = at least 4 pushes (some may be preceded by pops)
    expect(pushSteps.length).toBeGreaterThanOrEqual(4);
  });

  it("final complete step contains the correct result", () => {
    const steps = generateSumOfSubarrayMinimumsSteps({ arr: [3, 1, 2, 4] });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
    expect(lastStep.variables["result"]).toBe(17);
  });

  it("handles a single-element array", () => {
    const steps = generateSumOfSubarrayMinimumsSteps({ arr: [5] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.variables["result"]).toBe(5);
  });

  it("handles duplicate values in the array", () => {
    const steps = generateSumOfSubarrayMinimumsSteps({ arr: [1, 1] });
    expect(steps.length).toBeGreaterThan(0);
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.variables["result"]).toBe(3);
  });
});
