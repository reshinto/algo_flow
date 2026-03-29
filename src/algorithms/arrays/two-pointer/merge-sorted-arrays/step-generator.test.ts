import { describe, it, expect } from "vitest";
import { generateMergeSortedArraysSteps } from "./step-generator";

describe("generateMergeSortedArraysSteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateMergeSortedArraysSteps({
      firstArray: [1, 3, 5],
      secondArray: [2, 4, 6],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateMergeSortedArraysSteps({
      firstArray: [1, 3, 5],
      secondArray: [2, 4, 6],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateMergeSortedArraysSteps({
      firstArray: [1, 3, 5],
      secondArray: [2, 4, 6],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states", () => {
    const steps = generateMergeSortedArraysSteps({
      firstArray: [1, 3, 5],
      secondArray: [2, 4, 6],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes compare steps for cross-array comparisons", () => {
    const steps = generateMergeSortedArraysSteps({
      firstArray: [1, 3, 5],
      secondArray: [2, 4, 6],
    });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("includes visit steps for element placement", () => {
    const steps = generateMergeSortedArraysSteps({
      firstArray: [1, 3, 5],
      secondArray: [2, 4, 6],
    });
    const visitSteps = steps.filter((step) => step.type === "visit");
    /* One visit per element placed: 3 + 3 = 6 */
    expect(visitSteps.length).toBe(6);
  });

  it("has secondary elements in visual state representing the merged result", () => {
    const steps = generateMergeSortedArraysSteps({
      firstArray: [1, 3, 5],
      secondArray: [2, 4, 6],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.visualState.kind).toBe("array");
    if (lastStep?.visualState.kind === "array") {
      expect(lastStep.visualState.secondaryElements).toBeDefined();
      expect(lastStep.visualState.secondaryElements?.length).toBe(6);
    }
  });

  it("handles empty input arrays gracefully", () => {
    const steps = generateMergeSortedArraysSteps({
      firstArray: [],
      secondArray: [],
    });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateMergeSortedArraysSteps({
      firstArray: [1, 3],
      secondArray: [2, 4],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
