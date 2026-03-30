import { describe, it, expect } from "vitest";
import { generateLongestConsecutiveSequenceSteps } from "./step-generator";

describe("generateLongestConsecutiveSequenceSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateLongestConsecutiveSequenceSteps({ numbers: [100, 4, 200, 1, 3, 2] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateLongestConsecutiveSequenceSteps({ numbers: [100, 4, 200, 1, 3, 2] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateLongestConsecutiveSequenceSteps({ numbers: [100, 4, 200, 1, 3, 2] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states throughout", () => {
    const steps = generateLongestConsecutiveSequenceSteps({ numbers: [100, 4, 200, 1, 3, 2] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateLongestConsecutiveSequenceSteps({ numbers: [100, 4, 200, 1, 3, 2] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits insert-key steps for all numbers in the build phase", () => {
    const steps = generateLongestConsecutiveSequenceSteps({ numbers: [100, 4, 200, 1, 3, 2] });
    const insertSteps = steps.filter((step) => step.type === "insert-key");
    expect(insertSteps.length).toBe(6);
  });

  it("emits lookup-key steps during the scan phase", () => {
    const steps = generateLongestConsecutiveSequenceSteps({ numbers: [100, 4, 200, 1, 3, 2] });
    const lookupSteps = steps.filter((step) => step.type === "lookup-key");
    expect(lookupSteps.length).toBeGreaterThan(0);
  });

  it("sets the result to 4 for the default input", () => {
    const steps = generateLongestConsecutiveSequenceSteps({ numbers: [100, 4, 200, 1, 3, 2] });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("hash-map");
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(4);
    }
  });

  it("sets the result to 1 when no consecutive pairs exist", () => {
    const steps = generateLongestConsecutiveSequenceSteps({ numbers: [10, 20, 30] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(1);
    }
  });

  it("sets the result to n for a fully consecutive array", () => {
    const steps = generateLongestConsecutiveSequenceSteps({ numbers: [3, 1, 2] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(3);
    }
  });
});
