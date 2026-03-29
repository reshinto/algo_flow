import { describe, it, expect } from "vitest";
import { generateLongestKDistinctSteps } from "./step-generator";

describe("generateLongestKDistinctSteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateLongestKDistinctSteps({
      inputArray: [1, 2, 1, 2, 3, 3, 4, 1],
      maxDistinct: 2,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateLongestKDistinctSteps({
      inputArray: [1, 2, 1, 2, 3, 3, 4, 1],
      maxDistinct: 2,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateLongestKDistinctSteps({
      inputArray: [1, 2, 1, 2, 3, 3, 4, 1],
      maxDistinct: 2,
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces array visual states throughout", () => {
    const steps = generateLongestKDistinctSteps({
      inputArray: [1, 2, 1, 2, 3, 3, 4, 1],
      maxDistinct: 2,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes expand-window steps equal to array length", () => {
    const inputArray = [1, 2, 1, 2, 3];
    const steps = generateLongestKDistinctSteps({ inputArray, maxDistinct: 2 });
    const expandSteps = steps.filter((step) => step.type === "expand-window");
    expect(expandSteps.length).toBe(inputArray.length);
  });

  it("includes shrink-window steps when distinct count exceeds k", () => {
    const steps = generateLongestKDistinctSteps({
      inputArray: [1, 2, 3, 1, 2],
      maxDistinct: 2,
    });
    const shrinkSteps = steps.filter((step) => step.type === "shrink-window");
    expect(shrinkSteps.length).toBeGreaterThan(0);
  });

  it("handles empty array gracefully", () => {
    const steps = generateLongestKDistinctSteps({ inputArray: [], maxDistinct: 2 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles k=0 gracefully", () => {
    const steps = generateLongestKDistinctSteps({ inputArray: [1, 2, 3], maxDistinct: 0 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateLongestKDistinctSteps({
      inputArray: [1, 2, 1, 2, 3, 3, 4, 1],
      maxDistinct: 2,
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
