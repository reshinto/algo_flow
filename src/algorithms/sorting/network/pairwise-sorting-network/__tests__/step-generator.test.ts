import { describe, it, expect } from "vitest";
import type { ArrayVisualState } from "@/types";
import { generatePairwiseSortingNetworkSteps } from "../step-generator";

describe("generatePairwiseSortingNetworkSteps", () => {
  it("generates steps for a simple array", () => {
    const steps = generatePairwiseSortingNetworkSteps([4, 2, 3, 1]);
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes compare and swap steps", () => {
    const steps = generatePairwiseSortingNetworkSteps([4, 2, 3, 1]);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("compare");
    expect(stepTypes).toContain("swap");
  });

  it("marks elements as sorted", () => {
    const steps = generatePairwiseSortingNetworkSteps([4, 2, 3, 1]);
    const markSortedSteps = steps.filter((step) => step.type === "mark-sorted");
    expect(markSortedSteps.length).toBeGreaterThan(0);
  });

  it("produces correct final visual state with all elements sorted", () => {
    const steps = generatePairwiseSortingNetworkSteps([4, 2, 3, 1]);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;

    expect(visualState.kind).toBe("array");
    for (const element of visualState.elements) {
      expect(element.state).toBe("sorted");
    }
  });

  it("accumulates metrics correctly", () => {
    const steps = generatePairwiseSortingNetworkSteps([4, 2, 3, 1]);
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.comparisons).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("handles a single element array", () => {
    const steps = generatePairwiseSortingNetworkSteps([42]);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });
});
