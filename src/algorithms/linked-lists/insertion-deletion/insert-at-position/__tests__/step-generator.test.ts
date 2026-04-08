import { describe, it, expect } from "vitest";
import { generateInsertAtPositionSteps } from "../step-generator";

describe("generateInsertAtPositionSteps", () => {
  it("produces steps for a 4-element list with insertion at position 2", () => {
    const steps = generateInsertAtPositionSteps({
      values: [1, 3, 5, 7],
      insertValue: 4,
      position: 2,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateInsertAtPositionSteps({
      values: [1, 3, 5, 7],
      insertValue: 4,
      position: 2,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateInsertAtPositionSteps({
      values: [1, 3, 5, 7],
      insertValue: 4,
      position: 2,
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces linked-list visual states throughout", () => {
    const steps = generateInsertAtPositionSteps({
      values: [1, 3, 5, 7],
      insertValue: 4,
      position: 2,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("linked-list");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateInsertAtPositionSteps({
      values: [1, 3, 5, 7],
      insertValue: 4,
      position: 2,
    });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("includes at least one insert-node step", () => {
    const steps = generateInsertAtPositionSteps({
      values: [1, 3, 5, 7],
      insertValue: 4,
      position: 2,
    });
    const insertSteps = steps.filter((step) => step.type === "insert-node");
    expect(insertSteps.length).toBeGreaterThan(0);
  });

  it("handles insertion at position 0 (head)", () => {
    const steps = generateInsertAtPositionSteps({
      values: [2, 3],
      insertValue: 1,
      position: 0,
    });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles insertion into an empty list", () => {
    const steps = generateInsertAtPositionSteps({
      values: [],
      insertValue: 5,
      position: 0,
    });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles insertion at end of single-element list", () => {
    const steps = generateInsertAtPositionSteps({
      values: [1],
      insertValue: 2,
      position: 1,
    });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
