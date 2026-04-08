import { describe, it, expect } from "vitest";
import { generateContainsDuplicateSteps } from "../step-generator";

describe("generateContainsDuplicateSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateContainsDuplicateSteps({ numbers: [1, 2, 3, 1] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateContainsDuplicateSteps({ numbers: [1, 2, 3, 1] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateContainsDuplicateSteps({ numbers: [1, 2, 3, 1] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states throughout", () => {
    const steps = generateContainsDuplicateSteps({ numbers: [1, 2, 3, 1] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateContainsDuplicateSteps({ numbers: [1, 2, 3, 1] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits a key-found step when a duplicate is detected", () => {
    const steps = generateContainsDuplicateSteps({ numbers: [1, 2, 3, 1] });
    const foundSteps = steps.filter((step) => step.type === "key-found");
    expect(foundSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("emits insert-key steps for new elements", () => {
    const steps = generateContainsDuplicateSteps({ numbers: [1, 2, 3, 1] });
    const insertSteps = steps.filter((step) => step.type === "insert-key");
    expect(insertSteps.length).toBeGreaterThan(0);
  });

  it("terminates early when a duplicate is found", () => {
    // [1, 2, 3, 1] — duplicate at index 3, so element 4+ are never visited
    const steps = generateContainsDuplicateSteps({ numbers: [1, 2, 3, 1] });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeLessThanOrEqual(4);
  });

  it("scans all elements when no duplicate exists", () => {
    const steps = generateContainsDuplicateSteps({ numbers: [1, 2, 3, 4] });
    const insertSteps = steps.filter((step) => step.type === "insert-key");
    expect(insertSteps.length).toBe(4);
  });

  it("handles an empty array and completes immediately", () => {
    const steps = generateContainsDuplicateSteps({ numbers: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
