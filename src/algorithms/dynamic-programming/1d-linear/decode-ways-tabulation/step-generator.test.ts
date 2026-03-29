import { describe, it, expect } from "vitest";
import { generateDecodeWaysTabulationSteps } from "./step-generator";

describe("generateDecodeWaysTabulationSteps", () => {
  it("produces steps for the default input '12321'", () => {
    const steps = generateDecodeWaysTabulationSteps({ digits: "12321" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateDecodeWaysTabulationSteps({ digits: "12321" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateDecodeWaysTabulationSteps({ digits: "12321" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for every step", () => {
    const steps = generateDecodeWaysTabulationSteps({ digits: "12321" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes two fill-table steps for the two base cases", () => {
    const steps = generateDecodeWaysTabulationSteps({ digits: "12321" });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBe(2);
  });

  it("includes one compute-cell step per position from 2 to n", () => {
    const digits = "12321";
    const steps = generateDecodeWaysTabulationSteps({ digits });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    // positions 2,3,4,5 → 4 compute-cell steps
    expect(computeSteps.length).toBe(digits.length - 1);
  });

  it("includes two read-cache steps per position", () => {
    const digits = "12321";
    const steps = generateDecodeWaysTabulationSteps({ digits });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    // two reads per position from 2 to n
    expect(cacheSteps.length).toBe((digits.length - 1) * 2);
  });

  it("has strictly incrementing step indices", () => {
    const steps = generateDecodeWaysTabulationSteps({ digits: "12321" });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("records result=6 in the complete step for '12321'", () => {
    const steps = generateDecodeWaysTabulationSteps({ digits: "12321" });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.result).toBe(6);
  });

  it("handles empty string — initialize then complete with result 0", () => {
    const steps = generateDecodeWaysTabulationSteps({ digits: "" });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    expect(steps[steps.length - 1]?.variables?.result).toBe(0);
  });

  it("handles '0' — result is 0", () => {
    const steps = generateDecodeWaysTabulationSteps({ digits: "0" });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.result).toBe(0);
  });

  it("handles '10' — result is 1", () => {
    const steps = generateDecodeWaysTabulationSteps({ digits: "10" });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.result).toBe(1);
  });
});
