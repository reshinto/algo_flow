import { describe, it, expect } from "vitest";
import { generateMinCostClimbingStairsMemoizationSteps } from "./step-generator";

describe("generateMinCostClimbingStairsMemoizationSteps", () => {
  it("produces steps for a small input", () => {
    const steps = generateMinCostClimbingStairsMemoizationSteps({ costs: [10, 15, 20] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateMinCostClimbingStairsMemoizationSteps({ costs: [10, 15, 20] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateMinCostClimbingStairsMemoizationSteps({ costs: [10, 15, 20] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for every step", () => {
    const steps = generateMinCostClimbingStairsMemoizationSteps({ costs: [10, 15, 20] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes fill-table steps for base cases C(0) and C(1)", () => {
    const steps = generateMinCostClimbingStairsMemoizationSteps({ costs: [10, 15, 20] });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(2);
  });

  it("includes push-call and pop-call steps for recursive calls", () => {
    const steps = generateMinCostClimbingStairsMemoizationSteps({ costs: [10, 15, 20] });
    const pushSteps = steps.filter((step) => step.type === "push-call");
    const popSteps = steps.filter((step) => step.type === "pop-call");
    expect(pushSteps.length).toBeGreaterThan(0);
    expect(popSteps.length).toBe(pushSteps.length);
  });

  it("includes compute-cell steps for non-base cases", () => {
    const steps = generateMinCostClimbingStairsMemoizationSteps({ costs: [10, 15, 20] });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBeGreaterThan(0);
  });

  it("includes read-cache steps for memoized lookups", () => {
    const steps = generateMinCostClimbingStairsMemoizationSteps({
      costs: [10, 15, 20, 5, 25, 10],
    });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBeGreaterThan(0);
  });

  it("call stack is empty at the final complete step", () => {
    const steps = generateMinCostClimbingStairsMemoizationSteps({ costs: [10, 15, 20] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
    if (lastStep?.visualState.kind === "dp-table") {
      expect(lastStep.visualState.callStack ?? []).toHaveLength(0);
    }
  });

  it("call stack grows during push-call steps", () => {
    const steps = generateMinCostClimbingStairsMemoizationSteps({ costs: [10, 15, 20] });
    const pushSteps = steps.filter((step) => step.type === "push-call");
    for (const pushStep of pushSteps) {
      if (pushStep.visualState.kind === "dp-table") {
        expect((pushStep.visualState.callStack ?? []).length).toBeGreaterThan(0);
      }
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateMinCostClimbingStairsMemoizationSteps({ costs: [10, 15, 20] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("produces correct result for default input [10, 15, 20, 5, 25, 10]", () => {
    const steps = generateMinCostClimbingStairsMemoizationSteps({
      costs: [10, 15, 20, 5, 25, 10],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
    expect(lastStep?.variables.result).toBe(30);
  });

  it("produces correct result for [10, 15, 20]", () => {
    const steps = generateMinCostClimbingStairsMemoizationSteps({ costs: [10, 15, 20] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
    expect(lastStep?.variables.result).toBe(15);
  });

  it("table size equals costs.length + 1", () => {
    const costs = [10, 15, 20, 5];
    const steps = generateMinCostClimbingStairsMemoizationSteps({ costs });
    const firstStep = steps[0];
    if (firstStep?.visualState.kind === "dp-table") {
      expect(firstStep.visualState.table.length).toBe(costs.length + 1);
    }
  });

  it("table cells use C(i) labels", () => {
    const steps = generateMinCostClimbingStairsMemoizationSteps({ costs: [10, 15, 20] });
    const firstStep = steps[0];
    if (firstStep?.visualState.kind === "dp-table") {
      expect(firstStep.visualState.table[0]?.label).toBe("C(0)");
      expect(firstStep.visualState.table[1]?.label).toBe("C(1)");
      expect(firstStep.visualState.table[2]?.label).toBe("C(2)");
    }
  });
});
