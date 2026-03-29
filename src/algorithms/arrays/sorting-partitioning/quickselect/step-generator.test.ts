import { describe, it, expect } from "vitest";
import { generateQuickselectSteps } from "./step-generator";

describe("generateQuickselectSteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateQuickselectSteps({
      inputArray: [7, 2, 1, 6, 8, 5, 3, 4],
      targetK: 4,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateQuickselectSteps({
      inputArray: [7, 2, 1, 6, 8, 5, 3, 4],
      targetK: 4,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateQuickselectSteps({
      inputArray: [7, 2, 1, 6, 8, 5, 3, 4],
      targetK: 4,
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces array visual states throughout", () => {
    const steps = generateQuickselectSteps({
      inputArray: [7, 2, 1, 6, 8, 5, 3, 4],
      targetK: 4,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes compare steps during partitioning", () => {
    const steps = generateQuickselectSteps({
      inputArray: [7, 2, 1, 6, 8, 5, 3, 4],
      targetK: 4,
    });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("includes swap steps during partitioning", () => {
    const steps = generateQuickselectSteps({
      inputArray: [7, 2, 1, 6, 8, 5, 3, 4],
      targetK: 4,
    });
    const swapSteps = steps.filter((step) => step.type === "swap");
    expect(swapSteps.length).toBeGreaterThan(0);
  });

  it("handles invalid k gracefully", () => {
    const steps = generateQuickselectSteps({ inputArray: [1, 2, 3], targetK: 0 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles empty array gracefully", () => {
    const steps = generateQuickselectSteps({ inputArray: [], targetK: 1 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles k=1 finding the minimum", () => {
    const steps = generateQuickselectSteps({ inputArray: [5, 3, 1, 4, 2], targetK: 1 });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateQuickselectSteps({
      inputArray: [7, 2, 1, 6, 8, 5, 3, 4],
      targetK: 4,
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
