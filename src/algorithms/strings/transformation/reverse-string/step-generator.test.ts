import { describe, it, expect } from "vitest";
import { generateReverseStringSteps } from "./step-generator";

describe("generateReverseStringSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateReverseStringSteps({ text: "hello" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateReverseStringSteps({ text: "hello" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateReverseStringSteps({ text: "hello" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-transform visual states throughout", () => {
    const steps = generateReverseStringSteps({ text: "hello" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-transform");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateReverseStringSteps({ text: "hello" });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("emits swap-pointers steps for each character pair", () => {
    const steps = generateReverseStringSteps({ text: "hello" });
    const swapSteps = steps.filter((step) => step.type === "swap-pointers");
    // "hello" has 2 swaps (h↔o, e↔l), middle 'l' stays
    expect(swapSteps.length).toBe(2);
  });

  it("emits read-char steps before each swap", () => {
    const steps = generateReverseStringSteps({ text: "hello" });
    const readSteps = steps.filter((step) => step.type === "read-char");
    // Two reads per swap iteration: 2 swaps × 2 reads = 4
    expect(readSteps.length).toBe(4);
  });

  it("produces no swap steps for an empty string", () => {
    const steps = generateReverseStringSteps({ text: "" });
    const swapSteps = steps.filter((step) => step.type === "swap-pointers");
    expect(swapSteps.length).toBe(0);
  });

  it("produces no swap steps for a single character", () => {
    const steps = generateReverseStringSteps({ text: "a" });
    const swapSteps = steps.filter((step) => step.type === "swap-pointers");
    expect(swapSteps.length).toBe(0);
  });

  it("produces one swap step for a two-character string", () => {
    const steps = generateReverseStringSteps({ text: "ab" });
    const swapSteps = steps.filter((step) => step.type === "swap-pointers");
    expect(swapSteps.length).toBe(1);
  });

  it("reflects the correct swap count in step metrics", () => {
    const steps = generateReverseStringSteps({ text: "hello" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.metrics.swaps).toBe(2);
  });
});
