import { describe, it, expect } from "vitest";
import { generateHouseRobberTabulationSteps } from "../step-generator";

describe("generateHouseRobberTabulationSteps", () => {
  it("produces steps for a standard input", () => {
    const steps = generateHouseRobberTabulationSteps({ houses: [2, 7, 9, 3, 1] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateHouseRobberTabulationSteps({ houses: [2, 7, 9, 3, 1] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateHouseRobberTabulationSteps({ houses: [2, 7, 9, 3, 1] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for all steps", () => {
    const steps = generateHouseRobberTabulationSteps({ houses: [2, 7, 9, 3, 1] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes fill-table steps for the two base cases", () => {
    const steps = generateHouseRobberTabulationSteps({ houses: [2, 7, 9, 3, 1] });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(2);
  });

  it("includes compute-cell steps for houses[2]..houses[4]", () => {
    const steps = generateHouseRobberTabulationSteps({ houses: [2, 7, 9, 3, 1] });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(3);
  });

  it("includes read-cache steps — two per non-base house index", () => {
    const steps = generateHouseRobberTabulationSteps({ houses: [2, 7, 9, 3, 1] });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBe(6);
  });

  it("has incrementing step indices", () => {
    const steps = generateHouseRobberTabulationSteps({ houses: [2, 7, 9, 3, 1] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles empty array edge case", () => {
    const steps = generateHouseRobberTabulationSteps({ houses: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
