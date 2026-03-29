import { describe, it, expect } from "vitest";
import { generateCountBitsSteps } from "./step-generator";

describe("generateCountBitsSteps", () => {
  it("produces steps for a small input", () => {
    const steps = generateCountBitsSteps({ targetNumber: 5 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateCountBitsSteps({ targetNumber: 5 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateCountBitsSteps({ targetNumber: 5 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for all steps", () => {
    const steps = generateCountBitsSteps({ targetNumber: 5 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes a fill-table step for base case B(0)", () => {
    const steps = generateCountBitsSteps({ targetNumber: 5 });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("includes one compute-cell step per integer from 1 to n", () => {
    const targetNumber = 5;
    const steps = generateCountBitsSteps({ targetNumber });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(targetNumber);
  });

  it("includes one read-cache step per integer from 1 to n", () => {
    const targetNumber = 5;
    const steps = generateCountBitsSteps({ targetNumber });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBe(targetNumber);
  });

  it("has incrementing step indices", () => {
    const steps = generateCountBitsSteps({ targetNumber: 5 });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles targetNumber 0 edge case", () => {
    const steps = generateCountBitsSteps({ targetNumber: 0 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("dp-table cells use B(i) labels", () => {
    const steps = generateCountBitsSteps({ targetNumber: 3 });
    const firstStep = steps[0];
    if (firstStep?.visualState.kind === "dp-table") {
      expect(firstStep.visualState.table[0]?.label).toBe("B(0)");
      expect(firstStep.visualState.table[1]?.label).toBe("B(1)");
    }
  });

  it("final table values match expected popcounts for targetNumber 5", () => {
    const steps = generateCountBitsSteps({ targetNumber: 5 });
    const lastStep = steps[steps.length - 1];
    if (lastStep?.visualState.kind === "dp-table") {
      const tableValues = lastStep.visualState.table.map((cell) => cell.value);
      expect(tableValues).toEqual([0, 1, 1, 2, 1, 2]);
    }
  });
});
