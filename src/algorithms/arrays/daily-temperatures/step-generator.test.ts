import { describe, it, expect } from "vitest";
import { generateDailyTemperaturesSteps } from "./step-generator";

describe("generateDailyTemperaturesSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateDailyTemperaturesSteps({
      temperatures: [73, 74, 75, 71, 69, 72, 76, 73],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateDailyTemperaturesSteps({
      temperatures: [73, 74, 75, 71, 69, 72, 76, 73],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateDailyTemperaturesSteps({
      temperatures: [73, 74, 75, 71, 69, 72, 76, 73],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states for all steps", () => {
    const steps = generateDailyTemperaturesSteps({
      temperatures: [73, 74, 75, 71, 69, 72, 76, 73],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes visit steps for each day", () => {
    const steps = generateDailyTemperaturesSteps({
      temperatures: [73, 74, 75, 71, 69, 72, 76, 73],
    });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("handles empty array — returns initialize and complete only", () => {
    const steps = generateDailyTemperaturesSteps({ temperatures: [] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("handles single element array", () => {
    const steps = generateDailyTemperaturesSteps({ temperatures: [72] });
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateDailyTemperaturesSteps({
      temperatures: [73, 74, 75, 71, 69, 72, 76, 73],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("stores the wait days in the complete step variables", () => {
    const steps = generateDailyTemperaturesSteps({
      temperatures: [73, 74, 75, 71, 69, 72, 76, 73],
    });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.variables).toHaveProperty("waitDays");
    const waitDays = lastStep.variables["waitDays"] as number[];
    expect(waitDays).toEqual([1, 1, 4, 2, 1, 1, 0, 0]);
  });
});
