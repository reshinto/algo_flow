import { describe, it, expect } from "vitest";
import { generateTrappingRainWaterSteps } from "../step-generator";

describe("generateTrappingRainWaterSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateTrappingRainWaterSteps({
      heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateTrappingRainWaterSteps({ heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateTrappingRainWaterSteps({ heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states for all steps", () => {
    const steps = generateTrappingRainWaterSteps({ heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes compare steps for pointer comparisons", () => {
    const steps = generateTrappingRainWaterSteps({ heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("handles empty array gracefully with initialize and complete steps", () => {
    const steps = generateTrappingRainWaterSteps({ heights: [] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateTrappingRainWaterSteps({ heights: [3, 0, 3] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("final complete step variables contain totalWater", () => {
    const steps = generateTrappingRainWaterSteps({ heights: [3, 0, 3] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.variables).toHaveProperty("totalWater");
    expect(lastStep?.variables["totalWater"]).toBe(3);
  });
});
