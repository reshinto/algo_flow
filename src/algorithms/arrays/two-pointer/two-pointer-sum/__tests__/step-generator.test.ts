import { describe, it, expect } from "vitest";
import { generateTwoPointerSumSteps } from "../step-generator";

describe("generateTwoPointerSumSteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateTwoPointerSumSteps({
      sortedArray: [1, 2, 4, 6, 8, 11, 15],
      target: 10,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateTwoPointerSumSteps({
      sortedArray: [1, 2, 4, 6, 8, 11, 15],
      target: 10,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateTwoPointerSumSteps({
      sortedArray: [1, 2, 4, 6, 8, 11, 15],
      target: 10,
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states", () => {
    const steps = generateTwoPointerSumSteps({
      sortedArray: [1, 2, 4, 6, 8, 11, 15],
      target: 10,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes compare steps during execution", () => {
    const steps = generateTwoPointerSumSteps({
      sortedArray: [1, 2, 4, 6, 8, 11, 15],
      target: 10,
    });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("handles an array where no pair is found", () => {
    const steps = generateTwoPointerSumSteps({
      sortedArray: [1, 2, 4, 6, 8],
      target: 100,
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
    expect(lastStep?.variables?.found).toBe(false);
  });

  it("handles an empty array gracefully", () => {
    const steps = generateTwoPointerSumSteps({
      sortedArray: [],
      target: 10,
    });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateTwoPointerSumSteps({
      sortedArray: [1, 2, 4, 6, 8, 11, 15],
      target: 10,
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("complete step reports found=true and correct indices for matching input", () => {
    const steps = generateTwoPointerSumSteps({
      sortedArray: [1, 2, 4, 6, 8, 11, 15],
      target: 10,
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.found).toBe(true);
    expect(completeStep?.variables?.leftIndex).toBe(1);
    expect(completeStep?.variables?.rightIndex).toBe(4);
  });

  it("complete step reports found=false when target is not achievable", () => {
    const steps = generateTwoPointerSumSteps({
      sortedArray: [1, 3, 5, 7],
      target: 2,
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.found).toBe(false);
    expect(completeStep?.variables?.leftIndex).toBe(-1);
    expect(completeStep?.variables?.rightIndex).toBe(-1);
  });

  it("includes leftPointer and rightPointer in compare step variables", () => {
    const steps = generateTwoPointerSumSteps({
      sortedArray: [1, 2, 4, 6, 8, 11, 15],
      target: 10,
    });
    const compareStep = steps.find((step) => step.type === "compare");
    expect(compareStep?.variables).toHaveProperty("leftPointer");
    expect(compareStep?.variables).toHaveProperty("rightPointer");
    expect(compareStep?.variables).toHaveProperty("currentSum");
    expect(compareStep?.variables).toHaveProperty("target");
  });

  it("complete step reports found=true for default input", () => {
    const steps = generateTwoPointerSumSteps({
      sortedArray: [1, 2, 4, 6, 8, 11, 15],
      target: 10,
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.found).toBe(true);
  });
});
