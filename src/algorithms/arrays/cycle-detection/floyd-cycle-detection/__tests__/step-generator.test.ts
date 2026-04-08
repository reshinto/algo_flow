import { describe, it, expect } from "vitest";
import { generateFloydCycleDetectionSteps } from "../step-generator";

describe("generateFloydCycleDetectionSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateFloydCycleDetectionSteps({ inputArray: [1, 3, 4, 2, 2] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateFloydCycleDetectionSteps({ inputArray: [1, 3, 4, 2, 2] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateFloydCycleDetectionSteps({ inputArray: [1, 3, 4, 2, 2] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states for all steps", () => {
    const steps = generateFloydCycleDetectionSteps({ inputArray: [1, 3, 4, 2, 2] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes compare steps for phase 1 pointer movements", () => {
    const steps = generateFloydCycleDetectionSteps({ inputArray: [1, 3, 4, 2, 2] });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("handles empty array — returns initialize and complete only", () => {
    const steps = generateFloydCycleDetectionSteps({ inputArray: [] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("stores hasCycle and cycleStart in the complete step variables", () => {
    const steps = generateFloydCycleDetectionSteps({ inputArray: [1, 3, 4, 2, 2] });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.variables).toHaveProperty("hasCycle");
    expect(lastStep.variables).toHaveProperty("cycleStart");
    expect(lastStep.variables["hasCycle"]).toBe(true);
    expect(lastStep.variables["cycleStart"]).toBe(2);
  });

  it("has incrementing step indices", () => {
    const steps = generateFloydCycleDetectionSteps({ inputArray: [1, 3, 4, 2, 2] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("empty array complete step reports no cycle", () => {
    const steps = generateFloydCycleDetectionSteps({ inputArray: [] });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.variables["hasCycle"]).toBe(false);
    expect(lastStep.variables["cycleStart"]).toBe(-1);
  });
});
