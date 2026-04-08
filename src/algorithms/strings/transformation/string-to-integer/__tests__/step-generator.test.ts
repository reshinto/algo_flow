/** Step-generation tests for generateStringToIntegerSteps. */

import { describe, it, expect } from "vitest";
import { generateStringToIntegerSteps } from "../step-generator";

describe("generateStringToIntegerSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateStringToIntegerSteps({ text: "   -42" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateStringToIntegerSteps({ text: "   -42" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateStringToIntegerSteps({ text: "   -42" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-transform visual states throughout", () => {
    const steps = generateStringToIntegerSteps({ text: "   -42" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-transform");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateStringToIntegerSteps({ text: "42" });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("emits visit steps for each phase transition", () => {
    const steps = generateStringToIntegerSteps({ text: "   -42" });
    const visitSteps = steps.filter((step) => step.type === "visit");
    // Expect at least 3 visit steps: skip-whitespace, read-sign, read-digits phases
    expect(visitSteps.length).toBeGreaterThanOrEqual(3);
  });

  it("emits read-char steps for each whitespace character", () => {
    const steps = generateStringToIntegerSteps({ text: "   42" });
    const readSteps = steps.filter((step) => step.type === "read-char");
    // 3 whitespace reads + sign check (no sign char read for plain +) + 2 digit reads = 5 min
    expect(readSteps.length).toBeGreaterThanOrEqual(3);
  });

  it("emits write-char steps for each digit", () => {
    const steps = generateStringToIntegerSteps({ text: "42" });
    const writeSteps = steps.filter((step) => step.type === "write-char");
    // One write step per digit: '4' and '2'
    expect(writeSteps.length).toBe(2);
  });

  it("produces no write-char steps when input has no digits", () => {
    const steps = generateStringToIntegerSteps({ text: "abc" });
    const writeSteps = steps.filter((step) => step.type === "write-char");
    expect(writeSteps.length).toBe(0);
  });

  it("complete step variables contain the expected result for default input", () => {
    const steps = generateStringToIntegerSteps({ text: "   -42" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["result"]).toBe(-42);
  });

  it("complete step variables contain 0 for non-digit input", () => {
    const steps = generateStringToIntegerSteps({ text: "words" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["result"]).toBe(0);
  });

  it("correctly records swaps metric equal to the number of digits written", () => {
    const steps = generateStringToIntegerSteps({ text: "4193" });
    const completeStep = steps[steps.length - 1]!;
    // 4 digits → 4 writeChar calls → swaps metric = 4
    expect(completeStep.metrics.swaps).toBe(4);
  });

  it("handles empty string without throwing", () => {
    expect(() => generateStringToIntegerSteps({ text: "" })).not.toThrow();
  });

  it("clamps overflow and terminates early, still ending with complete step", () => {
    const steps = generateStringToIntegerSteps({ text: "99999999999999999" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
