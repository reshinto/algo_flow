import { describe, it, expect } from "vitest";
import type { ArrayVisualState } from "@/types";
import { generateStalinSortSteps } from "./step-generator";

describe("generateStalinSortSteps", () => {
  it("generates steps for a simple array", () => {
    const steps = generateStalinSortSteps([3, 1, 2]);
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes compare steps", () => {
    const steps = generateStalinSortSteps([3, 1, 2]);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("compare");
  });

  it("marks surviving elements as sorted", () => {
    const steps = generateStalinSortSteps([3, 1, 2]);
    const markSortedSteps = steps.filter((step) => step.type === "mark-sorted");
    // Only the first element (3) survives
    expect(markSortedSteps.length).toBeGreaterThan(0);
  });

  it("produces a visual state at completion with all elements marked sorted", () => {
    // Note: tracker.complete() marks all elements sorted by design.
    // The distinction between survivors and eliminated elements is tracked
    // via markSorted calls during step generation, visible in intermediate steps.
    const steps = generateStalinSortSteps([3, 1, 2]);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;

    expect(visualState.kind).toBe("array");
    // At completion, all elements are marked sorted (tracker.complete() behavior)
    for (const element of visualState.elements) {
      expect(element.state).toBe("sorted");
    }
  });

  it("accumulates metrics correctly", () => {
    const steps = generateStalinSortSteps([3, 1, 2]);
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.comparisons).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("handles a fully sorted input — all elements survive and are sorted", () => {
    const steps = generateStalinSortSteps([1, 2, 3]);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;

    expect(visualState.kind).toBe("array");
    // With sorted input, all elements survive, and complete() marks all sorted
    for (const element of visualState.elements) {
      expect(element.state).toBe("sorted");
    }
  });

  it("handles a single element array", () => {
    const steps = generateStalinSortSteps([42]);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("handles an empty array", () => {
    const steps = generateStalinSortSteps([]);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });
});
