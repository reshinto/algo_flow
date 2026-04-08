import { describe, it, expect } from "vitest";
import { generateSubarrayProductSteps } from "../step-generator";

describe("generateSubarrayProductSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateSubarrayProductSteps({
      inputArray: [10, 5, 2, 6, 1, 3],
      threshold: 100,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSubarrayProductSteps({
      inputArray: [10, 5, 2, 6, 1, 3],
      threshold: 100,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSubarrayProductSteps({
      inputArray: [10, 5, 2, 6, 1, 3],
      threshold: 100,
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces only array kind visual states", () => {
    const steps = generateSubarrayProductSteps({
      inputArray: [10, 5, 2, 6, 1, 3],
      threshold: 100,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes expand-window steps equal to array length", () => {
    const steps = generateSubarrayProductSteps({
      inputArray: [10, 5, 2, 6],
      threshold: 100,
    });
    const expandSteps = steps.filter((step) => step.type === "expand-window");
    expect(expandSteps.length).toBe(4);
  });

  it("includes shrink-window steps when product exceeds threshold", () => {
    /* [10, 5, 2] — product 100 >= 100 triggers shrink at index 2 */
    const steps = generateSubarrayProductSteps({
      inputArray: [10, 5, 2, 6],
      threshold: 100,
    });
    const shrinkSteps = steps.filter((step) => step.type === "shrink-window");
    expect(shrinkSteps.length).toBeGreaterThan(0);
  });

  it("handles threshold <= 1 gracefully", () => {
    const steps = generateSubarrayProductSteps({
      inputArray: [1, 2, 3],
      threshold: 1,
    });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateSubarrayProductSteps({
      inputArray: [10, 5, 2, 6],
      threshold: 100,
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("complete step contains count in variables", () => {
    const steps = generateSubarrayProductSteps({
      inputArray: [10, 5, 2, 6, 1, 3],
      threshold: 100,
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("count");
  });
});
