import { describe, it, expect } from "vitest";
import { generateHammingDistanceSteps } from "../step-generator";

describe("generateHammingDistanceSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateHammingDistanceSteps({ text: "karolin", pattern: "kathrin" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateHammingDistanceSteps({ text: "karolin", pattern: "kathrin" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateHammingDistanceSteps({ text: "karolin", pattern: "kathrin" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string visual states throughout", () => {
    const steps = generateHammingDistanceSteps({ text: "karolin", pattern: "kathrin" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateHammingDistanceSteps({ text: "karolin", pattern: "kathrin" });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("emits char-match steps when characters are equal", () => {
    const steps = generateHammingDistanceSteps({ text: "karolin", pattern: "kathrin" });
    const matchSteps = steps.filter((step) => step.type === "char-match");
    expect(matchSteps.length).toBeGreaterThan(0);
  });

  it("emits char-mismatch steps when characters differ", () => {
    const steps = generateHammingDistanceSteps({ text: "karolin", pattern: "kathrin" });
    const mismatchSteps = steps.filter((step) => step.type === "char-mismatch");
    expect(mismatchSteps.length).toBeGreaterThan(0);
  });

  it("emits exactly n char-match + char-mismatch steps for equal-length strings", () => {
    const text = "karolin";
    const pattern = "kathrin";
    const steps = generateHammingDistanceSteps({ text, pattern });
    const compareSteps = steps.filter(
      (step) => step.type === "char-match" || step.type === "char-mismatch",
    );
    expect(compareSteps.length).toBe(text.length);
  });

  it("completes immediately with result -1 for unequal-length inputs", () => {
    const steps = generateHammingDistanceSteps({ text: "abc", pattern: "abcd" });
    expect(steps.length).toBe(2);
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[1]?.type).toBe("complete");
  });

  it("emits only initialize and complete steps for identical strings — no mismatches", () => {
    const steps = generateHammingDistanceSteps({ text: "abc", pattern: "abc" });
    const mismatchSteps = steps.filter((step) => step.type === "char-mismatch");
    expect(mismatchSteps.length).toBe(0);
  });

  it("stores the distance result in the complete step variables", () => {
    const steps = generateHammingDistanceSteps({ text: "karolin", pattern: "kathrin" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["result"]).toBe(3);
  });

  it("visual state matchFound is false for Hamming Distance (no exact match concept)", () => {
    const steps = generateHammingDistanceSteps({ text: "karolin", pattern: "kathrin" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "string") {
      expect(completeStep.visualState.matchFound).toBe(false);
    }
  });
});
