import { describe, it, expect } from "vitest";
import { generateHeapSortVisualizationSteps } from "./step-generator";
import type { HeapSortVisualizationInput } from "./step-generator";

const defaultInput: HeapSortVisualizationInput = { array: [9, 5, 7, 1, 3, 8, 2, 6, 4] };

describe("generateHeapSortVisualizationSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateHeapSortVisualizationSteps(defaultInput);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateHeapSortVisualizationSteps(defaultInput);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateHeapSortVisualizationSteps(defaultInput);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("all steps have heap visual state", () => {
    const steps = generateHeapSortVisualizationSteps(defaultInput);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateHeapSortVisualizationSteps(defaultInput);
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("contains sift-down steps from the build-heap phase", () => {
    const steps = generateHeapSortVisualizationSteps(defaultInput);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("sift-down");
  });

  it("contains heap-extract steps for each extraction", () => {
    const steps = generateHeapSortVisualizationSteps(defaultInput);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-extract");
  });

  it("contains heap-swap steps during sift-down", () => {
    const steps = generateHeapSortVisualizationSteps(defaultInput);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-swap");
  });

  it("handles a single-element array", () => {
    const steps = generateHeapSortVisualizationSteps({ array: [42] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles an empty array", () => {
    const steps = generateHeapSortVisualizationSteps({ array: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces more steps for larger arrays", () => {
    const smallSteps = generateHeapSortVisualizationSteps({ array: [3, 1, 2] });
    const largeSteps = generateHeapSortVisualizationSteps(defaultInput);
    expect(largeSteps.length).toBeGreaterThan(smallSteps.length);
  });
});
