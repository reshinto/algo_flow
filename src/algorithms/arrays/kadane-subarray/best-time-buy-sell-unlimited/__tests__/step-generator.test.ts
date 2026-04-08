import { describe, it, expect } from "vitest";
import { generateBestTimeBuySellUnlimitedSteps } from "../step-generator";

describe("generateBestTimeBuySellUnlimitedSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateBestTimeBuySellUnlimitedSteps({ prices: [7, 1, 5, 3, 6, 4] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateBestTimeBuySellUnlimitedSteps({ prices: [7, 1, 5, 3, 6, 4] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateBestTimeBuySellUnlimitedSteps({ prices: [7, 1, 5, 3, 6, 4] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states for all steps", () => {
    const steps = generateBestTimeBuySellUnlimitedSteps({ prices: [7, 1, 5, 3, 6, 4] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes compare steps for price comparisons", () => {
    const steps = generateBestTimeBuySellUnlimitedSteps({ prices: [7, 1, 5, 3, 6, 4] });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("handles single price with just initialize and complete", () => {
    const steps = generateBestTimeBuySellUnlimitedSteps({ prices: [5] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateBestTimeBuySellUnlimitedSteps({ prices: [7, 1, 5, 3, 6, 4] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("final complete step contains totalProfit", () => {
    const steps = generateBestTimeBuySellUnlimitedSteps({ prices: [7, 1, 5, 3, 6, 4] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.variables).toHaveProperty("totalProfit");
    expect(lastStep?.variables["totalProfit"]).toBe(7);
  });

  it("handles always-decreasing prices with zero profit", () => {
    const steps = generateBestTimeBuySellUnlimitedSteps({ prices: [5, 4, 3, 2, 1] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.variables["totalProfit"]).toBe(0);
  });
});
