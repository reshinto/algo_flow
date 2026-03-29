import { describe, it, expect } from "vitest";
import { generateDecodeWaysMemoizationSteps } from "./step-generator";

describe("generateDecodeWaysMemoizationSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateDecodeWaysMemoizationSteps({ digits: "12321" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateDecodeWaysMemoizationSteps({ digits: "12321" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateDecodeWaysMemoizationSteps({ digits: "12321" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for every step", () => {
    const steps = generateDecodeWaysMemoizationSteps({ digits: "12321" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes a fill-table step for the D(0) base case", () => {
    const steps = generateDecodeWaysMemoizationSteps({ digits: "12321" });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("includes compute-cell steps for non-base-case positions", () => {
    const steps = generateDecodeWaysMemoizationSteps({ digits: "123" });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBeGreaterThan(0);
  });

  it("includes push-call steps for recursive frames", () => {
    const steps = generateDecodeWaysMemoizationSteps({ digits: "12321" });
    const pushSteps = steps.filter((step) => step.type === "push-call");
    expect(pushSteps.length).toBeGreaterThan(0);
  });

  it("includes pop-call steps matching each push-call", () => {
    const steps = generateDecodeWaysMemoizationSteps({ digits: "12321" });
    const pushCount = steps.filter((step) => step.type === "push-call").length;
    const popCount = steps.filter((step) => step.type === "pop-call").length;
    expect(popCount).toBe(pushCount);
  });

  it("includes read-cache steps for repeated subproblems", () => {
    const steps = generateDecodeWaysMemoizationSteps({ digits: "12321" });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBeGreaterThan(0);
  });

  it("call stack is empty at the complete step", () => {
    const steps = generateDecodeWaysMemoizationSteps({ digits: "12321" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "dp-table") {
      expect(completeStep.visualState.callStack).toHaveLength(0);
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateDecodeWaysMemoizationSteps({ digits: "12321" });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles an empty string with just initialize and complete steps", () => {
    const steps = generateDecodeWaysMemoizationSteps({ digits: "" });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    expect(steps.length).toBe(2);
  });

  it("dp-table cells use D(i) labels", () => {
    const steps = generateDecodeWaysMemoizationSteps({ digits: "12" });
    const firstStep = steps[0]!;
    if (firstStep.visualState.kind === "dp-table") {
      expect(firstStep.visualState.table[0]?.label).toBe("D(0)");
      expect(firstStep.visualState.table[1]?.label).toBe("D(1)");
    }
  });

  it("complete step visual state has the correct final D(n) value for '123'", () => {
    const steps = generateDecodeWaysMemoizationSteps({ digits: "123" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "dp-table") {
      const lastCell = completeStep.visualState.table[3];
      expect(lastCell?.value).toBe(3);
    }
  });
});
