import { describe, it, expect } from "vitest";
import { generateSubarraySumEqualsKSteps } from "./step-generator";

describe("generateSubarraySumEqualsKSteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateSubarraySumEqualsKSteps({
      inputArray: [1, 2, 3, -1, 1, 2],
      target: 3,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSubarraySumEqualsKSteps({
      inputArray: [1, 2, 3, -1, 1, 2],
      target: 3,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSubarraySumEqualsKSteps({
      inputArray: [1, 2, 3, -1, 1, 2],
      target: 3,
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states throughout", () => {
    const steps = generateSubarraySumEqualsKSteps({
      inputArray: [1, 2, 3],
      target: 3,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes secondary elements showing running sums", () => {
    const steps = generateSubarraySumEqualsKSteps({
      inputArray: [1, 2, 3],
      target: 3,
    });
    const stepWithSecondary = steps.find(
      (step) =>
        step.type === "visit" &&
        (step.visualState as { kind: string; secondaryElements?: unknown[] }).secondaryElements !==
          undefined,
    );
    expect(stepWithSecondary).toBeDefined();
  });

  it("includes visit steps for each element", () => {
    const inputArray = [1, 2, 3, 4];
    const steps = generateSubarraySumEqualsKSteps({
      inputArray,
      target: 3,
    });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThanOrEqual(inputArray.length);
  });

  it("includes compare steps at each index", () => {
    const steps = generateSubarraySumEqualsKSteps({
      inputArray: [1, 2, 3],
      target: 3,
    });
    const compareSteps = steps.filter((step) => step.type === "compare");
    /* One compare step per element (found or not found) */
    expect(compareSteps.length).toBe(3);
  });

  it("marks elements as found when a matching subarray is detected", () => {
    const steps = generateSubarraySumEqualsKSteps({
      inputArray: [1, 2, 3],
      target: 3,
    });
    const foundSteps = steps.filter(
      (step) => step.type === "compare" && step.variables["hasMatch"] !== false,
    );
    expect(foundSteps.length).toBeGreaterThan(0);
  });

  it("handles empty array gracefully", () => {
    const steps = generateSubarraySumEqualsKSteps({
      inputArray: [],
      target: 3,
    });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateSubarraySumEqualsKSteps({
      inputArray: [1, 2, 3],
      target: 3,
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("records the total found count in the complete step variables", () => {
    const steps = generateSubarraySumEqualsKSteps({
      inputArray: [1, 2, 3],
      target: 3,
    });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.variables["count"]).toBe(2);
  });
});
