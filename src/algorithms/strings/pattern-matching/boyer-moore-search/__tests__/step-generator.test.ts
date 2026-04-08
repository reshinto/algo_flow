import { describe, it, expect } from "vitest";
import { generateBoyerMooreSearchSteps } from "../step-generator";

describe("generateBoyerMooreSearchSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateBoyerMooreSearchSteps({ text: "ABAAABCD", pattern: "ABC" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateBoyerMooreSearchSteps({ text: "ABAAABCD", pattern: "ABC" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateBoyerMooreSearchSteps({ text: "ABAAABCD", pattern: "ABC" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string visual states throughout", () => {
    const steps = generateBoyerMooreSearchSteps({ text: "ABAAABCD", pattern: "ABC" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateBoyerMooreSearchSteps({ text: "ABAAABCD", pattern: "ABC" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits build-failure steps for the bad character table", () => {
    const steps = generateBoyerMooreSearchSteps({ text: "ABAAABCD", pattern: "ABC" });
    const tableSteps = steps.filter((step) => step.type === "build-failure");
    expect(tableSteps.length).toBeGreaterThan(0);
  });

  it("emits char-match steps when characters match", () => {
    const steps = generateBoyerMooreSearchSteps({ text: "ABCDEF", pattern: "ABC" });
    const matchSteps = steps.filter((step) => step.type === "char-match");
    expect(matchSteps.length).toBeGreaterThan(0);
  });

  it("sets matchFound true when pattern is found", () => {
    const steps = generateBoyerMooreSearchSteps({ text: "ABAAABCD", pattern: "ABC" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("string");
    if (completeStep.visualState.kind === "string") {
      expect(completeStep.visualState.matchFound).toBe(true);
    }
  });

  it("sets matchFound false when pattern is not found", () => {
    const steps = generateBoyerMooreSearchSteps({ text: "ABCDEFG", pattern: "XYZ" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("string");
    if (completeStep.visualState.kind === "string") {
      expect(completeStep.visualState.matchFound).toBe(false);
    }
  });

  it("emits char-mismatch steps when pattern needs to shift", () => {
    const steps = generateBoyerMooreSearchSteps({ text: "ABCDEFG", pattern: "DEF" });
    const mismatchSteps = steps.filter((step) => step.type === "char-mismatch");
    expect(mismatchSteps.length).toBeGreaterThan(0);
  });

  it("emits pattern-shift steps when the pattern is moved", () => {
    const steps = generateBoyerMooreSearchSteps({ text: "ABAAABCD", pattern: "ABC" });
    const shiftSteps = steps.filter((step) => step.type === "pattern-shift");
    expect(shiftSteps.length).toBeGreaterThan(0);
  });

  it("handles an empty pattern immediately", () => {
    const steps = generateBoyerMooreSearchSteps({ text: "HELLO", pattern: "" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.type).toBe("complete");
    if (completeStep.visualState.kind === "string") {
      expect(completeStep.visualState.matchFound).toBe(true);
    }
  });

  it("handles pattern longer than text immediately", () => {
    const steps = generateBoyerMooreSearchSteps({ text: "AB", pattern: "ABCD" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.type).toBe("complete");
    if (completeStep.visualState.kind === "string") {
      expect(completeStep.visualState.matchFound).toBe(false);
    }
  });
});
