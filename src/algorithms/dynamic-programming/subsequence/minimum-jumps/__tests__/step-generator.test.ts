import { describe, it, expect } from "vitest";
import { generateMinimumJumpsSteps } from "../step-generator";

describe("generateMinimumJumpsSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateMinimumJumpsSteps({ jumps: [2, 3, 1, 1, 4] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateMinimumJumpsSteps({ jumps: [2, 3, 1, 1, 4] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateMinimumJumpsSteps({ jumps: [2, 3, 1, 1, 4] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for all steps", () => {
    const steps = generateMinimumJumpsSteps({ jumps: [2, 3, 1, 1, 4] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes a fill-table step for the base case J(0)", () => {
    const steps = generateMinimumJumpsSteps({ jumps: [2, 3, 1, 1, 4] });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("includes read-cache steps for reachable source positions", () => {
    const steps = generateMinimumJumpsSteps({ jumps: [2, 3, 1, 1, 4] });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBeGreaterThan(0);
  });

  it("includes compute-cell steps for reachable target positions", () => {
    const steps = generateMinimumJumpsSteps({ jumps: [2, 3, 1, 1, 4] });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBeGreaterThan(0);
  });

  it("has incrementing step indices", () => {
    const steps = generateMinimumJumpsSteps({ jumps: [2, 3, 1, 1, 4] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles empty array edge case", () => {
    const steps = generateMinimumJumpsSteps({ jumps: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles single-element array [0]", () => {
    const steps = generateMinimumJumpsSteps({ jumps: [0] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces steps for an unreachable input [1, 0, 1]", () => {
    const steps = generateMinimumJumpsSteps({ jumps: [1, 0, 1] });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
