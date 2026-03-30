import { describe, it, expect } from "vitest";
import { generateContainsDuplicateIISteps } from "./step-generator";

describe("generateContainsDuplicateIISteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateContainsDuplicateIISteps({ numbers: [1, 2, 3, 1], maxDistance: 3 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateContainsDuplicateIISteps({ numbers: [1, 2, 3, 1], maxDistance: 3 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateContainsDuplicateIISteps({ numbers: [1, 2, 3, 1], maxDistance: 3 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states throughout", () => {
    const steps = generateContainsDuplicateIISteps({ numbers: [1, 2, 3, 1], maxDistance: 3 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateContainsDuplicateIISteps({ numbers: [1, 2, 3, 1], maxDistance: 3 });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits a key-found step when a qualifying duplicate is detected", () => {
    const steps = generateContainsDuplicateIISteps({ numbers: [1, 2, 3, 1], maxDistance: 3 });
    const foundSteps = steps.filter((step) => step.type === "key-found");
    expect(foundSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("emits insert-key steps for first occurrences", () => {
    const steps = generateContainsDuplicateIISteps({ numbers: [1, 2, 3, 1], maxDistance: 3 });
    const insertSteps = steps.filter((step) => step.type === "insert-key");
    expect(insertSteps.length).toBeGreaterThan(0);
  });

  it("emits update-value steps when a duplicate is too far away", () => {
    // [1, 2, 3, 1] with maxDistance 2 — the duplicate pair at distance 3 triggers an update
    const steps = generateContainsDuplicateIISteps({ numbers: [1, 2, 3, 1], maxDistance: 2 });
    const updateSteps = steps.filter((step) => step.type === "update-value");
    expect(updateSteps.length).toBeGreaterThan(0);
  });

  it("scans all elements when no qualifying pair exists", () => {
    const steps = generateContainsDuplicateIISteps({ numbers: [1, 2, 3, 4], maxDistance: 3 });
    const insertSteps = steps.filter((step) => step.type === "insert-key");
    expect(insertSteps.length).toBe(4);
  });

  it("handles an empty array and completes immediately", () => {
    const steps = generateContainsDuplicateIISteps({ numbers: [], maxDistance: 1 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
