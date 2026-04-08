import { describe, it, expect } from "vitest";
import { generateSubarraySumEqualsKSteps } from "../step-generator";

describe("generateSubarraySumEqualsKSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateSubarraySumEqualsKSteps({ numbers: [1, 1, 1], target: 2 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSubarraySumEqualsKSteps({ numbers: [1, 1, 1], target: 2 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSubarraySumEqualsKSteps({ numbers: [1, 1, 1], target: 2 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states throughout", () => {
    const steps = generateSubarraySumEqualsKSteps({ numbers: [1, 1, 1], target: 2 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSubarraySumEqualsKSteps({ numbers: [1, 1, 1], target: 2 });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits check-prefix steps for every element", () => {
    const steps = generateSubarraySumEqualsKSteps({ numbers: [1, 1, 1], target: 2 });
    const checkPrefixSteps = steps.filter((step) => step.type === "check-prefix");
    expect(checkPrefixSteps.length).toBe(3);
  });

  it("emits prefix-found steps when matching prefix sums exist", () => {
    const steps = generateSubarraySumEqualsKSteps({ numbers: [1, 1, 1], target: 2 });
    const prefixFoundSteps = steps.filter((step) => step.type === "prefix-found");
    expect(prefixFoundSteps.length).toBeGreaterThan(0);
  });

  it("emits increment-count steps for every element processed", () => {
    const steps = generateSubarraySumEqualsKSteps({ numbers: [1, 1, 1], target: 2 });
    const incrementSteps = steps.filter((step) => step.type === "increment-count");
    expect(incrementSteps.length).toBe(3);
  });

  it("sets result to the correct total count in the complete step", () => {
    const steps = generateSubarraySumEqualsKSteps({ numbers: [1, 1, 1], target: 2 });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("hash-map");
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(2);
    }
  });

  it("reports zero subarrays when none sum to target", () => {
    const steps = generateSubarraySumEqualsKSteps({ numbers: [1, 2, 3], target: 100 });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("hash-map");
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(0);
    }
  });

  it("tracks prefixSum in the visual state during prefix checks", () => {
    const steps = generateSubarraySumEqualsKSteps({ numbers: [1, 1, 1], target: 2 });
    const checkPrefixSteps = steps.filter((step) => step.type === "check-prefix");
    for (const checkStep of checkPrefixSteps) {
      expect(checkStep.visualState.kind).toBe("hash-map");
      if (checkStep.visualState.kind === "hash-map") {
        expect(checkStep.visualState.prefixSum).toBeDefined();
      }
    }
  });
});
