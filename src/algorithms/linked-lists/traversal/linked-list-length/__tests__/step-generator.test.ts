import { describe, it, expect } from "vitest";
import { generateLinkedListLengthSteps } from "../step-generator";

describe("generateLinkedListLengthSteps", () => {
  it("produces steps for a 5-element list", () => {
    const steps = generateLinkedListLengthSteps({ values: [1, 2, 3, 4, 5] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with initialize step", () => {
    const steps = generateLinkedListLengthSteps({ values: [1, 2, 3, 4, 5] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with complete step", () => {
    const steps = generateLinkedListLengthSteps({ values: [1, 2, 3, 4, 5] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces linked-list visual states", () => {
    const steps = generateLinkedListLengthSteps({ values: [1, 2, 3, 4, 5] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("linked-list");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateLinkedListLengthSteps({ values: [1, 2, 3, 4, 5] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("handles empty list", () => {
    const steps = generateLinkedListLengthSteps({ values: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces more steps for longer lists", () => {
    const stepsShort = generateLinkedListLengthSteps({ values: [1, 2] });
    const stepsLong = generateLinkedListLengthSteps({
      values: [1, 2, 3, 4, 5, 6],
    });
    expect(stepsLong.length).toBeGreaterThan(stepsShort.length);
  });
});
