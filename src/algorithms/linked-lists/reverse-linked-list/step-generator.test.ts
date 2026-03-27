import { describe, it, expect } from "vitest";
import { generateReverseLinkedListSteps } from "./step-generator";

describe("generateReverseLinkedListSteps", () => {
  it("produces steps for a 5-element list", () => {
    const steps = generateReverseLinkedListSteps({ values: [1, 2, 3, 4, 5] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateReverseLinkedListSteps({ values: [1, 2, 3, 4, 5] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateReverseLinkedListSteps({ values: [1, 2, 3, 4, 5] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces linked-list visual states throughout", () => {
    const steps = generateReverseLinkedListSteps({ values: [1, 2, 3, 4, 5] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("linked-list");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateReverseLinkedListSteps({ values: [1, 2, 3, 4, 5] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits traverse-next steps equal to list length", () => {
    const steps = generateReverseLinkedListSteps({ values: [1, 2, 3, 4, 5] });
    const traverseSteps = steps.filter((step) => step.type === "traverse-next");
    expect(traverseSteps.length).toBe(5);
  });

  it("emits reverse-pointer steps equal to list length", () => {
    const steps = generateReverseLinkedListSteps({ values: [1, 2, 3, 4, 5] });
    const reverseSteps = steps.filter((step) => step.type === "reverse-pointer");
    expect(reverseSteps.length).toBe(5);
  });

  it("handles an empty list", () => {
    const steps = generateReverseLinkedListSteps({ values: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles a single-element list", () => {
    const steps = generateReverseLinkedListSteps({ values: [7] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
