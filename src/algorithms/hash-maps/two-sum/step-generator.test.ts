import { describe, it, expect } from "vitest";
import { generateTwoSumSteps } from "./step-generator";

describe("generateTwoSumSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateTwoSumSteps({ numbers: [2, 7, 11, 15], target: 9 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateTwoSumSteps({ numbers: [2, 7, 11, 15], target: 9 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateTwoSumSteps({ numbers: [2, 7, 11, 15], target: 9 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states throughout", () => {
    const steps = generateTwoSumSteps({ numbers: [2, 7, 11, 15], target: 9 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateTwoSumSteps({ numbers: [2, 7, 11, 15], target: 9 });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits a key-found step when complement exists in the map", () => {
    const steps = generateTwoSumSteps({ numbers: [2, 7, 11, 15], target: 9 });
    const foundSteps = steps.filter((step) => step.type === "key-found");
    expect(foundSteps.length).toBe(1);
  });

  it("emits insert-key steps for values added to the map", () => {
    const steps = generateTwoSumSteps({ numbers: [2, 7, 11, 15], target: 9 });
    const insertSteps = steps.filter((step) => step.type === "insert-key");
    expect(insertSteps.length).toBeGreaterThan(0);
  });

  it("sets resultPair once the key is found", () => {
    const steps = generateTwoSumSteps({ numbers: [2, 7, 11, 15], target: 9 });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("hash-map");
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.resultPair).toEqual([0, 1]);
    }
  });

  it("terminates early once the pair is found (does not process remaining elements)", () => {
    // [2, 7, 11, 15] with target 9 — pair found at indices 0 and 1, so 11 and 15 are never visited
    const steps = generateTwoSumSteps({ numbers: [2, 7, 11, 15], target: 9 });
    const processSteps = steps.filter((step) => step.type === "visit");
    // Only 2 elements processed before match (indices 0 and 1)
    expect(processSteps.length).toBeLessThanOrEqual(2);
  });

  it("scans all elements when no pair is found", () => {
    const steps = generateTwoSumSteps({ numbers: [1, 2, 3, 4], target: 100 });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("hash-map");
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.resultPair).toBeNull();
    }
  });
});
