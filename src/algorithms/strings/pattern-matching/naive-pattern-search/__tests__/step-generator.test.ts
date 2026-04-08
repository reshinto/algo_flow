/** Step generation tests for Naive Pattern Search. */

import { describe, it, expect } from "vitest";
import { generateNaivePatternSearchSteps } from "../step-generator";

describe("generateNaivePatternSearchSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateNaivePatternSearchSteps({ text: "AABAACAADAABAABA", pattern: "AABA" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateNaivePatternSearchSteps({ text: "AABAACAADAABAABA", pattern: "AABA" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateNaivePatternSearchSteps({ text: "AABAACAADAABAABA", pattern: "AABA" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string visual states throughout", () => {
    const steps = generateNaivePatternSearchSteps({ text: "AABAACAADAABAABA", pattern: "AABA" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateNaivePatternSearchSteps({ text: "AABAACAADAABAABA", pattern: "AABA" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits char-match steps when characters match", () => {
    const steps = generateNaivePatternSearchSteps({ text: "ABCABC", pattern: "ABC" });
    const matchSteps = steps.filter((step) => step.type === "char-match");
    expect(matchSteps.length).toBeGreaterThan(0);
  });

  it("emits char-mismatch steps when characters do not match", () => {
    const steps = generateNaivePatternSearchSteps({ text: "ABCDEFG", pattern: "DEF" });
    const mismatchSteps = steps.filter((step) => step.type === "char-mismatch");
    expect(mismatchSteps.length).toBeGreaterThan(0);
  });

  it("sets matchFound true when pattern is found", () => {
    const steps = generateNaivePatternSearchSteps({ text: "AABAACAADAABAABA", pattern: "AABA" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("string");
    if (completeStep.visualState.kind === "string") {
      expect(completeStep.visualState.matchFound).toBe(true);
    }
  });

  it("sets matchFound false when pattern is not found", () => {
    const steps = generateNaivePatternSearchSteps({ text: "ABCDEFG", pattern: "XYZ" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("string");
    if (completeStep.visualState.kind === "string") {
      expect(completeStep.visualState.matchFound).toBe(false);
    }
  });

  it("completes immediately for an empty pattern", () => {
    const steps = generateNaivePatternSearchSteps({ text: "HELLO", pattern: "" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
    expect(steps.length).toBe(2); // initialize + complete
  });

  it("does not emit build-failure steps (no failure table)", () => {
    const steps = generateNaivePatternSearchSteps({ text: "AABAACAADAABAABA", pattern: "AABA" });
    const failureSteps = steps.filter((step) => step.type === "build-failure");
    expect(failureSteps.length).toBe(0);
  });

  it("emits visit steps for each comparison", () => {
    const steps = generateNaivePatternSearchSteps({ text: "ABCDEF", pattern: "DEF" });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
  });
});
