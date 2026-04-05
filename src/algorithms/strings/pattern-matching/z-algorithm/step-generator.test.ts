import { describe, it, expect } from "vitest";
import { generateZAlgorithmSteps } from "./step-generator";

describe("generateZAlgorithmSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateZAlgorithmSteps({
      text: "AABXAABXCAABXAABXAY",
      pattern: "AABXAAB",
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateZAlgorithmSteps({
      text: "AABXAABXCAABXAABXAY",
      pattern: "AABXAAB",
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateZAlgorithmSteps({
      text: "AABXAABXCAABXAABXAY",
      pattern: "AABXAAB",
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string visual states throughout", () => {
    const steps = generateZAlgorithmSteps({
      text: "AABXAABXCAABXAABXAY",
      pattern: "AABXAAB",
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateZAlgorithmSteps({
      text: "AABXAABXCAABXAABXAY",
      pattern: "AABXAAB",
    });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits build-failure steps for the Z-array", () => {
    const steps = generateZAlgorithmSteps({
      text: "AABXAABXCAABXAABXAY",
      pattern: "AABXAAB",
    });
    const zArraySteps = steps.filter((step) => step.type === "build-failure");
    expect(zArraySteps.length).toBeGreaterThan(0);
  });

  it("emits char-match steps when the pattern is found", () => {
    const steps = generateZAlgorithmSteps({ text: "ABCABC", pattern: "ABC" });
    const matchSteps = steps.filter((step) => step.type === "char-match");
    expect(matchSteps.length).toBeGreaterThan(0);
  });

  it("sets matchFound true when the pattern is found", () => {
    const steps = generateZAlgorithmSteps({
      text: "AABXAABXCAABXAABXAY",
      pattern: "AABXAAB",
    });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("string");
    if (completeStep.visualState.kind === "string") {
      expect(completeStep.visualState.matchFound).toBe(true);
    }
  });

  it("sets matchFound false when the pattern is not found", () => {
    const steps = generateZAlgorithmSteps({ text: "ABCDEFG", pattern: "XYZ" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("string");
    if (completeStep.visualState.kind === "string") {
      expect(completeStep.visualState.matchFound).toBe(false);
    }
  });

  it("handles an empty pattern with only initialize and complete steps", () => {
    const steps = generateZAlgorithmSteps({ text: "HELLO", pattern: "" });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("correctly identifies pattern not present in text", () => {
    const steps = generateZAlgorithmSteps({ text: "ABCDEFG", pattern: "XYZ" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "string") {
      expect(completeStep.visualState.matchFound).toBe(false);
    }
  });
});
