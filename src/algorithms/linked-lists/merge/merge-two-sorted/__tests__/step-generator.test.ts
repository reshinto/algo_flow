import { describe, it, expect } from "vitest";
import { generateMergeTwoSortedSteps } from "../step-generator";

describe("generateMergeTwoSortedSteps", () => {
  it("generates steps for merging [1, 3, 5] and [2, 4]", () => {
    const steps = generateMergeTwoSortedSteps({
      listA: [1, 3, 5],
      listB: [2, 4],
    });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("generates steps for empty lists", () => {
    const steps = generateMergeTwoSortedSteps({ listA: [], listB: [] });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]!.type).toBe("initialize");
  });

  it("generates steps when first list is empty", () => {
    const steps = generateMergeTwoSortedSteps({
      listA: [],
      listB: [1, 2, 3],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("generates steps when second list is empty", () => {
    const steps = generateMergeTwoSortedSteps({
      listA: [1, 2, 3],
      listB: [],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("generates steps for single-node lists", () => {
    const steps = generateMergeTwoSortedSteps({
      listA: [1],
      listB: [2],
    });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps.some((s) => s.type === "compare")).toBe(true);
  });

  it("includes compare steps in generated steps", () => {
    const steps = generateMergeTwoSortedSteps({
      listA: [1, 3],
      listB: [2, 4],
    });
    const hasCompareSteps = steps.some((s) => s.type === "compare");
    expect(hasCompareSteps).toBe(true);
  });

  it("final step includes complete type", () => {
    const steps = generateMergeTwoSortedSteps({
      listA: [1, 2],
      listB: [3, 4],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep!.type).toBe("complete");
  });

  it("generates steps with valid visualState for each step", () => {
    const steps = generateMergeTwoSortedSteps({
      listA: [1, 3],
      listB: [2],
    });
    steps.forEach((step) => {
      expect(step.visualState).toBeDefined();
      expect(step.visualState.kind).toBe("linked-list");
    });
  });
});
