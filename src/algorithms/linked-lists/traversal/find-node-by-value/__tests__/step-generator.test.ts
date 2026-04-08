import { describe, it, expect } from "vitest";
import { generateFindNodeByValueSteps } from "../step-generator";

describe("generateFindNodeByValueSteps", () => {
  it("produces steps when target is found", () => {
    const steps = generateFindNodeByValueSteps({
      values: [4, 2, 7, 1, 9],
      target: 7,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with initialize step", () => {
    const steps = generateFindNodeByValueSteps({
      values: [4, 2, 7, 1, 9],
      target: 7,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with found step when target is in list", () => {
    const steps = generateFindNodeByValueSteps({
      values: [4, 2, 7, 1, 9],
      target: 7,
    });
    expect(steps[steps.length - 1]?.type).toBe("found");
  });

  it("ends with complete step when target is not found", () => {
    const steps = generateFindNodeByValueSteps({
      values: [4, 2, 7, 1, 9],
      target: 42,
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces linked-list visual states", () => {
    const steps = generateFindNodeByValueSteps({
      values: [4, 2, 7, 1, 9],
      target: 7,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("linked-list");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateFindNodeByValueSteps({
      values: [4, 2, 7, 1, 9],
      target: 7,
    });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("produces fewer steps when target is at head", () => {
    const stepsAtHead = generateFindNodeByValueSteps({
      values: [7, 2, 3, 4, 5],
      target: 7,
    });
    const stepsAtEnd = generateFindNodeByValueSteps({
      values: [1, 2, 3, 4, 7],
      target: 7,
    });
    expect(stepsAtHead.length).toBeLessThan(stepsAtEnd.length);
  });

  it("handles empty list", () => {
    const steps = generateFindNodeByValueSteps({
      values: [],
      target: 7,
    });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("includes traverse-next steps during search", () => {
    const steps = generateFindNodeByValueSteps({
      values: [1, 2, 3],
      target: 3,
    });
    const traverseSteps = steps.filter((step) => step.type === "traverse-next");
    expect(traverseSteps.length).toBeGreaterThan(0);
  });
});
