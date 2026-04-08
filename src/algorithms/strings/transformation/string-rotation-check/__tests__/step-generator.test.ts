/** Step generation tests for generateStringRotationCheckSteps. */

import { describe, it, expect } from "vitest";
import { generateStringRotationCheckSteps } from "../step-generator";

describe("generateStringRotationCheckSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateStringRotationCheckSteps({
      text: "waterbottle",
      pattern: "erbottlewat",
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateStringRotationCheckSteps({
      text: "waterbottle",
      pattern: "erbottlewat",
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateStringRotationCheckSteps({
      text: "waterbottle",
      pattern: "erbottlewat",
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-transform visual states throughout", () => {
    const steps = generateStringRotationCheckSteps({ text: "abc", pattern: "cab" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-transform");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateStringRotationCheckSteps({ text: "abc", pattern: "bca" });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("emits a write-char step for the concatenation phase", () => {
    const steps = generateStringRotationCheckSteps({ text: "abc", pattern: "bca" });
    const writeSteps = steps.filter((step) => step.type === "write-char");
    // One appendOutput call produces one write-char step
    expect(writeSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("emits read-char steps during the search phase", () => {
    const steps = generateStringRotationCheckSteps({ text: "abc", pattern: "bca" });
    const readSteps = steps.filter((step) => step.type === "read-char");
    expect(readSteps.length).toBeGreaterThan(0);
  });

  it("emits a found step when pattern is a valid rotation", () => {
    const steps = generateStringRotationCheckSteps({
      text: "waterbottle",
      pattern: "erbottlewat",
    });
    const foundSteps = steps.filter((step) => step.type === "found");
    expect(foundSteps.length).toBe(1);
  });

  it("does not emit a found step when pattern is not a rotation", () => {
    const steps = generateStringRotationCheckSteps({ text: "abcde", pattern: "abced" });
    const foundSteps = steps.filter((step) => step.type === "found");
    expect(foundSteps.length).toBe(0);
  });

  it("terminates early with only initialize and complete for length mismatch", () => {
    const steps = generateStringRotationCheckSteps({ text: "abc", pattern: "ab" });
    expect(steps.length).toBe(2);
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[1]?.type).toBe("complete");
  });

  it("records result true in complete step variables for a valid rotation", () => {
    const steps = generateStringRotationCheckSteps({ text: "abc", pattern: "bca" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["result"]).toBe(true);
  });

  it("records result false in complete step variables for a non-rotation", () => {
    const steps = generateStringRotationCheckSteps({ text: "abcde", pattern: "abced" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["result"]).toBe(false);
  });

  it("handles equal strings (zero-offset rotation) without error", () => {
    const steps = generateStringRotationCheckSteps({ text: "hello", pattern: "hello" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["result"]).toBe(true);
  });
});
