import { describe, it, expect } from "vitest";
import { generateClimbingStairsMemoizationSteps } from "../step-generator";

describe("generateClimbingStairsMemoizationSteps", () => {
  it("produces steps for a small input", () => {
    const steps = generateClimbingStairsMemoizationSteps({ numberOfStairs: 5 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateClimbingStairsMemoizationSteps({ numberOfStairs: 5 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateClimbingStairsMemoizationSteps({ numberOfStairs: 5 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for all steps", () => {
    const steps = generateClimbingStairsMemoizationSteps({ numberOfStairs: 5 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes fill-table steps for base cases S(0) and S(1)", () => {
    const steps = generateClimbingStairsMemoizationSteps({ numberOfStairs: 5 });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(2);
  });

  it("includes compute-cell steps for non-base cases", () => {
    const steps = generateClimbingStairsMemoizationSteps({ numberOfStairs: 5 });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(4);
  });

  it("includes read-cache steps for cached lookups", () => {
    const steps = generateClimbingStairsMemoizationSteps({ numberOfStairs: 5 });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBeGreaterThan(0);
  });

  it("includes push-call steps", () => {
    const steps = generateClimbingStairsMemoizationSteps({ numberOfStairs: 5 });
    const pushSteps = steps.filter((step) => step.type === "push-call");
    expect(pushSteps.length).toBeGreaterThan(0);
  });

  it("includes pop-call steps", () => {
    const steps = generateClimbingStairsMemoizationSteps({ numberOfStairs: 5 });
    const popSteps = steps.filter((step) => step.type === "pop-call");
    expect(popSteps.length).toBeGreaterThan(0);
  });

  it("has a call stack present in visual states", () => {
    const steps = generateClimbingStairsMemoizationSteps({ numberOfStairs: 5 });
    const pushStepIndex = steps.findIndex((step) => step.type === "push-call");
    expect(pushStepIndex).toBeGreaterThan(-1);
    const visualState = steps[pushStepIndex]?.visualState;
    expect(visualState?.kind).toBe("dp-table");
    if (visualState?.kind === "dp-table") {
      expect(visualState.callStack).toBeDefined();
      expect(visualState.callStack!.length).toBeGreaterThan(0);
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateClimbingStairsMemoizationSteps({ numberOfStairs: 5 });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
