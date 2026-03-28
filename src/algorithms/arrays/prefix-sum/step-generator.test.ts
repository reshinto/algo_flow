import { describe, it, expect } from "vitest";
import { generatePrefixSumSteps } from "./step-generator";

describe("generatePrefixSumSteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generatePrefixSumSteps({
      inputArray: [2, 4, 1, 3, 5, 2],
      queries: [[1, 3]],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generatePrefixSumSteps({
      inputArray: [2, 4, 1, 3, 5, 2],
      queries: [[1, 3]],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generatePrefixSumSteps({
      inputArray: [2, 4, 1, 3, 5, 2],
      queries: [[1, 3]],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states throughout", () => {
    const steps = generatePrefixSumSteps({
      inputArray: [2, 4, 1, 3, 5, 2],
      queries: [[1, 3]],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes secondary elements for the prefix array visualization", () => {
    const steps = generatePrefixSumSteps({
      inputArray: [2, 4, 1, 3, 5, 2],
      queries: [[0, 2]],
    });
    const buildStep = steps.find(
      (step) =>
        step.type === "visit" &&
        (step.visualState as { kind: string; secondaryElements?: unknown[] }).secondaryElements !==
          undefined,
    );
    expect(buildStep).toBeDefined();
  });

  it("includes visit steps for each element during build phase", () => {
    const inputArray = [1, 2, 3, 4];
    const steps = generatePrefixSumSteps({
      inputArray,
      queries: [[0, 3]],
    });
    const visitSteps = steps.filter((step) => step.type === "visit");
    /* At minimum one visit per element in the build phase */
    expect(visitSteps.length).toBeGreaterThanOrEqual(inputArray.length);
  });

  it("includes compare steps during query phase", () => {
    const steps = generatePrefixSumSteps({
      inputArray: [2, 4, 1, 3, 5, 2],
      queries: [
        [1, 3],
        [0, 4],
      ],
    });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("handles empty array gracefully", () => {
    const steps = generatePrefixSumSteps({
      inputArray: [],
      queries: [],
    });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generatePrefixSumSteps({
      inputArray: [2, 4, 1, 3],
      queries: [[0, 3]],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles multiple queries producing the correct step count ordering", () => {
    const steps = generatePrefixSumSteps({
      inputArray: [1, 2, 3],
      queries: [
        [0, 1],
        [1, 2],
        [0, 2],
      ],
    });
    /* Build phase: 3 visits + initialize + complete + query steps */
    expect(steps.length).toBeGreaterThan(3 + 3);
  });
});
