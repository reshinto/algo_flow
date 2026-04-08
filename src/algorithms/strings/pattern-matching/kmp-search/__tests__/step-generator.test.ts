import { describe, it, expect } from "vitest";
import { generateKmpSearchSteps } from "../step-generator";

describe("generateKmpSearchSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateKmpSearchSteps({ text: "ABABDABACDABABCABAB", pattern: "ABABCABAB" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateKmpSearchSteps({ text: "ABABDABACDABABCABAB", pattern: "ABABCABAB" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateKmpSearchSteps({ text: "ABABDABACDABABCABAB", pattern: "ABABCABAB" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string visual states throughout", () => {
    const steps = generateKmpSearchSteps({ text: "ABABDABACDABABCABAB", pattern: "ABABCABAB" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateKmpSearchSteps({ text: "ABABDABACDABABCABAB", pattern: "ABABCABAB" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits build-failure steps for the failure table", () => {
    const steps = generateKmpSearchSteps({ text: "ABABDABACDABABCABAB", pattern: "ABABCABAB" });
    const failureSteps = steps.filter((step) => step.type === "build-failure");
    expect(failureSteps.length).toBeGreaterThan(0);
  });

  it("emits char-match steps when characters match", () => {
    const steps = generateKmpSearchSteps({ text: "ABCABC", pattern: "ABC" });
    const matchSteps = steps.filter((step) => step.type === "char-match");
    expect(matchSteps.length).toBeGreaterThan(0);
  });

  it("sets matchFound true when pattern is found", () => {
    const steps = generateKmpSearchSteps({ text: "ABABDABACDABABCABAB", pattern: "ABABCABAB" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("string");
    if (completeStep.visualState.kind === "string") {
      expect(completeStep.visualState.matchFound).toBe(true);
    }
  });

  it("sets matchFound false when pattern is not found", () => {
    const steps = generateKmpSearchSteps({ text: "ABCDEFG", pattern: "XYZ" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("string");
    if (completeStep.visualState.kind === "string") {
      expect(completeStep.visualState.matchFound).toBe(false);
    }
  });

  it("emits char-mismatch steps when pattern needs to shift", () => {
    const steps = generateKmpSearchSteps({ text: "ABCDEFG", pattern: "DEF" });
    const mismatchSteps = steps.filter((step) => step.type === "char-mismatch");
    expect(mismatchSteps.length).toBeGreaterThan(0);
  });
});
