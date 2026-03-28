import { describe, it, expect } from "vitest";
import { generateRemoveDuplicatesSteps } from "./step-generator";

describe("generateRemoveDuplicatesSteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateRemoveDuplicatesSteps({
      sortedArray: [1, 1, 2, 2, 3],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateRemoveDuplicatesSteps({
      sortedArray: [1, 1, 2, 2, 3],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateRemoveDuplicatesSteps({
      sortedArray: [1, 1, 2, 2, 3],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states", () => {
    const steps = generateRemoveDuplicatesSteps({
      sortedArray: [1, 1, 2, 2, 3],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes compare steps for each element after the first", () => {
    const steps = generateRemoveDuplicatesSteps({
      sortedArray: [1, 1, 2, 3],
    });
    const compareSteps = steps.filter((step) => step.type === "compare");
    /* One compare per element after the first = 3 */
    expect(compareSteps.length).toBe(3);
  });

  it("handles empty array gracefully", () => {
    const steps = generateRemoveDuplicatesSteps({
      sortedArray: [],
    });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("handles array with no duplicates", () => {
    const steps = generateRemoveDuplicatesSteps({
      sortedArray: [1, 2, 3],
    });
    expect(steps.length).toBeGreaterThan(0);
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateRemoveDuplicatesSteps({
      sortedArray: [1, 1, 2, 2, 3],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("includes expected variables in complete step", () => {
    const steps = generateRemoveDuplicatesSteps({
      sortedArray: [1, 1, 2, 2, 3],
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("uniqueCount");
    expect(completeStep?.variables).toHaveProperty("result");
  });

  it("includes expected variables in compare steps", () => {
    const steps = generateRemoveDuplicatesSteps({
      sortedArray: [1, 1, 2],
    });
    const compareStep = steps.find((step) => step.type === "compare");
    expect(compareStep?.variables).toHaveProperty("writePointer");
    expect(compareStep?.variables).toHaveProperty("readPointer");
    expect(compareStep?.variables).toHaveProperty("writeValue");
    expect(compareStep?.variables).toHaveProperty("readValue");
    expect(compareStep?.variables).toHaveProperty("isDuplicate");
  });

  it("complete step reports correct unique count for default input", () => {
    const steps = generateRemoveDuplicatesSteps({
      sortedArray: [1, 1, 2, 2, 3, 4, 4, 5],
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.uniqueCount).toBe(5);
  });
});
