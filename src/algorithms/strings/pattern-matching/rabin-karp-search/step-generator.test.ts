import { describe, it, expect } from "vitest";
import { generateRabinKarpSearchSteps } from "./step-generator";

describe("generateRabinKarpSearchSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateRabinKarpSearchSteps({ text: "GEEKS FOR GEEKS", pattern: "GEEK" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateRabinKarpSearchSteps({ text: "GEEKS FOR GEEKS", pattern: "GEEK" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateRabinKarpSearchSteps({ text: "GEEKS FOR GEEKS", pattern: "GEEK" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string visual states throughout", () => {
    const steps = generateRabinKarpSearchSteps({ text: "GEEKS FOR GEEKS", pattern: "GEEK" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateRabinKarpSearchSteps({ text: "GEEKS FOR GEEKS", pattern: "GEEK" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits build-failure steps during hash computation phase", () => {
    const steps = generateRabinKarpSearchSteps({ text: "GEEKS FOR GEEKS", pattern: "GEEK" });
    const buildFailureSteps = steps.filter((step) => step.type === "build-failure");
    expect(buildFailureSteps.length).toBeGreaterThan(0);
  });

  it("emits char-match steps when characters match", () => {
    const steps = generateRabinKarpSearchSteps({ text: "ABCABC", pattern: "ABC" });
    const matchSteps = steps.filter((step) => step.type === "char-match");
    expect(matchSteps.length).toBeGreaterThan(0);
  });

  it("emits char-mismatch steps when hashes or characters differ", () => {
    const steps = generateRabinKarpSearchSteps({ text: "ABCDEFG", pattern: "DEF" });
    const mismatchSteps = steps.filter((step) => step.type === "char-mismatch");
    expect(mismatchSteps.length).toBeGreaterThan(0);
  });

  it("emits pattern-shift steps as the hash window rolls", () => {
    const steps = generateRabinKarpSearchSteps({ text: "ABCDEFG", pattern: "DEF" });
    const shiftSteps = steps.filter((step) => step.type === "pattern-shift");
    expect(shiftSteps.length).toBeGreaterThan(0);
  });

  it("sets matchFound true when pattern is found", () => {
    const steps = generateRabinKarpSearchSteps({ text: "GEEKS FOR GEEKS", pattern: "GEEK" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("string");
    if (completeStep.visualState.kind === "string") {
      expect(completeStep.visualState.matchFound).toBe(true);
    }
  });

  it("sets matchFound false when pattern is not found", () => {
    const steps = generateRabinKarpSearchSteps({ text: "ABCDEFG", pattern: "XYZ" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("string");
    if (completeStep.visualState.kind === "string") {
      expect(completeStep.visualState.matchFound).toBe(false);
    }
  });

  it("handles empty pattern with immediate complete", () => {
    const steps = generateRabinKarpSearchSteps({ text: "HELLO", pattern: "" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "string") {
      expect(completeStep.visualState.matchFound).toBe(true);
    }
  });

  it("handles pattern longer than text with immediate complete", () => {
    const steps = generateRabinKarpSearchSteps({ text: "AB", pattern: "ABCDE" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "string") {
      expect(completeStep.visualState.matchFound).toBe(false);
    }
  });
});
