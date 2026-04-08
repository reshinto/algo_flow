import { describe, it, expect } from "vitest";
import { generateMoveZerosSteps } from "../step-generator";

describe("generateMoveZerosSteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateMoveZerosSteps({
      inputArray: [0, 1, 0, 3, 12],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateMoveZerosSteps({
      inputArray: [0, 1, 0, 3, 12],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateMoveZerosSteps({
      inputArray: [0, 1, 0, 3, 12],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states", () => {
    const steps = generateMoveZerosSteps({
      inputArray: [0, 1, 0, 3, 12],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes compare steps for each element check", () => {
    const steps = generateMoveZerosSteps({
      inputArray: [0, 1, 0, 3],
    });
    const compareSteps = steps.filter((step) => step.type === "compare");
    /* One compare per element = 4 */
    expect(compareSteps.length).toBe(4);
  });

  it("includes swap steps only for non-zero elements that need repositioning", () => {
    const steps = generateMoveZerosSteps({
      inputArray: [0, 1, 0, 3],
    });
    const swapSteps = steps.filter((step) => step.type === "swap");
    /* [0,1,0,3]: 1 at index 1 (write=0, needs swap), 3 at index 3 (write=1, needs swap) */
    expect(swapSteps.length).toBe(2);
  });

  it("handles empty array gracefully", () => {
    const steps = generateMoveZerosSteps({
      inputArray: [],
    });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("handles array with no zeros — no swap steps", () => {
    const steps = generateMoveZerosSteps({
      inputArray: [1, 2, 3],
    });
    const swapSteps = steps.filter((step) => step.type === "swap");
    expect(swapSteps.length).toBe(0);
  });

  it("has incrementing step indices", () => {
    const steps = generateMoveZerosSteps({
      inputArray: [0, 1, 0, 3, 12],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("includes expected variables in complete step", () => {
    const steps = generateMoveZerosSteps({
      inputArray: [0, 1, 0, 3, 12],
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("result");
    expect(completeStep?.variables).toHaveProperty("swapCount");
    expect(completeStep?.variables).toHaveProperty("zerosCount");
  });

  it("includes expected variables in compare steps", () => {
    const steps = generateMoveZerosSteps({
      inputArray: [0, 1, 3],
    });
    const compareStep = steps.find((step) => step.type === "compare");
    expect(compareStep?.variables).toHaveProperty("writePointer");
    expect(compareStep?.variables).toHaveProperty("readPointer");
    expect(compareStep?.variables).toHaveProperty("currentElement");
    expect(compareStep?.variables).toHaveProperty("isNonZero");
  });
});
