import { describe, it, expect } from "vitest";
import { generateRemoveDuplicatesSortedSteps } from "./step-generator";

describe("generateRemoveDuplicatesSortedSteps", () => {
  it("produces steps for a list with consecutive duplicates", () => {
    const steps = generateRemoveDuplicatesSortedSteps({
      values: [1, 1, 2, 3, 3, 3, 4, 5, 5],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateRemoveDuplicatesSortedSteps({
      values: [1, 1, 2, 3, 3, 3, 4, 5, 5],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateRemoveDuplicatesSortedSteps({
      values: [1, 1, 2, 3, 3, 3, 4, 5, 5],
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces linked-list visual states throughout", () => {
    const steps = generateRemoveDuplicatesSortedSteps({
      values: [1, 1, 2, 3, 3, 3, 4, 5, 5],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("linked-list");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateRemoveDuplicatesSortedSteps({
      values: [1, 1, 2, 3, 3, 3, 4, 5, 5],
    });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("includes compare steps when checking for duplicates", () => {
    const steps = generateRemoveDuplicatesSortedSteps({
      values: [1, 1, 2, 3, 3, 3, 4, 5, 5],
    });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("includes delete-node steps when removing duplicates", () => {
    const steps = generateRemoveDuplicatesSortedSteps({
      values: [1, 1, 2, 3, 3, 3, 4, 5, 5],
    });
    const deleteSteps = steps.filter((step) => step.type === "delete-node");
    expect(deleteSteps.length).toBeGreaterThan(0);
  });

  it("handles a list with no duplicates", () => {
    const steps = generateRemoveDuplicatesSortedSteps({
      values: [1, 2, 3, 4, 5],
    });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles an empty list", () => {
    const steps = generateRemoveDuplicatesSortedSteps({
      values: [],
    });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles a single-element list", () => {
    const steps = generateRemoveDuplicatesSortedSteps({
      values: [7],
    });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles a list with all identical values", () => {
    const steps = generateRemoveDuplicatesSortedSteps({
      values: [5, 5, 5, 5],
    });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
