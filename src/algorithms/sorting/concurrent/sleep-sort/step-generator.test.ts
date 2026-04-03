import { describe, it, expect } from "vitest";
import type { ArrayVisualState } from "@/types";
import { generateSleepSortSteps } from "./step-generator";

describe("generateSleepSortSteps", () => {
  it("generates steps for a simple array", () => {
    const steps = generateSleepSortSteps([3, 1, 2]);
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes compare and mark-sorted steps", () => {
    const steps = generateSleepSortSteps([3, 1, 2]);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("compare");
    expect(stepTypes).toContain("mark-sorted");
  });

  it("produces correct final visual state with all elements sorted", () => {
    const steps = generateSleepSortSteps([3, 1, 2]);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;

    expect(visualState.kind).toBe("array");
    for (const element of visualState.elements) {
      expect(element.state).toBe("sorted");
    }
  });

  it("accumulates metrics correctly", () => {
    const steps = generateSleepSortSteps([3, 1, 2]);
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.comparisons).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("handles a single element array", () => {
    const steps = generateSleepSortSteps([5]);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("handles an empty array", () => {
    const steps = generateSleepSortSteps([]);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("final visual state values match sorted order for default E2E input", () => {
    const input = [5, 8, 3, 4, 1, 6, 7, 2];
    const steps = generateSleepSortSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as ArrayVisualState;
    const displayedValues = visualState.elements.map((element) => element.value);
    expect(displayedValues).toEqual([...input].sort((firstVal, secondVal) => firstVal - secondVal));
  });
});
