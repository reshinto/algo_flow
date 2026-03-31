import { describe, it, expect } from "vitest";
import { generateIsSortedSteps } from "./step-generator";

describe("generateIsSortedSteps", () => {
  it("produces steps for a sorted 5-element list", () => {
    const steps = generateIsSortedSteps({ values: [1, 3, 5, 7, 9] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateIsSortedSteps({ values: [1, 3, 5, 7, 9] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateIsSortedSteps({ values: [1, 3, 5, 7, 9] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces linked-list visual states throughout", () => {
    const steps = generateIsSortedSteps({ values: [1, 3, 5, 7, 9] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("linked-list");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateIsSortedSteps({ values: [1, 3, 5, 7, 9] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("handles an empty list", () => {
    const steps = generateIsSortedSteps({ values: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles a single-element list", () => {
    const steps = generateIsSortedSteps({ values: [7] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("returns false early when unsorted list is detected", () => {
    const steps = generateIsSortedSteps({ values: [1, 5, 3, 7] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables.isSorted).toBe(false);
  });

  it("returns true when list is sorted", () => {
    const steps = generateIsSortedSteps({ values: [1, 3, 5, 7, 9] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables.isSorted).toBe(true);
  });

  it("emits compare steps for comparison operations", () => {
    const steps = generateIsSortedSteps({ values: [1, 3, 5, 7, 9] });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });
});
